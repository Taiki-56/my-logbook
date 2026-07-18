import { Prisma } from "@/lib/generated/client";
import { PostStatus } from "@/lib/generated/enums";
import * as z from "zod";

const saveContentSchema = z
  .object({
    postId: z.uuid(),
    locale: z.enum(["ja", "en", "fr"]),
    title: z.string().min(1),
    slug: z.string().min(1),
    status: z.enum(PostStatus),
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    thumbnail: z
      .union([z.url(), z.literal("")])
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

export { saveContentSchema, type SaveContentInput };
