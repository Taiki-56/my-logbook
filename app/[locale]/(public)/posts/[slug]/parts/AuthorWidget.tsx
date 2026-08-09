import { Link } from "@/i18n/navigation";
import Image from "next/image";

const AuthorWidget = () => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-6 lg:p-7">
      <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-6 border-b border-gray-100 pb-3 flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle
            cx="12"
            cy="7"
            r="4"></circle>
        </svg>
        Author
      </h3>
      <Link
        href="/about"
        target="_blank"
        className="flex items-center gap-4 mb-4 group cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-[#f5f3f3] overflow-hidden relative shrink-0 border border-[#e4e2e2]">
          <Image
            src="/profile-image.jpg"
            alt="Taiki Honda"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-lg text-[#1b1c1c]">Taiki Honda</h4>
          <p className="text-sm text-[#0058c3] font-['JetBrains_Mono'] font-medium">Software Engineer</p>
        </div>
      </Link>
      <p className="text-[14px] text-[#414754] leading-relaxed font-['Noto_Sans_JP']">
        ソフトウェアエンジニアリングやAIの探求から、ボディビル初出場への挑戦、音楽、料理、異文化への旅まで。枠に囚われず、日々の「面白い」を好奇心の赴くままに形にする記録を発信しています。
      </p>
    </div>
  );
};

export default AuthorWidget;
