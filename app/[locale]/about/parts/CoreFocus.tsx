"use client";

import { useTranslations } from "next-intl";

const CoreFocus = () => {
  const t = useTranslations("About.coreFocus");
  const focuses = t.raw("focuses") as string[];

  return (
    <div className="backdrop-blur-[6px] bg-[rgba(250,250,250,0.8)] border border-[#eaeaea] rounded-lg p-6 flex flex-col gap-4">
      {/* Section Heading */}
      <h3 className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#414754] uppercase leading-[19.6px]">
        {t("heading")}
      </h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {focuses.map((focus, index) => (
          <div
            key={index}
            className="bg-[#e4e2e2] border border-[#c1c6d7] rounded-xs px-3.25 py-1 flex items-center">
            <span className="font-['JetBrains_Mono'] font-normal text-[13px] text-[#1b1c1c] leading-[20.8px]">
              {focus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreFocus;
