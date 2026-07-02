import { PostStatus } from "@/lib/generated/enums";
import { Prisma } from "@/lib/generated/client";
import * as z from "zod";

const saveContentSchema = z.object({
  postId: z.string().uuid(),
  locale: z.enum(["ja", "en", "fr"]),
  title: z.string().min(1),
  slug: z.string().min(1),
  status: z.nativeEnum(PostStatus),
  seoTitle: z.string().min(1).max(60),
  seoDescription: z.string().min(1).max(160),
  projectData: z.record(z.string(), z.unknown()).nullable().optional() as z.ZodType<Prisma.InputJsonValue | null | undefined>,
  html: z.string().nullable().optional()
});
type SaveContentInput = z.infer<typeof saveContentSchema>;

export { saveContentSchema, type SaveContentInput };
