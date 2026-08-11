"use client";

import { Link } from "@/i18n/navigation";
import { Home, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname() || "";
  const isAdmin = pathname.includes("/admin");

  const t = useTranslations("NotFound");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md bg-white rounded-xl border border-[#c1c6d7] p-8 sm:p-10 text-center shadow-sm">
          <div className="font-mono text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight flex items-center justify-center mb-6">
            <span className="text-[#c1c6d7]">&lt;</span>
            <span>MyLogbook</span>
            <span className="text-[#c1c6d7] ml-1">/&gt;</span>
          </div>
          <div className="font-mono text-[80px] font-bold text-[#1b1c1c] leading-none mb-2">404</div>
          <h1 className="font-bold text-lg text-[#1b1c1c] mb-3">{t("title")}</h1>
          <p className="text-[14px] text-[#414754] mb-8 leading-relaxed">{t("description")}</p>
          <Link
            className="w-full h-12 sm:h-14 bg-[#1b1c1c] text-white font-medium text-[15px] sm:text-base rounded-lg hover:bg-[#2a2b2b] transition-colors flex items-center justify-center gap-2"
            href="/admin/dashboard">
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>{t("backToDashboard")}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#f0f5ff] mb-8">
          <span className="font-mono text-4xl sm:text-5xl font-bold text-[#0058c3]">404</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1b1c1c] tracking-tight mb-4">{t("title")}</h1>
        <p className="text-[15px] sm:text-base text-[#5e5e5e] leading-relaxed mb-10">{t("description")}</p>

        <Link
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0058c3] text-white font-medium rounded-full hover:bg-[#0046a0] transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
          href="/home">
          <Home className="w-4.5 h-4.5 shrink-0" />
          <span>{t("backToHome")}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
