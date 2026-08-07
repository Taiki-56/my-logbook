"use server";

import { redirect } from "@/i18n/navigation";
import { auth } from "@/libs/auth";
import { Prisma } from "@/libs/generated/client";
import { PostFormValues, SaveContentInput, postSchema, saveContentSchema } from "@/schemas/postSchema";
import { getDashboardStats } from "@/services/dashboard";
import { createPost, createTranslatedPost, getPostBySlug, getPublishedPosts, updatePost } from "@/services/post";
import { Locale } from "@/types/config";
import { PostAction, PostWithRelations } from "@/types/post";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import z from "zod";

//* Create the post with the initial language
const createPostAction = async (
  formData: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null; tags?: string[] }
) => {
  //* 1. Server-side validation
  const validFormData = postSchema.safeParse(formData);
  if (!validFormData.success) {
    return { error: "Validation failed. Please check your input." };
  }

  const locale = await getLocale();
  const session = await auth();
  const authorId = session?.user?.id;

  if (!authorId) {
    return { error: "Unauthorized. Please log in." };
  }

  let newPost;
  try {
    //* Deep copy to remove any undefined values before passing to Prisma
    const pureFormData = JSON.parse(JSON.stringify(formData));
    newPost = await createPost(authorId, pureFormData);
  } catch (error) {
    console.error("Database error while creating post: ", error);
    return { error: "Failed to save the post to the database." };
  }

  const savedSlug = newPost.contents[0].slug;
  redirect({ href: `/admin/posts/edit/${savedSlug}`, locale: locale });
};

//* Payload definition for the translation action
type CreateTranslatedPostInput = {
  postId: string;
  targetLang: Locale;
  translatedData: {
    title: string;
    slug: string;
    html: string;
    seoTitle: string;
    seoDescription: string;
    tags?: string[];
    thumbnail?: string | null;
    isFeatured?: boolean; // 🌟 追加
  };
};

//* Save a newly translated post to the database
const createTranslatedPostAction = async (input: CreateTranslatedPostInput): Promise<PostAction> => {
  //* 1. Guard by Auth.js session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const { postId, targetLang, translatedData } = input;

  if (!postId || !targetLang || !translatedData) {
    return { success: false, error: "Missing required fields for translation." };
  }

  try {
    //* 2. Call service layer to save translation
    await createTranslatedPost(postId, targetLang, translatedData);
  } catch (error) {
    console.error("Failed to save translated post:", error);
    return { success: false, error: "Database update failed while saving translation." };
  }

  try {
    //* 3. Cache Purge
    revalidatePath(`/${targetLang}/admin/posts/edit/${translatedData.slug}`);
    revalidatePath(`/${targetLang}/posts/${translatedData.slug}`);
  } catch (error) {
    console.warn("Revalidation failed after saving translation:", error);
    //* DB update is already successful; treat this as non-fatal.
  }

  return { success: true };
};

//* Update the existing post on /edit/[slug] page
const savePostAction = async (input: SaveContentInput): Promise<PostAction> => {
  //* 1. Guard by Auth.js session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  //* 2. Validate payload via Zod
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
  }

  return { success: true };
};

//* Fetches all posts
const getPublishedPostsAction = async (locale: Locale): Promise<PostAction<PostWithRelations[]>> => {
  try {
    const posts = await getPublishedPosts(locale);
    return { success: true, data: posts };
  } catch (error) {
    console.error("Failed to get posts: ", error);
    return { success: false, error: `Failed to get posts: ${error}` };
  }
};

//* Fetches a post by its slug
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

const getDashboardStatsAction = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const statsData = await getDashboardStats(session.user.id);
    return { success: true, data: statsData };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
};

export {
  createPostAction,
  createTranslatedPostAction,
  getDashboardStatsAction,
  getPostBySlugAction,
  getPublishedPostsAction,
  savePostAction
};
