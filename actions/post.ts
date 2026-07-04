"use server";

import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/client";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { SaveContentInput, saveContentSchema } from "@/schemas/saveContentSchema";
import { createPost, updatePostContent } from "@/services/postService";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

type ActionResult = {
  success: boolean;
  error?: string;
};

//* Create the post with the first language for it
const createPostAction = async (
  formData: PostFormValues & { projectData?: Prisma.InputJsonValue | null; html?: string | null }
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

const savePostContentAction = async (input: SaveContentInput): Promise<ActionResult> => {
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
    const flattened = validated.error.flatten();
    console.error("Invalid content payload details:", {
      formErrors: flattened.formErrors,
      fieldErrors: flattened.fieldErrors,
      issues: validated.error.issues
    });
    return { success: false, error: "Invalid content payload" };
  }

  // Strip undefined values from nested JSON before persisting to Prisma JSON columns.
  const safeData = JSON.parse(JSON.stringify(validated.data)) as SaveContentInput;

  try {
    //* 3. Call service layer
    await updatePostContent({
      ...safeData,
      seoTitle: safeData.seoTitle ?? "",
      seoDescription: safeData.seoDescription ?? "",
      thumbnail: safeData.thumbnail ?? ""
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
export { createPostAction, savePostContentAction };
