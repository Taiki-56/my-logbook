import PostForm from "@/components/admin/PostForm";
import { getPostContentBySlug } from "@/services/post";
import { Locale } from "@/types/config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("adminPostsEditTitle"),
    description: t("adminPostsEditDescription")
  };
};

/**
 * Admin "edit post" page. Loads a post's content by slug and renders the post form
 * pre-filled with its current data.
 */
const Page = async ({ params }: { params: Promise<{ slug: string }> | { slug: string } }) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const fetchData = await getPostContentBySlug(slug);
  if (!fetchData) notFound();

  const mappedTags = fetchData.post.postTags
    .map((pt) => {
      const tagContent = pt.tag.contents.find((c) => c.locale === fetchData.locale);

      return tagContent?.name || decodeURIComponent(pt.tag.slug);
    })
    .filter((tag): tag is string => Boolean(tag));

  const initialData = {
    postId: fetchData.postId,
    locale: fetchData.locale as Locale,
    title: fetchData.title,
    slug: fetchData.slug,
    status: fetchData.status,
    category: fetchData.post.category,
    isFeatured: fetchData.isFeatured,
    seoTitle: fetchData.seoTitle,
    seoDescription: fetchData.seoDescription,
    projectData: fetchData.projectData,
    html: fetchData.html,
    thumbnail: fetchData.post?.thumbnail ?? null,
    tags: mappedTags
  };

  return (
    <PostForm
      mode="edit"
      initialData={initialData}
    />
  );
};

export default Page;
