"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Hardcoded mock data for tags
const tags = [
  { id: 1, name: "React", slug: "react" },
  { id: 2, name: "TypeScript", slug: "typescript" },
  { id: 3, name: "Machine Learning", slug: "machine-learning" },
  { id: 4, name: "Bodybuilding", slug: "bodybuilding" },
  { id: 5, name: "Canada", slug: "canada" },
  { id: 6, name: "English", slug: "english" },
  { id: 7, name: "Architecture", slug: "architecture" }
];

// tag data with colors and counts for mobile grid
const tagsWithMeta = [
  {
    id: 1,
    name: "ENGINEERING",
    slug: "engineering",
    count: 42,
    color: "text-[#0058c3]"
  },
  { id: 2, name: "AI & ML", slug: "ai-ml", count: 28, color: "text-[#7c3aed]" },
  {
    id: 3,
    name: "LIFESTYLE",
    slug: "lifestyle",
    count: 35,
    color: "text-[#059669]"
  },
  {
    id: 4,
    name: "WEB DEV",
    slug: "web-dev",
    count: 38,
    color: "text-[#dc2626]"
  },
  { id: 5, name: "CLOUD", slug: "cloud", count: 24, color: "text-[#ea580c]" },
  {
    id: 6,
    name: "PRODUCTIVITY",
    slug: "productivity",
    count: 19,
    color: "text-[#0891b2]"
  }
];

const Tags = () => {
  const t = useTranslations("Home.tags");
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section Heading */}
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      {/* Mobile Layout - 3 Column Grid */}
      <div className="grid grid-cols-3 gap-2 lg:hidden">
        {tagsWithMeta.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags?tag=${tag.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-2 hover:bg-[#f5f3f3] transition-colors h-16 flex flex-col justify-between"
          >
            <p
              className={`font-['JetBrains_Mono'] font-medium text-[10px] leading-normal ${tag.color}`}
            >
              {tag.name}
            </p>
            <p className="font-['JetBrains_Mono'] font-normal text-[10px] text-[#707581] leading-normal">
              {tag.count}
            </p>
          </Link>
        ))}
      </div>

      {/* Desktop Layout - Pills */}
      <div className="hidden lg:flex flex-wrap gap-3 w-full">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/tags?tag=${tag.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl px-3.25 py-1 font-['JetBrains_Mono'] font-normal text-[13px] text-[#1b1c1c] leading-[20.8px] hover:bg-[#f5f3f3] transition-colors"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
