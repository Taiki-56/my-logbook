import { Bell, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import SignOut from "./AuthComponents";

const AdminHeader = () => {
  const t = useTranslations("Admin.dashboard");

  return (
    <>
      {/* Header */}
      <header className="border-b border-[#c1c6d7] bg-white sticky top-0 z-10">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c]">{t("title")}</h1>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-70 h-10 pl-10 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] focus:outline-none focus:border-[#0058c3]"
              />
            </div>
            {/* Notifications */}
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#c1c6d7] hover:bg-[#f5f5f5]">
              <Bell className="w-5 h-5 text-[#414754]" />
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="px-8 flex gap-6">
          <button className="pb-3 border-b-2 border-[#1b1c1c] font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c]">
            {t("tabDashboard")}
          </button>
          <button className="pb-3 border-b-2 border-transparent font-['Geist:Regular'] text-[14px] text-[#414754] hover:text-[#1b1c1c]">
            {t("tabPosts")}
          </button>
        </div>
        <SignOut />
      </header>
    </>
  );
};

export default AdminHeader;
