import DEFAULT_POST_IMAGE from "@/libs/constants";
import { PostWithRelations } from "@/types/post";
import Image from "next/image";

type Props = {
  post: PostWithRelations;
  displayContent: PostWithRelations["contents"][number];
};

const PostContent = ({ post, displayContent }: Props) => {
  return (
    <article className="lg:col-span-8 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] overflow-hidden flex flex-col">
      {/* 1. トップエリア：タイトルとメタ情報 */}
      <header className="px-4 pt-6 sm:px-6 sm:pt-8 md:px-10 md:pt-10 lg:px-12 lg:pt-12">
        <div className="flex items-center gap-3 text-[#5e5e5e] font-['JetBrains_Mono'] text-xs sm:text-sm mb-3 sm:mb-4">
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
        <h1 className="text-[22px] sm:text-3xl md:text-4xl font-bold font-['Noto_Sans_JP'] text-[#1b1c1c] leading-[1.4] tracking-tight mb-5 sm:mb-6">
          {displayContent.title}
        </h1>
      </header>

      {/* 2. サムネイル画像 */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 mb-6 sm:mb-8 flex justify-center">
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
      <div className="px-4 pb-8 sm:px-6 sm:pb-10 md:px-10 md:pb-12 lg:px-12">
        {displayContent.seoDescription && (
          <p className="text-[14px] sm:text-[15px] md:text-base text-[#414754] font-medium leading-relaxed bg-[#fbf9f8] p-4 sm:p-5 rounded-xl border-l-4 border-[#0058c3] mb-6 sm:mb-8">
            {displayContent.seoDescription}
          </p>
        )}
        <div
          className="prose max-w-none font-['Noto_Sans_JP'] text-[#2d313a]
                     
                     /* H2のスタイル */
                     prose-headings:font-bold prose-headings:text-[#1b1c1c] prose-headings:tracking-tight
                     prose-h2:text-[20px] sm:prose-h2:text-[24px] prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-14 sm:prose-h2:mt-16 prose-h2:mb-4 sm:prose-h2:mb-6
                     
                     /* H3のスタイル */
                     prose-h3:text-[18px] sm:prose-h3:text-[20px] prose-h3:mt-8 sm:prose-h3:mt-10 prose-h3:mb-2
                     
                     /* Pタグ・リストのスタイル */
                     prose-p:text-[15px] sm:prose-p:text-base prose-p:leading-[1.8] prose-p:mb-5 sm:prose-p:mb-6
                     prose-li:text-[15px] sm:prose-li:text-base
                     
                     /* リンクと画像のスタイル */
                     prose-a:text-[#0058c3] prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-xl prose-img:shadow-sm prose-img:mx-auto
                     
                     /* リストのスタイル */
                     prose-ul:my-5 sm:prose-ul:my-6 prose-li:my-1.5 sm:prose-li:my-2 prose-li:marker:text-[#0058c3]"
          dangerouslySetInnerHTML={{ __html: displayContent.html || "<p>本文がありません。</p>" }}
        />
      </div>
    </article>
  );
};

export default PostContent;
