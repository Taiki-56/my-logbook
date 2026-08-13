import { getPostBySlugAction } from "@/actions/post";
import { PostWithRelations } from "@/types/post";
import { Metadata } from "next";

/**
 * Builds Next.js page metadata (title/description) for a post detail page, using the
 * content for the requested locale, falling back to Japanese, then to the first available locale.
 * @param slug - The post's slug.
 * @param locale - The requested locale.
 * @returns Metadata for the post, or a fallback "not found" title if the post/content is missing.
 */
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
