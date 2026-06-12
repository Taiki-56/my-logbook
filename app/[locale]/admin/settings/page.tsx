"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("Admin.settings");

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-[#c1c6d7] bg-white px-8 py-6">
          <h1 className="font-['Geist:Bold'] font-bold text-[28px] text-[#1b1c1c] mb-2">{t("title")}</h1>
          <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("subtitle")}</p>
        </header>

        {/* Form */}
        <div className="p-8 max-w-3xl">
          <form className="space-y-8">
            {/* Site Logo */}
            <div>
              <label className="block font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                {t("siteLogo")}
              </label>
              <div className="flex items-start gap-4">
                {/* Logo Preview */}
                <div className="w-24 h-24 border-2 border-dashed border-[#c1c6d7] rounded-xl flex items-center justify-center bg-[#fbf9f8]">
                  <div className="w-12 h-12 bg-[#0058c3] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">C</span>
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="flex-1">
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#c1c6d7] rounded-lg font-['Geist:Medium'] font-medium text-[13px] text-[#1b1c1c] hover:bg-[#fbf9f8] transition-colors cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload New Logo
                  </label>
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/jpeg,image/png"
                    className="hidden"
                  />
                  <p className="font-['Geist:Regular'] text-[12px] text-[#999] mt-2 leading-relaxed">
                    {t("logoInstructions")}
                  </p>
                  <button
                    type="button"
                    className="mt-3 font-['Geist:Regular'] text-[13px] text-red-600 hover:underline">
                    {t("removeLogo")}
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#c1c6d7] pt-8">
              {/* Site Name */}
              <div className="mb-6">
                <label
                  htmlFor="site-name"
                  className="block font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                  {t("siteName")}
                </label>
                <input
                  type="text"
                  id="site-name"
                  defaultValue="Chronicle"
                  className="w-full h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                  {t("description")}
                </label>
                <textarea
                  id="description"
                  rows={4}
                  defaultValue="A multilingual blog platform for sharing stories, experiences, and technical insights from around the world."
                  className="w-full px-4 py-3 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] resize-none focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
                />
                <p className="font-['Geist:Regular'] text-[12px] text-[#999] mt-2">{t("descriptionHelp")}</p>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="border-t border-[#c1c6d7] pt-8">
              <h3 className="font-['Geist:Bold'] font-bold text-[16px] text-[#1b1c1c] mb-6">{t("socialProfiles")}</h3>

              {/* GitHub URL */}
              <div className="mb-6">
                <label
                  htmlFor="github-url"
                  className="block font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                  {t("githubUrl")}
                </label>
                <input
                  type="url"
                  id="github-url"
                  placeholder="https://github.com/username"
                  defaultValue="https://github.com/alexmercer"
                  className="w-full h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
                />
              </div>

              {/* Twitter URL */}
              <div>
                <label
                  htmlFor="twitter-url"
                  className="block font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] mb-3">
                  {t("twitterUrl")}
                </label>
                <input
                  type="url"
                  id="twitter-url"
                  placeholder="https://twitter.com/username"
                  defaultValue="https://twitter.com/alexmercer"
                  className="w-full h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-[#c1c6d7]">
              <button
                type="submit"
                className="bg-[#1b1c1c] text-white px-6 py-2.5 rounded-lg font-['Geist:Medium'] font-medium text-[14px] hover:bg-[#2a2b2b] transition-colors">
                {t("saveChanges")}
              </button>
              <button
                type="button"
                className="px-6 py-2.5 border border-[#c1c6d7] rounded-lg font-['Geist:Medium'] font-medium text-[14px] text-[#414754] hover:bg-[#fbf9f8] transition-colors">
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebar>
  );
}
