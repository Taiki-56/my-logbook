import { getPostBySlugAction } from "@/actions/post";
import buildPostMetadata from "@/helpers/buildPostMetadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorWidget from "./parts/AuthorWidget";
import PostContent from "./parts/PostContent";
import TagsWidget from "./parts/TagsWidget";
import TocWidget from "./parts/TocWidget";

//* Create custom metadata for every post
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return buildPostMetadata(params.slug, params.locale);
}

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
    post.contents.find((c) => c.locale === locale) || post.contents.find((c) => c.locale === "ja") || post.contents[0];

  if (!displayContent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbf9f8] py-6 sm:py-8 lg:py-16">
      <div className="max-w-425 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <PostContent
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
