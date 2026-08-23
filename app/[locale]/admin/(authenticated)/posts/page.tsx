/**
 * Admin posts list page. Fetches all posts with their per-locale statuses and
 * renders the header and post table.
 */

import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminPosts } from "@/services/post";
import PageHeader from "./parts/PageHeader";
import PostTable from "./parts/PostTable";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("adminPostsTitle"),
    description: t("adminPostsDescription")
  };
};

const Page = async () => {
  const posts = await getAdminPosts();

  return (
    <AdminSidebar>
      <div className="h-full">
        <PageHeader />
        <PostTable posts={posts} />
      </div>
    </AdminSidebar>
  );
};

export default Page;
