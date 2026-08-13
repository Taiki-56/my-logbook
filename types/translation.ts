/**
 * Translation type definitions.
 *
 * Defines the expected data structures for AI-generated translations
 * of blog posts and taxonomy tags.
 */

// * Represents the core structure of an AI-translated blog post
type TranslatedPost = {
  title: string;
  html: string;
  seoTitle: string | null;
  seoDescription: string | null;
  slug: string;
  tags: { name: string }[];
};

// * Represents an AI-translated taxonomy tag including its generated slug
type TranslatedTag = {
  originalName: string;
  translatedName: string;
  translatedSlug: string;
};

// * Extended translated post structure that includes an optional thumbnail URL
type TranslatedPostResponse = TranslatedPost & {
  thumbnail?: string | null;
};

export type { TranslatedPost, TranslatedPostResponse, TranslatedTag };
