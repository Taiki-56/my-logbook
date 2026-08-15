/**
 * Admin login page. Redirects already-authenticated users to the dashboard;
 * otherwise renders the branding panel and the login form.
 */

import { redirect } from "@/i18n/navigation";
import { auth } from "@/libs/auth";
import { getTranslations } from "next-intl/server";
import LoginForm from "./parts/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false
  }
};

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect({ href: "/admin/dashboard", locale: "ja" });
  }

  const t = await getTranslations("Admin.login");

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl border border-[#c1c6d7] p-8 sm:p-10 md:p-12 shadow-sm">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
            <span>MyLogbook</span>
            <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
          </h1>
          <p className="font-['Geist:Regular'] text-[14px] sm:text-base text-[#414754] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
