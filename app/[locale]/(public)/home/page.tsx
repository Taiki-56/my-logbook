/**
 * Home page. Fetches featured/latest posts and popular tags for the current locale
 * and composes them into separate mobile and desktop layouts.
 */

import { getFeaturedPosts, getLatestPosts, getPopularTags } from "@/services/post";
import { Locale } from "@/types/config";
import { getLocale, getTranslations } from "next-intl/server";
import Featured from "./parts/Featured";
import Head from "./parts/Head";
import Latest from "./parts/Latest";
import Tags from "./parts/Tags";
import { Metadata } from "next";

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription")
  };
};

const Page = async () => {
  const locale = (await getLocale()) as Locale;

  const featuredPost = await getFeaturedPosts(locale, 4);
  const latestPost = await getLatestPosts(locale);
  const tags = await getPopularTags(locale, 10);
  return (
    <div className="max-w-384 w-full mx-auto px-4 lg:px-8 pb-16">
      <Head />
      {/* Mobile Layout */}
      <div className="flex flex-col gap-12 py-12 lg:hidden">
        <Featured posts={featuredPost} />
        <Latest posts={latestPost} />
        <Tags tags={tags} />
        {/* <Newsletter /> */}
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-12 py-12">
        <div className="lg:col-span-8 flex flex-col gap-12">
          <Featured posts={featuredPost} />
          <Latest posts={latestPost} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-12">
          <Tags tags={tags} />
          {/* TODO: Implement with Resend to send an email when a new post is published */}
          {/* <Newsletter /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
