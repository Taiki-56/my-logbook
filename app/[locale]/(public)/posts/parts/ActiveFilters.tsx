// "use client";

// import { useTranslations } from "next-intl";
// import { useRouter, useSearchParams } from "next/navigation";

// interface ActiveFiltersProps {
//   searchQuery?: string;
//   activeTag?: string;
// }

// const CloseIcon = () => (
//   <svg
//     width="8"
//     height="8"
//     viewBox="0 0 8 8"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M7 1L1 7M1 1L7 7"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// export default function ActiveFilters({ searchQuery, activeTag }: ActiveFiltersProps) {
//   const t = useTranslations("Posts");
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleRemoveFilter = (filterType: "search" | "tag") => {
//     const params = new URLSearchParams(searchParams);
//     if (filterType === "search") {
//       params.delete("search");
//     } else {
//       params.delete("tag");
//     }
//     const newUrl = params.toString() ? `/posts?${params.toString()}` : "/posts";
//     router.push(newUrl);
//   };

//   const handleClearAll = () => {
//     router.push("/posts");
//   };

//   if (!searchQuery && !activeTag) {
//     return null;
//   }

//   return (
//     <div className="flex w-full items-center gap-2">
//       {searchQuery && (
//         <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl px-3.25 py-1.25 flex items-center gap-2">
//           <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
//             {t("searchPrefix")} {searchQuery}
//           </span>
//           <button
//             onClick={() => handleRemoveFilter("search")}
//             className="size-4 rounded-xl flex items-center justify-center text-[#414754] hover:bg-[#e5e3e3] transition-colors"
//             aria-label="Remove search filter">
//             <CloseIcon />
//           </button>
//         </div>
//       )}

//       {activeTag && (
//         <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl px-3.25 py-1.25 flex items-center gap-2">
//           <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
//             {t("tagPrefix")} {activeTag}
//           </span>
//           <button
//             onClick={() => handleRemoveFilter("tag")}
//             className="size-4 rounded-xl flex items-center justify-center text-[#414754] hover:bg-[#e5e3e3] transition-colors"
//             aria-label="Remove tag filter">
//             <CloseIcon />
//           </button>
//         </div>
//       )}

//       {(searchQuery || activeTag) && (
//         <button
//           onClick={handleClearAll}
//           className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#0058c3] hover:underline whitespace-nowrap">
//           {t("clear")}
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

interface ActiveFiltersProps {
  searchKeywords?: string[];
  activeTags?: string[];
}

const CloseIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 1L1 7M1 1L7 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ActiveFilters({ searchKeywords = [], activeTags = [] }: ActiveFiltersProps) {
  const t = useTranslations("Posts");
  const router = useRouter();
  const searchParams = useSearchParams();

  //* キーワードの部分削除
  const handleRemoveSearchKeyword = (keywordToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newKeywords = searchKeywords.filter((k) => k !== keywordToRemove);

    if (newKeywords.length > 0) {
      params.set("search", newKeywords.join(" "));
    } else {
      params.delete("search");
    }

    const newUrl = params.toString() ? `/posts?${params.toString()}` : "/posts";
    router.push(newUrl);
  };

  //* タグの部分削除
  const handleRemoveTag = (tagToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const tags = params.getAll("tag");

    params.delete("tag"); // 一旦すべて消して
    tags.filter((t) => t !== tagToRemove).forEach((t) => params.append("tag", t)); // 残りを再追加

    const newUrl = params.toString() ? `/posts?${params.toString()}` : "/posts";
    router.push(newUrl);
  };

  const handleClearAll = () => {
    router.push("/posts");
  };

  if (searchKeywords.length === 0 && activeTags.length === 0) {
    return null;
  }

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
          <button
            onClick={() => handleRemoveSearchKeyword(keyword)}
            className="size-4 rounded-xl flex items-center justify-center text-[#414754] hover:bg-[#e5e3e3] transition-colors"
            aria-label={`Remove ${keyword}`}>
            <CloseIcon />
          </button>
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
          <button
            onClick={() => handleRemoveTag(tag)}
            className="size-4 rounded-xl flex items-center justify-center text-[#001a43] hover:bg-[#b0c4f5] transition-colors"
            aria-label={`Remove ${tag}`}>
            <CloseIcon />
          </button>
        </div>
      ))}

      <button
        onClick={handleClearAll}
        className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#0058c3] hover:underline whitespace-nowrap ml-2">
        {t("clear")}
      </button>
    </div>
  );
}
