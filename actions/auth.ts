"use server";

import { redirect } from "@/i18n/navigation";
import { signIn } from "@/libs/auth";
import { CredentialFormValues } from "@/schemas/credentialSchema";
import { AuthError } from "next-auth";
import { getLocale } from "next-intl/server";

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
