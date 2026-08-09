import GithubIcon from "@/components/ui/GithubIcon";
import LinkedinIcon from "@/components/ui/Linkedin";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Profile = () => {
  const t = useTranslations("About.profile");

  return (
    <div className="backdrop-blur-[6px] bg-[rgba(250,250,250,0.8)] border border-[#eaeaea] rounded-lg p-8 flex flex-col items-center gap-6">
      <div className="w-40 h-40 lg:w-48 lg:h-48 relative group">
        <div className="rounded-full shadow-sm overflow-hidden w-full h-full relative ring-4 ring-white border border-[#eaeaea] transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/profile-image.jpg"
            alt={t("name")}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 160px, 192px"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-['Geist'] font-semibold text-[32px] text-[#1b1c1c] tracking-[-0.64px] leading-[38.4px]">
          {t("name")}
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-['JetBrains_Mono'] font-medium text-[14px] text-[#414754] tracking-[0.7px] uppercase leading-[19.6px]">
          {t("jobTitle")}
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <a
          href="mailto:taiki.honda.tech@gmail.com"
          className="text-[#414754] hover:text-[#1b1c1c] transition-colors"
          aria-label="Email">
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/Taiki-56"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#414754] hover:text-[#1b1c1c] transition-colors"
          aria-label="GitHub">
          <GithubIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/taiki-honda-b46b222a4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#414754] hover:text-[#1b1c1c] transition-colors"
          aria-label="LinkedIn">
          <LinkedinIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Profile;
