"use server";

import { postTranslationPrompt, TagTranslationPrompt } from "@/prompts/translation";
import { postTranslationSchema, tagTranslationSchema } from "@/schemas/translation";
import { Locale } from "@/types/config";
import { TranslatedPost, TranslatedTag } from "@/types/translation";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
const getPromptLanguage = (lang: Locale) => ({ ja: "Japanese", en: "English", fr: "French" })[lang] || lang;

const translatePost = async (targetLang: Locale, sourceData: TranslatedPost): Promise<TranslatedPost> => {
  const lang = getPromptLanguage(targetLang);

  //* Remove trailing empty tags (e.g., <p></p>, <p><br></p>) and whitespaces
  const cleanedHtml = sourceData.html.replace(/(<p><\/p>|<p><br><\/p>|<br>|\s)+$/g, "");
  const cleanSourceData = {
    ...sourceData,
    html: cleanedHtml
  };

  const prompt = postTranslationPrompt(lang, JSON.stringify(cleanSourceData));
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
    generation_config: {
      temperature: 0.4,
      //* Hard limit to prevent excessive token usage
      max_output_tokens: 4000
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: postTranslationSchema
    }
  });
  const resultText = interaction.output_text;

  if (typeof resultText !== "string") {
    throw new Error("Failed to retrieve AI response (output_text is undefined)");
  }

  try {
    return JSON.parse(resultText);
  } catch (error) {
    console.error("🚨 JSON Parse Error! AI output might be truncated.");
    console.error("Total output characters: ", resultText.length);
    console.error("End of output:", resultText.slice(-500));
    throw error;
  }
};

const translateTags = async (targetLang: Locale, missingTags: string[]): Promise<TranslatedTag[]> => {
  if (missingTags.length === 0) return [];

  const lang = getPromptLanguage(targetLang);
  const prompt = TagTranslationPrompt(lang, missingTags);

  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash",
    input: prompt,
    generation_config: {
      temperature: 0.2
    },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: tagTranslationSchema
    }
  });

  const resultText = interaction.output_text;
  if (typeof resultText !== "string") {
    throw new Error("Failed to retrieve AI response (output_text is undefined)");
  }

  try {
    return JSON.parse(resultText);
  } catch (error) {
    console.error("🚨 JSON Parse Error! AI output might be truncated.");
    console.error("Total output characters:", resultText.length);
    console.error("End of output:", resultText.slice(-500));
    throw error;
  }
};

export { translatePost, translateTags };
