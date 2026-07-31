"use server";

import { redirect } from "@/i18n/navigation";
import { signIn } from "@/lib/auth";
import { CredentialFormValues } from "@/schemas/credentialSchema";
import { AuthError } from "next-auth";

const loginAction = async (credentials: CredentialFormValues) => {
  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    });

    //* todo 現在のLocaleにできない？
    //* redirect if successfully logined
    redirect({ href: "/admin/dashboard", locale: "ja" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.type };
    }
    throw error;
  }
};

export default loginAction;
