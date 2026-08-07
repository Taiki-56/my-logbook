"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
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

  const getFlag = (localeCode: string) => {
    const flags: Record<string, string> = {
      ja: "🇯🇵",
      en: "🇬🇧",
      fr: "🇫🇷",
      es: "🇪🇸"
    };
    return flags[localeCode] || "🌐";
  };

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
          {/* pt-1.5 を削除し、純粋な items-center で中央揃え */}
          <nav className="flex gap-6 items-center">
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

            {/* 国旗アイコン側にもリンクと同じ高さのボックス（pb-1.5 と透明ボーダー）を持たせることで、重心を完璧に一致させる */}
            <div className="flex flex-col items-center pb-1.5 border-b-2 border-transparent">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* アイコンの line-height による微細なズレを防ぐため、padding を細かく調整 */}
                  <button className="flex items-center justify-center px-2 py-0.5 hover:bg-[#eaeaea] rounded transition-colors h-[24px]">
                    <span className="text-[22px] leading-none">{getFlag(locale)}</span>
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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
