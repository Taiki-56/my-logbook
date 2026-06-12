"use client";

import { Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Admin.login");

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center p-4">
      <div className="w-full max-w-100 bg-white rounded-lg border border-[#c1c6d7] p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0058c3] rounded-xl mb-4">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c] mb-2">{t("title")}</h1>
          <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-['Geist:Medium'] font-medium text-[12px] text-[#1b1c1c] tracking-[0.24px] mb-2">
              {t("emailLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail className="w-4.5 h-4.5 text-[#414754]" />
              </div>
              <input
                type="email"
                id="email"
                placeholder={t("emailPlaceholder")}
                className="w-full h-11 pl-11 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block font-['Geist:Medium'] font-medium text-[12px] text-[#1b1c1c] tracking-[0.24px] mb-2">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-4.5 h-4.5 text-[#414754]" />
              </div>
              <input
                type="password"
                id="password"
                placeholder={t("passwordPlaceholder")}
                className="w-full h-11 pl-11 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="font-['Geist:Regular'] text-[14px] text-[#0058c3] hover:underline">
              {t("forgotPassword")}
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 bg-[#1b1c1c] text-white font-['Geist:Medium'] font-medium text-[14px] rounded-lg hover:bg-[#2a2b2b] transition-colors">
            {t("signInButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
