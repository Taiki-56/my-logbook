"use client";

import createPostAction from "@/actions/post";
import AdminSidebar from "@/components/AdminSidebar";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
// ★ 作成したServer Actionをインポート（パスは実際の環境に合わせてください）
// import { createPostAction } from "@/actions/post";

const PostForm = () => {
  const t = useTranslations("Admin.editor");
  const [activeLanguage, setActiveLanguage] = useState<"ja" | "en" | "fr">("ja");
  const [autoSync, setAutoSync] = useState(true);

  const {
    register,
    handleSubmit,
    watch, // ★ 追加: リアルタイムに値を見るために使用
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      status: "DRAFT",
      slug: "",
      seoTitle: "",
      seoDescription: ""
    }
  });

  // ★ 入力中のSEO文字数をリアルタイムに監視
  const seoTitleLength = watch("seoTitle")?.length || 0;
  const seoDescLength = watch("seoDescription")?.length || 0;

  // ★ 修正: フォーム送信の実体
  const onSubmit = async (data: PostFormValues) => {
    console.log("① [ブラウザ] 送信ボタンが押された:", data);
    try {
      const res = await createPostAction(data);
      console.log("② [サーバーからの返事]:", res);
      if (res?.error) {
        alert(`サーバー側でストップしました：\n${res.error}`);
      }
    } catch (error) {
      console.error("③ [通信の大爆発]:", error);
    }
  };

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-[#fbf9f8]">
        <header className="bg-[#fbf9f8] border-b border-[#c1c6d7] px-6 py-4 flex items-center justify-between">
          <h1 className="font-['Liberation_Serif:Bold'] font-bold text-[24px] text-[#1b1c1c]">{t("title")}</h1>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center"></button>
            <div className="w-8 h-8 bg-[#e9e8e7] border border-[#c1c6d7] rounded-full" />
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-6 p-8">
          {/* Left Column - Editor */}
          <div className="flex-1 bg-white border border-[#c1c6d7] rounded shadow-sm">
            {/* Language Tabs & Toolbar は変更なしのため省略... */}

            <div className="p-6">
              <div>
                <input
                  {...register("title")}
                  type="text"
                  placeholder={t("titlePlaceholder")}
                  className="w-full text-[24px] font-bold text-[#1b1c1c] border-none outline-none font-['Liberation_Serif:Bold']"
                />
                {/* エラーがある場合は赤字で出す */}
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <textarea
                placeholder={t("contentPlaceholder")}
                className="w-full min-h-100 text-[16px] text-[#1b1c1c] border-none outline-none resize-none font-['Liberation_Serif:Regular'] leading-relaxed mt-4"
              />

              <div className="border-2 border-dashed border-[#c1c6d7] rounded-lg p-12 flex flex-col items-center justify-center bg-[#fbf9f8] my-6">
                <ImagePlus className="w-8 h-8 text-[#999] mb-2" />
                <p className="text-[14px] text-[#999]">{t("imageBlock")}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-[320px] space-y-6">
            {/* AI Assistant (省略) */}

            {/* Publish Settings */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
                {t("publishSettings")}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("status")}</label>
                  {/* ★ 修正: useStateを外して純粋なregisterのみにする */}
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded bg-white">
                    <option value="DRAFT">{t("draft")}</option>
                    <option value="PUBLISHED">{t("published")}</option>
                    <option value="PRIVATE">{t("scheduled")}</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
                </div>

                {/* Visibility等 (省略) */}
              </div>
            </div>

            {/* Slug */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">Slug</h3>
              <div>
                <input
                  {...register("slug")}
                  type="text"
                  placeholder="your-url-slug"
                  className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded"
                />
                {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
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
                    {...register("seoTitle")}
                    type="text"
                    placeholder={t("metaTitlePlaceholder")}
                    maxLength={60}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded"
                  />
                  {/* ★ 修正: 動的なカウント表示 */}
                  <div className="text-right text-[11px] text-[#999] mt-1">{seoTitleLength}/60</div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">
                    {t("metaDescription")}
                  </label>
                  <textarea
                    {...register("seoDescription")}
                    placeholder={t("metaDescriptionPlaceholder")}
                    maxLength={160}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded resize-none"
                  />
                  {/* ★ 修正: 動的なカウント表示 */}
                  <div className="text-right text-[11px] text-[#999] mt-1">{seoDescLength}/160</div>
                </div>
              </div>
            </div>

            {/* Tags (省略) */}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white bg-[#0058c3] rounded hover:bg-[#0046a0] transition-colors disabled:opacity-50">
                {isSubmitting ? "保存中..." : t("publish")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default PostForm;
