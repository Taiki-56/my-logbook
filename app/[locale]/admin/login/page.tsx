import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "./parts/LoginForm";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect({ href: "/admin/dashboard", locale: "ja" });
  }

  return <LoginForm />;
}
