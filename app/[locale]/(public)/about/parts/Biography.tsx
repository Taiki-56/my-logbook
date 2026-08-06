"use client";

import { useTranslations } from "next-intl";

const Biography = () => {
  const t = useTranslations("About.biography");

  const paragraphs: string[] = t.raw("paragraphs");

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-['Geist'] font-bold text-[28px] lg:text-[40px] text-[#1b1c1c] tracking-[-0.03em] leading-[1.3] lg:leading-[1.2]">
        {t("heading")}
      </h2>
      <div className="flex flex-col gap-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="font-['Inter'] text-[15px] lg:text-[16px] text-[#414754] leading-[1.8] tracking-[0.01em]">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Biography;
