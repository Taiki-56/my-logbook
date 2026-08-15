/**
 * Supabase storage service.
 *
 * Handles file uploads (e.g., thumbnails, content images) directly
 * to the configured Supabase bucket and returns public URLs.
 */

import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const bucketName = process.env.SUPABASE_BUCKET_NAME as string;

type UploadType = "thumbnails" | "content-images";

// * Uploads a file to the specified Supabase storage folder and retrieves its public URL.
const uploadImageToSupabase = async (file: File, uploadType: UploadType): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${uploadType}/${fileName}`;

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return data.publicUrl;
};

export { uploadImageToSupabase, type UploadType };
