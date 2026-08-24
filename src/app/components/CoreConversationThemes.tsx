"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const topicImage = "/images/video.png";
const arrowRightTeal = "/icons/arrow-right-teal.svg";

type ThemeItem = {
  id: number;
  number: string;
  tag: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image?: string;
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
      "How forward-thinking Sri Lankan organizations are leveraging smart AI screening and automated workflows while fiercely safeguarding human empathy in talent evaluation.",
    image: topicImage,
    icon: "/icons/career.png",
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
      "Navigating the evolving talent acquisition craft — developing executive influence, data fluency, and architecting long-term leadership in high-demand markets.",
    image: topicImage,
    icon: "/icons/career.png",
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
      "Engineering transparent, high-touch interview journeys that elevate employer brand prestige, respect candidate dignity, and build generational talent loyalty.",
    image: topicImage,
    icon: "/icons/people.png",
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
      "Candid playbooks from veteran HR leaders on agile workforce planning, culture transformation, and steering enterprise talent through national economic shifts.",
    image: topicImage,
    icon: "/icons/people.png",
    accentColor: "#0B5959",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Single global hover state for synchronized row expansion
  const [isSmallHovered, setIsSmallHovered] = useState(false);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFCFC] px-6 py-20 text-[#1A1A1A] md:px-12 lg:px-[8.7%] lg:py-28">
      {/* Subtle Background Radial Glow */}
      <div 
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(21,154,153,0.08),transparent_70%)] blur-3xl" 
        aria-hidden="true" 
      />

      {/* Header Section */}
      <div className="relative mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
        <div className="max-w-[620px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(21,154,153,0.25)] bg-[rgba(21,154,153,0.08)] px-4 py-1.5 font-geist text-[12px] font-semibold uppercase tracking-wider text-[#159A99] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#159A99] animate-pulse" />
            Curated Knowledge Pillars
          </div>

          <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight text-[#161616] sm:text-4xl md:text-[44px] md:leading-[1.15]">
            Core Conversation Themes
          </h2>

          <p className="mt-3 font-geist text-[15px] sm:text-[17px] text-[#6E7781] leading-relaxed">
            Four critical pillars explored through candid, unfiltered discussions with Sri Lanka&apos;s leading talent executives.
          </p>
        </div>

        {/* Navigation Controls for Mobile/Tablet Carousel */}
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Previous themes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E1E6EB] bg-white text-[#159A99] shadow-sm transition-all hover:border-[#159A99] hover:bg-[#F2F8F8] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Next themes"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E1E6EB] bg-white text-[#159A99] shadow-sm transition-all hover:border-[#159A99] hover:bg-[#F2F8F8] active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP GRID: Editorial Flex Expansion with Atmospheric Details ── */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* Row 1 */}
        <div className="flex w-full gap-6">
          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isSmallHovered ? "flex-[620]" : "flex-[980]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[0]}
              variant={isSmallHovered ? "small" : "large"}
            />
          </div>

          <div
            onMouseEnter={() => setIsSmallHovered(true)}
            onMouseLeave={() => setIsSmallHovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isSmallHovered ? "flex-[980]" : "flex-[620]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[1]}
              variant={isSmallHovered ? "large" : "small"}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setIsSmallHovered(true)}
            onMouseLeave={() => setIsSmallHovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isSmallHovered ? "flex-[980]" : "flex-[620]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[2]}
              variant={isSmallHovered ? "large" : "small"}
            />
          </div>

          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isSmallHovered ? "flex-[620]" : "flex-[980]",
            ].join(" ")}
          >
            <DesktopThemeCard
              item={themes[3]}
              variant={isSmallHovered ? "small" : "large"}
            />
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE VIEW: Curated Editorial Cards ── */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 xl:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((item) => (
          <div
            key={item.id}
            className="w-[300px] sm:w-[380px] shrink-0 snap-start"
          >
            <MobileThemeCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Desktop Card with Signature Watermark & Audio Waves ── */
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
      className={[
        "group relative flex h-[350px] w-full overflow-hidden rounded-[28px] border border-[#E3E8EC] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]",
        "transition-all duration-500 ease-out hover:border-[#159A99]/40 hover:shadow-[0_20px_40px_-12px_rgba(21,154,153,0.14)]",
        isLarge ? "flex-row" : "flex-col",
      ].join(" ")}
    >
      {/* Stylized Giant Watermark Number */}
      <span 
        className="pointer-events-none absolute right-6 top-3 select-none font-geist text-[110px] font-black leading-none text-[#F0F4F6] transition-colors duration-500 group-hover:text-[#E4EDEF]"
        aria-hidden="true"
      >
        {item.number}
      </span>

      {isLarge ? (
        <>
          {/* Main Info Column */}
          <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between p-8 lg:p-9">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[rgba(21,154,153,0.10)] px-3 py-1 font-geist text-[11px] font-bold uppercase tracking-wider text-[#159A99]">
                  {item.tag}
                </span>
                <span className="font-geist text-[12px] font-medium text-[#8C959F]">
                  {item.duration}
                </span>
              </div>

              <h3 className="mt-4 font-geist text-[26px] font-bold leading-tight text-[#161616] lg:text-[30px]">
                {item.title}
              </h3>

              <p className="mt-1 font-geist text-[14px] font-medium text-[#159A99]">
                {item.subtitle}
              </p>
            </div>

            <div>
              <p className="max-w-[460px] font-geist text-[14.5px] leading-relaxed text-[#57606A]">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-2 font-geist text-[13px] font-semibold text-[#159A99] transition-transform group-hover:translate-x-1">
                Explore Topic Stream
                <img src={arrowRightTeal} alt="" className="h-3.5 w-3.5 object-contain" />
              </div>
            </div>
          </div>

          {/* Media Graphic Frame */}
          <div className="relative z-10 w-[40%] shrink-0 p-6 pl-0">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#12181F] shadow-sm">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Media Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#159A99]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                  </span>
                  <span className="font-geist text-[11px] font-bold uppercase tracking-widest text-white/90">
                    VOTA MASTERCLASS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Compressed Compact Card */
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-8 lg:p-9">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[rgba(21,154,153,0.10)] border border-[rgba(21,154,153,0.20)]">
                <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
              </div>

              <span className="rounded-full bg-[#F4F6F8] px-3 py-1 font-geist text-[11px] font-bold uppercase text-[#57606A]">
                {item.tag}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="font-geist text-[22px] font-bold leading-snug text-[#161616] lg:text-[26px]">
                {item.title}
              </h3>
              <p className="mt-1 font-geist text-[13px] font-medium text-[#159A99]">
                {item.subtitle}
              </p>
            </div>
          </div>

          <div className="border-t border-[#EDF1F4] pt-4 flex items-center justify-between">
            <span className="font-geist text-[12px] font-medium text-[#8C959F]">
              {item.duration}
            </span>
            <span className="font-geist text-[12px] font-semibold text-[#159A99] uppercase tracking-wide group-hover:underline">
              Tap to Expand →
            </span>
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Mobile / Tablet Card with Visual Prestige ── */
function MobileThemeCard({ item }: { item: ThemeItem }) {
  return (
    <article className="relative flex h-[420px] w-full flex-col justify-between overflow-hidden rounded-[26px] border border-[#E3E8EC] bg-white p-6 shadow-sm">
      {/* Giant Watermark */}
      <span 
        className="pointer-events-none absolute right-4 top-2 select-none font-geist text-[90px] font-black leading-none text-[#F2F6F8]" 
        aria-hidden="true"
      >
        {item.number}
      </span>

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[rgba(21,154,153,0.10)] border border-[rgba(21,154,153,0.20)]">
          <img src={item.icon} alt="" className="h-5 w-5 object-contain" />
        </div>
        <span className="rounded-full bg-[rgba(21,154,153,0.10)] px-3 py-1 font-geist text-[11px] font-bold uppercase tracking-wide text-[#159A99]">
          {item.tag}
        </span>
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