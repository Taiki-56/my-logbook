import { Prisma } from "@/lib/generated/client";
import { Category } from "@/lib/generated/enums";
import prisma from "@/lib/prisma";
import { PostFormValues } from "@/schemas/postSchema";
import { Locale } from "@/types/config";
import { AdminDisplayPost, DisplayPost, PostWithRelations, UpdatePost } from "@/types/post";

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

const resolveTags = async (tags: string[], locale: Locale) => {
  const tagIds = [];
  for (const tagName of tags) {
    let safeSlug = slugify(tagName);
    if (!safeSlug) safeSlug = encodeURIComponent(tagName.toLowerCase());

    let tag = await prisma.tag.findFirst({
      where: {
        OR: [{ slug: safeSlug }, { contents: { some: { locale, slug: safeSlug } } }]
      },
      include: { contents: true }
    });

    if (!tag) {
      tag = await prisma.tag.create({
        data: {
          slug: safeSlug,
          contents: { create: { locale, name: tagName, slug: safeSlug } }
        },
        include: { contents: true }
      });
    } else {
      const hasLocale = tag.contents.some((c) => c.locale === locale);
      if (!hasLocale) {
        try {
          await prisma.tag.update({
            where: { id: tag.id },
            data: { contents: { create: { locale, name: tagName, slug: safeSlug } } }
          });
        } catch (e) {
          console.warn("Tag content creation skipped due to concurrency:", e);
        }
      }
    }
    tagIds.push(tag.id);
  }
  return tagIds;
};

const updateStreak = async (authorId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: authorId },
    select: { currentStreak: true, lastActivityAt: true }
  });

  if (!user) return;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const lastActive = user.lastActivityAt ? new Date(user.lastActivityAt) : null;
  const lastActiveDay = lastActive
    ? new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate())
    : null;

  // すでに今日アクティビティが記録されている場合は何もしない
  if (lastActiveDay && lastActiveDay.getTime() === today.getTime()) {
    return;
  }

  let newStreak = user.currentStreak;

  if (!lastActiveDay) {
    // 初めてのアクティビティ
    newStreak = 1;
  } else {
    const diffTime = today.getTime() - lastActiveDay.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // 前日も活動していればストリーク継続
      newStreak += 1;
    } else if (diffDays > 1) {
      // 2日以上空いていたら1からリセット
      newStreak = 1;
    }
    // diffDays === 0 の場合は同日なので上の early return で弾かれます
  }

  await prisma.user.update({
    where: { id: authorId },
    data: {
      currentStreak: newStreak,
      lastActivityAt: now
    }
  });
};

const createPost = async (
  authorId: string,
  payload: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null; tags?: string[] }
) => {
  const { tags, thumbnail, status, title, slug, seoTitle, seoDescription, projectData, html, isFeatured, category } =
    payload;
  const tagIds = tags && tags.length > 0 ? await resolveTags(tags, "ja") : [];

  const post = await prisma.post.create({
    data: {
      authorId,
      category,
      thumbnail: thumbnail ? thumbnail : null,
      contents: {
        create: {
          locale: "ja",
          status,
          isFeatured,
          title,
          slug,
          seoTitle,
          seoDescription,
          projectData: projectData ?? undefined,
          html: html ?? undefined
        }
      },
      ...(tagIds.length > 0 && {
        postTags: {
          create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } }))
        }
      })
    },
    include: {
      contents: true,
      postTags: { include: { tag: { include: { contents: true } } } }
    }
  });
  await updateStreak(authorId);

  return post;
};

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
    isFeatured?: boolean;
  }
) => {
  const { title, slug, html, seoTitle, seoDescription, tags, thumbnail, isFeatured } = translatedData;

  if (tags !== undefined) {
    await prisma.postTag.deleteMany({ where: { postId } });
    if (tags.length > 0) {
      const tagIds = await resolveTags(tags, targetLang);
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({ postId, tagId }))
      });
    }
  }

  // 🌟 サムネイルがある場合は親Postを更新
  if (thumbnail !== undefined) {
    await prisma.post.update({
      where: { id: postId },
      data: { thumbnail: thumbnail === "" ? null : thumbnail }
    });
  }

  const updated = await prisma.postContent.upsert({
    where: { postId_locale: { postId, locale: targetLang } },
    update: { title, slug, html, seoTitle, seoDescription, isFeatured },
    create: {
      postId,
      locale: targetLang,
      title,
      slug,
      html,
      seoTitle,
      seoDescription,
      status: "DRAFT",
      isFeatured: isFeatured ?? false
    }
  });

  const post = await prisma.post.findUnique({ where: { id: postId }, select: { authorId: true } });
  if (post?.authorId) {
    await updateStreak(post.authorId);
  }

  return updated;
};

const updatePost = async (payload: UpdatePost & { tags?: string[]; category: Category; isFeatured?: boolean }) => {
  const {
    postId,
    locale,
    title,
    slug,
    status,
    seoTitle,
    seoDescription,
    thumbnail,
    projectData,
    html,
    tags,
    category,
    isFeatured
  } = payload;

  if (tags !== undefined) {
    await prisma.postTag.deleteMany({ where: { postId } });
    if (tags.length > 0) {
      const tagIds = await resolveTags(tags, locale);
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({ postId, tagId }))
      });
    }
  }

  return await prisma.postContent.update({
    where: { postId_locale: { postId, locale } },
    data: {
      title,
      slug,
      status,
      seoTitle,
      seoDescription,
      isFeatured,
      projectData: projectData ?? undefined,
      html: html ?? undefined,
      post: {
        update: {
          category,
          thumbnail: thumbnail === "" ? null : thumbnail
        }
      }
    }
  });
};

const getPublishedPosts = async (locale: Locale) => {
  return await prisma.post.findMany({
    where: {
      contents: {
        some: {
          locale: locale,
          status: "PUBLISHED"
        }
      }
    },
    include: {
      // 🌟 条件2: Includeする中身も、指定された言語のコンテンツ「だけ」に絞り込む
      contents: {
        where: {
          locale: locale
        }
      },
      postTags: {
        include: {
          tag: {
            include: { contents: true }
          }
        }
      }
    },
    orderBy: { updatedAt: "desc" }
  });
};

const getPostContentBySlug = async (slug: string) => {
  return await prisma.postContent.findUnique({
    where: { slug },
    include: {
      post: {
        include: {
          postTags: {
            include: {
              tag: { include: { contents: true } }
            }
          }
        }
      }
    }
  });
};

const getPostBySlug = async (slug: string) => {
  return await prisma.post.findFirst({
    where: { contents: { some: { slug } } },
    include: {
      contents: true,
      postTags: {
        include: {
          tag: { include: { contents: true } }
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
    readTime: "5 min read",
    title: content?.title || "No Title",
    description: content?.seoDescription || "",
    tags: post.postTags.map((pt) => {
      const tagContent = pt.tag.contents?.[0];
      return tagContent?.name || decodeURIComponent(pt.tag.slug);
    }),
    thumbnail: post.thumbnail || "",
    slug: content?.slug || ""
  };
};

const getFeaturedPosts = async (locale: Locale): Promise<DisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    where: {
      contents: { some: { locale, status: "PUBLISHED", isFeatured: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      contents: { where: { locale } },
      postTags: {
        include: {
          tag: {
            include: {
              contents: { where: { locale } }
            }
          }
        }
      }
    }
  });
  return rawPosts.map(formatToDisplayPost);
};

const getLatestPosts = async (locale: Locale): Promise<DisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    where: {
      contents: { some: { locale, status: "PUBLISHED" } }
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      contents: { where: { locale } },
      postTags: {
        include: {
          tag: {
            include: {
              contents: { where: { locale } }
            }
          }
        }
      }
    }
  });
  return rawPosts.map(formatToDisplayPost);
};

const getAdminPosts = async (): Promise<AdminDisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    include: { contents: true },
    orderBy: { updatedAt: "desc" }
  });

  return rawPosts.map((post) => {
    const ja = post.contents.find((c) => c.locale === "ja");
    const en = post.contents.find((c) => c.locale === "en");
    const fr = post.contents.find((c) => c.locale === "fr");
    const es = post.contents.find((c) => c.locale === "es");

    return {
      id: post.id,
      title: ja?.title || en?.title || fr?.title || es?.title || "No Title",
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
        fr: fr ? { status: fr.status, slug: fr.slug } : null,
        es: es ? { status: es.status, slug: es.slug } : null
      }
    };
  });
};

const getSourcePost = async (postId: string, sourceLang: Locale) => {
  return prisma.postContent.findUnique({
    where: { postId_locale: { postId, locale: sourceLang } },
    include: {
      post: {
        include: {
          postTags: { include: { tag: { include: { contents: true } } } }
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
