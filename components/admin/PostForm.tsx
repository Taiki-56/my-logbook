"use client";

import createPostAction, { savePostContentAction } from "@/actions/post";
import { Prisma } from "@/lib/generated/client";
import { PostStatus } from "@/lib/generated/enums";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "@tiptap/react";
import { X } from "lucide-react"; //* 追加: 削除ボタン用のアイコン
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import AdminSidebar from "./AdminSidebar";
import RichEditor from "./RichEditor";

type PostFormProps = {
  mode: "create" | "edit";
  initialData?: {
    postId: string;
    locale: string;
    title: string;
    slug: string;
    status: PostStatus;
    seoTitle: string | null;
    seoDescription: string | null;
    projectData: Prisma.InputJsonValue | null;
    html: string | null;
    tags?: string[]; //* 追加: 初期タグデータを受け取れるようにする
  };
};

const PostForm = ({ mode, initialData }: PostFormProps) => {
  const t = useTranslations("Admin.editor");
  const [activeLanguage, setActiveLanguage] = useState<"ja" | "en" | "fr" | string>(initialData?.locale ?? "ja");

  //* エディタ用State
  const [editorAST, setEditorAST] = useState<Prisma.InputJsonValue | null>(initialData?.projectData ?? null);
  const [editorHtml, setEditorHtml] = useState<string>(initialData?.html ?? "");

  //* ==========================================
  //* タグ管理用Stateと関数 (ここを追加)
  //* ==========================================
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault(); //* フォーム自体の送信を防止
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput(""); //* 入力欄をリセット
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //* Enterキーが押されたらタグを追加し、フォーム送信を防ぐ
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  //* ==========================================

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      status: initialData?.status ?? "DRAFT",
      slug: initialData?.slug ?? "",
      seoTitle: initialData?.seoTitle ?? "",
      seoDescription: initialData?.seoDescription ?? ""
    }
  });

  const seoTitleLength = watch("seoTitle")?.length || 0;
  const seoDescLength = watch("seoDescription")?.length || 0;

  const handleEditorChange = useCallback((json: JSONContent, html: string) => {
    setEditorAST(json as Prisma.InputJsonValue);
    setEditorHtml(html);
  }, []);

  const onSubmit = async (data: PostFormValues) => {
    //* 1. 公開時（PUBLISHED）における「本文空っぽ」のブロック処理
    if (data.status === "PUBLISHED") {
      // TipTapは空の時でも "<p></p>" などのタグだけが入ることがあるのでそれも考慮します
      const isEmptyEditor = !editorHtml || editorHtml === "<p></p>" || editorHtml === "";

      if (isEmptyEditor) {
        alert("公開する場合は、必ず本文を執筆してください。");
        return; // ここで処理を中断し、サーバーには送りません
      }
    }
    //* 送信ペイロードに tags を追加
    const payload = {
      ...data,
      projectData: editorAST,
      html: editorHtml || undefined,
      tags //* ★ ここでタグの配列を渡す
    };

    if (mode === "create") {
      try {
        const res = await createPostAction(payload);
        if (res?.error) alert(`サーバー側エラー：\n${res.error}`);
      } catch (error) {
        console.error("通信エラー:", error);
      }
    } else {
      if (!initialData?.postId || !initialData?.locale) return;
      try {
        const res = await savePostContentAction({
          postId: initialData.postId,
          locale: initialData.locale as "ja" | "en" | "fr",
          ...payload,
          seoTitle: payload.seoTitle ?? "",
          seoDescription: payload.seoDescription ?? ""
        });
        if (!res.success) alert(`サーバー側エラー：\n${res.error}`);
      } catch (error) {
        console.error("通信エラー:", error);
      }
    }
  };

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-[#fbf9f8]">
        {/* ヘッダー部分は省略せずそのまま */}
        <header className="bg-[#fbf9f8] border-b border-[#c1c6d7] px-6 py-4 flex items-center justify-between">
          <h1 className="font-['Liberation_Serif:Bold'] font-bold text-[24px] text-[#1b1c1c]">{t("title")}</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#e9e8e7] border border-[#c1c6d7] rounded-full" />
          </div>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-6 p-8">
          <div className="flex-1 space-y-4">
            {/* 言語・タイトル・エディタ部分は変更なし */}
            <div className="flex border border-[#c1c6d7] bg-white rounded p-1.5 gap-2 w-fit shadow-sm">
              <button
                type="button"
                onClick={() => setActiveLanguage("ja")}
                className={`px-3 py-1 text-xs font-bold rounded ${activeLanguage === "ja" ? "bg-[#1b1c1c] text-white" : "text-gray-500 hover:bg-gray-100"}`}>
                JA (ベース主言語)
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1 text-xs font-bold rounded text-gray-300 cursor-not-allowed">
                EN (自動翻訳枠)
              </button>
              <button
                type="button"
                disabled
                className="px-3 py-1 text-xs font-bold rounded text-gray-300 cursor-not-allowed">
                FR (自動翻訳枠)
              </button>
            </div>

            <div className="bg-white border border-[#c1c6d7] rounded p-6 shadow-sm">
              <input
                {...register("title")}
                type="text"
                placeholder={t("titlePlaceholder") || "記事タイトルを入力..."}
                className="w-full text-[28px] font-bold text-[#1b1c1c] outline-none font-['Liberation_Serif:Bold'] placeholder:text-gray-300"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <RichEditor
              initialContent={initialData?.projectData}
              onChange={handleEditorChange}
            />
          </div>

          <div className="w-[320px] space-y-6">
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
                {t("publishSettings")}
              </h3>
              <div>
                <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("status")}</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded bg-white">
                  <option value="DRAFT">{t("draft")}</option>
                  <option value="PUBLISHED">{t("published")}</option>
                  <option value="PRIVATE">{t("scheduled")}</option>
                </select>
              </div>
            </div>

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

            {/* ★ タグ入力セクションをここに追加 ★ */}
            <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
              <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">タグ</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="タグを入力 (Enterで追加)"
                  className="flex-1 px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded outline-none focus:border-[#0058c3]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 text-[13px] text-white bg-[#414754] rounded hover:bg-[#1b1c1c] transition-colors whitespace-nowrap">
                  追加
                </button>
              </div>

              {/* 追加されたタグのリスト表示 */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-[#f0f5ff] text-[#0058c3] border border-[#0058c3] px-2 py-1 rounded text-[11px] font-medium">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-[#0058c3] hover:text-red-500 transition-colors"
                      title="削除">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

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
                    maxLength={60}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded"
                  />
                  <div className="text-right text-[11px] text-[#999] mt-1">{seoTitleLength}/60</div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">
                    {t("metaDescription")}
                  </label>
                  <textarea
                    {...register("seoDescription")}
                    maxLength={160}
                    rows={3}
                    className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded resize-none"
                  />
                  <div className="text-right text-[11px] text-[#999] mt-1">{seoDescLength}/160</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2.5 text-[14px] font-medium text-white bg-[#0058c3] rounded hover:bg-[#0046a0] transition-colors disabled:opacity-50 cursor-pointer">
                {isSubmitting ? "保存中..." : "保存する"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminSidebar>
  );
};

export default PostForm;
