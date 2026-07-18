import { getFeaturedPosts, getLatestPosts } from "@/services/post";
import { getLocale } from "next-intl/server";
import Featured from "./parts/Featured";
import Head from "./parts/Head";
import Latest from "./parts/Latest";
import Newsletter from "./parts/Newsletter";
import Tags from "./parts/Tags";

const Page = async () => {
  const locale = await getLocale();
  const featuredPost = await getFeaturedPosts(locale);
  const latestPost = await getLatestPosts(locale);
  return (
    <div className="max-w-300 mx-auto px-4 lg:px-6 pb-16">
      <Head />
      {/* Mobile Layout */}
      <div className="flex flex-col gap-12 py-12 lg:hidden">
        <Featured posts={featuredPost} />
        <Latest posts={latestPost} />
        <Tags />
        <Newsletter />
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-12 py-12">
        <div className="lg:col-span-8 flex flex-col gap-12">
          <Featured posts={featuredPost} />
          <Latest posts={latestPost} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-12">
          <Tags />
          {/* Todo Will implement this with Resend and will send a email when a new post is published */}
          {/* <Newsletter /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
