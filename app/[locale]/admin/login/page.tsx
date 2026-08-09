import { redirect } from "@/i18n/navigation";
import { auth } from "@/libs/auth";
import { getTranslations } from "next-intl/server";
import LoginForm from "./parts/LoginForm";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect({ href: "/admin/dashboard", locale: "ja" });
  }

  const t = await getTranslations("Admin.login");

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center p-4">
      <div className="w-full max-w-100 bg-white rounded-lg border border-[#c1c6d7] p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-mono text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center justify-center mb-2">
            <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
            <span>MyLogbook</span>
            <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
          </h1>
          <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("subtitle")}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
