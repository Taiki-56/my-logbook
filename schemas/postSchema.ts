import { PostStatus } from "@/lib/generated/enums";
import * as z from "zod";

export const postSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(PostStatus),
    slug: z.string().min(1, "Slug is required"),
    seoTitle: z.string().max(60, "SEO Title must be 60 characters or less").optional(),
    seoDescription: z.string().max(160, "SEO Description must be 160 characters or less").optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z
      .union([z.url("Thumbnail must be a valid URL"), z.literal("")])
      .optional()
      .nullable()
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
