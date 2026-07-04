"use server";

import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

//* initialize supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const bucketName = process.env.SUPABASE_BUCKET_NAME as string;

type UploadType = "thumbnails" | "avatars" | "content-images";

const uploadImage = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    if (!file) return { error: "Can't find a file" };

    const uploadType = formData.get("type") as UploadType;

    //* get an extension and generate an unique file name
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const filePath = `${uploadType}/${fileName}`;

    //* Uploading an image to supabase
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);
    if (uploadError) throw new Error(uploadError.message);

    //* Get a public URL
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, error: "Failed uploading an image" };
  }
};

export default uploadImage;
