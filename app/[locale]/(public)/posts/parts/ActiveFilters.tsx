import CloseIcon from "@/components/ui/CloseIcon";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ActiveFiltersProps {
  searchKeywords?: string[];
  activeTags?: string[];
}

const ActiveFilters = ({ searchKeywords = [], activeTags = [] }: ActiveFiltersProps) => {
  const t = useTranslations("Posts");

  if (searchKeywords.length === 0 && activeTags.length === 0) {
    return null;
  }

  //* 指定した検索キーワードを除外したURLを生成する関数
  const getRemoveKeywordUrl = (keywordToRemove: string) => {
    const params = new URLSearchParams();
    const newKeywords = searchKeywords.filter((k) => k !== keywordToRemove);

    if (newKeywords.length > 0) {
      params.set("search", newKeywords.join(" "));
    }
    activeTags.forEach((tag) => params.append("tag", tag));

    return params.toString() ? `/posts?${params.toString()}` : "/posts";
  };

  //* 指定したタグを除外したURLを生成する関数
  const getRemoveTagUrl = (tagToRemove: string) => {
    const params = new URLSearchParams();

    if (searchKeywords.length > 0) {
      params.set("search", searchKeywords.join(" "));
    }
    activeTags.filter((t) => t !== tagToRemove).forEach((tag) => params.append("tag", tag));

    return params.toString() ? `/posts?${params.toString()}` : "/posts";
  };

  return (
    <div className="flex w-full items-center gap-2 flex-wrap">
      {/* 検索キーワードのバッジ展開 */}
      {searchKeywords.map((keyword, index) => (
        <div
          key={`search-${index}`}
          className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl px-3.25 py-1.25 flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
            {t("searchPrefix")} {keyword}
          </span>
          {/* 🌟 button から Link に変更し、hrefに計算したURLを渡す */}
          <Link
            href={getRemoveKeywordUrl(keyword)}
            className="size-4 rounded-xl flex items-center justify-center text-[#414754] hover:bg-[#e5e3e3] transition-colors"
            aria-label={`Remove ${keyword}`}>
            <CloseIcon />
          </Link>
        </div>
      ))}

      {/* タグのバッジ展開 */}
      {activeTags.map((tag, index) => (
        <div
          key={`tag-${index}`}
          className="bg-[#d8e2ff] border border-[#0058c3] rounded-xl px-3.25 py-1.25 flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#001a43] whitespace-nowrap">
            {t("tagPrefix")} {tag}
          </span>
          {/* 🌟 button から Link に変更し、hrefに計算したURLを渡す */}
          <Link
            href={getRemoveTagUrl(tag)}
            className="size-4 rounded-xl flex items-center justify-center text-[#001a43] hover:bg-[#b0c4f5] transition-colors"
            aria-label={`Remove ${tag}`}>
            <CloseIcon />
          </Link>
        </div>
      ))}

      {/* 🌟 button から Link に変更し、href="/posts" を渡す */}
      <Link
        href="/posts"
        className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#0058c3] hover:underline whitespace-nowrap ml-2">
        {t("clear")}
      </Link>
    </div>
  );
};

export default ActiveFilters;
