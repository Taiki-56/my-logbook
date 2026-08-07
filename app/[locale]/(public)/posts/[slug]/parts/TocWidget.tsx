"use client";

import { useEffect, useState } from "react";

// 見出しのデータ構造を定義
type TocItem = {
  id: string; // アンカーリンク用（スクロール先）
  text: string; // 見出しのテキスト
  level: number; // 2 = h2, 3 = h3
  displayNum: string; // "1.", "1.1." などの表示用番号
};

const TocWidget = () => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    // 🌟 ArticleContent 内の .prose クラスの中にある h2, h3 のみを取得する
    const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));

    let h2Count = 0;
    let h3Count = 0;

    const tocItems = elements.map((el, index) => {
      // 🌟 ここが魔法のコード！
      // Tiptapにidがなくても、ここでブラウザ上のHTMLに直接idを付与してしまいます。
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      const level = el.tagName.toLowerCase() === "h2" ? 2 : 3;
      let displayNum = "";

      // 階層番号の計算ロジック（1., 1.1., 1.2., 2...）
      if (level === 2) {
        h2Count++;
        h3Count = 0; // h2が変わったらh3のカウントをリセット
        displayNum = `${h2Count}.`;
      } else if (level === 3) {
        h3Count++;
        // h2がないのにh3が先に来るイレギュラーなケースへの対応
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

  // 目次クリック時のスムーズスクロール処理
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 画面上部にくっつきすぎないように少し余白（オフセット）を持たせる
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

  // 見出しが1つもない場合は、ウィジェット自体を非表示にする
  if (toc.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7 sticky top-8 hidden lg:block max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
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
                ? "font-medium" // h2 の場合は普通の太さ
                : "pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:border-l before:border-b before:border-gray-400" // h3 の場合はインデントとL字アイコン
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
