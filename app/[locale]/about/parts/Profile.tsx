"use client";

import { Link } from "@/i18n/navigation";
import { LinkIcon, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

// Profile portrait image from Figma
// const profileImage = "https://www.figma.com/api/mcp/asset/effa3f3c-150f-449b-a931-37340bb3a684";

const Profile = () => {
  const t = useTranslations("About.profile");
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(250,250,250,0.8)] border border-[#eaeaea] rounded-lg p-8 flex flex-col items-center gap-6">
      {/* Profile Portrait */}
      <div className="w-32 h-32 relative">
        <div className="border border-[#c1c6d7] rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden w-full h-full">
          {/* <Image
            src={profileImage}
            alt="Alex Mercer"
            fill
            className="object-cover"
          /> */}
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col items-center">
        <h1 className="font-['Geist'] font-semibold text-[32px] text-[#1b1c1c] tracking-[-0.64px] leading-[38.4px]">
          {t("name")}
        </h1>
      </div>

      {/* Job Title */}
      <div className="flex flex-col items-center">
        <p className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("jobTitle")}
        </p>
      </div>

      {/* Social Links */}
      <div className="flex gap-4 items-center">
        <a
          href="mailto:alex@example.com"
          className="text-[#414754] hover:text-[#1b1c1c] transition-colors"
          aria-label="Email">
          <Mail className="w-5 h-4" />
        </a>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#414754] hover:text-[#1b1c1c] transition-colors"
          aria-label="LinkedIn">
          <LinkIcon className="w-5 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Profile;
