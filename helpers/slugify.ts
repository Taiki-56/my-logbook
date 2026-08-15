/**
 * Normalizes arbitrary text into a URL-safe slug.
 *
 * Lowercases, collapses whitespace to hyphens, strips non-letter/number
 * characters (Unicode-aware), and trims edge hyphens.
 * Fully supports multilingual slugs (Japanese, French, Spanish, etc.).
 */

const slugify = (text: string) => {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-]/gu, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
export default slugify;
