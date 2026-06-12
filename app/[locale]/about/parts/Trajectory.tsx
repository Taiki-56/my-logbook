"use client";

import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const Trajectory = () => {
  const t = useTranslations("About.trajectory");
  const timelineData = t.raw("timeline") as Array<{
    period: string;
    title: string;
    company: string;
    description: string;
  }>;

  return (
    <div className="flex flex-col gap-8 max-w-170">
      {/* Separator */}
      <div className="border-t border-[#c1c6d7] w-full" />

      {/* Section Heading */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-4.5 h-4.5 text-[#1b1c1c]" />
        <h3 className="font-['Geist'] font-semibold text-[24px] text-[#1b1c1c] leading-[31.2px]">{t("heading")}</h3>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Mobile Layout - All items on right side */}
        <div className="flex flex-col gap-8 lg:hidden">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#c1c6d7]" />

          {timelineData.map((item, index) => {
            const isCurrent = index === 0;
            return (
              <div
                key={index}
                className="flex items-start gap-4 relative">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 top-5 -translate-x-1/2 w-5 h-5 rounded-xl border-2 ${
                    isCurrent ? "border-[#0058c3] bg-[#fbf9f8]" : "border-[#c1c6d7] bg-[#fbf9f8]"
                  }`}
                />

                {/* Content - Always on the right */}
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
                  <p className="font-['Inter'] font-normal text-[14px] lg:text-[16px] text-[#414754] leading-[22.4px] lg:leading-6">
                    {item.company}
                    <br />
                    {item.description}
                  </p>
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
                {/* Timeline Dot */}
                <div
                  className={`absolute left-1/2 top-20.25 -translate-x-1/2 w-5 h-5 rounded-xl border-2 ${
                    isCurrent ? "border-[#0058c3] bg-[#fbf9f8]" : "border-[#c1c6d7] bg-[#fbf9f8]"
                  }`}
                />

                {position === "right" ? (
                  <>
                    {/* Empty left side */}
                    <div className="flex-1" />
                    {/* Content on right */}
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
                      <p className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6">
                        {item.company}
                        <br />
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Content on left */}
                    <div className="flex-1 pr-8 flex flex-col gap-2 text-right">
                      <p
                        className={`font-['JetBrains_Mono'] font-medium text-[14px] uppercase leading-[19.6px] ${
                          isCurrent ? "text-[#0058c3]" : "text-[#414754]"
                        }`}>
                        {item.period}
                      </p>
                      <h4 className="font-['Geist'] font-semibold text-[24px] text-[#1b1c1c] leading-[31.2px]">
                        {item.title}
                      </h4>
                      <p className="font-['Inter'] font-normal text-[16px] text-[#414754] leading-6">
                        {item.company}
                        <br />
                        {item.description}
                      </p>
                    </div>
                    {/* Empty right side */}
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

export default Trajectory;
