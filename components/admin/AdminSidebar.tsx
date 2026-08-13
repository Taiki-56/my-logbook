"use client";

import { Link } from "@/i18n/navigation";
import { FileText, Image, LayoutDashboard, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AdminSidebarProps {
  children: ReactNode;
}

/** Admin shell layout: desktop sidebar / mobile bottom nav plus the page content. */
const AdminSidebar = ({ children }: AdminSidebarProps) => {
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

  /** Whether the given nav item's href matches (or is a parent of) the current path. */
  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <div className="flex h-[calc(100dvh-60px)] md:h-[calc(100vh-73px)] bg-[#fbf9f8]">
      <aside className="hidden md:flex w-60 bg-[#fbf9f8] border-r border-[#c1c6d7] flex-col overflow-y-auto pt-6">
        <div className="px-4 pb-6">
          <Link href="/admin/posts/new">
            <button className="w-full bg-[#1b1c1c] text-[#fbf9f8] py-2 rounded-lg flex items-center justify-center gap-2 font-['Geist:Medium'] font-medium text-[13px] tracking-[0.13px] hover:bg-[#2a2b2b] transition-colors shadow-sm">
              <Plus className="w-[10.5px] h-[10.5px]" />
              {t("newPost")}
            </button>
          </Link>
        </div>

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
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#c1c6d7] flex justify-around items-center h-16 z-50 px-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link
          href="/admin/posts/new"
          className="p-2 text-[#414754] flex flex-col items-center gap-1">
          <div className="bg-[#1b1c1c] text-white p-1.5 rounded-full shadow-sm">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-['Geist:Medium'] whitespace-nowrap">{t("newPost")}</span>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 flex flex-col items-center gap-1 transition-colors ${
                active ? "text-[#0058c3]" : "text-[#5e5e5e]"
              }`}>
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-['Geist:Medium'] whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
