import slugify from "@/helpers/slugify";
import { Prisma } from "@/libs/generated/client";
import { Category } from "@/libs/generated/enums";
import prisma from "@/libs/prisma";
import { PostFormValues } from "@/schemas/postSchema";
import { Locale } from "@/types/config";
import { AdminDisplayPost, DisplayPost, PopularTagView, PostWithRelations, UpdatePost } from "@/types/post";

const resolveTags = async (tags: string[], locale: Locale) => {
  const tagIds = [];

  for (const tagName of tags) {
    // 1. まず、既存のタグがあるか「表示名(name)」で検索
    // （※英語のslugで直接入力された場合も考慮して、slugでも検索できるようにしておきます）
    let tag = await prisma.tag.findFirst({
      where: {
        OR: [{ slug: tagName.toLowerCase() }, { contents: { some: { locale, name: tagName } } }]
      },
      include: { contents: true }
    });

    // 2. タグが存在しない場合は新規作成
    if (!tag) {
      // 英語の場合は "Next.js" -> "nextjs" になる。日本語の場合は空文字になる。
      let safeSlug = slugify(tagName);

      // 日本語のタグなどで safeSlug が空文字になった場合は、一時的なIDを割り当てる
      // （※本来はここで「tag-xxxx」になります。後から管理画面で正しい英単語に修正する運用を想定）
      if (!safeSlug) {
        safeSlug = `tag-${Math.random().toString(36).substring(2, 8)}`;
      }

      // 万が一、生成したslugが既に存在する場合の衝突回避
      const existingSlug = await prisma.tag.findUnique({ where: { slug: safeSlug } });
      if (existingSlug) {
        safeSlug = `${safeSlug}-${Math.random().toString(36).substring(2, 5)}`;
      }

      tag = await prisma.tag.create({
        data: {
          slug: safeSlug,
          contents: { create: { locale, name: tagName } }
        },
        include: { contents: true }
      });
    } else {
      // 3. タグは存在するが、現在の言語(locale)の表示名がない場合は追加
      const hasLocale = tag.contents.some((c) => c.locale === locale);
      if (!hasLocale) {
        try {
          await prisma.tag.update({
            where: { id: tag.id },
            data: { contents: { create: { locale, name: tagName } } }
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
    category: post.category,
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

const getFeaturedPosts = async (locale: Locale, limit?: number): Promise<DisplayPost[]> => {
  const rawPosts = await prisma.post.findMany({
    where: {
      contents: { some: { locale, status: "PUBLISHED", isFeatured: true } }
    },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
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

const getPopularTags = async (locale: Locale, limit: number): Promise<PopularTagView[]> => {
  const tagsData = await prisma.tag.findMany({
    where: {
      contents: { some: { locale } }
    },
    take: limit,
    orderBy: {
      tags: { _count: "desc" }
    },
    include: {
      contents: { where: { locale } },
      _count: { select: { tags: true } }
    }
  });

  return tagsData.map((tag) => ({
    name: tag.contents[0]?.name || tag.slug,
    slug: tag.slug,
    count: tag._count.tags
  }));
};

export {
  createPost,
  createTranslatedPost,
  getAdminPosts,
  getFeaturedPosts,
  getLatestPosts,
  getPopularTags,
  getPostBySlug,
  getPostContentBySlug,
  getPublishedPosts,
  getSourcePost,
  updatePost
};
