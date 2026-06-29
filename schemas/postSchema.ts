import { PostStatus } from "@/lib/generated/prisma/enums";
import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(PostStatus),
  slug: z.string().min(1, "Slug is required"),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional()
});

export type PostFormValues = z.infer<typeof postSchema>;
