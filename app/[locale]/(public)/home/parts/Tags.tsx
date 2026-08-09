import { Link } from "@/i18n/navigation";
import { PopularTagView } from "@/types/post";
import { useTranslations } from "next-intl";

type Props = {
  tags: PopularTagView[];
};

const TAG_COLORS = [
  "text-[#0058c3]",
  "text-[#7c3aed]",
  "text-[#059669]",
  "text-[#dc2626]",
  "text-[#ea580c]",
  "text-[#0891b2]"
];
const Tags = ({ tags }: Props) => {
  const t = useTranslations("Home.tags");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="border-b border-[#c1c6d7] h-[28.59px] relative">
        <h2 className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("heading")}
        </h2>
      </div>

      {/* Mobile Layout - 3 Column Grid */}
      <div className="grid grid-cols-3 gap-2 lg:hidden">
        {tags.map((tag, index) => {
          const colorClass = TAG_COLORS[index % TAG_COLORS.length];

          return (
            <Link
              key={tag.slug} // 🌟 idの代わりにslugを使用
              href={`/posts?tag=${tag.slug}`}
              className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-lg p-2 hover:bg-[#f5f3f3] transition-colors h-16 flex flex-col justify-between">
              <p
                className={`font-['JetBrains_Mono'] font-medium text-[10px] leading-normal line-clamp-1 ${colorClass}`}>
                {tag.name.toUpperCase()}
              </p>
              <p className="font-['JetBrains_Mono'] font-normal text-[10px] text-[#707581] leading-normal">
                {tag.count}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Desktop Layout - Pills */}
      <div className="hidden lg:flex flex-wrap gap-3 w-full">
        {tags.map((tag) => (
          <Link
            key={tag.slug} // 🌟 idの代わりにslugを使用
            href={`/posts?tag=${tag.slug}`}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl px-3.25 py-1 font-['JetBrains_Mono'] font-normal text-[13px] text-[#1b1c1c] leading-[20.8px] hover:bg-[#f5f3f3] transition-colors">
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tags;
