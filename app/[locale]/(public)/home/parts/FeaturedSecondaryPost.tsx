import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import { DisplayPost } from "@/types/post";

/** Compact card used for secondary featured posts alongside the hero card. */
const FeaturedSecondaryCard = ({ post }: { post: DisplayPost }) => (
  <div className="bg-[#fbf9f8] border border-[#c1c6d7] rounded p-6.25 flex flex-col hover:shadow-md transition-shadow min-h-52 relative group">
    <Link
      href={`/posts/${post.slug}`}
      className="absolute inset-0 z-0"
      aria-label={post.title}
    />

    <h3 className="text-lg text-[#1b1c1c] leading-7 mb-2 pointer-events-none z-10 group-hover:text-[#0058c3] transition-colors">
      {post.title}
    </h3>
    <p className="text-sm text-[#414754] leading-5 mb-4 line-clamp-2 flex-1 pointer-events-none z-10">
      {post.description}
    </p>

    <div className="flex flex-wrap gap-2 items-center mb-3 pointer-events-none z-10">
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

    <div className="flex gap-2 flex-wrap pointer-events-auto z-20">
      {post.tags.map((tag) => (
        <Link
          key={tag}
          href={`/posts?tag=${tag}`}
          className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-sm px-2.5 py-1.5 font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4 hover:bg-[#e9e8e7] hover:text-[#0058c3] transition-colors">
          {tag}
        </Link>
      ))}
    </div>
  </div>
);

export default FeaturedSecondaryCard;
