"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

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
    <header className="bg-[#fbf9f8] border-b border-[#c1c6d7] border-solid px-0">
      <div className="max-w-300 mx-auto h-16 px-0 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          href={`/home`}
          className="flex items-center">
          <Image
            src="/icons/blog-icon.png"
            alt={t("Common.siteName")}
            width={200}
            height={200}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation Section */}
        <nav className="flex gap-8 items-start">
          <Link
            href={`/posts`}
            className={`flex flex-col items-start pb-1.5 ${isActive("/posts") ? "border-b-2 border-[#0058c3]" : ""}`}>
            <span
              className={`font-normal text-base leading-6 ${isActive("/posts") ? "text-[#0058c3]" : "text-[#414754]"}`}>
              {t("Header.articles")}
            </span>
          </Link>

          <Link
            href={`/about`}
            className={`flex flex-col items-start pb-1.5 ${isActive("/about") ? "border-b-2 border-[#0058c3]" : ""}`}>
            <span
              className={`font-normal text-base leading-6 ${isActive("/about") ? "text-[#0058c3]" : "text-[#414754]"}`}>
              {t("Header.about")}
            </span>
          </Link>
        </nav>

        {/* Utility Section */}
        <div className="flex gap-4 items-center">
          {/* Search Icon Button */}
          <Link
            href={`/posts`}
            className="flex items-center justify-center">
            <div className="w-4.5 h-4.5 relative">
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
    </header>
  );
};

export default Header;
