import PostForm from "@/components/admin/PostForm";
import { isValidLocale, Locale } from "@/types/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    postId?: string;
    targetLang?: string | string[];
  }>;
};


export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("adminPostsNewTitle"),
    description: t("adminPostsNewDescription")
  };
};

/**
 * "New post" admin page. Renders the post form in create mode; if `postId` and
 * `targetLang` query params are present, pre-fills it as a translation of that source post.
 */
const Page = async ({ searchParams }: Props) => {
  const { postId, targetLang } = await searchParams;

  let sourceData: { postId: string; targetLang: Locale } | undefined = undefined;

  if (postId && typeof targetLang === "string" && isValidLocale(targetLang)) {
    sourceData = {
      postId,
      targetLang
    };
  }
  return (
    <PostForm
      mode="create"
      sourceData={sourceData}
    />
  );
};

export default Page;
