import PostForm from "@/components/admin/PostForm";
import { getPostContentBySlug } from "@/services/post";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const fetchData = await getPostContentBySlug(slug);
  if (!fetchData) notFound();

  // 🌟 修正: エンコードされたslugではなく、ローカライズされたタグの「名前」をフォームの初期値として渡す
  const mappedTags = fetchData.post.postTags.map((pt) => {
    // 現在編集しようとしている言語(locale)に合致するタグ情報を探す
    const localizedContent = pt.tag.contents?.find((c) => c.locale === fetchData.locale);
    return localizedContent?.name || pt.tag.contents[0].name;
  });

  const initialData = {
    postId: fetchData.postId,
    locale: fetchData.locale,
    title: fetchData.title,
    slug: fetchData.slug,
    status: fetchData.status, // Enumの型エラーが出る場合はasで対応
    category: fetchData.post.category, // ※必要であればcategoryも追加
    isFeatured: fetchData.isFeatured,
    seoTitle: fetchData.seoTitle,
    seoDescription: fetchData.seoDescription,
    projectData: fetchData.projectData,
    html: fetchData.html,
    thumbnail: fetchData.post?.thumbnail ?? null,
    tags: mappedTags // 🌟 綺麗な日本語（または英語等）のタグ名が渡るようになります
  };

  return (
    <PostForm
      mode="edit"
      initialData={initialData}
    />
  );
};

export default Page;
