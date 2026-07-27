import { Prisma } from "@/lib/generated/client";
import prisma from "@/lib/prisma";
import { PostFormValues } from "@/schemas/postSchema";
import { Locale } from "@/types/config";
import { AdminDisplayPost, DisplayPost, PostWithRelations, UpdatePost } from "@/types/post";

//* Helper function to generate URL-safe slugs
//* (e.g., "Next.js" -> "nextjs", "React Router" -> "react-router")
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

//* Helper function to safely resolve and create tags across languages
const resolveTags = async (tags: string[], locale: string) => {
  const tagIds = [];
  for (const tagName of tags) {
    let safeSlug = slugify(tagName);
    if (!safeSlug) safeSlug = encodeURIComponent(tagName.toLowerCase());

    //* Find an existing tag by either the parent's canonical slug OR the child's locale-specific slug
    let tag = await prisma.tag.findFirst({
      where: {
        OR: [{ slug: safeSlug }, { contents: { some: { locale, slug: safeSlug } } }]
      },
      include: { contents: true }
    });

    if (!tag) {
      //* Create a completely new tag (sets the parent's canonical slug and initial localized content)
      tag = await prisma.tag.create({
        data: {
          slug: safeSlug,
          contents: {
            create: { locale, name: tagName, slug: safeSlug }
          }
        },
        include: { contents: true }
      });
    } else {
      //* If the tag exists but lacks content for the current locale, append it
      const hasLocale = tag.contents.some((c) => c.locale === locale);
      if (!hasLocale) {
        try {
          await prisma.tag.update({
            where: { id: tag.id },
            data: {
              contents: {
                create: { locale, name: tagName, slug: safeSlug }
              }
            }
          });
        } catch (e) {
          //* Ignore potential race conditions if created concurrently
          console.warn("Tag content creation skipped due to concurrency:", e);
        }
      }
    }
    tagIds.push(tag.id);
  }
  return tagIds;
};

//* Create initial post in the base language (Japanese)
const createPost = async (
  authorId: string,
  payload: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null; tags?: string[] }
) => {
  const { tags, thumbnail, status, title, slug, seoTitle, seoDescription, projectData, html } = payload;

  //* 1. Safely resolve tags
  const tagIds = tags && tags.length > 0 ? await resolveTags(tags, "ja") : [];

  //* 2. Create the post and link tags via the junction table (PostTag)
  return await prisma.post.create({
    data: {
      authorId,
      thumbnail: thumbnail ? thumbnail : null,
      contents: {
        create: {
          locale: "ja",
          status,
          title,
          slug,
          seoTitle,
          seoDescription,
          projectData: projectData ?? undefined,
          html: html ?? undefined
        }
      },
      //* Insert data into the PostTag junction table
      ...(tagIds.length > 0 && {
        postTags: {
          create: tagIds.map((tagId) => ({
            tag: {
              connect: { id: tagId }
            }
          }))
        }
      })
    },
    include: {
      contents: true,
      postTags: {
        include: {
          tag: {
            include: {
              contents: true
            }
          }
        }
      }
    }
  });
};

//* Add translated content to an existing post
const createTranslatedPost = async (
  postId: string,
  targetLang: Locale,
  translatedData: {
    title: string;
    slug: string;
    html: string;
    seoTitle: string;
    seoDescription: string;
    tags?: string[];
    thumbnail?: string | null;
  }
) => {
  const { title, slug, html, seoTitle, seoDescription, tags, thumbnail } = translatedData;

  //* 1. Update tags securely using the resolver
  if (tags !== undefined) {
    //* Reset old relations
    await prisma.postTag.deleteMany({ where: { postId } });

    if (tags.length > 0) {
      const tagIds = await resolveTags(tags, targetLang);
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({ postId, tagId }))
      });
    }
  }

  //* 2. Update the parent post's thumbnail if provided
  if (thumbnail !== undefined) {
    await prisma.post.update({
      where: { id: postId },
      data: {
        thumbnail: thumbnail === "" ? null : thumbnail
      }
    });
  }

  //* 3. Add PostContent without creating a new parent Post (using upsert for safety)
  return await prisma.postContent.upsert({
    where: {
      postId_locale: { postId, locale: targetLang }
    },
    update: { title, slug, html, seoTitle, seoDescription },
    create: {
      postId,
      locale: targetLang,
      title,
      slug,
      html,
      seoTitle,
      seoDescription,
      status: "DRAFT"
    }
  });
};

//* Update an existing post
const updatePost = async (payload: UpdatePost & { tags?: string[] }) => {
  const { postId, locale, title, slug, status, seoTitle, seoDescription, thumbnail, projectData, html, tags } = payload;

  //* 1. Update tags (execute only if tags are provided)
  if (tags !== undefined) {
    await prisma.postTag.deleteMany({ where: { postId } });
    if (tags.length > 0) {
      const tagIds = await resolveTags(tags, locale);
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({ postId, tagId }))
      });
    }
  }

  //* 2. Update post content
  return await prisma.postContent.update({
    where: {
      postId_locale: {
        postId,
        locale
      }
    },
    data: {
      title,
      slug,
      status,
      seoTitle,
      seoDescription,
      projectData: projectData ?? undefined,
      html: html ?? undefined,
      post: {
        update: {
          //* Save as null if empty, otherwise save the URL
          thumbnail: thumbnail === "" ? null : thumbnail
        }
      }
    }
  });
};

//* Fetches all posts to show on /posts page
const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    include: {
      contents: true,
      postTags: {
        include: {
          tag: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });
};

//* Fetches post data for initial data on /edit/[slug] page
const getPostContentBySlug = async (slug: string) => {
  return await prisma.postContent.findUnique({
    where: { slug },
    //* Get the parent model too for thumbnail and associated tags
    include: {
      post: {
        include: {
          postTags: {
            include: {
              tag: true
            }
          }
        }
      }
    }
  });
};

//* Fetches the complete post data, including all localized contents, to be displayed on the /posts/[slug] page
const getPostBySlug = async (slug: string) => {
  return await prisma.post.findFirst({
    where: {
      contents: {
        some: {
          slug //* Find the parent Post that contains at least one content matching this slug
        }
      }
    },
    include: {
      contents: true, //* Include contents for all available languages
      postTags: {
        include: {
          tag: true //* Include associated tag details
        }
      }
    }
  });
};

const formatToDisplayPost = (post: PostWithRelations): DisplayPost => {
  const content = post.contents[0];
  return {
    id: post.id,
    category: post.postTags[0]?.tag?.slug?.toUpperCase() || "BLOG",
    date: post.createdAt.toLocaleDateString("ja-JP", { month: "short", day: "numeric" }),
    readTime: "5 min read", //* TODO: Adjust to actual implementation logic
    title: content?.title || "No Title",
    description: content?.seoDescription || "",
    tags: post.postTags.map((pt) => pt.tag.slug),
    thumbnail: post.thumbnail || "",
    slug: content?.slug || ""
  };
};

const getFeaturedPosts = async (locale: string): Promise<DisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    where: {
      contents: { some: { locale, status: "PUBLISHED", isFeatured: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      contents: { where: { locale } }, //* Filter contents by the requested locale
      postTags: { include: { tag: true } }
    }
  });

  return rawPosts.map(formatToDisplayPost);
};

const getLatestPosts = async (locale: Locale): Promise<DisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    where: {
      contents: {
        some: { locale, status: "PUBLISHED" }
      }
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      contents: { where: { locale } },
      postTags: { include: { tag: true } }
    }
  });

  return rawPosts.map(formatToDisplayPost);
};

const getAdminPosts = async (): Promise<AdminDisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    include: {
      contents: true
    },
    orderBy: { updatedAt: "desc" }
  });

  return rawPosts.map((post) => {
    //* Extract localized contents
    const ja = post.contents.find((c) => c.locale === "ja");
    const en = post.contents.find((c) => c.locale === "en");
    const fr = post.contents.find((c) => c.locale === "fr");

    return {
      id: post.id,
      //* Prioritize Japanese title, fallback to others, or default to "No Title"
      title: ja?.title || en?.title || fr?.title || "No Title",
      updatedAt: new Date(post.updatedAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }),
      statuses: {
        ja: ja ? { status: ja.status, slug: ja.slug } : null,
        en: en ? { status: en.status, slug: en.slug } : null,
        fr: fr ? { status: fr.status, slug: fr.slug } : null
      }
    };
  });
};

const getSourcePost = async (postId: string, sourceLang: Locale) => {
  return prisma.postContent.findUnique({
    where: {
      postId_locale: {
        postId,
        locale: sourceLang
      }
    },
    include: {
      post: {
        include: {
          postTags: {
            include: {
              tag: {
                include: { contents: true }
              }
            }
          }
        }
      }
    }
  });
};

export {
  createPost,
  createTranslatedPost,
  getAdminPosts,
  getFeaturedPosts,
  getLatestPosts,
  getPostBySlug,
  getPostContentBySlug,
  getPublishedPosts,
  getSourcePost,
  updatePost
};
