"use server";

import { redirect } from "@/i18n/navigation";
import { signIn } from "@/lib/auth";
import { CredentialFormValues } from "@/schemas/credentialSchema";
import { AuthError } from "next-auth";

export async function loginAction(credentials: CredentialFormValues) {
  try {
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    });

    // ログイン成功後にリダイレクト
    redirect({ href: "/admin/dashboard", locale: "ja" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.type };
    }
    throw error;
  }
}
