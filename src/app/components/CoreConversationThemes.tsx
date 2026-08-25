"use client";

import React, { useRef, useState } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const topicImage = `${R2_MEDIA_URL}/images/video.png`;

type ThemeItem = {
  id: number;
  number: string;
  tag: string;
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
    tag: "STRATEGIC EVOLUTION",
    title: "The changing role of Talent Acquisition",
    subtitle: "From Transactional to Transformational",
    description:
      "How modern talent teams are evolving from operational recruiters into strategic advisors who shape workforce strategy and long-term organizational success.",
    image: `${R2_MEDIA_URL}/images/core%20section/core1.png`,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#159A99",
  },
  {
    id: 2,
    number: "02",
    tag: "CAREER BLUEPRINTS",
    title: "Building a meaningful career in TA",
    subtitle: "Mastery, Growth & Executive Influence",
    description:
      "Navigating the talent acquisition profession with purpose — developing key competencies, stakeholder trust, and sustainable career progression in competitive markets.",
    image: `${R2_MEDIA_URL}/images/core%20section/core2.png`,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#0D7C7B",
  },
  {
    id: 3,
    number: "03",
    tag: "TALENT ASSESSMENT",
    title: "Recognizing potential beyond a resume",
    subtitle: "Unlocking Hidden Capabilities",
    description:
      "Evaluating mindset, problem-solving ability, and culture-add to discover exceptional talent beyond conventional credentials and traditional job qualifications.",
    image: `${R2_MEDIA_URL}/images/core%20section/core3.png`,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#159A99",
  },
  {
    id: 4,
    number: "04",
    tag: "CANDIDATE JOURNEY",
    title: "Creating better candidate experiences",
    subtitle: "The Empathy Advantage",
    description:
      "Designing transparent, empathetic interview journeys that elevate employer brand prestige, respect applicant time, and build lasting professional relationships.",
    image: `${R2_MEDIA_URL}/images/core%20section/core4.png`,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#0B5959",
  },
  {
    id: 5,
    number: "05",
    tag: "BUSINESS IMPACT",
    title: "The relationship between talent and business growth",
    subtitle: "People as the Ultimate Growth Engine",
    description:
      "Understanding how visionary hiring directly drives bottom-line profitability, fuels market expansion, and establishes sustainable competitive differentiation.",
    image: `${R2_MEDIA_URL}/images/core%20section/core5.png`,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#159A99",
  },
  {
    id: 6,
    number: "06",
    tag: "TECH & INNOVATION",
    title: "Technology, AI and the future of recruitment",
    subtitle: "Algorithm Meets Human Intuition",
    description:
      "Leveraging smart automation and AI-driven screening to optimize hiring velocity while fiercely safeguarding the vital human touch in decision-making.",
    image: `${R2_MEDIA_URL}/images/core%20section/core6.png`,
    icon: `${R2_MEDIA_URL}/icons/career.png`,
    accentColor: "#0D7C7B",
  },
  {
    id: 7,
    number: "07",
    tag: "EXECUTIVE PERSPECTIVE",
    title: "Leadership lessons from inside the industry",
    subtitle: "Wisdom from Veteran HR Heads",
    description:
      "Unfiltered leadership insights on navigating disruption, building resilient team cultures, and guiding talent through dynamic economic shifts.",
    image: `${R2_MEDIA_URL}/images/core%20section/core7.png`,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#159A99",
  },
  {
    id: 8,
    number: "08",
    tag: "NATIONAL WORKFORCE",
    title: "The future of Sri Lanka's workforce",
    subtitle: "Building Global Competitiveness",
    description:
      "Empowering the next generation of local professionals with globally competitive skills, adaptable mindsets, and cross-industry opportunities.",
    image: `${R2_MEDIA_URL}/images/core%20section/core8.png`,
    icon: `${R2_MEDIA_URL}/icons/people.png`,
    accentColor: "#0B5959",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Active page: 0 = First 4 widgets (Themes 1-4), 1 = Other 4 widgets (Themes 5-8)
  const [currentPage, setCurrentPage] = useState<0 | 1>(0);

  // Synchronized diagonal expansion:
  // isSwapped = false (Initial state): Cards 1 and 4 (or 5 and 8) are expanded; Cards 2 and 3 (or 6 and 7) are compact.
  // isSwapped = true (Hovered on 2 or 3): Cards 2 and 3 expand; Cards 1 and 4 become compact.
  const [isSwappedPage1, setIsSwappedPage1] = useState(false);
  const [isSwappedPage2, setIsSwappedPage2] = useState(false);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
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

        {/* Navigation Arrow Controls with Page Indicator */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous 4 themes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F5F7] text-[#161616] transition-all hover:bg-[#E2E8EC] hover:text-[#159A99] active:scale-95 cursor-pointer shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Desktop Page Indicators */}
          <div className="hidden items-center gap-2 px-1 xl:flex">
            <button
              type="button"
              onClick={() => setCurrentPage(0)}
              aria-label="Show themes 1 to 4"
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentPage === 0 ? "w-7 bg-[#159A99]" : "w-2.5 bg-[#D5DCE2] hover:bg-[#B8C2CC]"
                }`}
            />
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              aria-label="Show themes 5 to 8"
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentPage === 1 ? "w-7 bg-[#159A99]" : "w-2.5 bg-[#D5DCE2] hover:bg-[#B8C2CC]"
                }`}
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next 4 themes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F5F7] text-[#161616] transition-all hover:bg-[#E2E8EC] hover:text-[#159A99] active:scale-95 cursor-pointer shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP PAGINATED 4-WIDGET VIEW WITH SMOOTH SLIDE ── */}
      <div className="hidden w-full overflow-hidden xl:block">
        <div
          className="flex w-[200%] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: currentPage === 0 ? "translateX(0%)" : "translateX(-50%)",
          }}
        >
          {/* ── PAGE 1: 4 Widgets (Themes 01, 02, 03, 04) ── */}
          <div className="w-1/2 shrink-0 flex flex-col gap-6 pr-4">
            {/* Row 1: Card 01 & Card 02 */}
            <div className="flex w-full gap-6">
              {/* Card 01 - Expanded in initial state */}
              <div
                onMouseEnter={() => setIsSwappedPage1(false)}
                onClick={() => setIsSwappedPage1(false)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage1 ? "flex-[635] cursor-pointer" : "flex-[970]",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[0]}
                  variant={isSwappedPage1 ? "small" : "large"}
                />
              </div>

              {/* Card 02 - Expands on hover/click */}
              <div
                onMouseEnter={() => setIsSwappedPage1(true)}
                onClick={() => setIsSwappedPage1(true)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage1 ? "flex-[970]" : "flex-[635] cursor-pointer",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[1]}
                  variant={isSwappedPage1 ? "large" : "small"}
                />
              </div>
            </div>

            {/* Row 2: Card 03 & Card 04 */}
            <div className="flex w-full gap-6">
              {/* Card 03 - Expands on hover/click */}
              <div
                onMouseEnter={() => setIsSwappedPage1(true)}
                onClick={() => setIsSwappedPage1(true)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage1 ? "flex-[970]" : "flex-[635] cursor-pointer",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[2]}
                  variant={isSwappedPage1 ? "large" : "small"}
                />
              </div>

              {/* Card 04 - Expanded in initial state */}
              <div
                onMouseEnter={() => setIsSwappedPage1(false)}
                onClick={() => setIsSwappedPage1(false)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage1 ? "flex-[635] cursor-pointer" : "flex-[970]",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[3]}
                  variant={isSwappedPage1 ? "small" : "large"}
                />
              </div>
            </div>
          </div>

          {/* ── PAGE 2: 4 Widgets (Themes 05, 06, 07, 08) ── */}
          <div className="w-1/2 shrink-0 flex flex-col gap-6 pl-4">
            {/* Row 1: Card 05 & Card 06 */}
            <div className="flex w-full gap-6">
              {/* Card 05 - Expanded in initial state */}
              <div
                onMouseEnter={() => setIsSwappedPage2(false)}
                onClick={() => setIsSwappedPage2(false)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage2 ? "flex-[635] cursor-pointer" : "flex-[970]",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[4]}
                  variant={isSwappedPage2 ? "small" : "large"}
                />
              </div>

              {/* Card 06 - Expands on hover/click */}
              <div
                onMouseEnter={() => setIsSwappedPage2(true)}
                onClick={() => setIsSwappedPage2(true)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage2 ? "flex-[970]" : "flex-[635] cursor-pointer",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[5]}
                  variant={isSwappedPage2 ? "large" : "small"}
                />
              </div>
            </div>

            {/* Row 2: Card 07 & Card 08 */}
            <div className="flex w-full gap-6">
              {/* Card 07 - Expands on hover/click */}
              <div
                onMouseEnter={() => setIsSwappedPage2(true)}
                onClick={() => setIsSwappedPage2(true)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage2 ? "flex-[970]" : "flex-[635] cursor-pointer",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[6]}
                  variant={isSwappedPage2 ? "large" : "small"}
                />
              </div>

              {/* Card 08 - Expanded in initial state */}
              <div
                onMouseEnter={() => setIsSwappedPage2(false)}
                onClick={() => setIsSwappedPage2(false)}
                className={[
                  "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isSwappedPage2 ? "flex-[635] cursor-pointer" : "flex-[970]",
                ].join(" ")}
              >
                <DesktopThemeCard
                  item={themes[7]}
                  variant={isSwappedPage2 ? "small" : "large"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE VIEW (All 8 Themes Swipeable) ── */}
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
              loading="lazy"
              decoding="async"
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
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
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