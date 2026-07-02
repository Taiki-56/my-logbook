import { PostStatus } from "@/lib/generated/enums";
import * as z from "zod";

export const postSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(PostStatus),
    slug: z.string().min(1, "Slug is required"),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional()
  })
  .superRefine((data, ctx) => {
    //* Conditional validation: Requires SEO metadata only for PUBLISHED posts
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
          message: "Seo description title required when published"
        });
      }
    }
  });

export type PostFormValues = z.infer<typeof postSchema>;
