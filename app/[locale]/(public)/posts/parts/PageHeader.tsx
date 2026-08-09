import SearchBar from "@/components/public/SearchBar";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import ActiveFilters from "./ActiveFilters";

type Props = {
  title: string;
  allAvailableTags: { slug: string; name: string }[];
  activeTags: string[];
  searchKeywords: string[];
  searchQueryString: string;
};

const PageHeader = async ({ title, allAvailableTags, activeTags, searchKeywords, searchQueryString }: Props) => {
  const t = await getTranslations("Posts");

  const getTagToggleUrl = (tagSlug: string) => {
    const params = new URLSearchParams();
    if (searchQueryString) params.set("search", searchQueryString);

    if (activeTags.includes(tagSlug)) {
      activeTags.filter((t) => t !== tagSlug).forEach((t) => params.append("tag", t));
    } else {
      activeTags.forEach((t) => params.append("tag", t));
      params.append("tag", tagSlug);
    }

    const queryString = params.toString();
    return queryString ? `/posts?${queryString}` : "/posts";
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="font-['Noto_Sans_JP'] font-medium text-[28px] lg:text-4xl text-[#1b1c1c] tracking-[-0.04em] leading-tight transition-all duration-300">
        {title}
      </h1>

      <SearchBar />

      <div className="w-full flex flex-col gap-2 mt-1">
        <span className="font-['JetBrains_Mono'] font-bold text-xs text-[#727786] tracking-wider uppercase">
          {t("popularTags") || "TAGS"}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none flex-nowrap lg:flex-wrap -mx-4 px-4 lg:mx-0 lg:px-0">
          {allAvailableTags.map(({ slug, name }) => {
            const isSelected = activeTags.includes(slug);
            return (
              <Link
                key={slug}
                href={getTagToggleUrl(slug)}
                className={`px-3 py-1 text-[13px] font-['JetBrains_Mono'] rounded-full border shrink-0 transition-all duration-200 hover:-translate-y-px hover:shadow-sm cursor-pointer ${
                  isSelected
                    ? "bg-[#d8e2ff] border-[#0058c3] text-[#001a43] font-semibold"
                    : "bg-white border-[#c1c6d7] text-[#414754] hover:bg-[#f5f3f3]"
                }`}>
                #{name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
        <ActiveFilters
          searchKeywords={searchKeywords}
          activeTags={activeTags}
        />
      </div>
    </div>
  );
};

export default PageHeader;
