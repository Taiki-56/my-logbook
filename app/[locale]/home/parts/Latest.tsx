"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// Hardcoded mock data for latest articles (showing only 3)
const latestArticles = [
  {
    id: 1,
    date: "10月 24日",
    readTime: "8 min read",
    title: "効率的な筋肥大のためのプログレッシブ・オーバーロード",
    description:
      "トレーニングの停滞期を打破するための科学的アプローチと記録の重要性。",
    tags: ["Bodybuilding", "Fitness"],
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=256&h=160&fit=crop",
    slug: "progressive-overload-guide"
  },
  {
    id: 2,
    date: "10月 18日",
    readTime: "12 min read",
    title: "React Server Components",
    description:
      "Next.js 14を用いた実践的なアプリケーション構築とパフォーマンス計測。",
    tags: ["React", "WebDev"],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=256&h=160&fit=crop",
    slug: "react-server-components-guide"
  },
  {
    id: 3,
    date: "10月 05日",
    readTime: "6 min read",
    title: "英語学習における「シャドーイング」の自動化ツール開発",
    description:
      "Whisper APIを活用して自身の発音をリアルタイムで採点するCLIツールの紹介。",
    tags: ["English", "Tools"],
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=256&h=160&fit=crop",
    slug: "shadowing-automation-tool"
  }
];

// Clock icon component
const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6 10.8C3.34629 10.8 1.2 8.65371 1.2 6C1.2 3.34629 3.34629 1.2 6 1.2C8.65371 1.2 10.8 3.34629 10.8 6C10.8 8.65371 8.65371 10.8 6 10.8ZM6.6 3H5.4V6.6L8.4 8.34L9 7.38L6.6 5.94V3Z"
      fill="#414754"
    />
  </svg>
);

const Latest = () => {
  const t = useTranslations("Home.latest");
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Section Heading */}
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      {/* Articles List */}
      <div className="flex flex-col w-full">
        {latestArticles.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className={`flex gap-6 py-6 hover:bg-[#fbf9f8] transition-colors rounded-sm -mx-2 px-2 ${
              index < latestArticles.length - 1
                ? "border-b border-[rgba(193,198,215,0.5)]"
                : ""
            }`}
          >
            {/* Thumbnail - Mobile: 100x88, Desktop: 128x80 */}
            <div className="w-25 h-22 lg:w-32 lg:h-20 bg-[#e9e8e7] rounded-sm shrink-0 relative overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-1">
              {/* Meta Information */}
              <div className="flex gap-1 lg:gap-2 items-center">
                <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                  {article.date}
                </span>
                <span className="text-[#c1c6d7] text-sm">•</span>
                <div className="flex items-center gap-1 lg:gap-1.5">
                  <ClockIcon />
                  <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                    {article.readTime.replace(" read", "")}
                  </span>
                </div>
              </div>

              {/* Title - Mobile: 13px, Desktop: 18px */}
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[13px] lg:text-lg text-black lg:text-[#1b1c1c] leading-normal lg:leading-7 line-clamp-2">
                {article.title}
              </h3>

              {/* Description - Mobile: 11px, Desktop: 14px */}
              <p className="font-['Noto_Sans_JP'] font-normal text-[11px] lg:text-sm text-[#707581] lg:text-[#414754] leading-normal lg:leading-5 line-clamp-2">
                {article.description}
              </p>

              {/* Tags with hashtag format - Hide on mobile */}
              <div className="hidden lg:flex gap-2 pt-1">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link
        href="/articles"
        className="flex items-center gap-2 text-[#0058c3] text-sm leading-[19.6px] hover:underline w-fit"
      >
        <span>すべての記事を見る</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M2.5 0L1.79167 0.708333L4.58333 3.5H0V4.5H4.58333L1.79167 7.29167L2.5 8L6.5 4L2.5 0Z"
            fill="#0058c3"
            transform="translate(1.5, 1)"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Latest;
