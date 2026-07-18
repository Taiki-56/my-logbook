import { getPublishedPostsAction } from "@/actions/post";
import SearchBar from "@/components/public/SearchBar";
import { Link } from "@/i18n/navigation"; // 🌟 タグトグル用のリンクを生成するために追加
import { getTranslations } from "next-intl/server";
import ActiveFilters from "./parts/ActiveFilters";
import ArticleCard from "./parts/ArticleCard";
import EmptyState from "./parts/EmptyState";
import Pagination from "./parts/Pagination";

const ITEMS_PER_PAGE = 6;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async (props: Props) => {
  const t = await getTranslations("Posts");
  const searchParams = await props.searchParams;

  const searchQueryString = (searchParams.search as string) || "";
  const searchKeywords = searchQueryString.split(/[\s ]+/).filter(Boolean);

  const activeTags = searchParams.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag as string]
    : [];

  const currentPage = parseInt((searchParams.page as string) || "1", 10);

  const res = await getPublishedPostsAction();
  if (!res.success || !res.data) {
    return <div>エラーが発生しました。:{res.error}</div>;
  }

  const posts = res.data;

  //* 🌟 追加: DBに存在するすべての有効なタグを重複なく自動抽出する
  const allAvailableTags = Array.from(
    new Set(
      posts
        .flatMap((post) => post.postTags)
        .map((pt) => (pt.tag as any)?.slug)
        .filter(Boolean) as string[]
    )
  );

  // Filter articles based on search and tag (複数キーワードAND、複数タグOR)
  const filteredArticles = posts.filter((post) => {
    const baseContent = post.contents.find((c) => c.locale === "ja") || post.contents[0];
    if (!baseContent) return false;

    const matchesSearch =
      searchKeywords.length > 0
        ? searchKeywords.every(
            (keyword) =>
              (baseContent.title?.toLowerCase().includes(keyword.toLowerCase()) ?? false) ||
              (baseContent.seoDescription?.toLowerCase().includes(keyword.toLowerCase()) ?? false)
          )
        : true;

    const matchesTag =
      activeTags.length > 0
        ? activeTags.some((activeTag) =>
            post.postTags.some((pt) => (pt.tag as any).slug === activeTag || pt.tagId === activeTag)
          )
        : true;

    return matchesSearch && matchesTag;
  });

  const mappedArticles = filteredArticles.map((post) => {
    const baseContent = post.contents.find((c) => c.locale === "ja") || post.contents[0];

    return {
      id: post.id,
      date: new Date(post.createdAt).toLocaleDateString("ja-JP"),
      readTime: 5,
      title: baseContent.title,
      description: baseContent.seoDescription,
      tags: post.postTags.map((pt) => {
        return (pt as any).tag?.name || (pt as any).tag?.slug || "タグ";
      }),
      image: post.thumbnail || "",
      slug: baseContent.slug,
      category: "未分類"
    };
  });

  const totalPages = Math.ceil(mappedArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = mappedArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 複数条件に対応した動的タイトル
  let dynamicPageTitle = t("pageTitle");

  if (searchKeywords.length > 0 && activeTags.length > 0) {
    dynamicPageTitle = `「${searchKeywords.join(" ")}」の検索結果 (${activeTags.map((t) => `#${t}`).join(", ")})`;
  } else if (searchKeywords.length > 0) {
    dynamicPageTitle = `「${searchKeywords.join(" ")}」の検索結果`;
  } else if (activeTags.length > 0) {
    dynamicPageTitle = `${activeTags.map((t) => `#${t}`).join(", ")} の記事`;
  }

  //* 🌟 追加: タグをトグル（ON/OFF）するためのURLパラメータを生成するヘルパー関数
  const getTagToggleUrl = (tag: string) => {
    const params = new URLSearchParams();

    // 既存の検索キーワードは引き継ぐ
    if (searchQueryString) {
      params.set("search", searchQueryString);
    }

    if (activeTags.includes(tag)) {
      // すでに選択されているタグなら、新パラメータから除外する（OFF）
      activeTags.filter((t) => t !== tag).forEach((t) => params.append("tag", t));
    } else {
      // 選択されていなければ、追加する（ON）
      activeTags.forEach((t) => params.append("tag", t));
      params.append("tag", tag);
    }

    const queryString = params.toString();
    return queryString ? `/posts?${queryString}` : "/posts";
  };

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col items-start px-35">
        <div className="w-full flex flex-col py-16">
          <div className="w-full flex flex-col gap-6">
            <h1 className="font-['Noto_Sans_JP'] font-medium text-4xl text-[#1b1c1c] tracking-[-0.04em] leading-[1.1] transition-all duration-300">
              {dynamicPageTitle}
            </h1>

            <SearchBar />

            {/* 🌟 追加: デスクトップ用タグフィルターバー */}
            <div className="w-full flex flex-col gap-2 mt-2">
              <span className="font-['JetBrains_Mono'] font-bold text-xs text-[#727786] tracking-wider uppercase">
                {t("popularTags") || "TAGS"}
              </span>
              <div className="flex flex-wrap gap-2">
                {allAvailableTags.map((tag) => {
                  const isSelected = activeTags.includes(tag);
                  return (
                    <Link
                      key={tag}
                      href={getTagToggleUrl(tag)}
                      className={`px-3 py-1 text-[13px] font-['JetBrains_Mono'] rounded-full border transition-all duration-200 hover:-translate-y-px hover:shadow-sm cursor-pointer ${
                        isSelected
                          ? "bg-[#d8e2ff] border-[#0058c3] text-[#001a43] font-semibold"
                          : "bg-white border-[#c1c6d7] text-[#414754] hover:bg-[#f5f3f3]"
                      }`}>
                      #{tag}
                    </Link>
                  );
                })}
              </div>
            </div>

            <ActiveFilters
              searchKeywords={searchKeywords}
              activeTags={activeTags}
            />
          </div>

          <div className="w-full pt-16">
            {paginatedArticles.length > 0 ? (
              <div className="grid grid-cols-2 gap-8">
                {paginatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>

          {paginatedArticles.length > 0 && totalPages > 1 && (
            <div className="w-full pt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-8 py-24 px-4">
        <div className="flex flex-col gap-6">
          <h1 className="font-['Noto_Sans_JP'] font-medium text-4xl text-[#1b1c1c] tracking-[-0.04em] leading-[1.1] transition-all duration-300">
            {dynamicPageTitle}
          </h1>
          <SearchBar />

          {/* 🌟 追加: モバイル用タグフィルターバー（横スクロール可能に） */}
          <div className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] font-bold text-xs text-[#727786] tracking-wider uppercase">
              {t("popularTags") || "TAGS"}
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {allAvailableTags.map((tag) => {
                const isSelected = activeTags.includes(tag);
                return (
                  <Link
                    key={tag}
                    href={getTagToggleUrl(tag)}
                    className={`px-3 py-1 text-[13px] font-['JetBrains_Mono'] rounded-full border shrink-0 ${
                      isSelected
                        ? "bg-[#d8e2ff] border-[#0058c3] text-[#001a43] font-semibold"
                        : "bg-white border-[#c1c6d7] text-[#414754]"
                    }`}>
                    #{tag}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {(searchKeywords.length > 0 || activeTags.length > 0) && (
          <div className="flex flex-col gap-3">
            <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-wider uppercase whitespace-nowrap">
              {t("activeFilters")}
            </span>
            <div className="overflow-x-auto pb-2">
              <ActiveFilters
                searchKeywords={searchKeywords}
                activeTags={activeTags}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8 w-full">
          {paginatedArticles.length > 0 ? (
            <>
              {paginatedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  layout="horizontal"
                />
              ))}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
