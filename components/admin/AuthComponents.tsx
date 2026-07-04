import { signOut } from "@/lib/auth";
import { getLocale } from "next-intl/server";

const SignOut = async () => {
  const locale = await getLocale();
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: `/${locale}/admin/login`
        });
      }}
      className="w-full">
      <button className="bg-neutral-700 text-white p-2 rounded-md">Sign Out</button>
    </form>
  );
};

export default SignOut;
