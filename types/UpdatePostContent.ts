import { Prisma } from "@/lib/generated/client";
import { PostStatus } from "@/lib/generated/enums";

type UpdatePostContent = {
  postId: string;
  locale: string;
  title: string;
  slug: string;
  status: PostStatus;
  seoTitle: string;
  seoDescription: string;
  thumbnail: string;
  projectData?: Prisma.InputJsonValue | null;
  html?: string | null;
};

export default UpdatePostContent;
