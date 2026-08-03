"use client";

import { useTranslations } from "next-intl";

const Title = () => {
  const t = useTranslations("Home.title");
  return (
    <div className="flex flex-col gap-4 py-16">
      <div className="w-full">
        <h1 className="text-[#1b1c1c] text-[32px] font-medium tracking-[-0.64px] leading-[38.4px]">{t("title")}</h1>
      </div>
      <div className="w-full">
        <p className="text-[#414754] text-lg font-normal leading-[29.25px]">{t("subtitle")}</p>
      </div>
    </div>
  );
};

export default Title;
