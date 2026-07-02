import { PostStatus } from "@/lib/generated/enums";
import { Prisma } from "@/lib/generated/client";

type UpdatePostContent = {
  postId: string;
  locale: string;
  title: string;
  slug: string;
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  projectData?: Prisma.InputJsonValue | null;
  html?: string | null;
};

export default UpdatePostContent;
