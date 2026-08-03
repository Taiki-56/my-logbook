import { Schema, Type } from "@google/genai";

const postTranslationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "翻訳された記事のタイトル" },
    html: {
      type: Type.STRING,
      description:
        '翻訳されたHTMLタグを含んだ記事の本文。※必ずダブルクォーテーション(")や改行コードをJSON仕様に沿ってエスケープすること。'
    },
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
    slug: { type: Type.STRING, description: "翻訳された記事のslug" },
    tags: {
      type: Type.ARRAY,
      description: "翻訳されたタグのリスト",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "翻訳されたタグ名" }
        },
        required: ["name"]
      }
    }
  },
  required: ["title", "html", "seoTitle", "seoDescription", "slug", "tags"]
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
