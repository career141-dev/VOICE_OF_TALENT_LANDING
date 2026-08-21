"use client";

import React from "react";

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
  return (
    <section className="w-full overflow-hidden bg-white px-6 py-16 text-[#262626] md:px-12 lg:px-[7.4%] lg:py-24">
      {/* Heading */}
      <div className="mx-auto mb-10 text-center lg:mb-16">
        <span className="inline-flex items-center rounded-full border border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-4 py-1.5 font-geist text-[12px] md:text-[13.6px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
          For Whom
        </span>

        <h2 className="mt-2 font-geist text-[28px] sm:text-4xl lg:text-[46px] font-bold tracking-[-0.04em] text-[#262626] leading-tight">
          Built For Everyone Shaping The Future Of Talent
        </h2>
      </div>

      {/* ── DESKTOP GRID (>= md): Full Interactive Hover Transformation ── */}
      <div className="hidden md:grid mx-auto max-w-[1632px] grid-cols-2 justify-items-center gap-6 xl:grid-cols-4">
        {audiences.map((audience) => (
          <article
            key={`desktop-${audience.number}`}
            className="
              group
              relative
              h-[510px]
              w-full
              max-w-[387px]
              shrink-0
              overflow-hidden
              rounded-[29.98px]
              border-[1.62px]
              border-[#E0E0E0]
              bg-[#F5F7FA]
              p-8
              cursor-pointer
              transition-all
              duration-500
              ease-out
              hover:border-[#159A99]
              hover:bg-[#159A99]
              hover:shadow-[0_20px_40px_-10px_rgba(21,154,153,0.3)]
              hover:-translate-y-1.5
            "
          >
            {/* Number exits upward on hover */}
            <span
              className="
                absolute
                left-8
                top-10
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
                select-none
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
                text-[28px]
                lg:text-[30px]
                font-normal
                leading-[1.2]
                tracking-[-0.03em]
                text-black
                transition-all
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:top-10
                group-hover:text-white
                group-hover:font-medium
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

      {/* ── MOBILE VIEW (< md): Clean, High-Contrast & Legible Cards ── */}
      <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-4">
        {audiences.map((audience) => (
          <article
            key={`mobile-${audience.number}`}
            className="
              relative
              flex
              flex-col
              justify-between
              overflow-hidden
              rounded-[24px]
              border
              border-[#E3E8EC]
              bg-[#F8FAFC]
              p-6
              shadow-sm
              transition-all
              active:bg-[#F0F5F6]
              active:border-[#159A99]/50
            "
          >
            {/* Watermark Number */}
            <span
              className="
                pointer-events-none
                absolute
                right-4
                top-1
                font-geist
                text-[80px]
                font-black
                leading-none
                tracking-[-0.08em]
                text-[#E5ECF0]
                select-none
              "
              aria-hidden="true"
            >
              {audience.number}
            </span>

            {/* Top Tag & Number */}
            <div className="relative z-10 flex items-center justify-between mb-4">
              <span className="rounded-full bg-[rgba(21,154,153,0.10)] px-3 py-1 font-geist text-[11px] font-bold uppercase tracking-wider text-[#159A99]">
                {audience.tag}
              </span>
            </div>

            {/* Title */}
            <div className="relative z-10">
              <h3 className="font-geist text-[21px] font-bold leading-tight text-[#161616]">
                {audience.title}
              </h3>

              {/* Description directly readable without hover */}
              <p className="mt-2.5 font-geist text-[14px] leading-relaxed text-[#57606A]">
                {audience.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}