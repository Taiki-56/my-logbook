import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const bucketName = process.env.SUPABASE_BUCKET_NAME as string;

type UploadType = "thumbnails" | "avatars" | "content-images";

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
