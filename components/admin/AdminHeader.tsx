import { Link } from "@/i18n/navigation";
import SignOut from "./AuthComponents";

const AdminHeader = () => {
  return (
    <header className="border-b border-[#c1c6d7] bg-white sticky top-0 z-10 shrink-0">
      <div className="px-8 py-4 flex items-center justify-between">
        <Link
          href={"/admin/dashboard"}
          className="font-mono text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>
        <div className="flex items-center">
          <SignOut />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
