import DEFAULT_POST_IMAGE from "@/libs/constants";
import Image from "next/image";

type Props = {
  post: any;
  displayContent: any;
};

const ArticleContent = ({ post, displayContent }: Props) => {
  return (
    <article className="lg:col-span-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] overflow-hidden flex flex-col">
      {/* 1. トップエリア：タイトルとメタ情報 */}
      <header className="px-6 pt-8 md:px-10 md:pt-10 lg:px-12 lg:pt-12">
        <div className="flex items-center gap-4 text-[#5e5e5e] font-['JetBrains_Mono'] text-sm mb-4">
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
        <h1 className="text-3xl md:text-4xl font-bold font-['Noto_Sans_JP'] text-[#1b1c1c] leading-[1.4] tracking-tight mb-6">
          {displayContent.title}
        </h1>
      </header>

      {/* 2. サムネイル画像（最大幅を制限して中央配置） */}
      {/* 🌟 px-6 等でテキストと左右の開始位置を合わせ、フレックスで中央寄せ */}
      <div className="w-full px-6 md:px-10 lg:px-12 mb-8 flex justify-center">
        {/* 🌟 max-w-[850px] と角丸 (rounded-xl) を追加 */}
        <div className="relative w-full max-w-212.5 aspect-video max-h-112.5 bg-[#f5f3f3] rounded-xl overflow-hidden border border-[#e4e2e2] shadow-sm">
          <Image
            src={post.thumbnail || DEFAULT_POST_IMAGE}
            alt={displayContent.title}
            fill
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 3. ボトムエリア：概要文と本文 */}
      <div className="px-6 pb-10 md:px-10 md:pb-12 lg:px-12">
        {displayContent.seoDescription && (
          <p className="text-base md:text-lg text-[#414754] font-medium leading-relaxed bg-[#fbf9f8] p-5 rounded-xl border-l-4 border-[#0058c3] mb-8">
            {displayContent.seoDescription}
          </p>
        )}
        <div
          className="prose prose-lg max-w-none font-['Noto_Sans_JP'] text-[#2d313a]
                     
                     /* H2のスタイル */
                     prose-headings:font-bold prose-headings:text-[#1b1c1c] prose-headings:tracking-tight
                     prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3 prose-h2:mt-20 prose-h2:mb-6
                     
                     /* H3のスタイル */
                     prose-h3:mt-10 prose-h3:mb-2
                     
                     /* Pタグのスタイル */
                     prose-p:leading-[1.8] prose-p:mb-6
                     
                     /* リンクと画像のスタイル */
                     prose-a:text-[#0058c3] prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-xl prose-img:shadow-sm prose-img:mx-auto
                     
                     /* リストのスタイル */
                     prose-ul:my-6 prose-li:my-2 prose-li:marker:text-[#0058c3]"
          dangerouslySetInnerHTML={{ __html: displayContent.html || "<p>本文がありません。</p>" }}
        />
      </div>
    </article>
  );
};

export default ArticleContent;
