"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const handleChangeLanguage = (lang: string) => {
    router.replace(pathname, { locale: lang });
  };

  // Get flag emoji for locale
  const getFlag = (localeCode: string) => {
    const flags: Record<string, string> = {
      ja: "🇯🇵",
      en: "🇬🇧",
      fr: "🇫🇷",
      es: "🇪🇸"
    };
    return flags[localeCode] || "🌐";
  };

  // Determine if a link is active
  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <header className="bg-[#fbf9f8] border-b border-[#c1c6d7] border-solid w-full px-20">
      <div className="w-full mx-auto h-16 lg:px-8 flex items-center justify-between">
        <Link
          href={"/home"}
          className="font-mono text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          {/* Navigation Section */}
          <nav className="flex gap-6 items-center pt-1.5">
            <Link
              href={`/posts`}
              className={`flex flex-col items-start pb-1.5 border-b-2 transition-colors ${
                isActive("/posts") ? "border-[#0058c3]" : "border-transparent hover:border-[#c1c6d7]"
              }`}>
              <span
                className={`font-normal text-base leading-6 transition-colors ${
                  isActive("/posts") ? "text-[#0058c3]" : "text-[#414754] hover:text-[#1b1c1c]"
                }`}>
                {t("Header.articles")}
              </span>
            </Link>

            <Link
              href={`/about`}
              className={`flex flex-col items-start pb-1.5 border-b-2 transition-colors ${
                isActive("/about") ? "border-[#0058c3]" : "border-transparent hover:border-[#c1c6d7]"
              }`}>
              <span
                className={`font-normal text-base leading-6 transition-colors ${
                  isActive("/about") ? "text-[#0058c3]" : "text-[#414754] hover:text-[#1b1c1c]"
                }`}>
                {t("Header.about")}
              </span>
            </Link>
          </nav>

          {/* Utility Section */}
          <div className="flex gap-3 items-center">
            {/* Search Icon Button */}
            <Link
              href={`/posts`}
              className="flex items-center justify-center p-2 hover:bg-[#f5f3f3] rounded-full transition-colors">
              <div className="w-4.5 h-4.5 relative flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
                    fill="#414754"
                  />
                </svg>
              </div>
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex gap-1 items-center px-2 py-1 hover:bg-[#f5f3f3] rounded transition-colors">
                  <span className="text-2xl">{getFlag(locale)}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-[#c1c6d7]">
                {[
                  { code: "ja", label: "🇯🇵 日本語" },
                  { code: "en", label: "🇬🇧 English" },
                  { code: "fr", label: "🇫🇷 Français" },
                  { code: "es", label: "🇪🇸 Español" }
                ].map(({ code, label }) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => handleChangeLanguage(code)}
                    className={`cursor-pointer font-['JetBrains_Mono'] ${
                      locale === code ? "bg-[#f5f3f3]" : ""
                    } text-[#414754] hover:bg-[#f5f3f3]`}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
