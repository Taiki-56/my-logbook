import AdminHeader from "@/components/admin/AdminHeader";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { getLocale } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await auth();
  const locale = await getLocale();

  if (!session) {
    redirect({ href: "/admin/login", locale: locale });
  }

  return (
    <>
      <AdminHeader />
      <main>{children}</main>
    </>
  );
};

export default AdminLayout;
