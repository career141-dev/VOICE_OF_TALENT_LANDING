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
    <section className="w-full overflow-hidden bg-white px-6 py-16 text-[#262626] xl:px-[7.4%] xl:py-24">
      {/* Heading */}
      <div className="mx-auto mb-10 text-center lg:mb-16 px-4">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] sm:text-[13.62px] font-semibold leading-[100%] tracking-normal uppercase text-[#159A99] mb-3">
          FOR WHOM
        </span>

        <h2 className="mt-2 text-center font-cal font-normal text-[28px] sm:text-[38px] md:text-[50px] leading-[110%] tracking-normal text-[#262626] capitalize">
          Built For Everyone Shaping The Future Of Talent
        </h2>
      </div>

      {/* ── DESKTOP GRID (>= xl): 4-Column Interactive Hover View ── */}
      <div className="hidden mx-auto grid w-full max-w-[1632px] grid-cols-4 justify-items-center gap-6 xl:grid">
        {audiences.map((audience) => (
          <article
            key={`desktop-${audience.number}`}
            style={{
              height: "345px",
              borderRadius: "28px",
              borderWidth: "1.62px",
              opacity: 1,
            }}
            className="
              group
              relative
              w-full
              max-w-[387px]
              shrink-0
              cursor-pointer
              overflow-hidden
              border-[#E0E0E0]
              bg-[#F5F7FA]
              p-7
              xl:p-8
              transition-all
              duration-500
              ease-out
              hover:-translate-y-1.5
              hover:border-[#159A99]
              hover:bg-[#159A99]
              hover:shadow-[0_20px_40px_-10px_rgba(21,154,153,0.35)]
            "
          >
            {/* Number exits upward on hover */}
            <span
              className="
                absolute
                left-7
                top-6
                select-none
                font-geist
                text-[88px]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-[#D9D9D9]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:-translate-y-10
                group-hover:opacity-0
                xl:left-8
                xl:top-7
                xl:text-[96px]
              "
            >
              {audience.number}
            </span>

            {/* Title travels to top on hover */}
            <h3
              className="
                absolute
                left-7
                right-7
                top-[210px]
                font-geist
                text-[28px]
                font-normal
                leading-[105%]
                tracking-normal
                text-black
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:top-7
                group-hover:text-white
                xl:left-8
                xl:right-8
                xl:top-[205px]
                xl:group-hover:top-8
                xl:text-[35.63px]
                xl:leading-[100%]
              "
            >
              {audience.title}
            </h3>

            {/* Description appears smoothly under Title on hover */}
            <p
              className="
                absolute
                top-[112px]
                left-7
                right-7
                translate-y-3
                font-geist
                font-light
                text-[16px]
                leading-[160%]
                tracking-normal
                text-white
                opacity-0
                transition-all
                delay-100
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:translate-y-0
                group-hover:opacity-100
                xl:top-[120px]
                xl:left-8
                xl:right-8
                xl:text-[17px]
                min-[1560px]:text-[18px]
              "
            >
              {audience.description}
            </p>
          </article>
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
                  h-[215px]
                  sm:h-[230px]
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
              <div className="relative z-10 mb-3 flex items-center justify-between">
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

              {/* Content directly under tag without extra space */}
              <div className="relative z-10 flex flex-col">
                <h3
                  className={[
                    "font-geist text-[22px] sm:text-[26px] font-normal leading-[1.15] tracking-normal transition-colors duration-500",
                    isActive ? "text-white" : "text-black",
                  ].join(" ")}
                >
                  {audience.title}
                </h3>

                <p
                  className={[
                    "mt-2 font-geist text-[14px] sm:text-[15px] leading-[1.55] transition-colors duration-500",
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
    </section>
  );
}