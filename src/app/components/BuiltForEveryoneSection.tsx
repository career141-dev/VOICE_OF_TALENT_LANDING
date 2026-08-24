"use client";

import React, { useState } from "react";

const audiences = [
  {
    number: "01",
    tag: "CAPABILITY",
    title: "TA Professionals",
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
      <div className="mx-auto mb-10 text-center lg:mb-16">
        <span className="mb-3 inline-flex items-center rounded-full border border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-4 py-1.5 font-geist text-[12px] font-semibold uppercase leading-normal text-[#159A99] md:text-[13.6px]">
          For Whom
        </span>

        <h2 className="mt-2 font-geist text-[28px] font-bold leading-tight tracking-[-0.04em] text-[#262626] sm:text-4xl lg:text-[46px]">
          Built For Everyone Shaping The Future Of Talent
        </h2>
      </div>

      {/* ── DESKTOP GRID (>= xl): 4-Column Interactive Hover View ── */}
      <div className="hidden mx-auto grid w-full max-w-[1632px] grid-cols-4 justify-items-center gap-6 xl:grid">
        {audiences.map((audience) => (
          <article
            key={`desktop-${audience.number}`}
            style={{
              height: "510px",
              borderRadius: "29.98px",
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
              p-8
              transition-all
              duration-500
              ease-out
              hover:-translate-y-1.5
              hover:border-[#159A99]
              hover:bg-[#159A99]
              hover:shadow-[0_20px_40px_-10px_rgba(21,154,153,0.3)]
            "
          >
            {/* Number exits upward on hover */}
            <span
              className="
                absolute
                left-8
                top-10
                select-none
                font-geist
                text-[108px]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-[#D9D9D9]
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:-translate-y-12
                group-hover:opacity-0
              "
            >
              {audience.number}
            </span>

            {/* Title travels to top on hover */}
            <h3
              className="
                absolute
                left-8
                right-8
                top-[365px]
                font-geist
                text-[26px]
                font-normal
                leading-[1.2]
                tracking-[-0.03em]
                text-black
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:top-10
                group-hover:font-medium
                group-hover:text-white
                xl:text-[30px]
              "
            >
              {audience.title}
            </h3>

            {/* Description appears on hover */}
            <p
              className="
                absolute
                bottom-14
                left-8
                right-8
                translate-y-6
                font-geist
                text-[17px]
                leading-[1.65]
                text-white/90
                opacity-0
                transition-all
                delay-150
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >
              {audience.description}
            </p>
          </article>
        ))}
      </div>

      {/* ── MOBILE / TABLET / IPAD VIEW (< xl): Interactive Tap-to-Fill Cards ── */}
      <div className="grid grid-cols-1 gap-4 xl:hidden sm:grid-cols-2">
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
                  cursor-pointer
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-[24px]
                  p-6
                  transition-all
                  duration-500
                  ease-out
                  active:scale-[0.98]
                `,
                isActive
                  ? "-translate-y-0.5 border border-[#159A99] bg-[#159A99] shadow-[0_16px_32px_-8px_rgba(21,154,153,0.35)]"
                  : "border border-[#E3E8EC] bg-[#F8FAFC] shadow-sm",
              ].join(" ")}
            >
              {/* Watermark Number */}
              <span
                className={[
                  "pointer-events-none absolute right-4 top-1 select-none font-geist text-[80px] font-black leading-none tracking-[-0.08em] transition-colors duration-500",
                  isActive ? "text-white/20" : "text-[#E5ECF0]",
                ].join(" ")}
                aria-hidden="true"
              >
                {audience.number}
              </span>

              {/* Top Tag & Number */}
              <div className="relative z-10 mb-4 flex items-center justify-between">
                <span
                  className={[
                    "rounded-full px-3 py-1 font-geist text-[11px] font-bold uppercase tracking-wider transition-colors duration-500",
                    isActive
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "bg-[rgba(21,154,153,0.10)] text-[#159A99]",
                  ].join(" ")}
                >
                  {audience.tag}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className={[
                    "font-geist text-[21px] font-bold leading-tight transition-colors duration-500",
                    isActive ? "text-white" : "text-[#161616]",
                  ].join(" ")}
                >
                  {audience.title}
                </h3>

                <p
                  className={[
                    "mt-2.5 font-geist text-[14px] leading-relaxed transition-colors duration-500",
                    isActive ? "text-white/90" : "text-[#57606A]",
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