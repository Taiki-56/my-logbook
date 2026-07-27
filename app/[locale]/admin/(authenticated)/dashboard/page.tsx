// "use client";

// import AdminSidebar from "@/components/admin/AdminSidebar";
// import { TrendingDown, TrendingUp } from "lucide-react";
// import { useTranslations } from "next-intl";

// const Page = () => {
//   const t = useTranslations("Admin.dashboard");

//   // Mock data for demonstration
//   const stats: Array<{
//     label: string;
//     value: string;
//     change: string;
//     trending: "up" | "down" | "stable";
//   }> = [
//     {
//       label: t("totalPosts"),
//       value: "124",
//       change: "+8%",
//       trending: "up"
//     },
//     {
//       label: t("draftPosts"),
//       value: "12",
//       change: "+2",
//       trending: "up"
//     },
//     {
//       label: t("published"),
//       value: "108",
//       change: "+6",
//       trending: "up"
//     },
//     {
//       label: t("private"),
//       value: "4",
//       change: "0",
//       trending: "stable"
//     }
//   ];

//   const recentActivity = [
//     {
//       title: "Implementing CI/CD for Frontend Projects",
//       action: t("edited"),
//       user: "Sarah Chen",
//       time: "2 min ago",
//       avatar: "/avatars/sarah.jpg"
//     },
//     {
//       title: "Advanced TypeScript Patterns",
//       action: t("translated"),
//       user: "Alex Rivera",
//       time: "15 min ago",
//       avatar: "/avatars/alex.jpg"
//     },
//     {
//       title: "Docker Best Practices 2024",
//       action: t("publishedAction"),
//       user: "Mike Johnson",
//       time: "1 hour ago",
//       avatar: "/avatars/mike.jpg"
//     }
//   ];

//   const systemStatus = [
//     { name: t("database"), status: t("operational"), color: "bg-green-500" },
//     { name: t("cdn"), status: t("operational"), color: "bg-green-500" }
//   ];

//   return (
//     <AdminSidebar>
//       {/* Main Content */}
//       <div className="text-center">
//         <div className="p-8">
//           {/* Overview Section */}
//           <section className="mb-8">
//             <div className="mb-4">
//               <h2 className="font-['Geist:Bold'] font-bold text-[18px] text-[#1b1c1c] mb-1">{t("overview")}</h2>
//               <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("metricsSubtitle")}</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="flex items-center gap-2 mb-6">
//               <span className="font-['Geist:Medium'] text-[12px] text-[#414754] tracking-[0.24px]">
//                 {t("lastDays")}
//               </span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {stats.map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
//                   <div className="font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
//                     {stat.label}
//                   </div>
//                   <div className="flex items-end justify-between">
//                     <div className="font-['Geist:Bold'] font-bold text-[32px] text-[#1b1c1c] leading-none">
//                       {stat.value}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       {stat.trending === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
//                       {stat.trending === "down" && <TrendingDown className="w-4 h-4 text-red-600" />}
//                       <span
//                         className={`font-['Geist:Medium'] text-[12px] ${
//                           stat.trending === "up"
//                             ? "text-green-600"
//                             : stat.trending === "down"
//                               ? "text-red-600"
//                               : "text-[#414754]"
//                         }`}>
//                         {stat.change}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-2 font-['Geist:Regular'] text-[11px] text-[#999]">{t("vsLastMonth")}</div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Recent Activity & System Status */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Recent Activity */}
//             <div className="lg:col-span-2 bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-['Geist:Bold'] font-bold text-[16px] text-[#1b1c1c]">{t("recentActivity")}</h3>
//                 <a
//                   href="#"
//                   className="font-['Geist:Medium'] text-[13px] text-[#0058c3] hover:underline">
//                   {t("viewAll")}
//                 </a>
//               </div>

//               {/* Table Header */}
//               <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[10px] text-[#414754] tracking-[0.8px]">
//                 <div className="col-span-5">{t("postTitle")}</div>
//                 <div className="col-span-2">{t("action")}</div>
//                 <div className="col-span-3">{t("user")}</div>
//                 <div className="col-span-2">{t("time")}</div>
//               </div>

//               {/* Table Rows */}
//               <div className="space-y-3">
//                 {recentActivity.map((activity, idx) => (
//                   <div
//                     key={idx}
//                     className="grid grid-cols-12 gap-4 items-center font-['Geist:Regular'] text-[13px]">
//                     <div className="col-span-5 text-[#1b1c1c] truncate">{activity.title}</div>
//                     <div className="col-span-2">
//                       <span className="inline-block px-2 py-1 bg-[#e2e2e2] text-[#414754] text-[11px] rounded-sm">
//                         {activity.action}
//                       </span>
//                     </div>
//                     <div className="col-span-3 flex items-center gap-2">
//                       <div className="w-6 h-6 bg-[#c1c6d7] rounded-full flex items-center justify-center text-[10px] text-white font-medium">
//                         {activity.user.charAt(0)}
//                       </div>
//                       <span className="text-[#414754] truncate">{activity.user}</span>
//                     </div>
//                     <div className="col-span-2 text-[#999]">{activity.time}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* System Status */}
//             <div className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-xl p-6">
//               <h3 className="font-['Geist:Bold'] font-bold text-[16px] text-[#1b1c1c] mb-4">{t("systemStatus")}</h3>

//               <div className="space-y-4 mb-6">
//                 {systemStatus.map((service, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-2 h-2 rounded-full ${service.color}`} />
//                       <span className="font-['Geist:Regular'] text-[13px] text-[#1b1c1c]">{service.name}</span>
//                     </div>
//                     <span className="font-['Geist:Regular'] text-[12px] text-[#414754]">{service.status}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="pt-4 border-t border-[#c1c6d7]">
//                 <div className="font-['Geist:Medium'] font-medium text-[10px] text-[#414754] tracking-[0.8px] mb-2">
//                   {t("translationQueue")}
//                 </div>
//                 <div className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c]">3</div>
//                 <div className="font-['Geist:Regular'] text-[11px] text-[#999]">{t("pendingItems")}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminSidebar>
//   );
// };

// export default Page;
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { Link } from "@/i18n/navigation";
import { Activity, AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Admin.dashboard");

  // MyLogbook向けの統計データ
  const stats = [
    {
      label: t("totalPosts"),
      value: "124",
      change: "+8",
      trending: "up"
    },
    {
      label: t("translationRate"),
      value: "87%",
      change: "+2%",
      trending: "up"
    },
    {
      label: t("draftPosts"),
      value: "12",
      change: "-3",
      trending: "down"
    },
    {
      label: t("currentStreak"),
      value: "14 days",
      change: "🔥",
      trending: "stable"
    }
  ];

  // 個人の活動ログ（言語とカテゴリーを強調）
  const recentActivity = [
    {
      title: "Next.js 15 App Router Architecture",
      category: "Tech",
      langs: ["JA", "EN"],
      status: "Published",
      time: "2 hours ago"
    },
    {
      title: "Push Day Routine & Macros",
      category: "Fitness",
      langs: ["JA"],
      status: "Draft",
      time: "5 hours ago"
    },
    {
      title: "Perfect Chocolate Chip Cookies",
      category: "Food",
      langs: ["JA", "EN"],
      status: "Published",
      time: "1 day ago"
    }
  ];

  // タグ（カテゴリー）の分布
  const categories = [
    { name: t("tech"), percentage: 45, color: "bg-[#0058c3]" },
    { name: t("fitness"), percentage: 30, color: "bg-[#1b1c1c]" },
    { name: t("food"), percentage: 15, color: "bg-[#e5a00d]" },
    { name: t("travel"), percentage: 10, color: "bg-[#10b981]" }
  ];

  return (
    <AdminSidebar>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Overview Section */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="font-mono font-bold text-[20px] text-[#1b1c1c] mb-1">{t("overview")}</h2>
            <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("metricsSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#c1c6d7] rounded-xl p-5 shadow-sm hover:border-[#0058c3] transition-colors">
                <div className="font-['Geist:Medium'] font-medium text-[12px] text-[#414754] tracking-[0.5px] mb-3 uppercase">
                  {stat.label}
                </div>
                <div className="flex items-end justify-between">
                  <div className="font-mono font-bold text-[32px] text-[#1b1c1c] leading-none tracking-tight">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trending === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {stat.trending === "down" && <TrendingDown className="w-4 h-4 text-green-600" />}
                    <span
                      className={`font-['Geist:Medium'] text-[12px] ${
                        stat.trending === "stable" ? "text-orange-500" : "text-green-600"
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Logs (Left: 2 Columns) */}
          <div className="lg:col-span-2 bg-white border border-[#c1c6d7] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-mono font-bold text-[16px] text-[#1b1c1c] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0058c3]" />
                {t("recentActivity")}
              </h3>
              <Link
                href="/admin/posts"
                className="font-['Geist:Medium'] text-[13px] text-[#0058c3] hover:underline">
                {t("viewAll")}
              </Link>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-[#e2e2e2] font-['Geist:Medium'] text-[11px] text-[#414754] tracking-[0.5px] uppercase">
              <div className="col-span-6">{t("postTitle")}</div>
              <div className="col-span-2">{t("category")}</div>
              <div className="col-span-2">{t("language")}</div>
              <div className="col-span-2">{t("time")}</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 items-center font-['Geist:Regular'] text-[13px] group">
                  <div className="col-span-6 text-[#1b1c1c] font-medium truncate group-hover:text-[#0058c3] transition-colors cursor-pointer">
                    {activity.title}
                  </div>
                  <div className="col-span-2">
                    <span className="inline-block px-2 py-1 bg-[#f5f5f5] border border-[#e2e2e2] text-[#414754] text-[11px] rounded-md">
                      {activity.category}
                    </span>
                  </div>
                  <div className="col-span-2 flex gap-1">
                    {activity.langs.map((lang) => (
                      <span
                        key={lang}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                          lang === "EN" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                        }`}>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-2 text-[#8c92a4] text-[12px]">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Analytics & Actions) */}
          <div className="space-y-6">
            {/* Translation Health Action Box */}
            <div className="bg-[#fff9f0] border border-[#ffe4b5] rounded-xl p-5 shadow-sm">
              <h3 className="font-mono font-bold text-[14px] text-[#b45309] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4" />
                {t("translationHealth")}
              </h3>
              <p className="text-[13px] text-[#b45309] mb-4">
                <strong>2</strong> {t("needsTranslation")}
              </p>
              <button className="w-full bg-white border border-[#ffe4b5] text-[#b45309] py-2 rounded-lg text-[13px] font-bold hover:bg-[#fff3e0] transition-colors shadow-sm">
                {t("translateNow")} →
              </button>
            </div>

            {/* Category Distribution */}
            <div className="bg-white border border-[#c1c6d7] rounded-xl p-6 shadow-sm">
              <h3 className="font-mono font-bold text-[16px] text-[#1b1c1c] mb-5">{t("categoryDistribution")}</h3>
              <div className="space-y-4">
                {categories.map((cat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[12px] font-['Geist:Medium'] mb-1.5">
                      <span className="text-[#414754]">{cat.name}</span>
                      <span className="text-[#1b1c1c] font-bold">{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#f0f0f0] rounded-full h-2">
                      <div
                        className={`${cat.color} h-2 rounded-full`}
                        style={{ width: `${cat.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Page;
