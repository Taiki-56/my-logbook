import { getDashboardStatsAction } from "@/actions/post";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getTranslations } from "next-intl/server";
import CategoryDistribution from "./parts/CategoryDistribution";
import Overview from "./parts/Overview";
import RecentLogs from "./parts/RecentLogs";
import TranslationHealth from "./parts/TranslationHealth";

const Page = async () => {
  const t = await getTranslations("Admin.dashboard.general");
  const res = await getDashboardStatsAction();

  if (!res.success || !res.data) {
    return (
      <AdminSidebar>
        <div className="p-8 text-red-500">{t("loadError")}</div>
      </AdminSidebar>
    );
  }
  const { totalPosts, draftPosts, translationRate, currentStreak, recentActivity, categories, needsTranslationCount } =
    res.data;

  return (
    <AdminSidebar>
      <div className="p-8 max-w-7xl mx-auto">
        <Overview
          totalPosts={totalPosts}
          draftPosts={draftPosts}
          translationRate={translationRate}
          currentStreak={currentStreak}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentLogs activities={recentActivity} />
          <div className="space-y-6">
            <TranslationHealth count={needsTranslationCount} />
            <CategoryDistribution categories={categories} />
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Page;
