import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PageHeader = async () => {
  const t = await getTranslations("Admin.posts.pageHeader");
  return (
    <div className="border-b border-[#c1c6d7] bg-white px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Geist:Bold'] font-bold text-[28px] text-[#1b1c1c]">{t("title")}</h1>
        <Link
          href={"/admin/posts/new"}
          className="bg-[#1b1c1c] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-['Geist:Medium'] font-medium text-[14px] hover:bg-[#2a2b2b] transition-colors">
          <Plus className="w-4 h-4" />
          {t("createPost")}
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
