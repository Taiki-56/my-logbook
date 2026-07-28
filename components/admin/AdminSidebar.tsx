"use client";

import { Link } from "@/i18n/navigation";
import { FileText, Image, LayoutDashboard, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AdminSidebarProps {
  children: ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const t = useTranslations("Admin.sidebar");
  const pathname = usePathname();

  const navItems = [
    {
      name: t("dashboard"),
      href: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      name: t("posts"),
      href: "/admin/posts",
      icon: FileText
    },
    {
      name: t("media"),
      href: "/admin/media",
      icon: Image
    }
  ];

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  return (
    // 修正: min-h-screen をやめ、画面全体からヘッダーの高さ(約73px)を引いた高さに固定
    <div className="flex h-[calc(100vh-73px)] bg-[#fbf9f8]">
      {/* Sidebar: overflow-y-auto でサイドバー単体でスクロールできるようにする */}
      <aside className="w-60 bg-[#fbf9f8] border-r border-[#c1c6d7] flex flex-col overflow-y-auto pt-6">
        {/* New Post Button */}
        <div className="px-4 pb-6">
          <Link href="/admin/posts/new">
            <button className="w-full bg-[#1b1c1c] text-[#fbf9f8] py-2 rounded-lg flex items-center justify-center gap-2 font-['Geist:Medium'] font-medium text-[13px] tracking-[0.13px] hover:bg-[#2a2b2b] transition-colors shadow-sm">
              <Plus className="w-[10.5px] h-[10.5px]" />
              {t("newPost")}
            </button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-['Geist:Regular'] text-[14px] tracking-[-0.14px] transition-colors ${
                    active
                      ? "bg-[#e2e2e2] text-[#1b1c1c] font-medium"
                      : "text-[#5e5e5e] hover:bg-[#f0f0f0] hover:text-[#1b1c1c]"
                  }`}>
                  <Icon className="w-4.5 h-4.5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content: overflow-y-auto でメイン領域のみスクロールさせる */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
