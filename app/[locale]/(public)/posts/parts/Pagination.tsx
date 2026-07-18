"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const ChevronLeftIcon = () => (
  <svg
    width="13.333"
    height="13.333"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.75 3.5L5.25 7L8.75 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="13.333"
    height="13.333"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.25 3.5L8.75 7L5.25 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const t = useTranslations("Posts");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    const newUrl = params.toString() ? `/posts?${params.toString()}` : "/posts";
    router.push(newUrl);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Desktop Pagination */}
      <div className="hidden lg:flex border-t border-[#c1c6d7] pt-16.25 items-center justify-between w-full">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex gap-2 items-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-70"
          }`}>
          <ChevronLeftIcon />
          <span className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#414754]">
            {t("previousPage")}
          </span>
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2 items-center">
          {renderPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#414754] px-2">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`${
                  currentPage === page ? "bg-[#1b1c1c] text-white" : "text-[#414754] hover:bg-[#f5f3f3]"
                } font-['JetBrains_Mono'] font-medium text-[13px] rounded-sm w-8 h-8 flex items-center justify-center transition-colors`}>
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex gap-2 items-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:opacity-70"
          }`}>
          <span className="font-['Noto_Sans_JP'] font-medium text-[14px] leading-[19.6px] text-[#414754]">
            {t("nextPage")}
          </span>
          <ChevronRightIcon />
        </button>
      </div>

      {/* Mobile Pagination */}
      <div className="lg:hidden flex gap-2 items-center justify-center pt-8">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${
            currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#f5f3f3]"
          } rounded transition-colors`}>
          <ChevronLeftIcon />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1 items-center">
          {renderPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="font-['Inter'] font-normal text-base text-[#5e5e5e] px-2">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`${
                  currentPage === page ? "bg-[#1b1c1c] text-white" : "text-[#1b1c1c] hover:bg-[#f5f3f3]"
                } font-['JetBrains_Mono'] font-normal text-base rounded w-10 h-10 flex items-center justify-center transition-colors`}>
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${
            currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-[#f5f3f3]"
          } rounded transition-colors`}>
          <ChevronRightIcon />
        </button>
      </div>
    </>
  );
}
