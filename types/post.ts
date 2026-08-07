import { Prisma } from "@/libs/generated/client";
import { Category, PostStatus } from "@/libs/generated/enums";
import { Locale } from "./config";

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
  locale: Locale;
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
        tag: {
          include: {
            contents: true;
          };
        };
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
    es: { status: string; slug: string } | null;
  };
  updatedAt: string;
};

type CreatePostPayload = {
  title: string;
  status: PostStatus;
  category: Category;
  isFeatured?: boolean;
  slug: string;
  html?: string;
  projectData?: Prisma.InputJsonValue;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  thumbnail?: string | null;
};

type CreateTranslatedPostInput = {
  postId: string;
  targetLang: string;
  translatedData: {
    title: string;
    slug: string;
    html: string;
    seoTitle: string;
    seoDescription: string;
    tags?: string[];
    thumbnail?: string | null;
    isFeatured?: boolean;
  };
};

type SavePostPayload = {
  postId: string;
  locale: Locale;
  title: string;
  status: PostStatus;
  category: Category;
  isFeatured?: boolean;
  slug: string;
  html?: string;
  projectData?: Prisma.InputJsonValue;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  thumbnail?: string | null;
};

type TagContent = {
  locale: Locale;
  name: string;
};

type Tag = {
  slug: string;
  contents?: TagContent[];
};

type PostTag = {
  tagId: string;
  tag: Tag;
};

type PopularTagView = {
  name: string;
  slug: string;
  count: number;
};

type PostContent = {
  locale: Locale;
  title: string;
  seoDescription: string | null;
  slug: string;
};

type PublishedPost = {
  id: string;
  createdAt: Date | string;
  thumbnail?: string | null;
  contents: PostContent[];
  postTags: PostTag[];
};

export type {
  AdminDisplayPost,
  CreatePostPayload,
  CreateTranslatedPostInput,
  DisplayPost,
  PopularTagView,
  PostAction,
  PostContent,
  PostForm,
  PostTag,
  PostWithRelations,
  PublishedPost,
  SavePostPayload,
  Tag,
  TagContent,
  UpdatePost
};
