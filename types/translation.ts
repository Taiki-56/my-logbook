type TranslatedPost = {
  title: string;
  html: string;
  seoTitle: string | null;
  seoDescription: string | null;
  slug: string;
};

type TranslatedTag = {
  originalName: string;
  translatedName: string;
  translatedSlug: string;
};

type TranslatedPostResponse = TranslatedPost & {
  thumbnail?: string | null;
  tags: { name: string }[];
};

export type { TranslatedPost, TranslatedPostResponse, TranslatedTag };
