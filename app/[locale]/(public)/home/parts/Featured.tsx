"use client";

import ClockIcon from "@/components/ui/ClockIcon";
import { Link, useRouter } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  posts: DisplayPost[];
};

const Featured = ({ posts }: Props) => {
  const t = useTranslations("Home.featured");
  const router = useRouter();

  if (!posts || posts.length === 0) return null;

  const totalFeatured = posts.length;
  const displayPosts = posts.slice(0, 3);

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/posts?tag=${tag}`);
  };

  const DesktopHeroCard = ({ post, className = "" }: { post: DisplayPost; className?: string }) => (
    <Link
      href={`/posts/${post.slug}`}
      className={`bg-[#fbf9f8] border border-[#c1c6d7] rounded overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow ${className}`}>
      <div className="lg:w-1/2 h-67.5 bg-[#e9e8e7] relative">
        <Image
          src={post.thumbnail || DEFAULT_POST_IMAGE}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="lg:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-2xl text-[#1b1c1c] leading-[31.2px] mb-3">{post.title}</h3>
        <p className="text-base text-[#414754] leading-6 mb-4 line-clamp-3">{post.description}</p>
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
            {post.category}
          </span>
          <span className="text-[#c1c6d7] text-sm">•</span>
          <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
            {post.date}
          </span>
          <span className="text-[#c1c6d7] text-sm">•</span>
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
              {post.readTime}
            </span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
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
  );

  const DesktopSecondaryCard = ({ post }: { post: DisplayPost }) => (
    <Link
      href={`/posts/${post.slug}`}
      className="bg-[#fbf9f8] border border-[#c1c6d7] rounded p-6.25 flex flex-col hover:shadow-md transition-shadow min-h-52">
      <h3 className="text-lg text-[#1b1c1c] leading-7 mb-2">{post.title}</h3>
      <p className="text-sm text-[#414754] leading-5 mb-4 line-clamp-2 flex-1">{post.description}</p>
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#0058c3] uppercase leading-[19.6px]">
          {post.category}
        </span>
        <span className="text-[#c1c6d7] text-sm">•</span>
        <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
          {post.date}
        </span>
        <span className="text-[#c1c6d7] text-sm">•</span>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] leading-[20.8px]">
            {post.readTime}
          </span>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
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
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative flex justify-between items-end pb-1">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
        {totalFeatured > 3 && (
          <Link
            href="/posts?isFeatured=true"
            className="text-xs text-[#0058c3] hover:underline font-['Noto_Sans_JP']">
            {t("viewAll")}
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:hidden">
        {displayPosts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow h-auto min-h-36">
            <div className="w-25 h-22 bg-[#e6e6e6] rounded shrink-0 relative overflow-hidden">
              <Image
                src={post.thumbnail || DEFAULT_POST_IMAGE}
                alt={post.title}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[13px] text-black leading-normal mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="font-['Noto_Sans_JP'] font-normal text-[11px] text-[#707581] leading-normal mb-2 line-clamp-2">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 items-center mb-2">
                <span className="font-['JetBrains_Mono'] font-medium text-[10px] text-[#0058c3] uppercase">
                  {post.category}
                </span>
                <span className="text-[#c1c6d7] text-[10px]">•</span>
                <span className="font-['Noto_Sans_JP'] font-normal text-[10px] text-[#707581] leading-normal">
                  {post.date}
                </span>
                <span className="text-[#c1c6d7] text-[10px]">•</span>
                <span className="font-['Noto_Sans_JP'] font-normal text-[10px] text-[#707581] leading-normal flex items-center gap-1">
                  <ClockIcon />
                  {post.readTime.toString().replace(" read", "")} min
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap mt-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    onClick={(e) => handleTagClick(e, tag)}
                    className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-1.5 py-0.5 font-['JetBrains_Mono'] font-normal text-[10px] text-[#414754] cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex lg:flex-col gap-4 w-full">
        {totalFeatured === 1 && <DesktopHeroCard post={displayPosts[0]} />}
        {totalFeatured === 2 && (
          <>
            <DesktopHeroCard post={displayPosts[0]} />
            <DesktopHeroCard post={displayPosts[1]} />
          </>
        )}
        {totalFeatured >= 3 && (
          <div className="grid grid-cols-2 gap-4 w-full">
            <DesktopHeroCard
              post={displayPosts[0]}
              className="col-span-2"
            />
            <DesktopSecondaryCard post={displayPosts[1]} />
            <DesktopSecondaryCard post={displayPosts[2]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
