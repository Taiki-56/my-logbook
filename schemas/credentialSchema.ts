import * as z from "zod";

export const getLocalizedCredentialSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.email({ message: t("invalidEmail") }),
    password: z
      .string()
      .min(10, { message: t("passwordMin") })
      .max(20, { message: t("passwordMax") })
  });
};

const credentialSchema = z.object({
  email: z.email(),
  password: z.string().min(10).max(20)
});

export type CredentialFormValues = z.infer<typeof credentialSchema>;
