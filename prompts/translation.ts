const postTranslationPrompt = (targetLang: string, sourceContent: string) => {
  return `
    You are a professional translator and an exceptional technical writer/engineer, well-versed in diverse niches including living abroad, culinary arts, fitness, and IT/software engineering.
    Please translate the Japanese blog post contained in the following JSON data into ${targetLang}.

    【System Requirements (Strict Constraints - CRITICAL)】
    1. The output MUST be valid, parseable JSON. Do NOT include Markdown formatting (e.g., \`\`\`json) or any introductory/explanatory text. Output ONLY the raw JSON object.
    2. When translating the "html" field:
       - Absolutely DO NOT alter, remove, or modify the structure, classes, or attributes of the HTML tags.
       - You MUST properly escape all double quotes (") inside the HTML string as \\\".
       - You MUST replace actual line breaks with \\n to ensure valid JSON stringification.
    3. If the original data is null or an empty string, return null or an empty string exactly as is.
    4. Translate the original tags into ${targetLang} and include them in the "tags" array as objects with a "name" property.

    【Translation Quality Guidelines】
    1. Tone & Voice Adaptation: Apply the most appropriate tone (e.g., "logical and professional" for tech, "friendly" for daily life, "energetic" for fitness).
    2. Maintaining the Author's Voice: Use natural, human-like expressions (paraphrasing where necessary) so the author's passion resonates authentically with ${targetLang} speakers.
    3. Terminology Localization: Use the actual vocabulary used daily by native ${targetLang} speakers in their respective communities (IT, fitness, culinary).
    4. SEO Optimization (Strict Character Limits):
      - "seoTitle": STRICTLY within 60 characters. Boldly trim minor nuances and focus solely on critical keywords.
      - "seoDescription": STRICTLY within 160 characters. Paraphrase creatively to stay within the limit.
      - If input is empty/null, output empty/null. Do NOT auto-generate.
    5. URL Slug Generation:
      - Generate a concise, URL-friendly slug based on the translated title.
      - Use ONLY half-width lowercase English letters, separate words with hyphens (-), no symbols.
      - If ${targetLang} is "Japanese", you MUST generate the slug using "Romaji" (e.g., kin-tore).

    【Source Data】
    ${sourceContent}

    Output strictly in the following JSON format:
    {
      "title": "Translated Title",
      "html": "Translated HTML with proper escaped quotes and newlines",
      "seoTitle": "Translated SEO Title",
      "seoDescription": "Translated SEO Description",
      "slug": "generated-slug",
      "tags": [
        { "name": "Translated Tag 1" },
        { "name": "Translated Tag 2" }
      ]
    }
  `;
};

const TagTranslationPrompt = (targetLang: string, sourceTags: string[]) => {
  return `
    Translate the following tag names into ${targetLang} and generate a URL-friendly slug for each.
    
    【Rules】
    1. translatedName: Provide a natural-sounding tag name in ${targetLang}.
    2. translatedSlug: Generate a URL-friendly slug based on the translated tag name.
       - Use ONLY half-width lowercase letters, separate words with hyphens (-). No symbols allowed.
       - If the target language is "Japanese (ja)", the slug MUST be generated in "Romaji".
    
    【Target Tags】
    ${sourceTags.join(", ")}
  `;
};

export { postTranslationPrompt, TagTranslationPrompt };
