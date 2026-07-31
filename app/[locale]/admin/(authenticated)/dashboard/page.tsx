import { getDashboardStatsAction } from "@/actions/post";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Link } from "@/i18n/navigation";
import { Activity, AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Page = async () => {
  const t = await getTranslations("Admin.dashboard");

  const res = await getDashboardStatsAction();

  if (!res.success || !res.data) {
    return (
      <AdminSidebar>
        <div className="p-8 text-red-500">ダッシュボードデータの読み込みに失敗しました。</div>
      </AdminSidebar>
    );
  }

  const { totalPosts, draftPosts, translationRate, currentStreak, recentActivity, categories, needsTranslationCount } =
    res.data;

  // 🌟 変更・不要な change を削除し、currentStreak が1日以上なら 🔥 を付与
  const stats = [
    {
      label: t("totalPosts"),
      value: totalPosts
    },
    {
      label: t("translationRate"),
      value: translationRate
    },
    {
      label: t("draftPosts"),
      value: draftPosts
    },
    {
      label: t("currentStreak"),
      value: `${currentStreak} days`,
      change: currentStreak >= 1 ? "🔥" : undefined
    }
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
                  {/* 🌟 存在する場合のみ 🔥 マークを表示 */}
                  {stat.change && (
                    <div className="flex items-center gap-1">
                      <span className="text-lg">{stat.change}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Grid (以下略・前回と同じ) */}
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

            <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-[#e2e2e2] font-['Geist:Medium'] text-[11px] text-[#414754] tracking-[0.5px] uppercase">
              <div className="col-span-6">{t("postTitle")}</div>
              <div className="col-span-2">{t("category")}</div>
              <div className="col-span-2">{t("language")}</div>
              <div className="col-span-2">{t("time")}</div>
            </div>

            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 items-center font-['Geist:Regular'] text-[13px] group">
                    <div className="col-span-6 truncate">
                      <Link
                        href={`/admin/posts/edit/${activity.slug}`}
                        className="text-[#1b1c1c] font-medium group-hover:text-[#0058c3] transition-colors">
                        {activity.title}
                      </Link>
                    </div>
                    <div className="col-span-2">
                      <span className="inline-block px-2 py-1 bg-[#f5f5f5] border border-[#e2e2e2] text-[#414754] text-[11px] rounded-md">
                        {activity.category}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm inline-block ${
                          activity.lang === "EN"
                            ? "bg-blue-100 text-blue-700"
                            : activity.lang === "FR"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                        {activity.lang}
                      </span>
                    </div>
                    <div className="col-span-2 text-[#8c92a4] text-[12px]">{activity.time}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 py-4 text-center">アクティビティがありません</div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-[#fff9f0] border border-[#ffe4b5] rounded-xl p-5 shadow-sm">
              <h3 className="font-mono font-bold text-[14px] text-[#b45309] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4" />
                {t("translationHealth")}
              </h3>
              <p className="text-[13px] text-[#b45309] mb-4">
                <strong>{Math.max(0, needsTranslationCount)}</strong> {t("needsTranslation")}
              </p>
              <Link
                href="/admin/posts"
                className="block text-center w-full bg-white border border-[#ffe4b5] text-[#b45309] py-2 rounded-lg text-[13px] font-bold hover:bg-[#fff3e0] transition-colors shadow-sm">
                {t("translateNow")} →
              </Link>
            </div>

            <div className="bg-white border border-[#c1c6d7] rounded-xl p-6 shadow-sm">
              <h3 className="font-mono font-bold text-[16px] text-[#1b1c1c] mb-5">{t("categoryDistribution")}</h3>
              <div className="space-y-4">
                {categories.length > 0 ? (
                  categories.map((cat, idx) => (
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
                  ))
                ) : (
                  <div className="text-sm text-gray-400">カテゴリーデータがありません</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Page;
