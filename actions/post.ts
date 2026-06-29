"use server";

import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import createPost from "@/services/postService";
import { getLocale } from "next-intl/server";

const createPostAction = async (formData: PostFormValues) => {
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
    newPost = await createPost(authorId, formData);
  } catch (error) {
    console.error("Database error: ", error);
    return { error: "データベースへの保存に失敗しました。" };
  }

  const savedSlug = newPost.translations[0].slug;

  redirect({ href: `/admin/posts/edit/${savedSlug}`, locale: locale });
};

export default createPostAction;
