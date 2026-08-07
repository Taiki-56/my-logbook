import { Prisma } from "@/libs/generated/client";
import { routingLocales } from "@/types/config";
import * as z from "zod";

const CATEGORY_VALUES = ["TECH", "WORK", "FITNESS", "FOOD", "TRAVEL", "LIFE"] as const;
const STATUS_VALUES = ["DRAFT", "PUBLISHED"] as const;

//* ==========================================
//* 1. 新規作成用スキーマ (PostFormValues)
//* ==========================================
const postSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(STATUS_VALUES),
    category: z.enum(CATEGORY_VALUES, {
      message: "Category is required"
    }),
    isFeatured: z.boolean(),
    slug: z.string().min(1, "Slug is required"),
    seoTitle: z.string().max(60, "SEO Title must be 60 characters or less").optional(),
    seoDescription: z.string().max(160, "SEO Description must be 160 characters or less").optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z
      .union([z.string().url("Thumbnail must be a valid URL"), z.literal("")])
      .optional()
      .nullable()
  })
  .superRefine((data, ctx) => {
    if (data.status === "PUBLISHED") {
      if (!data.seoTitle || data.seoTitle.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["seoTitle"],
          message: "Seo title required when published"
        });
      }
      if (!data.seoDescription || data.seoDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["seoDescription"],
          message: "Seo description required when published"
        });
      }
    }
  });

type PostFormValues = z.infer<typeof postSchema>;

//* ==========================================
//* 2. 更新・保存用スキーマ (SaveContentInput)
//* ==========================================
const saveContentSchema = z
  .object({
    postId: z.string().uuid(),
    locale: z.enum(routingLocales),
    title: z.string().min(1),
    slug: z.string().min(1),
    status: z.enum(STATUS_VALUES),
    category: z.enum(CATEGORY_VALUES, {
      message: "Category is required"
    }),
    isFeatured: z.boolean(),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    thumbnail: z
      .union([z.string().url(), z.literal("")])
      .optional()
      .nullable(),
    tags: z.array(z.string()).optional(),

    projectData: z.unknown().optional() as z.ZodType<Prisma.InputJsonValue | null | undefined>,
    html: z.string().nullable().optional()
  })
  .superRefine((data, ctx) => {
    if (data.status === "PUBLISHED") {
      if (!data.seoTitle || data.seoTitle.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["seoTitle"],
          message: "Seo title required when published"
        });
      }
      if (!data.seoDescription || data.seoDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["seoDescription"],
          message: "Seo description required when published"
        });
      }
    }
  });

type SaveContentInput = z.infer<typeof saveContentSchema>;

export { postSchema, saveContentSchema, type PostFormValues, type SaveContentInput };
