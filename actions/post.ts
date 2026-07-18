"use server";

import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/client";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { SaveContentInput, saveContentSchema } from "@/schemas/saveContentSchema";
import { createPost, getPostBySlug, getPublishedPosts, updatePost } from "@/services/post";
import { PostAction, PostWithRelations } from "@/types/post";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import z from "zod";

//* Create the post with the first language for it
const createPostAction = async (
  formData: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null; tags?: string[] }
) => {
  //* server side validation
  const validFormData = postSchema.safeParse(formData);
  if (!validFormData.success) {
    return { error: "入力内容にエラーがあります。" };
  }

  const locale = await getLocale();
  const session = await auth();
  const authorId = session?.user?.id;

  if (!authorId) {
    return { error: "認証されていません。ログインしてください。" };
  }

  let newPost;
  try {
    //*
    const pureFormData = JSON.parse(JSON.stringify(formData));
    newPost = await createPost(authorId, pureFormData);
  } catch (error) {
    console.error("Database error: ", error);
    return { error: "データベースへの保存に失敗しました。" };
  }

  const savedSlug = newPost.contents[0].slug;
  redirect({ href: `/admin/posts/edit/${savedSlug}`, locale: locale });
};

//* Update the existing post on /edit/[slug] page
const savePostAction = async (input: SaveContentInput): Promise<PostAction> => {
  //* 1. Guard by Auth.js session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  //* 2. Validate payload via Zod
  // TipTap JSON can contain undefined fields (e.g. image attrs) that are not valid JSON.
  // Normalize once before validation so edit mode behaves consistently.
  const normalizedInput = JSON.parse(JSON.stringify(input)) as SaveContentInput;

  const validated = saveContentSchema.safeParse(normalizedInput);
  if (!validated.success) {
    const flattened = z.treeifyError(validated.error);
    console.error("Invalid content payload details:", {
      formErrors: flattened.errors,
      fieldErrors: flattened.properties,
      issues: validated.error.issues
    });
    return { success: false, error: "Invalid content payload" };
  }

  // Strip undefined values from nested JSON before persisting to Prisma JSON columns.
  const safeData = JSON.parse(JSON.stringify(validated.data)) as SaveContentInput;

  try {
    //* 3. Call service layer
    await updatePost({
      ...safeData,
      seoTitle: safeData.seoTitle ?? "",
      seoDescription: safeData.seoDescription ?? "",
      thumbnail: safeData.thumbnail ?? "",
      tags: safeData.tags
    });
  } catch (error) {
    console.error("Failed to update post content:", error);
    return { success: false, error: "Database update failed" };
  }

  try {
    //* 4. Cache Purge
    revalidatePath(`/${safeData.locale}/admin/posts/edit/${safeData.slug}`);
    revalidatePath(`/${safeData.locale}/posts/${safeData.slug}`);
  } catch (error) {
    console.warn("Revalidation failed after content update:", error);
    // DB update is already successful; treat this as non-fatal.
  }

  return { success: true };
};

//* Fetches all posts
const getPublishedPostsAction = async (): Promise<PostAction<PostWithRelations[]>> => {
  try {
    const posts = await getPublishedPosts();
    return { success: true, data: posts as PostWithRelations[] };
  } catch (error) {
    console.error("Failed to get posts: ", error);
    return { success: false, error: `Failed to get posts: ${error}` };
  }
};

const getPostBySlugAction = async (slug: string): Promise<PostAction<PostWithRelations | null>> => {
  try {
    const post = await getPostBySlug(slug);
    if (!post) {
      return { success: false, error: "Couldn't find a post" };
    }
    return { success: true, data: post as PostWithRelations };
  } catch (error) {
    console.error(`Failed to fetch a post by slug: ${error}`);
    return { success: false, error: "Failed to fetch a post" };
  }
};

export { createPostAction, getPostBySlugAction, getPublishedPostsAction, savePostAction };
