"use client";

import { useEffect, useState } from "react";

// * Shape of a single table-of-contents entry
type TocItem = {
  id: string;
  text: string;
  level: number;
  displayNum: string; // Display numbering such as "1.", "1.2."
};

/**
 * Sidebar table of contents built from the h2/h3 headings rendered inside the post body.
 * Assigns anchor ids to headings that lack one and computes hierarchical numbering.
 */
const TocWidget = () => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    // * Only collect h2/h3 elements inside the post's .prose content
    const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));

    let h2Count = 0;
    let h3Count = 0;

    const tocItems = elements.map((el, index) => {
      //* Assigns an id directly on the rendered DOM element even when Tiptap didn't set one
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
      let displayNum = "";

      //* Computes hierarchical numbering (1., 1.1., 1.2., 2...)
      if (level === 2) {
        h2Count++;
        h3Count = 0; //* Reset the h3 counter whenever a new h2 starts
        displayNum = `${h2Count}.`;
      } else if (level === 3) {
        h3Count++;
        //* Handle the edge case where an h3 appears before any h2
        const parentNum = h2Count === 0 ? 1 : h2Count;
        displayNum = `${parentNum}.${h3Count}.`;
      }

      return {
        id: el.id,
        text: el.textContent || "",
        level,
        displayNum
      };
    });

    setToc(tocItems);
  }, []);

  /** Smoothly scrolls to the heading corresponding to the clicked TOC entry. */
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 32;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // * Hide the widget entirely when there are no headings
  if (toc.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7 sticky top-24 hidden lg:block max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
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
        {toc.map((item) => (
          <li
            key={item.id}
            className={`transition-colors line-clamp-2 ${
              item.level === 2
                ? "font-medium"
                : "pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:border-l before:border-b before:border-gray-400" // Indented with an L-shaped connector icon for h3 entries
            }`}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="hover:text-[#0058c3] flex gap-2">
              <span className="shrink-0 font-['JetBrains_Mono']">{item.displayNum}</span>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TocWidget;
