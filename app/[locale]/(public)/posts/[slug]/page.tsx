import { getPostBySlugAction } from "@/actions/post";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";

//* Next.js 15 用の params の型定義 (Promiseでラップします)
type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const Page = async (props: Props) => {
  //* 1. パラメータを await で取得
  const params = await props.params;
  const { locale, slug } = params;

  //* 2. slugを使ってデータベースから親(Post)ごと取得！
  const res = await getPostBySlugAction(slug);

  //* 記事が見つからなければ 404 Not Found ページへ飛ばす
  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;

  //* 3. 【超重要】表示する言語を決定する
  //* URLの locale と一致する記事を探す。なければ主言語(ja)、それでも無ければ一番最初のもの。
  const displayContent =
    post.contents.find((c) => c.locale === locale) || post.contents.find((c) => c.locale === "ja") || post.contents[0];

  //* 本文(html)がない場合などのフォールバック
  if (!displayContent) {
    notFound();
  }

  const defaultImage = "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop";

  return (
    //* 🌟 改善1: 全体の背景を薄い色（#fbf9f8）にして、コンテンツを際立たせる
    <div className="min-h-screen bg-[#fbf9f8] py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🌟 改善2: 12分割のグリッドレイアウト（左8 : 右4 の2カラム構造） */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ========================================== */}
          {/* 左側：メイン記事エリア (8カラム分) */}
          {/* ========================================== */}
          <article className="lg:col-span-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] overflow-hidden">
            {/* サムネイル画像をカードの上部に大きく配置 */}
            <div className="relative w-full aspect-21/9 md:aspect-2/1 bg-gray-100">
              <Image
                src={post.thumbnail || defaultImage}
                alt={displayContent.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 記事のパディングエリア */}
            <div className="p-6 md:p-10 lg:p-12">
              {/* 記事ヘッダー */}
              <header className="mb-10 border-b border-gray-100 pb-8">
                {/* 日付と読む時間 */}
                <div className="flex items-center gap-4 text-[#5e5e5e] font-['JetBrains_Mono'] text-sm mb-5">
                  <time dateTime={post.createdAt.toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    5 min read
                  </span>
                </div>

                {/* タイトル */}
                <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold font-['Noto_Sans_JP'] text-[#1b1c1c] leading-[1.4] tracking-tight mb-6">
                  {displayContent.title}
                </h1>

                {/* 記事の概要 (description) があれば表示 */}
                {displayContent.seoDescription && (
                  <p className="text-lg text-[#414754] font-medium leading-relaxed bg-[#f5f3f3] p-4 rounded-lg border-l-4 border-[#0058c3]">
                    {displayContent.seoDescription}
                  </p>
                )}
              </header>

              {/* 本文エリア */}
              {/* 🌟 改善: proseのスタイルを細かく調整してタイポグラフィを美しくする */}
              <div
                className="prose prose-lg max-w-none font-['Noto_Sans_JP'] 
                           prose-headings:font-bold prose-headings:text-[#1b1c1c] prose-headings:tracking-tight
                           prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
                           prose-a:text-[#0058c3] prose-a:no-underline hover:prose-a:underline
                           prose-img:rounded-xl prose-img:shadow-sm
                           prose-li:marker:text-[#0058c3]
                           text-[#2d313a]"
                dangerouslySetInnerHTML={{ __html: displayContent.html || "<p>本文がありません。</p>" }}
              />
            </div>
          </article>

          {/* ========================================== */}
          {/* 右側：サイドバーエリア (4カラム分) */}
          {/* ========================================== */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 🌟 ウィジェット1: 筆者プロフィール */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7">
              <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle
                    cx="12"
                    cy="7"
                    r="4"></circle>
                </svg>
                Author
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" // プレースホルダー画像
                    alt="Author"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#1b1c1c]">Taiki</h4>
                  <p className="text-sm text-[#0058c3] font-['JetBrains_Mono'] font-medium">Software Engineer</p>
                </div>
              </div>
              <p className="text-[14px] text-[#414754] leading-relaxed">
                Web開発、AI、クラウド技術について発信しています。Next.js と TypeScript が好きです。
              </p>
            </div>

            {/* 🌟 ウィジェット2: タグ */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7">
              <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line
                    x1="7"
                    y1="7"
                    x2="7.01"
                    y2="7"></line>
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {post.postTags.map((pt) => {
                  const tagContent = pt.tag.contents?.[0];
                  const tagName = tagContent?.name || decodeURIComponent(pt.tag.slug);

                  return (
                    <Link
                      href={`/posts?tag=${pt.tag.slug}`}
                      key={pt.tagId}
                      className="bg-[#f5f3f3] hover:bg-[#e4e2e2] transition-colors border border-[#c1c6d7] text-[#414754] px-3 pt-1 pb-1.5 rounded text-[13px] font-medium cursor-pointer flex items-center">
                      <span className="text-[#0058c3] mr-1">#</span> {tagName}
                    </Link>
                  );
                })}
                {post.postTags.length === 0 && <span className="text-sm text-gray-400">タグがありません</span>}
              </div>
            </div>
            {/* 🌟 ウィジェット3: もくじ（PCでのみスクロールに追従します） */}
            <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7 sticky top-8 hidden lg:block">
              <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <line
                    x1="8"
                    y1="6"
                    x2="21"
                    y2="6"></line>
                  <line
                    x1="8"
                    y1="12"
                    x2="21"
                    y2="12"></line>
                  <line
                    x1="8"
                    y1="18"
                    x2="21"
                    y2="18"></line>
                  <line
                    x1="3"
                    y1="6"
                    x2="3.01"
                    y2="6"></line>
                  <line
                    x1="3"
                    y1="12"
                    x2="3.01"
                    y2="12"></line>
                  <line
                    x1="3"
                    y1="18"
                    x2="3.01"
                    y2="18"></line>
                </svg>
                Table of Contents
              </h3>
              <ul className="space-y-4 text-[14px] text-[#414754]">
                {/* ※ ここは現在モック（ダミー）です。将来的にTiptapのデータから自動生成します */}
                <li className="hover:text-[#0058c3] cursor-pointer transition-colors line-clamp-1 font-medium">
                  1. はじめに
                </li>
                <li className="hover:text-[#0058c3] cursor-pointer transition-colors line-clamp-1 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:border-l before:border-b before:border-gray-400">
                  1.1. 概要と背景
                </li>
                <li className="hover:text-[#0058c3] cursor-pointer transition-colors line-clamp-1 font-medium">
                  2. 今回のテーマについて
                </li>
                <li className="hover:text-[#0058c3] cursor-pointer transition-colors line-clamp-1 font-medium">
                  3. まとめ
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
export default Page;
