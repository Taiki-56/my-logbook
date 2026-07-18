"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { DisplayPost } from "@/types/post";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  posts: DisplayPost[];
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

const Featured = ({ posts }: Props) => {
  const t = useTranslations("Home.featured");
  const router = useRouter();

  // 🌟 記事がない場合は何も表示しない（またはプレースホルダーを表示）
  if (!posts || posts.length === 0) return null;

  // 🌟 1件目をメイン、2〜3件目をセカンダリに分割
  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);
  const allDisplayPosts = [mainPost, ...secondaryPosts];

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

      {/* Mobile Layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        {allDisplayPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow h-30">
            <div className="w-25 h-22 bg-[#e6e6e6] rounded shrink-0 relative overflow-hidden">
              {post.thumbnail && (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex gap-1 items-center mb-1">
                <span className="font-['Noto_Sans_JP'] font-normal text-[11px] text-[#707581] leading-normal">
                  {post.date} • {post.readTime.replace(" read", "")}
                </span>
              </div>
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[13px] text-black leading-normal mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="font-['Noto_Sans_JP'] font-normal text-[11px] text-[#707581] leading-normal line-clamp-2">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Layout - Bento Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-4 w-full">
        {/* Main Feature Card */}
        <Link
          href={`/posts/${mainPost.slug}`}
          className="lg:col-span-2 bg-[#fbf9f8] border border-[#c1c6d7] rounded overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow">
          <div className="lg:w-1/2 h-67.5 bg-[#e9e8e7] relative">
            {mainPost.thumbnail && (
              <Image
                src={mainPost.thumbnail}
                alt={mainPost.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="lg:w-1/2 p-6 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
                {mainPost.category}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                {mainPost.date}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                  {mainPost.readTime}
                </span>
              </div>
            </div>
            <h3 className="text-2xl text-[#1b1c1c] leading-[31.2px] mb-3">{mainPost.title}</h3>
            <p className="text-base text-[#414754] leading-6 mb-4 line-clamp-3">{mainPost.description}</p>
            <div className="flex gap-2 flex-wrap">
              {mainPost.tags.map((tag) => (
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
        {secondaryPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded p-6.25 flex flex-col justify-between hover:shadow-md transition-shadow min-h-52">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
                {post.category}
              </span>
              <span className="text-[#c1c6d7] text-sm">•</span>
              <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
                  {post.readTime}
                </span>
              </div>
            </div>
            <h3 className="text-lg text-[#1b1c1c] leading-7 mb-2">{post.title}</h3>
            <p className="text-sm text-[#414754] leading-5 mb-4 line-clamp-2">{post.description}</p>
            <div className="flex gap-2 flex-wrap pt-2">
              {post.tags.map((tag) => (
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
