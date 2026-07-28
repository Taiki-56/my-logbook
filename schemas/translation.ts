import { Schema, Type } from "@google/genai"; // ※SDKのインポートに合わせてください

const postTranslationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "翻訳された記事のタイトル" },
    html: { type: Type.STRING, description: "翻訳されたHTMLタグを含んだ記事の本文" },
    seoTitle: {
      type: Type.STRING,
      nullable: true,
      description: "翻訳されたSEOメタタイトル"
    },
    seoDescription: {
      type: Type.STRING,
      nullable: true,
      description: "翻訳されたSEOメタディスクリプション"
    },
    slug: { type: Type.STRING, description: "翻訳された記事のslug" }
  },
  required: ["title", "html", "seoTitle", "seoDescription", "slug"]
};

const tagTranslationSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      originalName: { type: Type.STRING },
      translatedName: { type: Type.STRING },
      translatedSlug: { type: Type.STRING }
    },
    required: ["originalName", "translatedName", "translatedSlug"]
  }
};

export { postTranslationSchema, tagTranslationSchema };
