import { getTranslations } from "next-intl/server";

type Props = {
  totalPosts: string;
  translationRate: string;
  draftPosts: string;
  currentStreak: number;
};

const Overview = async ({ totalPosts, translationRate, draftPosts, currentStreak }: Props) => {
  const t = await getTranslations("Admin.dashboard.overview");

  const stats = [
    { label: t("totalPosts"), value: totalPosts },
    { label: t("translationRate"), value: translationRate },
    { label: t("draftPosts"), value: draftPosts },
    {
      label: t("currentStreak"),
      value: `${currentStreak} days`,
      change: currentStreak >= 1 ? "🔥" : undefined
    }
  ];

  return (
    <section className="mb-8">
      <div className="mb-6">
        <h2 className="font-mono font-bold text-[20px] text-[#1b1c1c] mb-1">{t("title")}</h2>
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
  );
};

export default Overview;
