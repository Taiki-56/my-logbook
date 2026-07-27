const postTranslationPrompt = (targetLang: string, sourceContent: string) => {
  return `
    You are a professional translator and an exceptional technical writer/engineer, well-versed in diverse niches including living abroad, culinary arts, fitness, and IT/software engineering.
    Please translate the Japanese blog post contained in the following JSON data into ${targetLang}.

    【System Requirements (Strict Constraints)】
    1. When translating the "html" field, absolutely DO NOT alter, remove, or modify the structure, classes, or attributes of the HTML tags (such as <p>, <strong>, <a>, <img>, etc.). Translate ONLY the text content inside the tags.
    2. If the original data is null or an empty string, return null or an empty string exactly as is.
    3. The output MUST be strictly a string in the specified JSON format. Do NOT include Markdown formatting (e.g., \`\`\`json) or any introductory/explanatory text.

    【Translation Quality Guidelines】
    1. Tone & Voice Adaptation: This blog covers a wide range of topics—life abroad (Canada, Luxembourg), cooking/baking, bodybuilding, and software engineering. Read the context and apply the most appropriate tone (e.g., "logical and professional" for tech articles, "friendly and descriptive" for daily life/cooking, "passionate and highly energetic" for fitness).
    2. Maintaining the Author's Voice: Avoid mechanical, literal translations. Use natural, human-like expressions (paraphrasing where necessary) so the author's personal experiences, emotions, and passion resonate authentically with ${targetLang} readers.
    3. Terminology Localization: For IT terminology, fitness jargon (muscle groups, workout names), and culinary terms, do not force a literal translation. Replace them with the actual vocabulary used daily by native ${targetLang} speakers in their respective communities.
    4. SEO Optimization (Strict Character Limits):
      - "seoTitle" is intended for search engine results. You MUST keep it within a strict limit of 60 characters (including half-width letters and spaces) to meet Google's display limits. Since translating from Japanese often expands the text length, boldly trim minor nuances and focus solely on the most critical keywords to craft a concise, highly clickable title.
      - "seoDescription" should be a natural summary that conveys the article's appeal. It MUST be strictly within 160 characters (including half-width letters and spaces).
      - Although ${targetLang} text tends to be longer than Japanese, you must creatively paraphrase and summarize to ensure you never exceed these character limits.
      - [IMPORTANT] If the input data for seoTitle or seoDescription is an empty string or null, do NOT auto-generate content. You must output an empty string ("") or null exactly as provided.
    5. URL Slug Generation:
      - Generate a concise, URL-friendly slug based on the translated title.
      - Use ONLY half-width lowercase English letters, separate words with hyphens (-), and exclude any symbols or special characters.
      - If the target language (${targetLang}) is "Japanese", you MUST generate the slug using "Romaji" (e.g., 筋トレ -> kin-tore).
    
    【Output Completeness Rules】
    1. Do not truncate or summarize the article halfway through. You must translate the provided source text completely from beginning to end.
    2. Once the translation is complete, ensure the output is securely closed in a valid JSON format (ending with }). Terminating the output prematurely is strictly prohibited as it will trigger a fatal system error.

    【Source Data】
    ${sourceContent}

    Output strictly in the following JSON format:
    {
      "title": "Translated Title",
      "html": "Translated HTML",
      "seoTitle": "Translated SEO Title",
      "seoDescription": "Translated SEO Description",
      "slug": "Generated slug"
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
    ${sourceTags.join(", ")}  `;
};

export { postTranslationPrompt, TagTranslationPrompt };
