"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect
      width="4"
      height="12"
      x="2"
      y="9"
    />
    <circle
      cx="4"
      cy="4"
      r="2"
    />
  </svg>
);

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
