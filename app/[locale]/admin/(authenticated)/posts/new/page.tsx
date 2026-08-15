import PostForm from "@/components/admin/PostForm";
import { isValidLocale, Locale } from "@/types/config";

type Props = {
  searchParams: Promise<{
    postId?: string;
    targetLang?: string | string[];
  }>;
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
