"use client";

import { Link } from "@/i18n/navigation";
import { FileText, HelpCircle, Image, LayoutDashboard, Plus, Settings } from "lucide-react";
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
    },
    {
      name: t("settings"),
      href: "/admin/settings",
      icon: Settings
    }
  ];

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <div className="flex min-h-screen bg-[#fbf9f8]">
      {/* Sidebar */}
      <aside className="w-60 bg-[#fbf9f8] border-r border-[#c1c6d7] flex flex-col">
        {/* Logo Header */}
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0058c3] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-base">C</span>
          </div>
          <div>
            <div className="font-['Geist:Bold'] font-bold text-[20px] text-[#1b1c1c] tracking-[-0.4px] leading-7">
              BlogAdmin
            </div>
            <div className="font-['Geist:Medium'] font-medium text-[12px] text-[#414754] tracking-[0.24px] leading-3">
              {t("version")}
            </div>
          </div>
        </div>

        {/* New Post Button */}
        <div className="px-4 pb-6">
          <Link href="/admin/posts/new">
            <button className="w-full bg-[#1b1c1c] text-[#fbf9f8] py-2 rounded-lg flex items-center justify-center gap-2 font-['Geist:Medium'] font-medium text-[13px] tracking-[0.13px] hover:bg-[#2a2b2b] transition-colors">
              <Plus className="w-[10.5px] h-[10.5px]" />
              {t("newPost")}
            </button>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}>
                <div
                  className={`flex items-center gap-4 px-2 py-2 rounded-lg font-['Geist:Regular'] text-[14px] tracking-[-0.14px] transition-colors ${
                    active ? "bg-[#e2e2e2] text-[#646464]" : "text-[#5e5e5e] hover:bg-[#f0f0f0]"
                  }`}>
                  <Icon className="w-4.5 h-4.5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Support Link */}
        <div className="px-4 pb-6">
          <a
            href="#"
            className="flex items-center gap-4 px-2 py-2 text-[#5e5e5e] font-['Geist:Regular'] text-[14px] tracking-[-0.14px] hover:bg-[#f0f0f0] rounded-lg transition-colors">
            <HelpCircle className="w-lg h-lg" />
            {t("support")}
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
