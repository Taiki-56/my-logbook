import { Link } from "@/i18n/navigation";
import { Activity } from "lucide-react";
import { getTranslations } from "next-intl/server";

type ActivityItem = {
  slug: string;
  title: string;
  category: string;
  lang: string;
  time: string;
};

type Props = {
  activities: ActivityItem[];
};

const RecentLogs = async ({ activities }: Props) => {
  const t = await getTranslations("Admin.dashboard.recentLogs");

  return (
    <div className="lg:col-span-2 bg-white border border-[#c1c6d7] rounded-xl p-4 md:p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="font-mono font-bold text-[16px] text-[#1b1c1c] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#0058c3]" />
          {t("title")}
        </h3>
        <Link
          href="/admin/posts"
          className="font-['Geist:Medium'] text-[13px] text-[#0058c3] hover:underline">
          {t("viewAll")}
        </Link>
      </div>

      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="min-w-125">
          <div className="grid grid-cols-12 gap-4 pb-3 mb-3 border-b border-[#e2e2e2] font-['Geist:Medium'] text-[11px] text-[#414754] tracking-[0.5px] uppercase">
            <div className="col-span-6">{t("postTitle")}</div>
            <div className="col-span-2">{t("category")}</div>
            <div className="col-span-2">{t("language")}</div>
            <div className="col-span-2">{t("time")}</div>
          </div>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
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
                  <div className="col-span-2 text-[#8c92a4] text-[12px] whitespace-nowrap">{activity.time}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-400 py-4 text-center">{t("Admin.dashboard.noActivity")}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentLogs;
