"use server";

import { uploadImageToSupabase, UploadType } from "@/services/media";

const uploadImageAction = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File | null;
    if (!file) return { success: false, error: "Can't find a file" };

    const uploadType = formData.get("type") as UploadType;
    const url = await uploadImageToSupabase(file, uploadType);

    return { success: true, url };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Upload Error:", error.message);
    } else {
      console.error("Upload Error:", String(error));
    }
    return { success: false, error: "Failed uploading an image" };
  }
};

export { uploadImageAction };
