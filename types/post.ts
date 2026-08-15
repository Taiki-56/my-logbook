/**
 * Post-related type definitions.
 *
 * Contains comprehensive type definitions for blog posts, handling everything
 * from database relations and admin form states to UI display formatting.
 */

import { Prisma } from "@/libs/generated/client";
import { Category, PostStatus } from "@/libs/generated/enums";
import { Locale } from "./config";

// * Formatted post data optimized for rendering on the public UI
type DisplayPost = {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string | null;
  tags: string[];
  thumbnail: string;
  slug: string;
};

// * State and initialization data for the admin post editor form
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

// * Payload structure for updating an existing post's content and metadata
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

// * Full Prisma post payload including nested relations (contents, tags, tag contents)
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

// * Standardized response format for post-related server actions
type PostAction<T = void> = {
  success: boolean;
  error?: string;
  data?: T;
};

// * Formatted post data for the admin dashboard list view, showing translation statuses
type AdminDisplayPost = {
  id: string;
  title: string;
  statuses: {
    // * null if the translation doesn't exist for that locale
    ja: { status: string; slug: string } | null;
    en: { status: string; slug: string } | null;
    fr: { status: string; slug: string } | null;
    es: { status: string; slug: string } | null;
  };
  updatedAt: string;
};

// * Payload structure for creating a completely new post
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

// * Payload structure for submitting a new AI-translated post
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

// * Payload structure for saving (creating or updating) post content
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

// * Represents the localized text content of a tag
type TagContent = {
  locale: Locale;
  name: string;
};

// * Represents a taxonomy tag, optionally including its localized contents
type Tag = {
  slug: string;
  contents?: TagContent[];
};

// * Represents the relationship between a post and a tag
type PostTag = {
  tagId: string;
  tag: Tag;
};

// * Data structure for displaying popular tags with their usage count
type PopularTagView = {
  name: string;
  slug: string;
  count: number;
};

// * Core localized content details for a post
type PostContent = {
  locale: Locale;
  title: string;
  seoDescription: string | null;
  slug: string;
};

// * Represents a published post with its contents and tags
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
