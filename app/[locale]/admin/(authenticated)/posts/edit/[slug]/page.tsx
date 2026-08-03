import PostForm from "@/components/admin/PostForm";
import { getPostContentBySlug } from "@/services/post";
import { isValidLocale } from "@/types/config";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ slug: string }> | { slug: string } }) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const fetchData = await getPostContentBySlug(slug);
  if (!fetchData) notFound();

  //* Todo ここの文言を修正する
  if (!isValidLocale(fetchData.locale)) {
    return <div>サポートされていない言語です。</div>;
  }

  const mappedTags = fetchData.post.postTags
    .map((pt) => {
      const tagContent = pt.tag.contents.find((c) => c.locale === fetchData.locale);

      return tagContent?.name || decodeURIComponent(pt.tag.slug);
    })
    .filter((tag): tag is string => Boolean(tag));

  const initialData = {
    postId: fetchData.postId,
    locale: fetchData.locale,
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
