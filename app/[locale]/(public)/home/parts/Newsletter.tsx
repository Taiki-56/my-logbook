import { useTranslations } from "next-intl";

const Newsletter = () => {
  const t = useTranslations("Home.newsletter");
  return (
    <div className="bg-[#f5f3f3] border border-[#c1c6d7] rounded overflow-hidden px-6.25 pt-6.25 pb-10.25 relative w-full">
      {/* Decorative background element */}
      <div className="absolute bg-[#0058c3] blur-[20px] opacity-5 -right-10 rounded-xl size-32 -top-10" />

      {/* Content */}
      <div className="relative flex flex-col gap-2 w-full">
        {/* Icon */}
        <div className="w-6.25 h-5 mb-2">
          <svg
            width="25"
            height="20"
            viewBox="0 0 25 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 0H2.5C1.125 0 0.0125 1.125 0.0125 2.5L0 17.5C0 18.875 1.125 20 2.5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM22.5 5L12.5 11.25L2.5 5V2.5L12.5 8.75L22.5 2.5V5Z"
              fill="#1b1c1c"
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-lg text-[#1b1c1c] leading-7">{t("title")}</h3>

        {/* Description */}
        <p className="text-sm text-[#414754] leading-5">{t("description")}</p>

        {/* Form */}
        <div className="flex flex-col gap-3 pt-2 w-full">
          {/* Email Input */}
          <input
            type="email"
            placeholder={t("emailPlaceholder")}
            className="bg-[#fbf9f8] border border-[#c1c6d7] rounded-sm px-3.25 py-2.5 text-sm text-[#1b1c1c] placeholder:text-[#6b7280] w-full focus:outline-none focus:border-[#0058c3] transition-colors"
          />

          {/* Subscribe Button */}
          <button className="bg-[#1b1c1c] text-white text-sm text-center px-4 py-2 rounded-sm hover:bg-[#414754] transition-colors w-full">
            {t("subscribeButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
