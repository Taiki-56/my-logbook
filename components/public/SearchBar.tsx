"use client";

import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

/** Search input for the posts list page; navigates to /posts with the `search` query param. */
const SearchBar = () => {
  const t = useTranslations("SearchBar");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    router.push(queryString ? `/posts?${queryString}` : "/posts");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="bg-[#f5f3f3] border border-[#c1c6d7] border-solid rounded flex items-center pl-12 pr-4.5 py-4">
        <input
          type="text"
          placeholder={t("placeholder") || "記事を検索..."}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-[#1b1c1c] placeholder:text-[#6b7280] text-base leading-normal"
        />
      </div>

      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center p-1"
        onClick={handleSearch}
        role="button"
        aria-label="検索">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4.5 h-4.5 text-[#414754]">
          <path
            d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
            fill="#414754"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
