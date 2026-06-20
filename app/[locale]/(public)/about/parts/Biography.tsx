"use client";

import { useTranslations } from "next-intl";

const Biography = () => {
  const t = useTranslations("About.biography");
  return (
    <div className="flex flex-col gap-6 max-w-170">
      {/* Heading */}
      <h2 className="font-['Geist'] font-bold text-[32px] lg:text-[48px] text-[#1b1c1c] tracking-[-0.64px] lg:tracking-[-1.92px] leading-[38.4px] lg:leading-[52.8px]">
        {t("heading")}
      </h2>

      {/* Biography Content */}
      <div className="flex flex-col gap-6">
        <p className="font-['Inter'] font-normal text-[16px] lg:text-[18px] text-[#414754] leading-[25.6px] lg:leading-[28.8px]">
          {t("paragraph1")}
        </p>

        <p className="font-['Inter'] font-normal text-[16px] lg:text-[18px] text-[#414754] leading-[25.6px] lg:leading-[28.8px]">
          {t("paragraph2")}
        </p>
      </div>
    </div>
  );
};

export default Biography;
