/**
 * Posts listing page. Reads search/tag/page query params, filters and paginates
 * published (or featured-only) posts, and renders the header and post list.
 */

import { getPublishedPostsAction } from "@/actions/post";
import DEFAULT_POST_IMAGE from "@/libs/constants";
import { getFeaturedPosts } from "@/services/post";
import { Locale } from "@/types/config";
import { DisplayPost } from "@/types/post";
import { getLocale, getTranslations } from "next-intl/server";
import PageHeader from "./parts/PageHeader";
import PostList from "./parts/PostList";

const ITEMS_PER_PAGE = 6;

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const Page = async (props: Props) => {
  const t = await getTranslations("Posts");
  const searchParams = await props.searchParams;
  const locale = (await getLocale()) as Locale;
  const searchQueryString = (searchParams.search as string) || "";
  const searchKeywords = searchQueryString.split(/[\s ]+/).filter(Boolean);

  const activeTags = searchParams.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag as string]
    : [];

  const currentPage = parseInt((searchParams.page as string) || "1", 10);
  const isFeaturedOnly = searchParams.isFeatured === "true";

  let viewPosts: DisplayPost[] = [];
  const uniqueTagsMap = new Map<string, string>();

  if (isFeaturedOnly) {
    const featured = await getFeaturedPosts(locale);
    viewPosts = featured.map((fp) => {
      fp.tags?.forEach((tagName) => {
        if (tagName && !uniqueTagsMap.has(tagName)) uniqueTagsMap.set(tagName, tagName);
      });

      return {
        id: fp.id,
        date: fp.date,
        readTime: "5",
        title: fp.title,
        description: fp.description,
        tags: fp.tags || [],
        thumbnail: fp.thumbnail || DEFAULT_POST_IMAGE,
        slug: fp.slug,
        category: fp.category || "BLOG"
      };
    });
  } else {
    const res = await getPublishedPostsAction(locale);
    if (!res.success || !res.data) {
      return <div>エラーが発生しました。:{res.error}</div>;
    }

    viewPosts = res.data.map((post) => {
      const content = post.contents?.find((c) => c.locale === locale) || post.contents?.[0];

      const localizedTags: string[] = [];

      post.postTags?.forEach((pt) => {
        const tagContent = pt.tag?.contents?.find((c) => c.locale === locale);

        if (tagContent) {
          localizedTags.push(tagContent.name);

          if (pt.tag?.slug && !uniqueTagsMap.has(pt.tag.slug)) {
            uniqueTagsMap.set(pt.tag.slug, tagContent.name);
          }
        }
      });

      return {
        id: post.id,
        date: new Date(post.createdAt).toLocaleDateString("ja-JP"),
        readTime: "5",
        title: content?.title || "No Title",
        description: content?.seoDescription || null,
        tags: localizedTags,
        thumbnail: post.thumbnail || DEFAULT_POST_IMAGE,
        slug: content?.slug || "",
        category: post.category || "BLOG"
      };
    });
  }

  const allAvailableTags = Array.from(uniqueTagsMap.entries()).map(([slug, name]) => ({ slug, name }));

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

  //* Resolves active tag slugs to their display names for the dynamic page title
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
    <div className="max-w-400 w-full mx-auto px-4 lg:px-35 py-8 lg:py-16">
      <div className="w-full flex flex-col">
        <PageHeader
          title={dynamicPageTitle}
          allAvailableTags={allAvailableTags}
          activeTags={activeTags}
          searchKeywords={searchKeywords}
          searchQueryString={searchQueryString}
        />

        <PostList
          posts={paginatedPosts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Page;
