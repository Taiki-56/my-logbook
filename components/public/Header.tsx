"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../common/LanguageSwitcher";

/** Site-wide header with the logo, primary nav links, and the language switcher. */
const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbf9f8] border-b border-[#c1c6d7] border-solid w-full px-4 sm:px-8 lg:px-20">
      <div className="w-full mx-auto h-16 flex items-center justify-between">
        <Link
          href={"/home"}
          className="font-mono text-lg sm:text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
          <nav className="flex gap-4 sm:gap-6 items-center">
            <Link
              href={`/posts`}
              className={`flex flex-col items-start pb-1 border-b-2 transition-colors ${
                isActive("/posts") ? "border-[#0058c3]" : "border-transparent hover:border-[#c1c6d7]"
              }`}>
              <span
                className={`font-normal text-sm sm:text-base leading-6 transition-colors ${
                  isActive("/posts") ? "text-[#0058c3]" : "text-[#414754] hover:text-[#1b1c1c]"
                }`}>
                {t("Header.articles")}
              </span>
            </Link>
            <Link
              href={`/about`}
              className={`flex flex-col items-start pb-1 border-b-2 transition-colors ${
                isActive("/about") ? "border-[#0058c3]" : "border-transparent hover:border-[#c1c6d7]"
              }`}>
              <span
                className={`font-normal text-sm sm:text-base leading-6 whitespace-nowrap transition-colors ${
                  isActive("/about") ? "text-[#0058c3]" : "text-[#414754] hover:text-[#1b1c1c]"
                }`}>
                {t("Header.about")}
              </span>
            </Link>
            <div className="flex items-center pb-1 border-b-2 border-transparent">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
