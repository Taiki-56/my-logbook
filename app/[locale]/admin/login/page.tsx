import { redirect } from "@/i18n/navigation";
import { auth } from "@/libs/auth";
import LoginForm from "./parts/LoginForm";

const Page = async () => {
  const session = await auth();

  if (session) {
    redirect({ href: "/admin/dashboard", locale: "ja" });
  }

  return <LoginForm />;
};

export default Page;
