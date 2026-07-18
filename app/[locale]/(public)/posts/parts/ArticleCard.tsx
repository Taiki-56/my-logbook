// "use client";

// import { Link, useRouter } from "@/i18n/navigation";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// interface ArticleCardProps {
//   article: {
//     id: string;
//     date: string;
//     readTime: number;
//     title: string;
//     description: string | null;
//     tags: string[];
//     image: string | null;
//     slug: string;
//     category?: string;
//   };
//   layout?: "grid" | "horizontal";
// }

// const ClockIcon = ({ size = 12 }: { size?: number }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 12 12"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="shrink-0">
//     <path
//       d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6 10.8C3.34629 10.8 1.2 8.65371 1.2 6C1.2 3.34629 3.34629 1.2 6 1.2C8.65371 1.2 10.8 3.34629 10.8 6C10.8 8.65371 8.65371 10.8 6 10.8ZM6.6 3H5.4V6.6L8.4 8.34L9 7.38L6.6 5.94V3Z"
//       fill="#414754"
//     />
//   </svg>
// );

// const CalendarIcon = ({ size = 12 }: { size?: number }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 12 12"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="shrink-0">
//     <path
//       d="M10 1H9V0H8V1H4V0H3V1H2C1.448 1 1 1.448 1 2V11C1 11.552 1.448 12 2 12H10C10.552 12 11 11.552 11 11V2C11 1.448 10.552 1 10 1ZM10 11H2V4H10V11Z"
//       fill="#5E5E5E"
//     />
//   </svg>
// );

// export default function ArticleCard({ article, layout = "grid" }: ArticleCardProps) {
//   const t = useTranslations("Posts");
//   const router = useRouter();

//   const handleTagClick = (e: React.MouseEvent, tag: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     router.push(`/posts?tag=${tag}`);
//   };

//   const defaultImage = "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop";

//   // Desktop Grid Layout
//   if (layout === "grid") {
//     return (
//       <Link
//         href={`/posts/${article.slug}`}
//         className="bg-[#fbf9f8] border border-transparent rounded-sm hover:shadow-md transition-shadow p-2.25 flex flex-col gap-4">
//         {/* Image */}
//         <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xs w-full p-px">
//           <div className="relative w-full h-72 overflow-hidden rounded-[inherit]">
//             <Image
//               src={article.image || defaultImage}
//               alt={article.title}
//               fill
//               sizes="(max-width: 1024px) 100vw, 340px"
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex flex-col">
//           {/* Meta Information */}
//           <div className="flex gap-2 items-center">
//             <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
//               {article.date}
//             </span>
//             <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754]">·</span>
//             <span className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
//               {article.readTime}
//               {t("readTime")}
//             </span>
//           </div>

//           {/* Title */}
//           <h3 className="mt-2 font-['Noto_Sans_JP'] font-medium text-2xl leading-[31.2px] text-[#1b1c1c] line-clamp-2">
//             {article.title}
//           </h3>

//           {/* Description */}
//           <p className="mt-2 font-['Noto_Sans_JP'] font-medium text-base leading-6 text-[#414754] line-clamp-2">
//             {article.description || "説明はありません"}
//           </p>

//           {/* Tags */}
//           <div className="mt-2 flex gap-2 items-start pt-2 flex-wrap">
//             {article.tags.map((tag, index) => (
//               <button
//                 key={index}
//                 onClick={(e) => handleTagClick(e, tag)}
//                 className="bg-[#f5f3f3] border border-[#c1c6d7] text-[#414754] px-2.25 pt-0.5 pb-[3.8px] font-['JetBrains_Mono'] font-normal text-[13px] leading-[20.8px] rounded-xs hover:bg-opacity-80 transition-colors">
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>
//       </Link>
//     );
//   }

//   // Mobile Horizontal Layout
//   return (
//     <Link
//       href={`/posts/${article.slug}`}
//       className="bg-[#fbf9f8] border border-[#e4e2e2] flex overflow-hidden hover:shadow-md transition-shadow">
//       {/* Image */}
//       <div className="bg-[#f5f3f3] w-35 shrink-0 relative">
//         <Image
//           src={article.image || defaultImage}
//           alt={article.title}
//           width={140}
//           height={200}
//           className="object-cover w-full h-full grayscale"
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col gap-1 justify-center p-3 flex-1">
//         {/* Category */}
//         {article.category && (
//           <div className="font-['JetBrains_Mono'] font-normal text-xs text-[#0058c3] uppercase tracking-wider">
//             {article.category}
//           </div>
//         )}

//         {/* Title */}
//         <h3 className="font-['Noto_Sans_JP'] font-medium text-base text-[#1b1c1c] line-clamp-2">{article.title}</h3>

//         {/* Meta Information */}
//         <div className="flex gap-3 items-center pt-1">
//           <div className="flex gap-1 items-center">
//             <CalendarIcon />
//             <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{article.date}</span>
//           </div>
//           <div className="flex gap-1 items-center">
//             <ClockIcon />
//             <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{article.readTime} min</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ArticleCardProps {
  article: {
    id: string;
    date: string;
    readTime: number;
    title: string;
    description: string | null;
    tags: string[];
    image: string | null;
    slug: string;
    category?: string;
  };
  layout?: "grid" | "horizontal";
}

const ClockIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0">
    <path
      d="M6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0ZM6 10.8C3.34629 10.8 1.2 8.65371 1.2 6C1.2 3.34629 3.34629 1.2 6 1.2C8.65371 1.2 10.8 3.34629 10.8 6C10.8 8.65371 8.65371 10.8 6 10.8ZM6.6 3H5.4V6.6L8.4 8.34L9 7.38L6.6 5.94V3Z"
      fill="#414754"
    />
  </svg>
);

const CalendarIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0">
    <path
      d="M10 1H9V0H8V1H4V0H3V1H2C1.448 1 1 1.448 1 2V11C1 11.552 1.448 12 2 12H10C10.552 12 11 11.552 11 11V2C11 1.448 10.552 1 10 1ZM10 11H2V4H10V11Z"
      fill="#5E5E5E"
    />
  </svg>
);

export default function ArticleCard({ article, layout = "grid" }: ArticleCardProps) {
  const t = useTranslations("Posts");
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/posts?tag=${tag}`);
  };

  const defaultImage = "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop";

  // Desktop Grid Layout
  if (layout === "grid") {
    return (
      <Link
        href={`/posts/${article.slug}`}
        className="bg-[#fbf9f8] border border-transparent rounded-sm hover:shadow-md transition-shadow p-2.25 flex flex-col gap-4">
        {/* Image */}
        <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded-xs w-full p-px">
          <div className="relative w-full h-72 overflow-hidden rounded-[inherit]">
            <Image
              src={article.image || defaultImage}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Meta Information */}
          <div className="flex gap-2 items-center">
            <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
              {article.date}
            </span>
            <span className="font-['JetBrains_Mono'] font-medium text-[14px] leading-[19.6px] text-[#414754]">·</span>
            <span className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#414754] whitespace-nowrap">
              {article.readTime}
              {t("readTime")}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2 font-['Noto_Sans_JP'] font-medium text-2xl leading-[31.2px] text-[#1b1c1c] line-clamp-2">
            {article.title}
          </h3>

          {/* Description */}
          <p className="mt-2 font-['Noto_Sans_JP'] font-medium text-base leading-6 text-[#414754] line-clamp-2">
            {article.description || "説明はありません"}
          </p>

          {/* Tags */}
          <div className="mt-2 flex gap-2 items-start pt-2 flex-wrap">
            {article.tags.map((tag, index) => (
              <button
                key={index}
                onClick={(e) => handleTagClick(e, tag)}
                className="bg-[#f5f3f3] border border-[#c1c6d7] text-[#414754] px-2.25 pt-0.5 pb-[3.8px] font-['JetBrains_Mono'] font-normal text-[13px] leading-[20.8px] rounded-xs cursor-pointer transition-all duration-200 ease-out hover:bg-white hover:shadow-sm hover:border-[#a0a6b5] hover:-translate-y-px hover:text-[#0058c3]">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  // Mobile Horizontal Layout
  return (
    <Link
      href={`/posts/${article.slug}`}
      className="bg-[#fbf9f8] border border-[#e4e2e2] flex overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="bg-[#f5f3f3] w-35 shrink-0 relative">
        <Image
          src={article.image || defaultImage}
          alt={article.title}
          width={140}
          height={200}
          className="object-cover w-full h-full grayscale"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 justify-center p-3 flex-1">
        {/* Category */}
        {article.category && (
          <div className="font-['JetBrains_Mono'] font-normal text-xs text-[#0058c3] uppercase tracking-wider">
            {article.category}
          </div>
        )}

        {/* Title */}
        <h3 className="font-['Noto_Sans_JP'] font-medium text-base text-[#1b1c1c] line-clamp-2">{article.title}</h3>

        {/* Meta Information */}
        <div className="flex gap-3 items-center pt-1">
          <div className="flex gap-1 items-center">
            <CalendarIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{article.date}</span>
          </div>
          <div className="flex gap-1 items-center">
            <ClockIcon />
            <span className="font-['JetBrains_Mono'] font-normal text-xs text-[#5e5e5e]">{article.readTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
