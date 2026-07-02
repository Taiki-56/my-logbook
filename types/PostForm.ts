import PostForm from "@/components/admin/PostForm";
import { Prisma } from "@/lib/generated/prisma/client";
import { PostStatus } from "@/lib/generated/prisma/enums";

type PostForm = {
  mode: "create" | "edit";
  initialData?: {
    postId: string;
    title: string;
    slug: string;
    status: PostStatus;
    seoTitle: string | null;
    seoDescription: string | null;
    projectData: Prisma.InputJsonValue | null;
    html: string | null;
  };
};

export default PostForm;
