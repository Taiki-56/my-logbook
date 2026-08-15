import CalendarIcon from "@/components/ui/CalendarIcon";
import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import Image from "next/image";

interface PostCardProps {
  post: DisplayPost;
  layout?: "grid" | "horizontal";
}

/** Post preview card used on the posts list page, in either a grid or horizontal layout. */
const PostCard = ({ post, layout = "grid" }: PostCardProps) => {
  if (layout === "grid") {
    return (
      <div className="bg-[#fbf9f8] border border-transparent rounded-sm hover:shadow-md transition-shadow p-2.25 flex flex-col gap-4 relative group">
        <Link
          href={`/posts/${post.slug}`}
          className="absolute inset-0 z-0"
          aria-label={post.title}
        />

        {/* Image */}
        <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xs w-full p-px pointer-events-none z-10">
          <div className="relative w-full aspect-video overflow-hidden rounded-[inherit]">
            <Image
              priority
              src={post.thumbnail || DEFAULT_POST_IMAGE}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col z-10 pointer-events-none">
          <div className="flex gap-2 items-center">
            <span className="font-['JetBrains_Mono'] font-medium text-[13px] lg:text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
              {post.date}
            </span>
          </div>

          <h3 className="mt-2 font-['Noto_Sans_JP'] font-medium text-[20px] lg:text-2xl leading-tight lg:leading-[31.2px] text-[#1b1c1c] line-clamp-2 group-hover:text-[#0058c3] transition-colors">
            {post.title}
          </h3>

          <p className="mt-2 font-['Noto_Sans_JP'] font-medium text-[14px] lg:text-base leading-relaxed lg:leading-6 text-[#414754] line-clamp-2">
            {post.description || "説明はありません"}
          </p>

          <div className="mt-2 flex gap-2 items-start pt-2 flex-wrap pointer-events-auto z-20">
            {(post.tags || []).map((tag, index) => (
              <Link
                key={index}
                href={`/posts?tag=${tag}`}
                className="bg-[#f5f3f3] border border-[#c1c6d7] text-[#414754] px-2.25 pt-0.5 pb-[3.8px] font-['JetBrains_Mono'] font-normal text-[12px] lg:text-[13px] leading-[20.8px] rounded-xs cursor-pointer transition-all duration-200 ease-out hover:bg-white hover:shadow-sm hover:border-[#a0a6b5] hover:-translate-y-px hover:text-[#0058c3]">
                {decodeURIComponent(tag)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f8] border border-[#e4e2e2] flex items-center overflow-hidden hover:shadow-md transition-shadow relative group">
      <Link
        href={`/posts/${post.slug}`}
        className="absolute inset-0 z-0"
        aria-label={post.title}
      />

      <div className="bg-[#f5f3f3] w-40 sm:w-50 shrink-0 relative aspect-video pointer-events-none z-10">
        <Image
          priority
          src={post.thumbnail || DEFAULT_POST_IMAGE}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 160px, 200px"
          className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-col gap-1.5 justify-center p-3 sm:p-4 flex-1 z-10 pointer-events-none">
        {post.category && (
          <div className="font-['JetBrains_Mono'] font-normal text-xs text-[#0058c3] uppercase tracking-wider">
            {post.category}
          </div>
        )}
        <h3 className="font-['Noto_Sans_JP'] font-medium text-[15px] sm:text-base leading-snug text-[#1b1c1c] line-clamp-2 group-hover:text-[#0058c3] transition-colors">
          {post.title}
        </h3>
        <div className="flex gap-3 items-center pt-1">
          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-[11px] sm:text-xs text-[#5e5e5e]">
              {post.date}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <ClockIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-[11px] sm:text-xs text-[#5e5e5e]">
              {post.readTime} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
