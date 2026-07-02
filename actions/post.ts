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

export const savePostContentAction = async (input: SaveContentInput): Promise<ActionResult> => {
  //* 1. Guard by Auth.js session
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  //* 2. Validate payload via Zod
  const validated = saveContentSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, error: "Invalid content payload" };
  }

  try {
    //* 3. Call service layer
    await updatePostContent(validated.data);

    //* 4. Cache Purge
    revalidatePath(`/admin/posts/edit/${validated.data.slug}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to save post content:", error);
    return { success: false, error: "Database update failed" };
  }
};
export default createPostAction;
