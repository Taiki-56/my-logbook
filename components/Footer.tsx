"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();
  return (
    <div className="bg-[#f5f3f3] border-[#c1c6d7] border-solid border-t flex flex-col items-start pb-16 pt-16 px-10">
      <div className="max-w-300 w-full mx-auto">
        <div className="flex items-center justify-between px-6">
          <Link href={`/home`} className="h-[31.19px] w-[100.89px]">
            <h1 className="font-serif font-bold text-[#1b1c1c] text-2xl leading-[31.2px]">
              {t("Common.siteName")}
            </h1>
          </Link>
          <div>
            <p className="font-normal text-[#414754] text-base leading-6">
              {t("Footer.copyright")}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-[#414754] text-base leading-6">
              {t("Footer.privacyPolicy")}
            </Link>
            <Link href="#" className="text-[#414754] text-base leading-6">
              {t("Footer.termsOfService")}
            </Link>
            <Link href="#" className="text-[#414754] text-base leading-6">
              {t("Footer.contact")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
