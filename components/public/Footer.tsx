import { Link } from "@/i18n/navigation";

const Footer = async () => {
  return (
    <footer className="bg-[#f5f3f3] border-t border-[#c1c6d7] border-solid w-full py-8 px-6 md:px-10">
      {/* 🌟 flex-col でスマホは縦並び、md:flex-row でPCは横並びに変更 */}
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 lg:px-8">
        {/* 左側 (または上部): サイト名 */}
        <Link
          href={"/home"}
          className="font-mono text-[22px] font-bold text-[#1b1c1c] group tracking-tight transition-colors flex items-center">
          <span className="text-[#c1c6d7] group-hover:text-[#0058c3] transition-colors">&lt;</span>
          <span>MyLogbook</span>
          <span className="text-[#c1c6d7] ml-1 group-hover:text-[#0058c3] transition-colors">/&gt;</span>
        </Link>

        {/* 右側 (または下部): コピーライト */}
        <p className="font-normal text-[#727786] text-xs sm:text-sm md:text-base text-center md:text-left tracking-wide">
          © 2026 MyLogbook. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
