import PostForm from "@/components/admin/PostForm";
import { getPostBySlug } from "@/services/postService";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const locale = await getLocale();
  const fetchData = await getPostBySlug(slug, locale);

  if (!fetchData) notFound();

  const initialData = {
    postId: fetchData.postId,
    locale: fetchData.locale,
    title: fetchData.title,
    slug: fetchData.slug,
    status: fetchData.status,
    seoTitle: fetchData.seoTitle,
    seoDescription: fetchData.seoDescription,
    projectData: fetchData.projectData,
    html: fetchData.html,

    thumbnail: fetchData.post?.thumbnail ?? null
  };

  return (
    <PostForm
      mode="edit"
      initialData={initialData}
    />
  );
};

export default Page;
