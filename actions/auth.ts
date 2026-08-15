"use server";

/**
 * Server actions for admin authentication.
 */

import { redirect } from "@/i18n/navigation";
import { signIn } from "@/libs/auth";
import { CredentialFormValues } from "@/schemas/credentialSchema";
import { AuthError } from "next-auth";
import { getLocale } from "next-intl/server";

/**
 * Signs in an admin user with email/password credentials and redirects to the dashboard on success.
 * @param credentials - Email and password submitted from the login form.
 * @returns An object with the Auth.js error type if sign-in fails; otherwise redirects and never returns.
 */
const loginAction = async (credentials: CredentialFormValues) => {
  const locale = await getLocale();
  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    });
    redirect({ href: "/admin/dashboard", locale });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.type };
    }
    throw error;
  }
};

export default loginAction;
