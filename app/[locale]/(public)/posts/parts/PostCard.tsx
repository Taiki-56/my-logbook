"use client";

import CalendarIcon from "@/components/ui/CalendarIcon";
import ClockIcon from "@/components/ui/ClockIcon";
import { Link, useRouter } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: string;
    date: string;
    readTime: number | string;
    title: string;
    description: string | null;
    tags?: string[];
    image: string | null;
    slug: string;
    category?: string;
  };
  layout?: "grid" | "horizontal";
}

const PostCard = ({ post, layout = "grid" }: PostCardProps) => {
  const t = useTranslations("Posts");
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/posts?tag=${tag}`);
  };

  // Desktop Grid Layout
  if (layout === "grid") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className="bg-[#fbf9f8] border border-transparent rounded-sm hover:shadow-md transition-shadow p-2.25 flex flex-col gap-4">
        {/* Image */}
        <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xs w-full p-px">
          <div className="relative w-full h-72 overflow-hidden rounded-[inherit]">
            <Image
              priority
              src={post.image || DEFAULT_POST_IMAGE}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Meta Information */}
          <div className="flex gap-2 items-center">
            <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
              {post.date}
            </span>
            <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754]">·</span>
            <span className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
              {post.readTime}
              {t("readTime")}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2 font-['Noto_Sans_JP'] font-medium text-2xl leading-[31.2px] text-[#1b1c1c] line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="mt-2 font-['Noto_Sans_JP'] font-medium text-base leading-6 text-[#414754] line-clamp-2">
            {post.description || "説明はありません"}
          </p>

          {/* Tags */}
          <div className="mt-2 flex gap-2 items-start pt-2 flex-wrap">
            {(post.tags || []).map((tag, index) => (
              <button
                key={index}
                onClick={(e) => handleTagClick(e, tag)}
                className="bg-[#f5f3f3] border border-[#c1c6d7] text-[#414754] px-2.25 pt-0.5 pb-[3.8px] font-['JetBrains_Mono'] font-normal text-[13px] leading-[20.8px] rounded-xs cursor-pointer transition-all duration-200 ease-out hover:bg-white hover:shadow-sm hover:border-[#a0a6b5] hover:-translate-y-px hover:text-[#0058c3]">
                {decodeURIComponent(tag)}
              </button>
            ))}{" "}
          </div>
        </div>
      </Link>
    );
  }

  // Mobile Horizontal Layout
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="bg-[#fbf9f8] border border-[#e4e2e2] flex overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-[#f5f3f3] w-35 shrink-0 relative min-h-[120px]">
        <Image
          priority
          src={post.image || DEFAULT_POST_IMAGE}
          alt={post.title}
          fill
          sizes="140px"
          className="object-cover grayscale"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 justify-center p-3 flex-1">
        {/* Category */}
        {post.category && (
          <div className="font-['JetBrains_Mono'] font-normal text-xs text-[#0058c3] uppercase tracking-wider">
            {post.category}
          </div>
        )}

        {/* Title */}
        <h3 className="font-['Noto_Sans_JP'] font-medium text-base text-[#1b1c1c] line-clamp-2">{post.title}</h3>

        {/* Meta Information */}
        <div className="flex gap-3 items-center pt-1">
          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{post.date}</span>
          </div>
          <div className="flex gap-1 items-center">
            <ClockIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{post.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
