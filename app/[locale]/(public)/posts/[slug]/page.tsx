import { getPostBySlugAction } from "@/actions/post";
import { notFound } from "next/navigation";
import ArticleContent from "./parts/ArticleContent";
import AuthorWidget from "./parts/AuthorWidget";
import TagsWidget from "./parts/TagsWidget";
import TocWidget from "./parts/TocWidget";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const Page = async (props: Props) => {
  const params = await props.params;
  const { locale, slug } = params;

  const res = await getPostBySlugAction(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;

  const displayContent =
    post.contents.find((c: any) => c.locale === locale) ||
    post.contents.find((c: any) => c.locale === "ja") ||
    post.contents[0];

  if (!displayContent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbf9f8] py-8 lg:py-16">
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <ArticleContent
            post={post}
            displayContent={displayContent}
          />
          <aside className="lg:col-span-4 space-y-6">
            <AuthorWidget />
            <TagsWidget postTags={post.postTags} />
            <TocWidget />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
