import { getTranslations } from "next-intl/server";

type CategoryStat = {
  name: string;
  percentage: number;
  color: string;
};

type Props = {
  categories: CategoryStat[];
};

const CategoryDistribution = async ({ categories }: Props) => {
  const t = await getTranslations("Admin.dashboard.categoryDistribution");

  return (
    <div className="bg-white border border-[#c1c6d7] rounded-xl p-6 shadow-sm">
      <h3 className="font-mono font-bold text-[16px] text-[#1b1c1c] mb-5">{t("title")}</h3>
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
          <div className="text-sm text-gray-400">{t("noCategoryData")}</div>
        )}
      </div>
    </div>
  );
};

export default CategoryDistribution;
