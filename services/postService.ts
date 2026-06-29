import prisma from "@/lib/prisma";
import { PostFormValues } from "@/schemas/postSchema";

const createPost = async (authorId: string, formData: PostFormValues) => {
  return await prisma.post.create({
    data: {
      authorId,
      status: formData.status,
      translations: {
        create: {
          locale: "ja",
          title: formData.title,
          slug: formData.slug,
          seoTitle: formData.seoTitle,
          seoDescription: formData.seoDescription
        }
      }
    },
    include: {
      translations: true
    }
  });
};

export default createPost;
