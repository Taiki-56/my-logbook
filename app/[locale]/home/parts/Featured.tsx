"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

// Hardcoded mock data matching Figma design
const featuredArticles = {
  main: {
    id: 1,
    category: "ENGINEERING",
    date: "2024-05-12",
    readTime: "10 min read",
    title: "大規模システムにおける非同期処理の再考",
    description:
      "マイクロサービスアーキテクチャにおけるイベント駆動設計の落とし穴と、スケーラビリティを確保するためのベストプラクティスに",
    tags: ["Architecture", "Microservices"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    slug: "async-processing-at-scale"
  },
  secondary: [
    {
      id: 2,
      category: "AI & ML",
      readTime: "7 min read",
      title: "ローカルLLM環境の構築ガイド",
      description: "M2 Mac上でプライバシーを保ちながら高速な推論を行うためのモデル選定と環境設定の完全マニ",
      tags: ["AI", "Mac"],
      slug: "local-llm-setup-guide"
    },
    {
      id: 3,
      category: "LIFESTYLE",
      readTime: "5 min read",
      title: "カナダ生活3年目：言語と文化の壁",
      description: "バンクーバーでのソフトウェアエンジニアとしての働き方と、日々の言語学習アプローチの変遷。",
      tags: ["Canada", "English"],
      slug: "life-in-canada-3-years"
    }
  ]
};

// Clock icon component from Figma design
const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0">
    <path
      d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6 10.8C3.34629 10.8 1.2 8.65371 1.2 6C1.2 3.34629 3.34629 1.2 6 1.2C8.65371 1.2 10.8 3.34629 10.8 6C10.8 8.65371 8.65371 10.8 6 10.8ZM6.6 3H5.4V6.6L8.4 8.34L9 7.38L6.6 5.94V3Z"
      fill="#414754"
    />
  </svg>
);

const Featured = () => {
  const t = useTranslations("Home.featured");
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/tags?tag=${tag}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section Heading */}
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      {/* Mobile Layout - Compact List */}
      <div className="flex flex-col gap-4 lg:hidden">
        {[featuredArticles.main, ...featuredArticles.secondary].map((article) => (
          <Link
            key={article.id}
            href={`/posts/${article.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow h-30">
            {/* Thumbnail */}
            <div className="w-25 h-22 bg-[#e6e6e6] rounded shrink-0 relative overflow-hidden">
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Meta Information */}
              <div className="flex gap-1 items-center mb-1">
                <span className="font-['Noto_Sans_JP'] font-normal text-[11px] text-[#707581] leading-normal">
                  {article.date || "11月 5日"} • {article.readTime?.replace(" read", "") || "8分"}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[13px] text-black leading-normal mb-1 line-clamp-2">
                {article.title}
              </h3>

              {/* Description */}
              <p className="font-['Noto_Sans_JP'] font-normal text-[11px] text-[#707581] leading-normal line-clamp-2">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Layout - Bento Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 w-full">
        {/* Main Feature Card - spans 2 columns */}
        <Link
          href={`/posts/${featuredArticles.main.slug}`}
          className="lg:col-span-2 bg-[#fbf9f8] border border-[#c1c6d7] rounded overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow">
          {/* Image Section */}
          <div className="lg:w-1/2 h-67.5 bg-[#e9e8e7] relative">
            <Image
              src={featuredArticles.main.image}
              alt={featuredArticles.main.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-center">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
                {featuredArticles.main.category}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                {featuredArticles.main.date}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                  {featuredArticles.main.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl text-[#1b1c1c] leading-[31.2px] mb-3">{featuredArticles.main.title}</h3>

            {/* Description */}
            <p className="text-base text-[#414754] leading-6 mb-4 line-clamp-3">{featuredArticles.main.description}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {featuredArticles.main.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-2.5 py-1.5 font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4 cursor-pointer hover:bg-[#e9e8e7] transition-colors"
                  onClick={(e) => handleTagClick(e, tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Secondary Feature Cards */}
        {featuredArticles.secondary.map((article) => (
          <Link
            key={article.id}
            href={`/posts/${article.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded p-6.25 flex flex-col justify-between hover:shadow-md transition-shadow min-h-52">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
                {article.category}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg text-[#1b1c1c] leading-7 mb-2">{article.title}</h3>

            {/* Description */}
            <p className="text-sm text-[#414754] leading-5 mb-4 line-clamp-2">{article.description}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap pt-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-2.5 py-1.5 font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4 cursor-pointer hover:bg-[#e9e8e7] transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Featured;
