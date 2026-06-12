"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { Bell, Search, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Admin.dashboard");

  // Mock data for demonstration
  const stats = [
    {
      label: t("totalPosts"),
      value: "124",
      change: "+8%",
      trending: "up" as const
    },
    {
      label: t("draftPosts"),
      value: "12",
      change: "+2",
      trending: "up" as const
    },
    {
      label: t("published"),
      value: "108",
      change: "+6",
      trending: "up" as const
    },
    {
      label: t("private"),
      value: "4",
      change: "0",
      trending: "stable" as const
    }
  ];

  const recentActivity = [
    {
      title: "Implementing CI/CD for Frontend Projects",
      action: t("edited"),
      user: "Sarah Chen",
      time: "2 min ago",
      avatar: "/avatars/sarah.jpg"
    },
    {
      title: "Advanced TypeScript Patterns",
      action: t("translated"),
      user: "Alex Rivera",
      time: "15 min ago",
      avatar: "/avatars/alex.jpg"
    },
    {
      title: "Docker Best Practices 2024",
      action: t("publishedAction"),
      user: "Mike Johnson",
      time: "1 hour ago",
      avatar: "/avatars/mike.jpg"
    }
  ];

  const systemStatus = [
    { name: t("database"), status: t("operational"), color: "bg-green-500" },
    { name: t("cdn"), status: t("operational"), color: "bg-green-500" }
  ];

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-[#c1c6d7] bg-white sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c]">{t("title")}</h1>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-70 h-10 pl-10 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] focus:outline-none focus:border-[#0058c3]"
                />
              </div>
              {/* Notifications */}
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c1c6d7] hover:bg-[#f5f5f5]">
                <Bell className="w-5 h-5 text-[#414754]" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-8 flex gap-6">
            <button className="pb-3 border-b-2 border-[#1b1c1c] font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c]">
              {t("tabDashboard")}
            </button>
            <button className="pb-3 border-b-2 border-transparent font-['Geist:Regular'] text-[14px] text-[#414754] hover:text-[#1b1c1c]">
              {t("tabPosts")}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8">
          {/* Overview Section */}
          <section className="mb-8">
            <div className="mb-4">
              <h2 className="font-['Geist:Bold'] font-bold text-[18px] text-[#1b1c1c] mb-1">{t("overview")}</h2>
              <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("metricsSubtitle")}</p>
            </div>

            {/* Stats Cards */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-['Geist:Medium'] text-[12px] text-[#414754] tracking-[0.24px]">
                {t("lastDays")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
                  <div className="font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                    {stat.label}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="font-['Geist:Bold'] font-bold text-[32px] text-[#1b1c1c] leading-none">
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-1">
                      {stat.trending === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {stat.trending === "down" && <TrendingDown className="w-4 h-4 text-red-600" />}
                      <span
                        className={`font-['Geist:Medium'] text-[12px] ${
                          stat.trending === "up"
                            ? "text-green-600"
                            : stat.trending === "down"
                              ? "text-red-600"
                              : "text-[#414754]"
                        }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 font-['Geist:Regular'] text-[11px] text-[#999]">{t("vsLastMonth")}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Geist:Bold'] font-bold text-[16px] text-[#1b1c1c]">{t("recentActivity")}</h3>
                <a
                  href="#"
                  className="font-['Geist:Medium'] text-[13px] text-[#0058c3] hover:underline">
                  {t("viewAll")}
                </a>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[10px] text-[#414754] tracking-[0.8px]">
                <div className="col-span-5">{t("postTitle")}</div>
                <div className="col-span-2">{t("action")}</div>
                <div className="col-span-3">{t("user")}</div>
                <div className="col-span-2">{t("time")}</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 items-center font-['Geist:Regular'] text-[13px]">
                    <div className="col-span-5 text-[#1b1c1c] truncate">{activity.title}</div>
                    <div className="col-span-2">
                      <span className="inline-block px-2 py-1 bg-[#e2e2e2] text-[#414754] text-[11px] rounded-sm">
                        {activity.action}
                      </span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#c1c6d7] rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                        {activity.user.charAt(0)}
                      </div>
                      <span className="text-[#414754] truncate">{activity.user}</span>
                    </div>
                    <div className="col-span-2 text-[#999]">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
              <h3 className="font-['Geist:Bold'] font-bold text-[16px] text-[#1b1c1c] mb-4">{t("systemStatus")}</h3>

              <div className="space-y-4 mb-6">
                {systemStatus.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${service.color}`} />
                      <span className="font-['Geist:Regular'] text-[13px] text-[#1b1c1c]">{service.name}</span>
                    </div>
                    <span className="font-['Geist:Regular'] text-[12px] text-[#414754]">{service.status}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#c1c6d7]">
                <div className="font-['Geist:Medium'] font-medium text-[10px] text-[#414754] tracking-[0.8px] mb-2">
                  {t("translationQueue")}
                </div>
                <div className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c]">3</div>
                <div className="font-['Geist:Regular'] text-[11px] text-[#999]">{t("pendingItems")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
