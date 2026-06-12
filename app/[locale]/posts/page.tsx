"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import ActiveFilters from "./parts/ActiveFilters";
import ArticleCard from "./parts/ArticleCard";
import Pagination from "./parts/Pagination";

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    date: "2024年3月15日",
    readTime: 5,
    title: "次世代の大規模言語モデルがもたらす開発体験の変革",
    description: "AIツールの進化により、エンジニアリングのアプローチは根本から変わりつつあ",
    tags: ["AI", "Engineering"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    slug: "next-gen-llm-development",
    category: "AI INSIGHTS"
  },
  {
    id: 2,
    date: "2024年3月10日",
    readTime: 8,
    title: "AI駆動のテスト自動化：実践的アプローチ",
    description: "単体テストやE2Eテストの生成において、機械学習モデルをどのように活用できる",
    tags: ["AI", "Engineering"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    slug: "ai-driven-test-automation",
    category: "ENGINEERING"
  },
  {
    id: 3,
    date: "2024年3月05日",
    readTime: 7,
    title: "分散システムにおけるデータ整合性の担保",
    description: "マイクロサービス環境でのトランザクション管理とイベント駆動アーキテクチャ",
    tags: ["Architecture", "Engineering"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    slug: "distributed-systems-consistency",
    category: "ENGINEERING"
  },
  {
    id: 4,
    date: "2024年2月28日",
    readTime: 6,
    title: "生成AIの倫理的ガイドラインと実装",
    description: "プロダクション環境でのAI活用における責任ある開発プラクティス",
    tags: ["AI", "Ethics"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    slug: "generative-ai-ethics",
    category: "AI INSIGHTS"
  },
  {
    id: 5,
    date: "2024年2月20日",
    readTime: 10,
    title: "パフォーマンス最適化の実践的アプローチ",
    description: "WebアプリケーションのCore Web Vitalsを改善するための具体的手法",
    tags: ["Performance", "WebDev"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    slug: "performance-optimization-practices",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 6,
    date: "2024年2月15日",
    readTime: 8,
    title: "Reactの新しいレンダリングパターン",
    description: "Server ComponentsとSuspenseを活用した効率的なデータフェッチング",
    tags: ["React", "WebDev"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    slug: "react-new-rendering-patterns",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 7,
    date: "2024年2月10日",
    readTime: 9,
    title: "セキュアなAPI設計の基本原則",
    description: "認証、認可、データ検証を含む包括的なAPIセキュリティ戦略",
    tags: ["Security", "API"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
    slug: "secure-api-design-principles",
    category: "SECURITY"
  },
  {
    id: 8,
    date: "2024年2月05日",
    readTime: 7,
    title: "クラウドネイティブアーキテクチャの設計",
    description: "スケーラビリティと可用性を考慮したマイクロサービス設計パターン",
    tags: ["Cloud", "Architecture"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    slug: "cloud-native-architecture-design",
    category: "CLOUD"
  },
  {
    id: 9,
    date: "2024年1月30日",
    readTime: 11,
    title: "TypeScriptの高度な型システム活用",
    description: "ジェネリクス、条件型、テンプレートリテラル型を使った型安全性の向上",
    tags: ["TypeScript", "WebDev"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    slug: "advanced-typescript-type-system",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 10,
    date: "2024年1月25日",
    readTime: 6,
    title: "CI/CDパイプラインの最適化戦略",
    description: "ビルド時間の短縮とデプロイメントの信頼性向上のためのベストプラクティス",
    tags: ["DevOps", "CI/CD"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
    slug: "cicd-pipeline-optimization",
    category: "DEVOPS"
  },
  {
    id: 11,
    date: "2024年1月30日",
    readTime: 11,
    title: "TypeScriptの高度な型システム活用",
    description: "ジェネリクス、条件型、テンプレートリテラル型を使った型安全性の向上",
    tags: ["TypeScript", "WebDev"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    slug: "advanced-typescript-type-system",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 12,
    date: "2024年1月25日",
    readTime: 6,
    title: "CI/CDパイプラインの最適化戦略",
    description: "ビルド時間の短縮とデプロイメントの信頼性向上のためのベストプラクティス",
    tags: ["DevOps", "CI/CD"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
    slug: "cicd-pipeline-optimization",
    category: "DEVOPS"
  },
  {
    id: 13,
    date: "2024年1月30日",
    readTime: 11,
    title: "TypeScriptの高度な型システム活用",
    description: "ジェネリクス、条件型、テンプレートリテラル型を使った型安全性の向上",
    tags: ["TypeScript", "WebDev"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    slug: "advanced-typescript-type-system",
    category: "WEB DEVELOPMENT"
  },
  {
    id: 14,
    date: "2024年1月25日",
    readTime: 6,
    title: "CI/CDパイプラインの最適化戦略",
    description: "ビルド時間の短縮とデプロイメントの信頼性向上のためのベストプラクティス",
    tags: ["DevOps", "CI/CD"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop",
    slug: "cicd-pipeline-optimization",
    category: "DEVOPS"
  }
];

const ITEMS_PER_PAGE = 10;

const Page = () => {
  const t = useTranslations("Posts");
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || undefined;
  const activeTag = searchParams.get("tag") || undefined;
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Filter articles based on search and tag
  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesTag = activeTag ? article.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  // Paginate articles
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col items-start px-75 py-16">
        <div className="max-w-170 w-full flex flex-col gap-16">
          {/* Header & Active Filters */}
          <div className="flex flex-col gap-4">
            <h1 className="font-['Noto_Sans_JP'] font-medium text-5xl text-[#1b1c1c] tracking-[-0.04em] leading-[1.1]">
              {t("pageTitle")}
            </h1>
            <ActiveFilters
              searchQuery={searchQuery}
              activeTag={activeTag}
            />
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-2 gap-8">
            {paginatedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                layout="grid"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-8 py-24 px-4">
        {/* Active Filters */}
        <div className="flex gap-3 items-center overflow-x-auto">
          <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#414754] tracking-wider uppercase whitespace-nowrap">
            {t("activeFilters")}
          </span>
          {activeTag && (
            <div className="bg-[#d8e2ff] border border-[#0058c3] rounded-xl px-3 py-1 flex items-center gap-2 whitespace-nowrap">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 5.5L5 9.5L13 1.5"
                  stroke="#001a43"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-['JetBrains_Mono'] font-medium text-sm text-[#001a43]">
                {t("tagPrefix")} {activeTag}
              </span>
              <button className="p-0.5">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 1L1 7M1 1L7 7"
                    stroke="#001a43"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          {activeTag && (
            <button className="font-['JetBrains_Mono'] font-medium text-sm text-[#5e5e5e] underline whitespace-nowrap">
              {t("clear")}
            </button>
          )}
        </div>

        {/* Article List */}
        <div className="flex flex-col gap-8">
          {paginatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              layout="horizontal"
            />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
