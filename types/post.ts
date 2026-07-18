import { Prisma } from "@/lib/generated/client";
import { PostStatus } from "@/lib/generated/enums";

type DisplayPost = {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  slug: string;
};

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

type UpdatePost = {
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

type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    contents: true;
    postTags: {
      include: {
        tag: true;
      };
    };
  };
}>;

type PostAction<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

type AdminDisplayPost = {
  id: string;
  title: string;
  statuses: {
    //* null if doesn't exist
    ja: { status: string; slug: string } | null;
    en: { status: string; slug: string } | null;
    fr: { status: string; slug: string } | null;
  };
  updatedAt: string;
};

export type { AdminDisplayPost, DisplayPost, PostAction, PostForm, PostWithRelations, UpdatePost };
