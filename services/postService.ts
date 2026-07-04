import { Prisma } from "@/lib/generated/client";
import prisma from "@/lib/prisma";
import { PostFormValues } from "@/schemas/postSchema";
import UpdatePostContent from "@/types/UpdatePostContent";
import { Locale } from "next-intl";

//* Create initial Post with Japanese
const createPost = async (
  authorId: string,
  formData: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null }
) => {
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
      }
    },
    include: {
      contents: true
    }
  });
};

//* Update post content (all fields)
const updatePostContent = async ({
  postId,
  locale,
  title,
  slug,
  status,
  seoTitle,
  seoDescription,
  thumbnail,
  projectData,
  html
}: UpdatePostContent) => {
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

//* Get post data for initial data on /edit/[slug] page
const getPostBySlug = async (slug: string, locale: Locale) => {
  return await prisma.postContent.findUnique({
    where: {
      locale_slug: {
        slug,
        locale
      }
    },
    //* Get the parent model too for thumbnail
    include: {
      post: true
    }
  });
};

export { createPost, getPostBySlug, updatePostContent };
