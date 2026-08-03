"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { DisplayPost } from "@/types/post";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  posts: DisplayPost[];
};

// Clock icon component
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

const Latest = ({ posts }: Props) => {
  const t = useTranslations("Home.latest");
  const router = useRouter();

  if (!posts || posts.length === 0) return null;

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/posts?tag=${tag}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      <div className="flex flex-col w-full">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className={`flex gap-6 py-6 hover:bg-[#fbf9f8] transition-colors rounded-sm -mx-2 px-2 ${
              index < posts.length - 1 ? "border-b border-[rgba(193,198,215,0.5)]" : ""
            }`}>
            <div className="w-25 h-22 lg:w-32 lg:h-20 bg-[#e9e8e7] rounded-sm shrink-0 relative overflow-hidden">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[13px] lg:text-lg text-black lg:text-[#1b1c1c] leading-normal lg:leading-7 line-clamp-2">
                {post.title}
              </h3>

              <p className="font-['Noto_Sans_JP'] font-normal text-[11px] lg:text-sm text-[#707581] lg:text-[#414754] leading-normal lg:leading-5 line-clamp-2">
                {post.description}
              </p>

              <div className="flex gap-1 lg:gap-2 items-center">
                <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
                  {post.category}
                </span>

                <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                  {post.date}
                </span>
                <span className="text-[#c1c6d7] text-sm">•</span>
                <div className="flex items-center gap-1 lg:gap-1.5">
                  <ClockIcon />
                  <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                    {post.readTime.replace(" read", "")}
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex gap-2 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4 cursor-pointer hover:text-[#0058c3] hover:underline transition-colors"
                    onClick={(e) => handleTagClick(e, tag)}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/posts"
        className="flex items-center gap-2 text-[#0058c3] text-sm leading-[19.6px] hover:underline w-fit">
        <span>すべての記事を見る</span>
        {/* SVG Icon省略 */}
      </Link>
    </div>
  );
};

export default Latest;
