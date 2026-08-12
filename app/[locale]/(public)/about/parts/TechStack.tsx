/**
 * Renders the About page's tech-stack grid, grouped by category, with a hover tooltip
 * explaining why each technology is used.
 */

import { useTranslations } from "next-intl";
import { FaSlack } from "react-icons/fa6";
import {
  SiAxios,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFormik,
  SiGithub,
  SiGooglegemini,
  SiJavascript,
  SiJira,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiResend,
  SiStripe,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";

const iconSize = 56;

/** Maps a tech stack name to its brand icon, falling back to a lettered placeholder. */
const getSkillIcon = (skillName: string) => {
  switch (skillName) {
    case "TypeScript":
      return (
        <SiTypescript
          size={iconSize}
          color="#3178C6"
        />
      );
    case "JavaScript":
      return (
        <SiJavascript
          size={iconSize}
          color="#F7DF1E"
        />
      );
    case "React":
      return (
        <SiReact
          size={iconSize}
          color="#61DAFB"
        />
      );
    case "Next.js":
      return (
        <SiNextdotjs
          size={iconSize}
          color="#000000"
        />
      );
    case "Tailwind CSS":
      return (
        <SiTailwindcss
          size={iconSize}
          color="#06B6D4"
        />
      );
    case "Material-UI":
      return (
        <SiMui
          size={iconSize}
          color="#007FFF"
        />
      );
    case "Node.js":
      return (
        <SiNodedotjs
          size={iconSize}
          color="#339933"
        />
      );
    case "Express":
      return (
        <SiExpress
          size={iconSize}
          color="#000000"
        />
      );
    case "PostgreSQL":
      return (
        <SiPostgresql
          size={iconSize}
          color="#4169E1"
        />
      );
    case "MongoDB":
      return (
        <SiMongodb
          size={iconSize}
          color="#47A248"
        />
      );
    case "Prisma":
      return (
        <SiPrisma
          size={iconSize}
          color="#2D3748"
        />
      );
    case "Stripe":
      return (
        <SiStripe
          size={iconSize}
          color="#008CDD"
        />
      );
    case "Docker":
      return (
        <SiDocker
          size={iconSize}
          color="#2496ED"
        />
      );
    case "GitHub":
      return (
        <SiGithub
          size={iconSize}
          color="#181717"
        />
      );
    case "Jira":
      return (
        <SiJira
          size={iconSize}
          color="#0052CC"
        />
      );
    case "Slack":
      return (
        <FaSlack
          size={iconSize}
          color="#4A154B"
        />
      );
    case "Figma":
      return (
        <SiFigma
          size={iconSize}
          color="#F24E1E"
        />
      );
    case "Gemini API":
      return (
        <SiGooglegemini
          size={iconSize}
          color="#8E75B2"
        />
      );
    case "Axios":
      return (
        <SiAxios
          size={iconSize}
          color="#5A29E4"
        />
      );
    case "Formik":
      return (
        <SiFormik
          size={iconSize}
          color="#2563EB"
        />
      );
    case "Resend":
      return (
        <SiResend
          size={iconSize}
          color="#000000"
        />
      );
    case "Redux":
      return (
        <SiRedux
          size={iconSize}
          color="#764ABC"
        />
      );
    default:
      return (
        <div
          className="rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#6b7280] font-bold uppercase"
          style={{ width: iconSize, height: iconSize, fontSize: iconSize * 0.4 }}>
          {skillName.charAt(0)}
        </div>
      );
  }
};

// * Normalizes a tech stach name into the i18n message key used for its tooltip reason
const formatKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

// * Tech stack items grouped by category, rendered in the order defined here
const techCategories = [
  {
    key: "languages",
    items: ["TypeScript", "JavaScript"]
  },
  {
    key: "frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Material-UI",
      "Zustand",
      "Redux",
      "Formik",
      "next-intl",
      "Tiptap",
      "Axios"
    ]
  },
  {
    key: "backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma"]
  },
  {
    key: "services",
    items: ["Gemini API", "Stripe", "Resend"]
  },
  {
    key: "tools",
    items: ["Docker", "GitHub", "Jira", "Slack", "Figma"]
  }
];

const TechStack = () => {
  const t = useTranslations("About.techStack");

  return (
    <div className="flex flex-col gap-6 p-7 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]">
      <h2 className="font-['Geist'] font-semibold text-[22px] text-[#1b1c1c] tracking-[-0.44px]">{t("heading")}</h2>

      <div className="flex flex-col gap-8">
        {techCategories.map(({ key, items }) => (
          <div
            key={key}
            className="flex flex-col gap-4">
            <h3 className="font-['Inter'] font-semibold text-[15px] text-[#6b7280]">{t(`categories.${key}.title`)}</h3>

            <div className="grid grid-cols-3 gap-4 xl:gap-5">
              {items.map((item) => (
                <div
                  key={item}
                  className="group relative flex flex-col items-center justify-center gap-3 p-5 bg-white border border-[#e5e7eb] rounded-xl shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-md aspect-square">
                  {getSkillIcon(item)}
                  <span className="text-[14px] font-medium text-center text-[#414754] leading-tight group-hover:text-blue-600 transition-colors">
                    {item}
                  </span>
                  <div className="absolute z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bottom-[105%] left-1/2 -translate-x-1/2 w-55 p-3.5 bg-gray-900 text-white rounded-xl shadow-xl pointer-events-none transform translate-y-2 group-hover:translate-y-0 flex flex-col gap-1">
                    <span className="text-[14px] font-bold text-blue-300 border-b border-gray-700 pb-1.5 mb-1">
                      {t("tooltipTitle", { item })}
                    </span>
                    <span className="text-[13px] leading-relaxed text-gray-200">{t(`reasons.${formatKey(item)}`)}</span>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
