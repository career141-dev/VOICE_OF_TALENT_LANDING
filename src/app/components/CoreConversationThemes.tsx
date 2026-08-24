"use client";

import React, { useRef, useState } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const topicImage = `${R2_MEDIA_URL}/images/video.png`;

type ThemeItem = {
  id: number;
  number: string;
  tag: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image: string;
  accentColor: string;
};

const themes: ThemeItem[] = [
  {
    id: 1,
    number: "01",
    tag: "TECH & AUTOMATION",
    duration: "24 MIN STREAM",
    title: "AI & Automation in Recruitment",
    subtitle: "Algorithm vs. Intuition",
    description:
      "How Sri Lankan organizations are using smart automation without losing the vital human element of talent matching.",
    image: topicImage,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#159A99",
  },
  {
    id: 2,
    number: "02",
    tag: "CAREER BLUEPRINTS",
    duration: "18 MIN STREAM",
    title: "Building TA Careers",
    subtitle: "From Recruiter to Strategic Partner",
    description:
      "Navigating the modern talent acquisition profession — key skills, executive influence, and long-term career growth in high-demand markets.",
    image: topicImage,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#0D7C7B",
  },
  {
    id: 3,
    number: "03",
    tag: "BRAND & EXPERIENCE",
    duration: "22 MIN STREAM",
    title: "Candidate Experience",
    subtitle: "The Empathy Advantage",
    description:
      "Designing transparent, empathetic interview journeys that elevate employer brand prestige and build lasting talent relationships.",
    image: topicImage,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#159A99",
  },
  {
    id: 4,
    number: "04",
    tag: "EXECUTIVE INSIGHTS",
    duration: "30 MIN STREAM",
    title: "Strategic Leadership Lessons",
    subtitle: "Leading Through Disruption",
    description:
      "Actionable insights from veteran HR heads on agile workforce planning, culture transformation, and steering talent through economic shifts.",
    image: topicImage,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#0B5959",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Synchronized diagonal expansion:
  // isSwapped = false (Initial state): Cards 1 and 4 are expanded; Cards 2 and 3 are compact.
  // isSwapped = true (Hovered on 2 or 3): Cards 2 and 3 expand; Cards 1 and 4 become compact.
  const [isSwapped, setIsSwapped] = useState(false);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#FAFCFC] px-6 py-16 text-[#1A1A1A] md:px-12 lg:px-[8.7%] lg:py-20">
      {/* Header Section — Centered on Mobile & iPad (< xl) */}
      <div className="mb-10 flex flex-col justify-between gap-6 max-xl:items-center max-xl:text-center xl:flex-row xl:items-end lg:mb-12">
        <div className="flex flex-col items-start max-xl:items-center">
          <span className="inline-flex w-fit items-center rounded-full bg-[#E0F2F1] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#00897B]">
            CURATED TOPICS
          </span>

          <h2 className="mt-3 font-geist text-3xl font-bold tracking-tight text-[#161616] sm:text-4xl md:text-[40px]">
            Core Conversation Themes
          </h2>
        </div>

        {/* Navigation Arrow Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Previous themes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F5F7] text-[#161616] transition-colors hover:bg-[#E2E8EC] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Next themes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F5F7] text-[#161616] transition-colors hover:bg-[#E2E8EC] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP GRID ── */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* Row 1: Card 01 & Card 02 */}
        <div className="flex w-full gap-6">
          {/* Card 01 (AI & Automation) - Expanded in initial state */}
          <div
            onMouseEnter={() => setIsSwapped(false)}
            onClick={() => setIsSwapped(false)}
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSwapped ? "flex-[635] cursor-pointer" : "flex-[970]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[0]}
              variant={isSwapped ? "small" : "large"}
            />
          </div>

          {/* Card 02 (Building TA Careers) - Expands on hover/click */}
          <div
            onMouseEnter={() => setIsSwapped(true)}
            onClick={() => setIsSwapped(true)}
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSwapped ? "flex-[970]" : "flex-[635] cursor-pointer",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[1]}
              variant={isSwapped ? "large" : "small"}
            />
          </div>
        </div>

        {/* Row 2: Card 03 & Card 04 */}
        <div className="flex w-full gap-6">
          {/* Card 03 (Candidate Experience) - Expands on hover/click */}
          <div
            onMouseEnter={() => setIsSwapped(true)}
            onClick={() => setIsSwapped(true)}
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSwapped ? "flex-[970]" : "flex-[635] cursor-pointer",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[2]}
              variant={isSwapped ? "large" : "small"}
            />
          </div>

          {/* Card 04 (Strategic Leadership) - Expanded in initial state */}
          <div
            onMouseEnter={() => setIsSwapped(false)}
            onClick={() => setIsSwapped(false)}
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSwapped ? "flex-[635] cursor-pointer" : "flex-[970]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[3]}
              variant={isSwapped ? "small" : "large"}
            />
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE VIEW ── */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 xl:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((item) => (
          <div
            key={item.id}
            className="w-[300px] shrink-0 snap-start sm:w-[380px]"
          >
            <MobileThemeCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Desktop Card Component ── */
function DesktopThemeCard({
  item,
  variant,
}: {
  item: ThemeItem;
  variant: "large" | "small";
}) {
  const isLarge = variant === "large";

  return (
    <article
      style={{ borderWidth: "1.62px" }}
      className={[
        "relative flex h-[335px] w-full overflow-hidden rounded-[30px] border-[#E3E8EC] bg-[#F7F9FA] p-8 lg:p-9",
        "transition-all duration-500 ease-out opacity-100",
        isLarge ? "flex-row justify-between gap-6" : "flex-col justify-between",
      ].join(" ")}
    >
      {isLarge ? (
        <>
          {/* Main Info Column */}
          <div className="flex flex-1 flex-col justify-between pr-4">
            <h3 className="max-w-[400px] font-geist text-[26px] font-medium leading-tight text-[#161616] lg:text-[32px]">
              {item.title}
            </h3>

            <p className="max-w-[420px] font-geist text-[18px] leading-relaxed text-[#7D8590]">
              {item.description}
            </p>
          </div>

          {/* Image Frame */}
          <div className="h-full w-[260px] shrink-0 overflow-hidden rounded-[20px] bg-gray-200 lg:w-[280px]">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
        </>
      ) : (
        /* Compressed Compact Card */
        <div className="flex h-full w-full flex-col pt-3 lg:pt-4">
          {/* Icon Header */}
          <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#E0F2F1]">
            <img src={item.icon} alt="" className="object-contain" />
          </div>

          {/* Text Container */}
          <div className="mt-auto">
            <h3 className="font-geist text-[32px] font-medium leading-snug text-[#161616] lg:text-[26px]">
              {item.title}
            </h3>

            <p className="mt-2.5 line-clamp-2 font-geist text-[18px] leading-relaxed text-[#7D8590]">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Mobile / Tablet Card Component ── */
function MobileThemeCard({ item }: { item: ThemeItem }) {
  return (
    <article
      style={{ borderWidth: "1.62px" }}
      className="relative flex h-[420px] w-full flex-col justify-between overflow-hidden rounded-[30px] border-[#E3E8EC] bg-white p-6 opacity-100 shadow-sm"
    >
      {/* Watermark */}
      <span
        className="pointer-events-none absolute right-4 top-2 select-none font-geist text-[90px] font-black leading-none text-[#F2F6F8]"
        aria-hidden="true"
      >
        {item.number}
      </span>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)]">
          <img src={item.icon} alt="" className="object-contain" />
        </div>
      </div>

      {/* Image Banner */}
      {item.image && (
        <div className="relative z-10 my-3 h-[145px] w-full overflow-hidden rounded-[18px] shadow-sm">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#159A99]" />
            <span className="font-geist text-[10px] font-semibold uppercase text-white">
              {item.duration}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-geist text-[19px] font-bold leading-snug text-[#161616]">
          {item.title}
        </h3>
        <p className="mt-1 font-geist text-[12px] font-medium text-[#159A99]">
          {item.subtitle}
        </p>
        <p className="mt-2 line-clamp-2 font-geist text-[13px] leading-relaxed text-[#57606A]">
          {item.description}
        </p>
      </div>
    </article>
  );
}