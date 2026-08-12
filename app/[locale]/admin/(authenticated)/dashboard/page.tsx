/**
 * Admin dashboard page. Fetches aggregate stats for the authenticated user and renders
 * the overview cards, recent activity log, translation health, and category distribution.
 */

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
        <div className="p-4 md:p-8 text-red-500">{t("loadError")}</div>
      </AdminSidebar>
    );
  }

  const { totalPosts, draftPosts, translationRate, currentStreak, recentActivity, categories, needsTranslationCount } =
    res.data;

  return (
    <AdminSidebar>
      <div className="p-4 md:p-8 2xl:p-10 max-w-400 mx-auto w-full">
        <Overview
          totalPosts={totalPosts}
          draftPosts={draftPosts}
          translationRate={translationRate}
          currentStreak={currentStreak}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <RecentLogs activities={recentActivity} />
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <TranslationHealth count={needsTranslationCount} />
            <CategoryDistribution categories={categories} />
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Page;
