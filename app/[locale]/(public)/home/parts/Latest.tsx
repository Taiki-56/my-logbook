import ClockIcon from "@/components/ui/ClockIcon";
import { Link } from "@/i18n/navigation";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { DisplayPost } from "@/types/post";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  posts: DisplayPost[];
};

const Latest = ({ posts }: Props) => {
  const t = useTranslations("Home.latest");

  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      <div className="flex flex-col w-full">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`flex items-center gap-6 py-6 hover:bg-[#fbf9f8] transition-colors rounded-sm -mx-2 px-2 relative group ${
              index < posts.length - 1 ? "border-b border-[rgba(193,198,215,0.5)]" : ""
            }`}>
            <Link
              href={`/posts/${post.slug}`}
              className="absolute inset-0 z-0"
              aria-label={post.title}
            />

            <div className="w-40 sm:w-50 lg:w-56 bg-[#e9e8e7] rounded-sm shrink-0 relative aspect-video overflow-hidden pointer-events-none z-10 border border-[#eaeaea]">
              <Image
                src={post.thumbnail || DEFAULT_POST_IMAGE}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 224px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1.5 z-10 pointer-events-none">
              <h3 className="font-['Noto_Sans_JP'] font-bold text-[15px] lg:text-lg text-black lg:text-[#1b1c1c] leading-snug lg:leading-7 line-clamp-2 group-hover:text-[#0058c3] transition-colors">
                {post.title}
              </h3>

              <p className="font-['Noto_Sans_JP'] font-normal text-[13px] sm:text-sm text-[#707581] lg:text-[#414754] leading-relaxed lg:leading-5 line-clamp-2">
                {post.description}
              </p>

              <div className="flex gap-1 lg:gap-2 items-center">
                <span className="font-['JetBrains_Mono'] font-medium text-[11px] sm:text-sm text-[#0058c3] uppercase leading-[19.6px] tracking-wider">
                  {post.category}
                </span>

                <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                  {post.date}
                </span>
                <span className="text-[#c1c6d7] text-sm">•</span>
                <div className="flex items-center gap-1 lg:gap-1.5">
                  <ClockIcon />
                  <span className="font-['Noto_Sans_JP'] lg:font-['JetBrains_Mono'] font-normal text-[11px] lg:text-[13px] text-[#707581] lg:text-[#414754] leading-normal lg:leading-[20.8px]">
                    {post.readTime.replace(" read", "")} min
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex gap-2 pt-1 pointer-events-auto z-20">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?tag=${tag}`}
                    className="font-['JetBrains_Mono'] font-normal text-xs text-[#414754] leading-4 hover:text-[#0058c3] hover:underline transition-colors">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/posts"
        className="flex items-center gap-2 text-[#0058c3] text-sm leading-[19.6px] hover:underline w-fit pt-2">
        <span>{t("viewAll")}</span>
      </Link>
    </div>
  );
};

export default Latest;
