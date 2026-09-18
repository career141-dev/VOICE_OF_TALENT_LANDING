"use client";

import React, { useState } from "react";

const audiences = [
  {
    number: "01",
    tag: "CAPABILITY",
    title: "Talent Acquisition Professionals",
    description:
      "Connect with peers, access practical insights, and build stronger talent acquisition capability.",
  },
  {
    number: "02",
    tag: "MASTERY",
    title: "Emerging Talent Professionals",
    description:
      "Fast-track your functional maturity by learning from established, world-class practices across diverse sectors.",
  },
  {
    number: "03",
    tag: "GROWTH",
    title: "Business Leaders",
    description:
      "Build a more strategic, effective approach to attracting, developing, and retaining the talent your business needs.",
  },
  {
    number: "04",
    tag: "COMMUNITY",
    title: "The Wider HR Community",
    description:
      "Join a shared conversation that connects people, practices, and the future of work.",
  },
];

export default function BuiltForEveryoneSection() {
  const [activeMobileCard, setActiveMobileCard] = useState<string>("01");

  const toggleMobileCard = (number: string) => {
    setActiveMobileCard(number);
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 sm:px-10 md:px-12 lg:px-[8.7%] py-16 md:py-20 lg:py-24 text-[#262626]">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Heading */}
        <div className="mb-10 text-center lg:mb-16 px-4">
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] sm:text-[13.62px] font-semibold leading-[100%] tracking-normal uppercase text-[#159A99] mb-3">
            FOR WHOM
          </span>

          <h2 className="mt-2 text-center font-cal font-normal text-[28px] sm:text-[38px] md:text-[50px] leading-[110%] tracking-normal text-[#262626] capitalize">
            Built For Everyone Shaping The Future Of Talent
          </h2>
        </div>

        {/* ── DESKTOP GRID (>= xl): 4-Column Interactive Hover View ── */}
        <div className="hidden grid w-full grid-cols-4 gap-5 xl:gap-6 xl:grid">
          {audiences.map((audience) => (
            <div key={`desktop-${audience.number}`} className="group relative h-[390px] xl:h-[410px] w-full shrink-0">
              <article
                className="
                  relative
                  h-full
                  w-full
                  cursor-pointer
                  overflow-hidden
                  rounded-[28px]
                  border-[1.62px]
                  border-[#E0E0E0]
                  bg-[#F5F7FA]
                  p-7
                  xl:p-8
                  transition-all
                  duration-500
                  ease-out
                  group-hover:-translate-y-1.5
                  group-hover:border-[#159A99]
                  group-hover:bg-[#159A99]
                  group-hover:shadow-[0_20px_40px_-10px_rgba(21,154,153,0.35)]
                "
              >
                {/* ── Number at top-left: Glides smoothly upward & fades on hover ── */}
                <span
                  className="
                    absolute
                    left-7
                    top-6
                    xl:left-8
                    xl:top-7
                    select-none
                    font-geist
                    text-[88px]
                    xl:text-[96px]
                    font-bold
                    leading-none
                    tracking-[-0.08em]
                    text-[#D9D9D9]
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:-translate-y-6
                    group-hover:opacity-0
                  "
                >
                  {audience.number}
                </span>

                {/* ── Dynamic Content Container: Glides seamlessly from default bottom to exact vertical center on hover ── */}
                <div
                  className="
                    absolute
                    left-7
                    right-7
                    top-[225px]
                    xl:left-8
                    xl:right-8
                    xl:top-[235px]
                    flex
                    flex-col
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:top-[95px]
                    min-[1400px]:group-hover:top-[105px]
                    xl:group-hover:top-[105px]
                    transform-gpu
                  "
                >
                  {/* Title: Smooth color transition without blinking or re-rendering */}
                  <h3
                    className="
                      font-geist
                      text-[22px]
                      xl:text-[26px]
                      2xl:text-[28px]
                      font-semibold
                      leading-[118%]
                      tracking-normal
                      text-black
                      transition-colors
                      duration-300
                      ease-out
                      group-hover:text-white
                    "
                  >
                    {audience.title}
                  </h3>

                  {/* Description: Naturally unfolds and fades in beneath Title with gentle staggered ease */}
                  <p
                    className="
                      mt-3
                      xl:mt-3.5
                      font-geist
                      font-light
                      text-[15px]
                      xl:text-[16.5px]
                      2xl:text-[17.5px]
                      leading-[150%]
                      tracking-normal
                      text-white/95
                      opacity-0
                      max-h-0
                      overflow-hidden
                      pointer-events-none
                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:opacity-100
                      group-hover:max-h-60
                      group-hover:pointer-events-auto
                    "
                  >
                    {audience.description}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ── MOBILE / TABLET / IPAD VIEW (< xl): Interactive Tap-to-Fill Cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:hidden sm:grid-cols-2">
          {audiences.map((audience) => {
            const isActive = activeMobileCard === audience.number;

            return (
              <article
                key={`mobile-${audience.number}`}
                onClick={() => toggleMobileCard(audience.number)}
                className={[
                  `
                    relative
                    flex
                    min-h-[235px]
                    sm:min-h-[250px]
                    h-auto
                    w-full
                    cursor-pointer
                    flex-col
                    justify-start
                    overflow-hidden
                    rounded-[24px]
                    sm:rounded-[28px]
                    p-6
                    sm:p-7
                    transition-all
                    duration-500
                    ease-out
                    active:scale-[0.98]
                  `,
                  isActive
                    ? "-translate-y-1 border-[1.62px] border-[#159A99] bg-[#159A99] shadow-[0_20px_40px_-10px_rgba(21,154,153,0.4)]"
                    : "border-[1.62px] border-[#E3E8EC] bg-[#F8FAFC] shadow-sm hover:border-[#159A99]/50",
                ].join(" ")}
              >
                {/* Top Tag */}
                <div className="relative z-10 mb-4 sm:mb-5 flex items-center">
                  <span
                    className={[
                      "rounded-full px-3.5 py-1.5 font-geist text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-colors duration-500",
                      isActive
                        ? "bg-white/20 text-white backdrop-blur-sm"
                        : "bg-[rgba(21,154,153,0.10)] text-[#159A99]",
                    ].join(" ")}
                  >
                    {audience.tag}
                  </span>
                </div>

                {/* Content with comfortable spacing between title and description */}
                <div className="relative z-10 flex flex-col flex-1">
                  <h3
                    className={[
                      "font-geist text-[20px] sm:text-[22px] font-semibold leading-[1.22] tracking-normal transition-colors duration-500",
                      isActive ? "text-white" : "text-[#262626]",
                    ].join(" ")}
                  >
                    {audience.title}
                  </h3>

                  <p
                    className={[
                      "mt-4 sm:mt-5 font-geist text-[14.5px] sm:text-[15.5px] leading-[1.6] transition-colors duration-500",
                      isActive ? "text-white/95" : "text-[#57606A]",
                    ].join(" ")}
                  >
                    {audience.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}