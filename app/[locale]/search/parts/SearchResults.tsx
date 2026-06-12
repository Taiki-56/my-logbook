"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Mock search results data
const searchResults = [
  {
    id: 1,
    category: "AI & ML",
    date: "10月 24日",
    readTime: "8 min read",
    title: "効率的な筋肥大のためのプログレッシブ・オーバーロード",
    description: "トレーニングの停滞期を打破するための科学的アプローチと記録の重要性。",
    tags: ["Bodybuilding", "Fitness"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=256&h=160&fit=crop",
    slug: "progressive-overload-guide"
  },
  {
    id: 2,
    category: "ENGINEERING",
    date: "10月 18日",
    readTime: "12 min read",
    title: "React Server Components",
    description: "Next.js 14を用いた実践的なアプリケーション構築とパフォーマンス計測。",
    tags: ["React", "WebDev"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=256&h=160&fit=crop",
    slug: "react-server-components-guide"
  }
];

// Empty state component
const EmptyState = () => {
  const t = useTranslations("Search.noResults");
  const suggestedTopics = ["Machine Learning", "Web3", "Architecture", "Design Systems"];

  return (
    <div className="bg-[#fbf9f8] border border-[#c1c6d7] rounded py-8 px-4 flex flex-col items-center gap-6">
      {/* Icon */}
      <div className="w-24 h-24 bg-[#f5f3f3] border border-[#c1c6d7] rounded-xl flex items-center justify-center">
        <SearchX className="w-10 h-10 text-[#727786]" />
      </div>

      {/* Heading */}
      <div className="max-w-136 text-center">
        <h2 className="font-['Geist'] font-semibold text-[24px] lg:text-[32px] text-[#1b1c1c] tracking-[-0.48px] lg:tracking-[-0.64px] leading-[31.2px] lg:leading-[38.4px]">
          {t("heading")}
        </h2>
      </div>

      {/* Description */}
      <div className="max-w-100 text-center">
        <p className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6">{t("description")}</p>
      </div>

      {/* Suggested Topics */}
      <div className="border-t border-[#c1c6d7] pt-6 flex flex-col items-center gap-4 w-full">
        <p className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#727786] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("suggestedTopics")}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestedTopics.map((topic, index) => (
            <Link
              key={index}
              href={`/tags?tag=${topic}`}
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
        className="bg-[#1b1c1c] text-white px-8 py-3 font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] hover:bg-[#2a2b2b] transition-colors mt-4">
        {t("viewAll")}
      </Link>
    </div>
  );
};

// Search result item component
const SearchResultItem = ({ result }: { result: (typeof searchResults)[0] }) => {
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tags?tag=${tag}`);
  };

  return (
    <Link
      href={`/posts/${result.slug}`}
      className="flex gap-6 py-6 hover:bg-[#fbf9f8] transition-colors rounded-sm -mx-2 px-2 border-b border-[rgba(193,198,215,0.5)] last:border-0">
      {/* Thumbnail */}
      <div className="w-32 h-20 bg-[#e9e8e7] rounded-sm shrink-0 relative overflow-hidden">
        <Image
          src={result.image}
          alt={result.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1">
        {/* Meta Information */}
        <div className="flex gap-2 items-center">
          <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
            {result.date}
          </span>
          <span className="text-[#c1c6d7]">•</span>
          <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
            {result.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Geist'] font-semibold text-[18px] lg:text-[20px] text-[#1b1c1c] leading-[23.4px] lg:leading-6.5 line-clamp-2">
          {result.title}
        </h3>

        {/* Description */}
        <p className="font-['Inter'] font-normal text-[14px] text-[#414754] leading-[22.4px] line-clamp-2">
          {result.description}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mt-1">
          {result.tags.map((tag, index) => (
            <button
              key={index}
              onClick={(e) => handleTagClick(e, tag)}
              className="bg-[#e4e2e2] border border-[#c1c6d7] rounded-xs px-2 py-0.5 hover:bg-[#d4d2d2] transition-colors">
              <span className="font-['JetBrains_Mono'] font-normal text-[11px] text-[#1b1c1c] leading-[17.6px]">
                {tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
};

const SearchResults = () => {
  // For now, show results. You can add logic to show EmptyState based on search query
  const hasResults = searchResults.length > 0;

  if (!hasResults) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Results Count */}
      <div className="mb-6">
        <p className="font-['Inter'] font-normal text-[16px] text-[#414754]   ">
          Found {searchResults.length} article{searchResults.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Results List */}
      <div className="flex flex-col w-full">
        {searchResults.map((result) => (
          <SearchResultItem
            key={result.id}
            result={result}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
