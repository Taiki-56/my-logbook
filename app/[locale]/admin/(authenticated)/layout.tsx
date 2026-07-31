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
    <div className="h-screen flex flex-col overflow-hidden">
      <AdminHeader />
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
};

export default AdminLayout;
