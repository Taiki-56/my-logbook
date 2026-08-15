/**
 * Generative AI response schemas.
 *
 * Defines the strict JSON structures required when interacting with Google GenAI
 * (Gemini) for blog post and tag translations. These schemas ensure the LLM
 * outputs structured, parseable data that directly matches application types.
 */

import { Schema, Type } from "@google/genai";

// * Schema defining the expected output format for a translated blog post
const postTranslationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Translated title of the blog post" },
    html: {
      type: Type.STRING,
      description:
        'Translated body of the post containing HTML tags. * Must properly escape double quotes (") and line breaks according to JSON specifications.'
    },
    seoTitle: {
      type: Type.STRING,
      nullable: true,
      description: "Translated SEO meta title"
    },
    seoDescription: {
      type: Type.STRING,
      nullable: true,
      description: "Translated SEO meta description"
    },
    slug: { type: Type.STRING, description: "Translated slug of the blog post" },
    tags: {
      type: Type.ARRAY,
      description: "List of translated tags",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Translated tag name" }
        },
        required: ["name"]
      }
    }
  },
  required: ["title", "html", "seoTitle", "seoDescription", "slug", "tags"]
};

// * Schema defining the expected output format for translated tags
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
