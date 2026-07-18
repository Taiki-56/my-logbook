import { Prisma } from "@/lib/generated/client";
import prisma from "@/lib/prisma";
import { PostFormValues } from "@/schemas/postSchema";
import { AdminDisplayPost, DisplayPost, PostWithRelations, UpdatePost } from "@/types/post";
import { Locale } from "next-intl";

//* Create initial Post with Japanese
const createPost = async (
  authorId: string,
  formData: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null; tags?: string[] }
) => {
  //* 1. タグの準備（存在しなければ作成、あればIDを取得）
  const tagIds = [];
  if (formData.tags && formData.tags.length > 0) {
    for (const tagName of formData.tags) {
      // 🌟 upsert で既存のタグを探すか、無ければ新規作成する
      const tag = await prisma.tag.upsert({
        where: { slug: tagName },
        update: {}, // 既存の場合は何もしない
        create: {
          slug: tagName, // 今は入力された文字列をそのまま共通slugとする
          //* 将来見据えて、今の言語(ja)の表示用コンテンツも作成しておく
          contents: {
            create: {
              locale: "ja",
              name: tagName,
              slug: tagName
            }
          }
        }
      });
      tagIds.push(tag.id);
    }
  }

  //* 2. 記事の作成とタグの中間テーブル(postTags)への紐付け
  return await prisma.post.create({
    data: {
      authorId,
      thumbnail: formData.thumbnail ? formData.thumbnail : null,
      contents: {
        create: {
          locale: "ja",
          status: formData.status,
          title: formData.title,
          slug: formData.slug,
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription,
          projectData: formData.projectData ?? undefined,
          html: formData.html ?? undefined
        }
      },
      //* 🌟 ここで中間テーブル(PostTag)にデータを流し込む！
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

//* Update post content (all fields)
const updatePost = async ({
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
  tags
}: UpdatePost & { tags?: string[] }) => {
  //* 1. タグの更新処理 (tagsが送られてきた場合のみ実行)
  if (tags !== undefined) {
    //* 一旦この記事に紐づく「古いタグの関連付け」をすべて削除（リセット）する
    await prisma.postTag.deleteMany({
      where: { postId }
    });

    //* 新しいタグを準備して再登録する
    if (tags.length > 0) {
      const tagIds = [];
      for (const tagName of tags) {
        const tag = await prisma.tag.upsert({
          where: { slug: tagName },
          update: {},
          create: {
            slug: tagName,
            //* 編集中の言語(locale)に合わせてコンテンツを作成
            contents: {
              create: {
                locale: locale,
                name: tagName,
                slug: tagName
              }
            }
          }
        });
        tagIds.push(tag.id);
      }

      //* 中間テーブル(PostTag)に新しいペアを一気に作成
      await prisma.postTag.createMany({
        data: tagIds.map((tagId) => ({
          postId,
          tagId
        }))
      });
    }
  }

  //* 2. 記事コンテンツの更新
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
          //* 空文字なら null（未設定）として保存し、URLがあれば保存する
          thumbnail: thumbnail === "" ? null : thumbnail
        }
      }
    }
  });
};

//* Fetches all post to show on /posts page
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
const getPostContentBySlug = async (slug: string, locale: Locale) => {
  return await prisma.postContent.findUnique({
    where: {
      locale_slug: {
        slug,
        locale
      }
    },
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

//* Fetches the complete post data, including all localized contents, to be displayed on the /posts/[slug] page.
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
    readTime: "5 min read", // TODO: 実際の実装に合わせて調整
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
      contents: { where: { locale } }, // 取得するcontentsを現在のlocaleに絞る
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
    // 各言語のコンテンツを抽出
    const ja = post.contents.find((c) => c.locale === "ja");
    const en = post.contents.find((c) => c.locale === "en");
    const fr = post.contents.find((c) => c.locale === "fr");

    return {
      id: post.id,
      // タイトルは日本語を優先し、なければ他言語、それでもなければ"No Title"
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

export {
  createPost,
  getAdminPosts,
  getFeaturedPosts,
  getLatestPosts,
  getPostBySlug,
  getPostContentBySlug,
  getPublishedPosts,
  updatePost
};
