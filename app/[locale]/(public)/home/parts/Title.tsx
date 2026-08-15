import { useTranslations } from "next-intl";

/** Renders the home page's translated title and subtitle. */
const Title = () => {
  const t = useTranslations("Home.title");
  return (
    <div className="flex flex-col gap-3 sm:gap-4 py-8 sm:py-12 lg:py-16">
      <div className="w-full">
        <h1 className="text-[#1b1c1c] text-2xl sm:text-[28px] lg:text-[32px] font-medium tracking-[-0.64px] leading-tight sm:leading-[38.4px]">
          {t("title")}
        </h1>
      </div>
      <div className="w-full">
        <p className="text-[#414754] text-base sm:text-lg font-normal leading-relaxed sm:leading-[29.25px]">
          {t("subtitle")}
        </p>
      </div>
    </div>
  );
};

export default Title;
