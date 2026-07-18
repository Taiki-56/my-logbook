"use client";

import { Link } from "@/i18n/navigation";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

const EmptyState = () => {
  const t = useTranslations("Posts.noResults");
  const suggestedTopics = ["Machine Learning", "Web3", "Architecture", "Design Systems"];

  return (
    <div className="bg-[#fbf9f8] border border-[#c1c6d7] rounded py-12 px-4 flex flex-col items-center gap-6 w-full">
      {/* Icon */}
      <div className="w-24 h-24 bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl flex items-center justify-center">
        <SearchX className="w-10 h-10 text-[#727786]" />
      </div>

      {/* Heading */}
      <div className="max-w-136 text-center">
        <h2 className="font-['Geist'] font-semibold text-[24px] lg:text-[32px] text-[#1b1c1c] tracking-[-0.48px] lg:tracking-[-0.64px] leading-[31.2px] lg:leading-[38.4px]">
          {t("heading") || "記事が見つかりませんでした"}
        </h2>
      </div>

      {/* Description */}
      <div className="max-w-100 text-center">
        <p className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6">
          {t("description") || "別のキーワードで検索するか、以下のトピックをお試しください。"}
        </p>
      </div>

      {/* Suggested Topics */}
      <div className="border-t border-[#c1c6d7] pt-6 flex flex-col items-center gap-4 w-full">
        <p className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#727786] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("suggestedTopics") || "おすすめのトピック"}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestedTopics.map((topic, index) => (
            <Link
              key={index}
              href={`/posts?tag=${topic}`} // 🌟 修正: リンク先を /posts?tag= に変更
              className="bg-white border border-[#c1c6d7] rounded-xl px-3.25 py-1 hover:bg-[#f5f3f3] transition-colors">
              <span className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#414754] leading-[19.6px]">
                {topic}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <Link
        href="/posts"
        className="bg-[#1b1c1c] text-white px-8 py-3 font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] hover:bg-[#2a2b2b] transition-colors mt-4 rounded-md">
        {t("viewAll") || "すべての記事を見る"}
      </Link>
    </div>
  );
};

export default EmptyState;
