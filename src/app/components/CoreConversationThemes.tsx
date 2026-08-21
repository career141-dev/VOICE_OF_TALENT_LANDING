"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const topicImage = "/images/video.png";
const arrowRightTeal = "/icons/arrow-right-teal.svg";

type ThemeItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  tag: string;
};

const themes: ThemeItem[] = [
  {
    id: 1,
    title: "AI & Automation in Recruitment",
    description:
      "How modern organizations are leveraging smart automation without losing the vital human touch in talent matching.",
    image: topicImage,
    icon: "/icons/career.png",
    tag: "Future Tech",
  },
  {
    id: 2,
    title: "Building TA Careers",
    description:
      "Navigating the talent acquisition trajectory from frontline sourcing to strategic executive leadership.",
    image: topicImage,
    icon: "/icons/career.png",
    tag: "Growth",
  },
  {
    id: 3,
    title: "Candidate Experience",
    description:
      "Designing frictionless, respectful hiring journeys that turn candidates into lifelong brand champions.",
    image: topicImage,
    icon: "/icons/people.png",
    tag: "Experience",
  },
  {
    id: 4,
    title: "Strategic Leadership Lessons",
    description:
      "Executive insights on aligning workforce capability with high-growth business transformations.",
    image: topicImage,
    icon: "/icons/people.png",
    tag: "Leadership",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [hoveredRow1, setHoveredRow1] = useState<number | null>(null);
  const [hoveredRow2, setHoveredRow2] = useState<number | null>(null);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 flex items-end justify-between gap-6 lg:mb-14"
      >
        <div>
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
            Curated Topics
          </span>

          <h2 className="mt-3 font-geist text-3xl font-extrabold tracking-tight md:text-[42px] text-[#262626]">
            Core Conversation Themes
          </h2>
        </div>

        {/* Navigation Arrows for Mobile Slider */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Previous themes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F5F7FA] text-[#0B5959] transition-all hover:bg-[#159A99] hover:text-white hover:border-[#159A99] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5 rotate-180">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Next themes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E0E0E0] bg-[#F5F7FA] text-[#0B5959] transition-all hover:bg-[#159A99] hover:text-white hover:border-[#159A99] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* ── Desktop Dynamic Accordion Grid ── */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* Row 1 (Items 0 and 1) */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setHoveredRow1(0)}
            onMouseLeave={() => setHoveredRow1(null)}
            className={`min-w-0 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredRow1 === 0
                ? "flex-[1.65]"
                : hoveredRow1 === 1
                ? "flex-[0.85]"
                : "flex-[1.4]"
            }`}
          >
            <PremiumThemeCard
              item={themes[0]}
              isExpanded={hoveredRow1 === 0 || (hoveredRow1 === null && true)}
            />
          </div>

          <div
            onMouseEnter={() => setHoveredRow1(1)}
            onMouseLeave={() => setHoveredRow1(null)}
            className={`min-w-0 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredRow1 === 1
                ? "flex-[1.65]"
                : hoveredRow1 === 0
                ? "flex-[0.85]"
                : "flex-[1]"
            }`}
          >
            <PremiumThemeCard
              item={themes[1]}
              isExpanded={hoveredRow1 === 1}
            />
          </div>
        </div>

        {/* Row 2 (Items 2 and 3) */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setHoveredRow2(2)}
            onMouseLeave={() => setHoveredRow2(null)}
            className={`min-w-0 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredRow2 === 2
                ? "flex-[1.65]"
                : hoveredRow2 === 3
                ? "flex-[0.85]"
                : "flex-[1]"
            }`}
          >
            <PremiumThemeCard
              item={themes[2]}
              isExpanded={hoveredRow2 === 2}
            />
          </div>

          <div
            onMouseEnter={() => setHoveredRow2(3)}
            onMouseLeave={() => setHoveredRow2(null)}
            className={`min-w-0 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              hoveredRow2 === 3
                ? "flex-[1.65]"
                : hoveredRow2 === 2
                ? "flex-[0.85]"
                : "flex-[1.4]"
            }`}
          >
            <PremiumThemeCard
              item={themes[3]}
              isExpanded={hoveredRow2 === 3 || (hoveredRow2 === null && true)}
            />
          </div>
        </div>
      </div>

      {/* ── Tablet / Mobile Carousel ── */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 xl:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((item) => (
          <div
            key={item.id}
            className="w-[300px] sm:w-[420px] shrink-0 snap-start"
          >
            <PremiumThemeCard item={item} isExpanded={true} />
          </div>
        ))}
      </div>
    </section>
  );
}

function PremiumThemeCard({
  item,
  isExpanded,
}: {
  item: ThemeItem;
  isExpanded: boolean;
}) {
  return (
    <div
      className={`
        group 
        relative 
        flex 
        h-[340px] 
        w-full 
        overflow-hidden 
        rounded-[28px] 
        border 
        border-[#E0E0E0] 
        bg-[#F5F7FA] 
        cursor-pointer
        transition-all 
        duration-500 
        ease-[cubic-bezier(0.25,1,0.5,1)]
        hover:border-[#159A99]/50
        hover:shadow-[0_20px_40px_-15px_rgba(21,154,153,0.18)]
        hover:-translate-y-1
        ${isExpanded ? "flex-row" : "flex-col"}
      `}
    >
      {isExpanded ? (
        /* ── Wide Expanded Card Layout ── */
        <div className="flex w-full h-full justify-between">
          <div className="flex min-w-0 flex-1 flex-col justify-between p-7 lg:p-9">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-[rgba(21,154,153,0.12)] px-3 py-1 text-[11px] font-semibold text-[#159A99] uppercase tracking-wider font-geist">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-geist text-[24px] lg:text-[28px] font-bold leading-[1.2] text-[#151515] group-hover:text-[#159A99] transition-colors">
                {item.title}
              </h3>
            </div>

            <div>
              <p className="font-geist text-[14px] lg:text-[15px] leading-[1.55] text-[#666] line-clamp-3 mb-4">
                {item.description}
              </p>

              <div className="inline-flex items-center gap-2 font-geist text-[13px] font-semibold uppercase text-[#159A99] tracking-wider transition-all group-hover:gap-3">
                EXPLORE TOPIC
                <img src={arrowRightTeal} alt="" className="h-3.5 w-3.5 object-contain" />
              </div>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="relative w-[38%] shrink-0 p-5 pl-0 hidden sm:block">
            <div className="h-full w-full overflow-hidden rounded-[20px] relative">
              <img
                src={item.image || topicImage}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </div>
          </div>
        </div>
      ) : (
        /* ── Compact Card Layout ── */
        <div className="flex h-full w-full flex-col justify-between p-7 lg:p-9">
          <div className="flex items-center justify-between">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[rgba(21,154,153,0.10)] transition-all group-hover:bg-[#159A99] group-hover:scale-105">
              <img
                src={item.icon}
                alt=""
                className="h-6 w-6 object-contain transition-all group-hover:brightness-0 group-hover:invert"
              />
            </div>
            <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wider font-geist">
              {item.tag}
            </span>
          </div>

          <div>
            <h3 className="mb-2 font-geist text-[22px] lg:text-[25px] font-bold leading-[1.2] text-[#151515] group-hover:text-[#159A99] transition-colors">
              {item.title}
            </h3>
            <p className="font-geist text-[13px] leading-[1.5] text-[#7A7A7A] line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}