import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FeaturedHeroCard from "./FeaturedHeroPost";
import FeaturedSecondaryCard from "./FeaturedSecondaryPost";

type Props = {
  posts: DisplayPost[];
};

/**
 * Renders the home page's "Featured" section: a mobile list plus a desktop
 * hero/secondary card layout that adapts to the number of featured posts.
 */
const Featured = ({ posts }: Props) => {
  const t = useTranslations("Home.featured");

  if (!posts || posts.length === 0) return null;

  const totalFeatured = posts.length;
  const displayPosts = posts.slice(0, 3);

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
          <div
            key={post.id}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-3 sm:p-4 flex gap-4 hover:shadow-md transition-shadow relative group items-center">
            <Link
              href={`/posts/${post.slug}`}
              className="absolute inset-0 z-0"
              aria-label={post.title}
            />

            <div className="w-40 sm:w-50 bg-[#e6e6e6] rounded shrink-0 relative aspect-video overflow-hidden pointer-events-none z-10 border border-[#eaeaea]">
              <Image
                src={post.thumbnail || DEFAULT_POST_IMAGE}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 160px, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5 z-10 pointer-events-none">
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[15px] sm:text-base text-black leading-snug mb-1 line-clamp-2 group-hover:text-[#0058c3] transition-colors">
                {post.title}
              </h3>
              <p className="font-['Noto_Sans_JP'] font-normal text-[13px] sm:text-sm text-[#707581] leading-relaxed line-clamp-2">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="font-['JetBrains_Mono'] font-medium text-[10px] sm:text-xs text-[#0058c3] uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[#c1c6d7] text-[10px]">•</span>
                <span className="font-['Noto_Sans_JP'] font-normal text-[10px] sm:text-xs text-[#707581] leading-normal">
                  {post.date}
                </span>
                <span className="text-[#c1c6d7] text-[10px]">•</span>
                <span className="font-['Noto_Sans_JP'] font-normal text-[10px] sm:text-xs text-[#707581] leading-normal flex items-center gap-1">
                  <ClockIcon />
                  {post.readTime.toString().replace(" read", "")} min
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap mt-auto pt-2 pointer-events-auto z-20">
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${tag}`}
                    className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-1.5 py-0.5 font-['JetBrains_Mono'] font-normal text-[10px] sm:text-xs text-[#414754] hover:bg-[#e9e8e7] hover:text-[#0058c3] transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:flex lg:flex-col gap-4 w-full">
        {totalFeatured === 1 && <FeaturedHeroCard post={displayPosts[0]} />}
        {totalFeatured === 2 && (
          <>
            <FeaturedHeroCard post={displayPosts[0]} />
            <FeaturedHeroCard post={displayPosts[1]} />
          </>
        )}
        {totalFeatured >= 3 && (
          <div className="grid grid-cols-2 gap-4 w-full">
            <FeaturedHeroCard
              post={displayPosts[0]}
              className="col-span-2"
            />
            <FeaturedSecondaryCard post={displayPosts[1]} />
            <FeaturedSecondaryCard post={displayPosts[2]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
