import { Link } from "@/i18n/navigation";
import { AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Props = {
  count: number;
};

/** Dashboard card highlighting how many posts still need translation, linking to the posts list. */
const TranslationHealth = async ({ count }: Props) => {
  const t = await getTranslations("Admin.dashboard.translationHealth");

  return (
    <div className="bg-[#fff9f0] border border-[#ffe4b5] rounded-xl p-5 shadow-sm">
      <h3 className="font-mono font-bold text-[14px] text-[#b45309] flex items-center gap-2 mb-3">
        <AlertCircle className="w-4 h-4" />
        {t("title")}
      </h3>
      <p className="text-[13px] text-[#b45309] mb-4">
        <strong>{Math.max(0, count)}</strong> {t("needsTranslation")}
      </p>
      <Link
        href="/admin/posts"
        className="block text-center w-full bg-white border border-[#ffe4b5] text-[#b45309] py-2 rounded-lg text-[13px] font-bold hover:bg-[#fff3e0] transition-colors shadow-sm">
        {t("translateNow")} →
      </Link>
    </div>
  );
};

export default TranslationHealth;
