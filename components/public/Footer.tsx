import { Link } from "@/i18n/navigation";

const Footer = async () => {
  return (
    <footer className="bg-[#f5f3f3] border-[#c1c6d7] border-solid border-t py-12 px-6 md:px-10">
      <div className="max-w-300 w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* 左側 (または上部): サイト名 */}
        <Link
          href={"/home"}
          className="font-mono text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>

        {/* 右側 (または下部): コピーライト */}
        <p className="font-normal text-[#727786] text-sm md:text-base text-center md:text-left tracking-wide">
          © 2026 MyLogbook. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
