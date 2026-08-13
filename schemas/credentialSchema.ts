/**
 * Authentication validation schemas.
 *
 * Provides Zod schemas for validating user login credentials, including
 * a localized version that accepts a translation function for dynamic error messages.
 */

import * as z from "zod";

/**
 * Generates a localized credential validation schema.
 *
 * Uses the provided translation function to return localized error messages
 * for invalid email formats and password length constraints.
 */
const getLocalizedCredentialSchema = (t: (key: string) => string) => {
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

type CredentialFormValues = z.infer<typeof credentialSchema>;

export { getLocalizedCredentialSchema, type CredentialFormValues };
