"use server";

/**
 * Server actions for AI-assisted translation of posts and tags.
 */

import { getSourcePost } from "@/services/post";
import { translatePost, translateTags } from "@/services/translation";
import { Locale } from "@/types/config";
import { TranslatedPost, TranslatedPostResponse } from "@/types/translation";

/**
 * Translates a source post (and any of its untranslated tags) into the target locale for review before saving.
 * @param targetLang - The locale to translate the post into.
 * @param postId - The ID of the post to translate.
 * @returns The translated post fields, thumbnail, and tag names, ready to populate the post form.
 */
const translatePostAction = async (targetLang: Locale, postId: string): Promise<TranslatedPostResponse> => {
  try {
    const sourceLang = "ja";
    const sourcePost = await getSourcePost(postId, sourceLang);

    if (!sourcePost) {
      throw new Error("The source post could not be found");
    }

    const existingTags = sourcePost.post.postTags.map((pt) => pt.tag);

    // * PostForm expects an array shaped like `{ name: "tag name" }`, so prepare the matching type here
    const translatedTags: { name: string }[] = [];
    const missingTagNames: string[] = [];

    // * 1. Existing tags: reuse the target locale's content if it already exists, otherwise queue it for translation
    for (const tag of existingTags) {
      const targetContent = tag.contents.find((c) => c.locale === targetLang);
      if (targetContent) {
        // * Use the tag as-is when the target locale content already exists
        translatedTags.push({ name: targetContent.name });
      } else {
        // * Otherwise, grab the source locale (Japanese) name and add it to the translation queue
        const sourceTagContent = tag.contents.find((c) => c.locale === sourceLang);
        if (sourceTagContent) {
          missingTagNames.push(sourceTagContent.name);
        }
      }
    }

    // * 2. Batch-translate any queued tags with AI
    if (missingTagNames.length > 0) {
      const translatedTagsData = await translateTags(targetLang, missingTagNames);

      for (const translated of translatedTagsData) {
        // * Not persisted to the database here; only added for the form to display
        translatedTags.push({ name: translated.translatedName });
      }
    }

    // * 3. Prepare and translate the post body data
    const sourceData: TranslatedPost = {
      title: sourcePost.title,
      html: sourcePost.html || "",
      seoTitle: sourcePost.seoTitle,
      seoDescription: sourcePost.seoDescription,
      slug: sourcePost.slug,
      tags: []
    };

    const translatedData = await translatePost(targetLang, sourceData);

    const unescapedHtml = translatedData.html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");

    const thumbnail = sourcePost.post?.thumbnail;

    // * 4. Merge the translated post data with the organized tag list and return it
    return {
      ...translatedData,
      html: unescapedHtml,
      thumbnail,
      tags: translatedTags
    };
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("An error occurred during the translation process.");
  }
};

export { translatePostAction };
