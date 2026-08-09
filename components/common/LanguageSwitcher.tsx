"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center px-2 py-0.5 hover:bg-[#eaeaea] rounded transition-colors h-6">
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
  );
};

export default LanguageSwitcher;
