import { getPublishedPostsAction } from "@/actions/post";
import SearchBar from "@/components/public/SearchBar";
import { Link } from "@/i18n/navigation";
import { getFeaturedPosts } from "@/services/post";
import { isValidLocale } from "@/types/config";
import { getLocale, getTranslations } from "next-intl/server";
import ActiveFilters from "./parts/ActiveFilters";
import EmptyState from "./parts/EmptyState";
import Pagination from "./parts/Pagination";
import PostCard from "./parts/PostCard";

const ITEMS_PER_PAGE = 6;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 🌟 カードコンポーネントが求めるデータの最終形を定義
type ViewPost = {
  id: string;
  date: string;
  readTime: number;
  title: string;
  description: string | null;
  tags: string[];
  image: string | null;
  slug: string;
  category: string;
};

const Page = async (props: Props) => {
  const t = await getTranslations("Posts");
  const searchParams = await props.searchParams;
  const locale = await getLocale();

  if (!isValidLocale(locale)) {
    return <div>サポートされていない言語です。</div>;
  }
  const searchQueryString = (searchParams.search as string) || "";
  const searchKeywords = searchQueryString.split(/[\s ]+/).filter(Boolean);

  const activeTags = searchParams.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag as string]
    : [];

  const currentPage = parseInt((searchParams.page as string) || "1", 10);
  const isFeaturedOnly = searchParams.isFeatured === "true";

  let viewPosts: ViewPost[] = [];
  // 🌟 slug（URL用）と name（表示用）を両方保持する Map を作成
  const uniqueTagsMap = new Map<string, string>();

  if (isFeaturedOnly) {
    // 注目の記事: getFeaturedPosts はすでに近い形に整形されているので、プロパティ名を合わせる
    const featured = await getFeaturedPosts(locale);
    viewPosts = featured.map((fp) => {
      // featured側からslugを取得できない場合のフォールバックとしてnameをそのまま登録
      fp.tags?.forEach((tagName) => {
        if (tagName && !uniqueTagsMap.has(tagName)) uniqueTagsMap.set(tagName, tagName);
      });

      return {
        id: fp.id,
        date: fp.date,
        readTime: 5,
        title: fp.title,
        description: fp.description,
        tags: fp.tags || [],
        image: fp.thumbnail || null,
        slug: fp.slug,
        category: fp.category || "BLOG"
      };
    });
  } else {
    // 🌟 通常の記事: 生のデータベースオブジェクトが返ってくるため、ここでUI向けに抽出・整形する
    const res = await getPublishedPostsAction(locale);
    if (!res.success || !res.data) {
      return <div>エラーが発生しました。:{res.error}</div>;
    }

    viewPosts = (res.data as any[]).map((post) => {
      // 該当言語のコンテンツを探す
      const content = post.contents?.find((c: any) => c.locale === locale) || post.contents?.[0];

      const localizedTags: string[] = [];

      post.postTags?.forEach((pt: any) => {
        // 🌟 修正点1: フォールバック([0])を削除し、完全に現在の言語のタグのみを抽出する
        const tagContent = pt.tag?.contents?.find((c: any) => c.locale === locale);

        if (tagContent) {
          localizedTags.push(tagContent.name);

          // 🌟 修正点2: URL用の親slug と 表示用のローカライズname を確実に紐付ける
          if (pt.tag?.slug && !uniqueTagsMap.has(pt.tag.slug)) {
            uniqueTagsMap.set(pt.tag.slug, tagContent.name);
          }
        }
      });

      return {
        id: post.id,
        date: new Date(post.createdAt).toLocaleDateString("ja-JP"),
        readTime: 5,
        title: content?.title || "No Title",
        description: content?.seoDescription || null,
        tags: localizedTags,
        image: post.thumbnail || null,
        slug: content?.slug || "",
        category: post.category || "BLOG"
      };
    });
  }

  const allAvailableTags = Array.from(uniqueTagsMap.entries()).map(([slug, name]) => ({ slug, name }));

  // Filter posts based on search and tag
  const filteredPosts = viewPosts.filter((post) => {
    const matchesSearch =
      searchKeywords.length > 0
        ? searchKeywords.every(
            (keyword) =>
              (post.title?.toLowerCase().includes(keyword.toLowerCase()) ?? false) ||
              (post.description?.toLowerCase().includes(keyword.toLowerCase()) ?? false)
          )
        : true;

    const matchesTag =
      activeTags.length > 0
        ? activeTags.some((activeTagSlug) => {
            // 🌟 修正点3: URLのパラメータ(slug)から日本語の表示名を逆引きして、post.tagsと照合する
            const activeTagName = uniqueTagsMap.get(activeTagSlug) || decodeURIComponent(activeTagSlug);
            return post.tags.includes(activeTagName);
          })
        : true;

    return matchesSearch && matchesTag;
  });

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  let dynamicPageTitle = t("pageTitle");

  const getActiveTagNames = () => {
    return activeTags.map((slug) => uniqueTagsMap.get(slug) || decodeURIComponent(slug));
  };

  if (isFeaturedOnly) {
    dynamicPageTitle = t("featuredPosts") || "注目の記事";
  } else if (searchKeywords.length > 0 && activeTags.length > 0) {
    dynamicPageTitle = `「${searchKeywords.join(" ")}」の検索結果 (${getActiveTagNames()
      .map((tag) => `#${tag}`)
      .join(", ")})`;
  } else if (searchKeywords.length > 0) {
    dynamicPageTitle = `「${searchKeywords.join(" ")}」の検索結果`;
  } else if (activeTags.length > 0) {
    dynamicPageTitle = `${getActiveTagNames()
      .map((tag) => `#${tag}`)
      .join(", ")} の記事`;
  }

  const getTagToggleUrl = (tagSlug: string) => {
    const params = new URLSearchParams();

    if (searchQueryString) {
      params.set("search", searchQueryString);
    }

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
    <div className="max-w-400 w-full mx-auto px-4 lg:px-8 pb-16">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col items-start px-35">
        <div className="w-full flex flex-col py-16">
          <div className="w-full flex flex-col gap-6">
            <h1 className="font-['Noto_Sans_JP'] font-medium text-4xl text-[#1b1c1c] tracking-[-0.04em] leading-[1.1] transition-all duration-300">
              {dynamicPageTitle}
            </h1>

            <SearchBar />

            <div className="w-full flex flex-col gap-2 mt-2">
              <span className="font-['JetBrains_Mono'] font-bold text-xs text-[#727786] tracking-wider uppercase">
                {t("popularTags") || "TAGS"}
              </span>
              <div className="flex flex-wrap gap-2">
                {allAvailableTags.map(({ slug, name }) => {
                  const isSelected = activeTags.includes(slug);
                  return (
                    <Link
                      key={slug}
                      href={getTagToggleUrl(slug)}
                      className={`px-3 py-1 text-[13px] font-['JetBrains_Mono'] rounded-full border transition-all duration-200 hover:-translate-y-px hover:shadow-sm cursor-pointer ${
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

            <ActiveFilters
              searchKeywords={searchKeywords}
              activeTags={activeTags}
            />
          </div>

          <div className="w-full pt-16">
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-2 gap-8">
                {paginatedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    layout="grid"
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>

          {paginatedPosts.length > 0 && totalPages > 1 && (
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

          <div className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] font-bold text-xs text-[#727786] tracking-wider uppercase">
              {t("popularTags") || "TAGS"}
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {allAvailableTags.map(({ slug, name }) => {
                const isSelected = activeTags.includes(slug);
                return (
                  <Link
                    key={slug}
                    href={getTagToggleUrl(slug)}
                    className={`px-3 py-1 text-[13px] font-['JetBrains_Mono'] rounded-full border shrink-0 ${
                      isSelected
                        ? "bg-[#d8e2ff] border-[#0058c3] text-[#001a43] font-semibold"
                        : "bg-white border-[#c1c6d7] text-[#414754]"
                    }`}>
                    #{name}
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
          {paginatedPosts.length > 0 ? (
            <>
              {paginatedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
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
