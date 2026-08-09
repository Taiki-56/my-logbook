import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminPosts } from "@/services/post";
import PageHeader from "./parts/PageHeader";
import PostTable from "./parts/PostTable";

const Page = async () => {
  const posts = await getAdminPosts();

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        <PageHeader />
        <PostTable posts={posts} />
      </div>
    </AdminSidebar>
  );
};

export default Page;
