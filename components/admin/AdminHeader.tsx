import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "../common/LanguageSwitcher";
import LogOutButton from "./LogOutButton";

const AdminHeader = async () => {
  const t = await getTranslations("Admin.adminHeader");

  return (
    <header className="border-b border-[#c1c6d7] bg-white sticky top-0 z-10 shrink-0">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        {/* 左側：ロゴ */}
        <Link
          href={"/admin/dashboard"}
          className="font-mono text-[18px] md:text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>

        {/* 右側：アクション群 */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* 1. ナビゲーションアクション（公開ページ） */}
          <Link
            href="/home"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 text-[13px] font-['Geist:Medium'] text-[#414754] hover:text-[#0058c3] hover:bg-[#f5f3f3] rounded-md transition-colors">
            <span className="hidden md:inline">{t("publicPage")}</span>
            <ExternalLink
              className="w-4 h-4 md:w-3.5 md:h-3.5 -mt-px"
              strokeWidth={2.5}
            />
          </Link>

          {/* 2. 視覚的な区切り線（Divider） */}
          <div className="w-px h-5 bg-[#e4e2e2] mx-0.5 md:mx-1" />

          {/* 3. システムアクション（言語・ログアウト） */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <LanguageSwitcher />
            <LogOutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
