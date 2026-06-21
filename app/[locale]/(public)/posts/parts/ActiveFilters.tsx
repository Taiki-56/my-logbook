"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

interface ActiveFiltersProps {
  searchQuery?: string;
  activeTag?: string;
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

export default function ActiveFilters({ searchQuery, activeTag }: ActiveFiltersProps) {
  const t = useTranslations("Posts");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRemoveFilter = (filterType: "search" | "tag") => {
    const params = new URLSearchParams(searchParams);
    if (filterType === "search") {
      params.delete("search");
    } else {
      params.delete("tag");
    }
    const newUrl = params.toString() ? `/posts?${params.toString()}` : "/posts";
    router.push(newUrl);
  };

  const handleClearAll = () => {
    router.push("/posts");
  };

  if (!searchQuery && !activeTag) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center flex-wrap">
      {searchQuery && (
        <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl px-3 py-1 flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754]">
            {t("searchPrefix")} {searchQuery}
          </span>
          <button
            onClick={() => handleRemoveFilter("search")}
            className="rounded-xl hover:bg-[#e5e3e3] transition-colors p-1"
            aria-label="Remove search filter">
            <CloseIcon />
          </button>
        </div>
      )}

      {activeTag && (
        <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl px-3 py-1 flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754]">
            {t("tagPrefix")} {activeTag}
          </span>
          <button
            onClick={() => handleRemoveFilter("tag")}
            className="rounded-xl hover:bg-[#e5e3e3] transition-colors p-1"
            aria-label="Remove tag filter">
            <CloseIcon />
          </button>
        </div>
      )}

      {(searchQuery || activeTag) && (
        <button
          onClick={handleClearAll}
          className="font-['Noto_Sans_JP'] font-medium text-sm text-[#0058c3] hover:underline">
          {t("clear")}
        </button>
      )}
    </div>
  );
}
