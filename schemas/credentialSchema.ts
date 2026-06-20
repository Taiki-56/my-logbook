import * as z from "zod";

export const credentialSchema = z.object({
  email: z.email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは10文字以上で入力してください" })
    .max(20, { message: "パスワードは20文字以内で入力してください" })
});

export type CredentialFormValues = z.infer<typeof credentialSchema>;
