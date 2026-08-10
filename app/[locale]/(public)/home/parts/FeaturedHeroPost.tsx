import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import Image from "next/image";

const FeaturedHeroCard = ({ post, className = "" }: { post: DisplayPost; className?: string }) => (
  <div
    className={`bg-[#fbf9f8] border border-[#c1c6d7] rounded overflow-hidden flex flex-col lg:flex-row items-center hover:shadow-md transition-shadow relative group ${className}`}>
    <Link
      href={`/posts/${post.slug}`}
      className="absolute inset-0 z-0"
      aria-label={post.title}
    />

    <div className="w-full lg:w-[60%] shrink-0 relative aspect-video lg:aspect-auto h-auto lg:h-full min-h-60 bg-[#e9e8e7] pointer-events-none z-10 border-r border-[#c1c6d7]">
      <Image
        src={post.thumbnail || DEFAULT_POST_IMAGE}
        alt={post.title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="w-full lg:w-[40%] p-5 sm:p-6 flex flex-col gap-2 pointer-events-none z-10">
      <h3 className="text-xl sm:text-2xl text-[#1b1c1c] leading-snug lg:leading-[31.2px] mb-1 group-hover:text-[#0058c3] transition-colors">
        {post.title}
      </h3>
      <p className="text-sm sm:text-base text-[#414754] leading-relaxed lg:leading-6 mb-2 line-clamp-3">
        {post.description}
      </p>

      <div className="flex flex-wrap gap-2 items-center mb-3">
        <span className="font-['JetBrains_Mono'] font-medium text-[11px] sm:text-sm text-[#0058c3] uppercase leading-[19.6px] tracking-wider">
          {post.category}
        </span>
        <span className="text-[#c1c6d7] text-sm">•</span>
        <span className="font-['JetBrains_Mono'] font-normal text-[12px] sm:text-[13px] text-[#414754] leading-[20.8px]">
          {post.date}
        </span>
        <span className="text-[#c1c6d7] text-sm">•</span>
        <div className="flex items-center gap-1.5">
          <ClockIcon />
          <span className="font-['JetBrains_Mono'] font-normal text-[12px] sm:text-[13px] text-[#414754] leading-[20.8px]">
            {post.readTime}
          </span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap pointer-events-auto z-20">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/posts?tag=${tag}`}
            className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-2 py-1 font-['JetBrains_Mono'] font-normal text-[11px] sm:text-xs text-[#414754] leading-4 hover:bg-[#e9e8e7] hover:text-[#0058c3] transition-colors">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default FeaturedHeroCard;
