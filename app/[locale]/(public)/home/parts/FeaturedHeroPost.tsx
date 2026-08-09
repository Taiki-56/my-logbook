import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import Image from "next/image";

const FeaturedHeroCard = ({ post, className = "" }: { post: DisplayPost; className?: string }) => (
  <div
    className={`bg-[#fbf9f8] border border-[#c1c6d7] rounded overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow relative group ${className}`}>
    {/* 🌟 カード全体をクリック可能にするための見えないリンクを前面に配置 */}
    <Link
      href={`/posts/${post.slug}`}
      className="absolute inset-0 z-0"
      aria-label={post.title}
    />

    <div className="lg:w-1/2 h-67.5 bg-[#e9e8e7] relative pointer-events-none">
      <Image
        src={post.thumbnail || DEFAULT_POST_IMAGE}
        alt={post.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
    <div className="lg:w-1/2 p-6 flex flex-col justify-center pointer-events-none z-10">
      <h3 className="text-2xl text-[#1b1c1c] leading-[31.2px] mb-3 group-hover:text-[#0058c3] transition-colors">
        {post.title}
      </h3>
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

      {/* 🌟 タグ部分。pointer-events-auto と z-20 をつけて、上の透明なリンクより手前に出す */}
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
  </div>
);

export default FeaturedHeroCard;
