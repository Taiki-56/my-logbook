/**
 * Admin posts list page. Fetches all posts with their per-locale statuses and
 * renders the header and post table.
 */

import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminPosts } from "@/services/post";
import PageHeader from "./parts/PageHeader";
import PostTable from "./parts/PostTable";

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
