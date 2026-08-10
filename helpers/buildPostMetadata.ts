import { getPostBySlugAction } from "@/actions/post";
import { PostWithRelations } from "@/types/post";
import { Metadata } from "next";

const buildPostMetadata = async (slug: string, locale: string): Promise<Metadata> => {
  const res = await getPostBySlugAction(slug);
  if (!res.success || !res.data) {
    return { title: "Post Not Found | MyLogbook" };
  }

  const post = res.data as PostWithRelations;
  const displayContent =
    post.contents.find((c: PostWithRelations["contents"][number]) => c.locale === locale) ||
    post.contents.find((c: PostWithRelations["contents"][number]) => c.locale === "ja") ||
    post.contents[0];

  if (!displayContent) {
    return { title: "Content Not Found | MyLogbook" };
  }

  const title = displayContent.seoTitle || displayContent.title;
  const description = displayContent.seoDescription || undefined;

  return {
    title: `${title} | MyLogbook`,
    description: description
  };
};

export default buildPostMetadata;
