import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

/** Sidebar widget introducing the blog's author, linking to the About page. */
const AuthorWidget = async () => {
  const t = await getTranslations("Posts.slug.authorWidget");
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-5 lg:p-7">
      <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-5 border-b border-gray-100 pb-2.5 flex items-center gap-2">
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
        className="flex items-center gap-3 mb-4 group cursor-pointer">
        <div className="w-14 h-14 rounded-full bg-[#f5f3f3] overflow-hidden relative shrink-0 border border-[#e4e2e2]">
          <Image
            src="/profile-image.jpg"
            alt="Taiki Honda"
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-base text-[#1b1c1c]">Taiki Honda</h4>
          <p className="text-[13px] text-[#0058c3] font-['JetBrains_Mono'] font-medium">Software Engineer</p>
        </div>
      </Link>
      <p className="text-[13px] sm:text-[14px] text-[#414754] leading-relaxed font-['Noto_Sans_JP']">
        {t("description")}
      </p>
    </div>
  );
};

export default AuthorWidget;
