"use client";

import { useTranslations } from "next-intl";

const SearchBar = () => {
  const t = useTranslations("SearchBar");
  const iconUrl =
    "https://www.figma.com/api/mcp/asset/71923882-07b6-474b-a082-726651459ec8";

  return (
    <div className="relative w-full">
      <div className="bg-[#f5f3f3] border border-[#c1c6d7] border-solid rounded flex items-center pl-12.25 pr-4.25 pt-4.75 pb-4.25">
        <input
          type="text"
          placeholder={t("placeholder")}
          className="flex-1 bg-transparent outline-none text-[#6b7280] text-base leading-normal"
        />
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <img alt="search" className="w-4.5 h-4.5" src={iconUrl} />
      </div>
    </div>
  );
};

export default SearchBar;
