"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Experiences = () => {
  const t = useTranslations("About.experiences");
  const timelineData = t.raw("timeline") as Array<{
    period: string;
    title: string;
    jobTitle: string;
    description: string;
    linkText?: string;
    linkUrl?: string;
  }>;

  const renderDescription = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span
        key={i}
        className="block mt-1">
        {line.includes("【") || line.includes("[Challenge") ? (
          <strong className="text-[#1b1c1c] font-semibold">{line}</strong>
        ) : (
          line
        )}
      </span>
    ));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="border-t border-[#c1c6d7] w-full" />
      <div className="flex items-center gap-2">
        <Sparkles className="w-4.5 h-4.5 text-[#1b1c1c]" />
        <h3 className="font-['Geist'] font-semibold text-[24px] text-[#1b1c1c] leading-[31.2px]">{t("heading")}</h3>
      </div>
      <div className="relative">
        <div className="flex flex-col gap-8 lg:hidden">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#c1c6d7]" />
          {timelineData.map((item, index) => {
            const isCurrent = index === 0;
            return (
              <div
                key={index}
                className="flex items-start gap-4 relative">
                <div
                  className={`absolute left-0 top-5 -translate-x-1/2 w-5 h-5 rounded-xl border-2 ${
                    isCurrent ? "border-[#0058c3] bg-[#fbf9f8]" : "border-[#c1c6d7] bg-[#fbf9f8]"
                  }`}
                />
                <div className="ml-8 flex flex-col gap-2">
                  <p
                    className={`font-['JetBrains_Mono'] font-medium text-[14px] uppercase leading-[19.6px] ${
                      isCurrent ? "text-[#0058c3]" : "text-[#414754]"
                    }`}>
                    {item.period}
                  </p>
                  <h4 className="font-['Geist'] font-semibold text-[20px] lg:text-[24px] text-[#1b1c1c] leading-6.5 lg:leading-[31.2px]">
                    {item.title}
                  </h4>
                  <div className="font-['Inter'] font-normal text-[14px] lg:text-[16px] text-[#414754] leading-[22.4px] lg:leading-6">
                    <span className="font-medium text-[#1b1c1c]">{item.jobTitle}</span>
                    <div className="mt-2">{renderDescription(item.description)}</div>
                  </div>

                  {/* リンクボタン (Mobile) */}
                  {item.linkUrl && item.linkText && (
                    <Link
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 mt-2 px-4 py-2 w-fit rounded-lg border border-[#c1c6d7] hover:border-[#0058c3] bg-white transition-colors text-[#1b1c1c] hover:text-[#0058c3] text-[13px] font-medium font-['Inter']">
                      {item.linkText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout - Alternating left/right */}
        <div className="hidden lg:flex lg:flex-col lg:gap-8">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#c1c6d7] -translate-x-1/2" />

          {timelineData.map((item, index) => {
            const isCurrent = index === 0;
            const position = index % 2 === 0 ? "right" : "left";
            return (
              <div
                key={index}
                className="relative flex items-center">
                <div
                  className={`absolute left-1/2 top-20.25 -translate-x-1/2 w-5 h-5 rounded-xl border-2 ${
                    isCurrent ? "border-[#0058c3] bg-[#fbf9f8]" : "border-[#c1c6d7] bg-[#fbf9f8]"
                  }`}
                />

                {position === "right" ? (
                  <>
                    <div className="flex-1" />
                    <div className="flex-1 pl-8 flex flex-col gap-2">
                      <p
                        className={`font-['JetBrains_Mono'] font-medium text-[14px] uppercase leading-[19.6px] ${
                          isCurrent ? "text-[#0058c3]" : "text-[#414754]"
                        }`}>
                        {item.period}
                      </p>
                      <h4 className="font-['Geist'] font-semibold text-[24px] text-[#1b1c1c] leading-[31.2px]">
                        {item.title}
                      </h4>
                      <div className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6">
                        <span className="font-medium text-[#1b1c1c]">{item.jobTitle}</span>
                        <div className="mt-2">{renderDescription(item.description)}</div>
                      </div>
                      {item.linkUrl && item.linkText && (
                        <Link
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 mt-2 px-4 py-2 w-fit rounded-lg border border-[#c1c6d7] hover:border-[#0058c3] bg-white transition-colors text-[#1b1c1c] hover:text-[#0058c3] text-[13px] font-medium font-['Inter']">
                          {item.linkText}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 pr-8 flex flex-col gap-2 text-left">
                      <p
                        className={`font-['JetBrains_Mono'] font-medium text-[14px] uppercase leading-[19.6px] ${
                          isCurrent ? "text-[#0058c3]" : "text-[#414754]"
                        }`}>
                        {item.period}
                      </p>
                      <h4 className="font-['Geist'] font-semibold text-[24px] text-[#1b1c1c] leading-[31.2px]">
                        {item.title}
                      </h4>
                      <div className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6 flex flex-col items-start">
                        <span className="font-medium text-[#1b1c1c]">{item.jobTitle}</span>
                        <div className="mt-2 text-left">{renderDescription(item.description)}</div>
                      </div>

                      {item.linkUrl && item.linkText && (
                        <Link
                          href={item.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex self-start items-center gap-1.5 mt-2 px-4 py-2 w-fit rounded-lg border border-[#c1c6d7] hover:border-[#0058c3] bg-white transition-colors text-[#1b1c1c] hover:text-[#0058c3] text-[13px] font-medium font-['Inter']">
                          {item.linkText}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </div>
                    <div className="flex-1" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
