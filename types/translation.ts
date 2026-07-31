type TranslatedPost = {
  title: string;
  html: string;
  seoTitle: string | null;
  seoDescription: string | null;
  slug: string;
  tags: { name: string }[];
};

type TranslatedTag = {
  originalName: string;
  translatedName: string;
  translatedSlug: string;
};

type TranslatedPostResponse = TranslatedPost & {
  thumbnail?: string | null;
};

export type { TranslatedPost, TranslatedPostResponse, TranslatedTag };
