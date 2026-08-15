import { signOut } from "@/libs/auth";
import { LogOut } from "lucide-react";
import { getLocale } from "next-intl/server";

/** Button that signs the admin user out and redirects to the localized login page. */
const LogOutButton = async () => {
  const locale = await getLocale();

  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: `/${locale}/admin/login`
        });
      }}>
      <button className="flex items-center gap-2 px-2 md:px-4 py-2 text-sm font-medium text-[#414754] bg-white border border-[#c1c6d7] rounded-lg hover:text-[#0058c3] hover:border-[#0058c3] hover:bg-[#fbf9f8] transition-all duration-200 shadow-sm group">
        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        <span className="hidden md:inline">Log Out</span>
      </button>
    </form>
  );
};

export default LogOutButton;
