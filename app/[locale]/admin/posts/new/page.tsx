"use client";

import AdminSidebar from "@/components/AdminSidebar";
import {
  AlignCenter,
  AlignLeft,
  ArrowRight,
  Bold,
  Code,
  ImagePlus,
  Italic,
  Sparkles,
  Underline,
  X
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function NewPostPage() {
  const t = useTranslations("Admin.editor");
  const [activeLanguage, setActiveLanguage] = useState<"ja" | "en" | "fr">("ja");
  const [autoSync, setAutoSync] = useState(true);
  const [status, setStatus] = useState("draft");
  const [visibility, setVisibility] = useState("public");
  const [tags, setTags] = useState(["Design", "AI", "Future"]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-[#fbf9f8]">
        {/* Header */}
        <header className="bg-[#fbf9f8] border-b border-[#c1c6d7] px-6 py-4 flex items-center justify-between">
          <h1 className="font-['Liberation_Serif:Bold'] font-bold text-[24px] text-[#1b1c1c]">{t("title")}</h1>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center">{/* Notification icon */}</button>
            <div className="w-8 h-8 bg-[#e9e8e7] border border-[#c1c6d7] rounded-full" />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex gap-6 p-8">
          {/* Left Column - Editor */}
          <div className="flex-1 bg-white border border-[#c1c6d7] rounded shadow-sm">
            {/* Language Tabs */}
            <div className="border-b border-[#c1c6d7] px-4 pt-2 pb-0 flex items-end justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveLanguage("ja")}
                  className={`px-4 py-2 text-[13px] rounded-t ${
                    activeLanguage === "ja"
                      ? "bg-[#f5f3f3] text-[#0058c3] border-b-2 border-[#0058c3]"
                      : "text-[#414754]"
                  }`}>
                  {t("languageTabs.japanese")}
                </button>
                <button
                  onClick={() => setActiveLanguage("en")}
                  className={`px-4 py-2 text-[13px] rounded-t ${
                    activeLanguage === "en"
                      ? "bg-[#f5f3f3] text-[#0058c3] border-b-2 border-[#0058c3]"
                      : "text-[#414754]"
                  }`}>
                  {t("languageTabs.english")}
                </button>
                <button
                  onClick={() => setActiveLanguage("fr")}
                  className={`px-4 py-2 text-[13px] rounded-t ${
                    activeLanguage === "fr"
                      ? "bg-[#f5f3f3] text-[#0058c3] border-b-2 border-[#0058c3]"
                      : "text-[#414754]"
                  }`}>
                  {t("languageTabs.french")}
                </button>
              </div>

              {/* Auto-sync Toggle */}
              <label className="flex items-center gap-2 mb-2 text-[13px] text-[#414754]">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="w-4 h-4"
                />
                {t("autoSyncing")}
              </label>
            </div>

            {/* Toolbar */}
            <div className="border-b border-[#c1c6d7] px-4 py-3 flex items-center gap-2">
              <div className="flex items-center gap-1 border-r border-[#c1c6d7] pr-3">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <Bold className="w-4 h-4 text-[#414754]" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <Italic className="w-4 h-4 text-[#414754]" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <Underline className="w-4 h-4 text-[#414754]" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r border-[#c1c6d7] pr-3">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <AlignLeft className="w-4 h-4 text-[#414754]" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <AlignCenter className="w-4 h-4 text-[#414754]" />
                </button>
              </div>

              <div className="flex items-center gap-1 border-r border-[#c1c6d7] pr-3">
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <ImagePlus className="w-4 h-4 text-[#414754]" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f3f3] rounded">
                  <Code className="w-4 h-4 text-[#414754]" />
                </button>
              </div>

              <select className="ml-auto px-3 py-1.5 text-[13px] text-[#414754] border border-[#c1c6d7] rounded bg-white">
                <option>{t("paragraph")}</option>
                <option>Heading 1</option>
                <option>Heading 2</option>
                <option>Heading 3</option>
              </select>
            </div>

            {/* Editor Content */}
            <div className="p-6">
              <input
                type="text"
                placeholder={t("titlePlaceholder")}
                className="w-full text-[24px] font-bold text-[#1b1c1c] border-none outline-none mb-4 font-['Liberation_Serif:Bold']"
              />
              <textarea
                placeholder={t("contentPlaceholder")}
                className="w-full min-h-100 text-[16px] text-[#1b1c1c] border-none outline-none resize-none font-['Liberation_Serif:Regular'] leading-relaxed"
              />

              {/* Image Block Placeholder */}
              <div className="border-2 border-dashed border-[#c1c6d7] rounded-lg p-12 flex flex-col items-center justify-center bg-[#fbf9f8] my-6">
                <ImagePlus className="w-8 h-8 text-[#999] mb-2" />
                <p className="text-[14px] text-[#999]">{t("imageBlock")}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-[320px] space-y-6">
            {/* AI Assistant */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#0058c3]" />
                <h3 className="font-['Geist:Bold'] font-bold text-[14px] text-[#1b1c1c]">{t("aiAssistant")}</h3>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-[#414754] hover:bg-[#fbf9f8] rounded border border-[#c1c6d7] transition-colors">
                  <span>{t("translateToEnglish")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-[#414754] hover:bg-[#fbf9f8] rounded border border-[#c1c6d7] transition-colors">
                  <span>{t("translateToFrench")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-[#414754] hover:bg-[#fbf9f8] rounded border border-[#c1c6d7] transition-colors">
                  <span>{t("generateSEO")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] text-[#414754] hover:bg-[#fbf9f8] rounded border border-[#c1c6d7] transition-colors">
                  <span>{t("suggestTags")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Publish Settings */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
                {t("publishSettings")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("status")}</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded bg-white">
                    <option value="draft">{t("draft")}</option>
                    <option value="published">{t("published")}</option>
                    <option value="scheduled">{t("scheduled")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("visibility")}</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="public"
                        checked={visibility === "public"}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-[13px] text-[#1b1c1c]">{t("public")}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="visibility"
                        value="private"
                        checked={visibility === "private"}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-[13px] text-[#1b1c1c]">{t("private")}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("schedule")}</label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy, --:--"
                    className="w-full px-3 py-2 text-[13px] text-[#999] border border-[#c1c6d7] rounded"
                  />
                </div>
              </div>
            </div>

            {/* SEO Metadata */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
                {t("seoMetadata")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("metaTitle")}</label>
                  <input
                    type="text"
                    placeholder={t("metaTitlePlaceholder")}
                    maxLength={60}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded"
                  />
                  <div className="text-right text-[11px] text-[#999] mt-1">0/60</div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">
                    {t("metaDescription")}
                  </label>
                  <textarea
                    placeholder={t("metaDescriptionPlaceholder")}
                    maxLength={160}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded resize-none"
                  />
                  <div className="text-right text-[11px] text-[#999] mt-1">0/160</div>
                </div>
              </div>
            </div>

            {/* Tags & Categories */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
                {t("tagsCategories")}
              </h3>

              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={t("tagsPlaceholder")}
                className="w-full px-3 py-2 text-[13px] text-[#999] border border-[#c1c6d7] rounded mb-3"
              />

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#f5f3f3] text-[#1b1c1c] text-[13px] rounded-full">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 text-[14px] font-medium text-[#414754] border border-[#c1c6d7] rounded hover:bg-[#fbf9f8] transition-colors">
                {t("saveDraft")}
              </button>
              <button className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white bg-[#0058c3] rounded hover:bg-[#0046a0] transition-colors">
                {t("publish")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
