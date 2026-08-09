"use client";

import { uploadImageAction } from "@/actions/media";
import { createPostAction, createTranslatedPostAction, savePostAction } from "@/actions/post";
import { translatePostAction } from "@/actions/translation";
import formatSlug from "@/helpers/formatSlug";
import { useRouter } from "@/i18n/navigation";
import { Prisma } from "@/libs/generated/client";
import { Category, PostStatus } from "@/libs/generated/enums";
import { PostFormValues, postSchema } from "@/schemas/postSchema";
import { Locale } from "@/types/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { JSONContent } from "@tiptap/react";
import { Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import RichEditor from "./RichEditor";

type PostFormProps = {
  mode: "create" | "edit";
  sourceData?: { postId?: string; targetLang: Locale };
  initialData?: {
    postId: string;
    locale: Locale;
    title: string;
    slug: string;
    status: PostStatus;
    category?: Category;
    isFeatured?: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    projectData: Prisma.InputJsonValue | null;
    html: string | null;
    tags?: string[];
    thumbnail?: string | null;
  };
};

const PostForm = ({ mode, sourceData, initialData }: PostFormProps) => {
  const t = useTranslations("Admin.editor");
  const router = useRouter();

  //* State to track translation progress
  const [isTranslating, setIsTranslating] = useState(false);

  //* Editor states
  const [editorAST, setEditorAST] = useState<Prisma.InputJsonValue | null>(initialData?.projectData ?? null);
  const [editorHtml, setEditorHtml] = useState<string>(initialData?.html ?? "");

  //* Thumbnail upload state
  const [isUploading, setIsUploading] = useState(false);

  //* Tag management state
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      status: initialData?.status ?? "DRAFT",
      category: initialData?.category,
      isFeatured: initialData?.isFeatured ?? false,
      slug: initialData?.slug ?? "",
      seoTitle: initialData?.seoTitle ?? "",
      seoDescription: initialData?.seoDescription ?? "",
      thumbnail: initialData?.thumbnail ?? "",
      tags: initialData?.tags ?? []
    }
  });

  useEffect(() => {
    register("tags");
  }, [register]);

  const hasTranslated = useRef(false);

  //* ==========================================
  //* Trigger and apply auto-translation
  //* ==========================================
  useEffect(() => {
    const doTranslation = async () => {
      if (hasTranslated.current) return;

      if (mode === "create" && sourceData?.postId && sourceData?.targetLang) {
        hasTranslated.current = true;
        setIsTranslating(true);
        try {
          const translated = await translatePostAction(sourceData.targetLang, sourceData.postId);

          //* 1. Set basic fields
          setValue("title", translated.title, { shouldDirty: true, shouldValidate: true });
          setValue("seoTitle", translated.seoTitle ?? "", { shouldDirty: true });
          setValue("seoDescription", translated.seoDescription ?? "", { shouldDirty: true });

          //* 2. Inherit thumbnail
          if (translated.thumbnail) {
            setValue("thumbnail", translated.thumbnail, { shouldDirty: true, shouldValidate: true });
          }

          //* 3. Apply translated slug
          if (translated.slug) {
            setValue("slug", formatSlug(translated.slug), { shouldDirty: true, shouldValidate: true });
          }

          //* 4. Apply translated tags (extracting names)
          if (translated.tags && Array.isArray(translated.tags)) {
            const tagNames = translated.tags.map((tag: { name: string }) => tag.name);
            setValue("tags", tagNames, { shouldDirty: true, shouldValidate: true });
          }

          //* 5. Set HTML content
          setEditorHtml(translated.html);
          setEditorAST(null);
        } catch (error) {
          console.error("Translation Error:", error);
          alert("Auto-translation failed. Please enter the content manually or reload the page.");
        } finally {
          setIsTranslating(false);
        }
      }
    };

    doTranslation();
  }, [mode, sourceData, setValue]);

  //* ==========================================
  //* UI logic below
  //* ==========================================
  const currentThumbnail = watch("thumbnail");
  const tags = watch("tags") || [];

  const handleAddTag = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed], { shouldDirty: true });
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
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldDirty: true }
    );
  };

  const seoTitleLength = watch("seoTitle")?.length || 0;
  const seoDescLength = watch("seoDescription")?.length || 0;

  const handleEditorChange = useCallback((json: JSONContent, html: string) => {
    setEditorAST(json as Prisma.InputJsonValue);
    setEditorHtml(html);
  }, []);

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "thumbnails");

    try {
      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        setValue("thumbnail", res.url, { shouldValidate: true, shouldDirty: true });
      } else {
        alert(`Upload failed: ${res.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: PostFormValues) => {
    if (data.status === "PUBLISHED") {
      const isEmptyEditor = !editorHtml || editorHtml === "<p></p>" || editorHtml === "";
      if (isEmptyEditor) {
        alert("Please write the post content before publishing.");
        return;
      }
    }

    const safeSlug = formatSlug(data.slug);

    const payload = {
      ...data,
      slug: safeSlug,
      projectData: editorAST,
      html: editorHtml || undefined
    };

    if (mode === "create") {
      if (sourceData?.postId && sourceData?.targetLang) {
        //* Flow A: Save Translated Post
        try {
          const res = await createTranslatedPostAction({
            postId: sourceData.postId,
            targetLang: sourceData.targetLang,
            translatedData: {
              title: payload.title,
              slug: payload.slug,
              html: payload.html ?? "",
              seoTitle: payload.seoTitle ?? "",
              seoDescription: payload.seoDescription ?? "",
              tags: payload.tags,
              thumbnail: payload.thumbnail,
              isFeatured: payload.isFeatured
            }
          });
          if (!res.success) {
            alert(`Server Error:\n${res.error}`);
          } else {
            alert("Translation saved successfully!");
            //* Redirect back to the edit page of the translated content
            router.push("/admin/posts/edit/dashboard");
          }
        } catch (error) {
          console.error("Network error:", error);
        }
      } else {
        //* Flow B: Create Brand New Post (Base Language)
        try {
          const res = await createPostAction(payload);
          if (res?.error) alert(`Server Error:\n${res.error}`);
        } catch (error) {
          console.error("Network error:", error);
        }
      }
    } else {
      //* Flow C: Update Existing Post Content
      if (!initialData?.postId || !initialData?.locale) return;
      try {
        const res = await savePostAction({
          postId: initialData.postId,
          locale: initialData.locale,
          ...payload,
          seoTitle: payload.seoTitle ?? "",
          seoDescription: payload.seoDescription ?? "",
          thumbnail: payload.thumbnail ?? ""
        });

        if (!res.success) {
          alert(`Server Error:\n${res.error}`);
        } else {
          alert("Changes saved successfully!");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div className="h-full bg-[#fbf9f8] relative overflow-hidden flex flex-col">
      {/* Loading overlay */}
      {isTranslating && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="bg-white px-6 py-4 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[#0058c3] animate-spin mb-3" />
            <p className="text-[#1b1c1c] font-bold">AI is translating the article...</p>
            <p className="text-sm text-gray-500 mt-1">This may take a few seconds.</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-6 p-6 flex-1 min-h-0 items-stretch">
        <div className="flex-1 min-w-0 h-full">
          <RichEditor
            key={isTranslating ? "translating" : "ready"}
            initialContent={editorHtml || (initialData?.projectData as JSONContent | undefined)}
            onChange={handleEditorChange}
            titleSlot={
              <div>
                <input
                  {...register("title")}
                  type="text"
                  placeholder={t("titlePlaceholder") || "Enter post title..."}
                  className="w-full text-[28px] font-bold text-[#1b1c1c] outline-none font-['Liberation_Serif:Bold'] placeholder:text-gray-300"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
            }
          />
        </div>

        {/* 🌟 右側：サイドバーペイン (ここだけが独立して縦スクロール可能) */}
        <div className="w-[320px] h-full overflow-y-auto shrink-0 pr-2 space-y-6">
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4 shadow-sm">
            <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4 uppercase">
              {t("publishSettings")}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">{t("status")}</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded bg-white">
                  <option value="DRAFT">{t("draft")}</option>
                  <option value="PUBLISHED">{t("published")}</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#414754] tracking-[0.88px] mb-2">Category</label>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded bg-white">
                  <option
                    value=""
                    disabled>
                    Select a category
                  </option>
                  <option value="TECH">Technology</option>
                  <option value="WORK">Work & Career</option>
                  <option value="FITNESS">Fitness</option>
                  <option value="FOOD">Food</option>
                  <option value="TRAVEL">Travel</option>
                  <option value="LIFE">Life & Others</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>

              <div className="pt-2 border-t border-[#f0f0f0]">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("isFeatured")}
                    className="w-4 h-4 text-[#0058c3] border-[#c1c6d7] rounded focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[13px] text-[#414754] group-hover:text-[#1b1c1c] transition-colors">
                    Feature on homepage
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4 shadow-sm">
            <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">
              Thumbnail
            </h3>
            <div className="w-full h-40 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 overflow-hidden relative group">
              {isUploading ? (
                <p className="text-sm text-gray-500">Uploading...</p>
              ) : currentThumbnail ? (
                <>
                  <img
                    src={currentThumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setValue("thumbnail", "", { shouldValidate: true })}
                    className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500"
                    title="Remove image">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <p className="text-sm text-gray-400">Preview</p>
              )}
            </div>
            <label className="block w-full text-center px-4 py-2 text-[13px] text-white bg-[#414754] rounded hover:bg-[#1b1c1c] transition-colors cursor-pointer">
              {currentThumbnail ? "Change Image" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
            </label>
            {errors.thumbnail && <p className="text-red-500 text-xs mt-1">{errors.thumbnail.message}</p>}
          </div>
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4 shadow-sm">
            <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">Slug</h3>
            <div>
              <input
                {...register("slug")}
                type="text"
                placeholder="your-url-slug"
                className="w-full px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded"
                onBlur={(e) => {
                  register("slug").onBlur(e);
                  setValue("slug", formatSlug(e.target.value), { shouldValidate: true, shouldDirty: true });
                }}
              />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
          </div>
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4 shadow-sm">
            <h3 className="font-['Geist:Bold'] font-bold text-[11px] text-[#414754] tracking-[0.88px] mb-4">Tags</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter tag (Press Enter)"
                className="flex-1 px-3 py-2 text-[13px] text-[#1b1c1c] border border-[#c1c6d7] rounded outline-none focus:border-[#0058c3]"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 text-[13px] text-white bg-[#414754] rounded hover:bg-[#1b1c1c] transition-colors whitespace-nowrap">
                Add
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
          <div className="bg-white border border-[#c1c6d7] rounded-lg p-4 shadow-sm">
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
          {/* 🌟 Saveボタンもサイドバーのスクロール終端に配置 */}
          <div className="sticky bottom-0 bg-[#fbf9f8] pt-3 pb-7 z-10 w-full mt-2">
            <button
              type="submit"
              disabled={isSubmitting || isTranslating}
              className="w-full px-4 py-3 text-[14px] font-bold text-white bg-[#0058c3] rounded hover:bg-[#0046a0] transition-colors disabled:opacity-50 cursor-pointer shadow-sm">
              {isSubmitting ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
