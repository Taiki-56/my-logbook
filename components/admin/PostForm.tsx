"use client";

import { createPostAction, savePostContentAction } from "@/actions/post";
import uploadImage from "@/actions/uploadImage";
import { Prisma } from "@/lib/generated/client";
import { PostStatus } from "@/lib/generated/enums";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "@tiptap/react";
import { X } from "lucide-react"; // タグ削除ボタン用のアイコン
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
    tags?: string[];
    thumbnail?: string | null;
  };
};

const PostForm = ({ mode, initialData }: PostFormProps) => {
  const t = useTranslations("Admin.editor");
  const [activeLanguage, setActiveLanguage] = useState<"ja" | "en" | "fr" | string>(initialData?.locale ?? "ja");

  //* エディタ用State
  const [editorAST, setEditorAST] = useState<Prisma.InputJsonValue | null>(initialData?.projectData ?? null);
  const [editorHtml, setEditorHtml] = useState<string>(initialData?.html ?? "");
  const editorContentRef = useRef<{
    json: Prisma.InputJsonValue | null;
    html: string;
  }>({
    json: initialData?.projectData ?? null,
    html: initialData?.html ?? ""
  });

  //* サムネイル用のアップロード中状態（URL自体はReact Hook Formで管理します）
  const [isUploading, setIsUploading] = useState(false);

  //* ==========================================
  //* タグ管理用Stateと関数
  //* ==========================================
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    setValue, //* 🌟 追加: プログラムからフォームの値を書き換える関数
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      status: initialData?.status ?? "DRAFT",
      slug: initialData?.slug ?? "",
      seoTitle: initialData?.seoTitle ?? "",
      seoDescription: initialData?.seoDescription ?? "",
      thumbnail: initialData?.thumbnail ?? "" //* 初期データがあればここにセットされる
    }
  });

  //* 🌟 追加: React Hook Form が持っている現在のサムネイルURLを監視して取得する
  const currentThumbnail = watch("thumbnail");

  const seoTitleLength = watch("seoTitle")?.length || 0;
  const seoDescLength = watch("seoDescription")?.length || 0;

  const handleEditorChange = useCallback((json: JSONContent, html: string) => {
    setEditorAST(json as Prisma.InputJsonValue);
    setEditorHtml(html);
    editorContentRef.current = {
      json: json as Prisma.InputJsonValue,
      html
    };
  }, []);

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "thumbnails");

    try {
      const res = await uploadImage(formData);
      if (res.success && res.url) {
        setValue("thumbnail", res.url, { shouldValidate: true, shouldDirty: true });
      } else {
        alert(`アップロード失敗: ${res.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: PostFormValues) => {
    const latestEditorAst = editorContentRef.current.json;
    const latestEditorHtml = editorContentRef.current.html;

    //* 1. 公開時における「本文空っぽ」のブロック処理
    if (data.status === "PUBLISHED") {
      const isEmptyEditor = !latestEditorHtml || latestEditorHtml === "<p></p>" || latestEditorHtml === "";
      if (isEmptyEditor) {
        alert("公開する場合は、必ず本文を執筆してください。");
        return;
      }
    }

    //* 🌟 修正: data の中に既に thumbnail が入っているので直接渡せるようになります
    const payload = {
      ...data,
      projectData: latestEditorAst,
      html: latestEditorHtml || undefined,
      tags
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
          seoDescription: payload.seoDescription ?? "",
          thumbnail: payload.thumbnail ?? ""
        });
        if (!res.success) alert(`サーバー側エラー：\n${res.error}`);
      } catch (error) {
        console.error("通信エラー:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8]">
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
            initialHtml={initialData?.html}
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

          {/* サムネイルセクション */}
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4">
            <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
              サムネイル
            </h3>
            <div className="w-full h-40 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 overflow-hidden relative group">
              {isUploading ? (
                <p className="text-sm text-gray-500">アップロード中...</p>
              ) : currentThumbnail ? (
                <>
                  <img
                    src={currentThumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  {/* 画像削除ボタン（任意で使えるように追加） */}
                  <button
                    type="button"
                    onClick={() => setValue("thumbnail", "", { shouldValidate: true })}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500"
                    title="画像を削除">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-400">プレビュー</p>
              )}
            </div>
            <label className="block w-full text-center px-4 py-2 text-[13px] text-white bg-[#414754] rounded hover:bg-[#1b1c1c] transition-colors cursor-pointer">
              {currentThumbnail ? "画像を変更" : "画像をアップロード"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
            </label>
            {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail.message}</p>}
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

          {/* タグ入力セクション */}
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
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-[#f0f5ff] text-[#0058c3] border border-[#0058c3] px-2 py-1 rounded text-[11px] font-medium">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-[#0058c3] hover:text-red-500">
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
  );
};

export default PostForm;
