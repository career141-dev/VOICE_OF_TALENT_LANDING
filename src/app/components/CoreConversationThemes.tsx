"use client";

import React, { useRef, useState, useEffect } from "react";

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
  images: [string, string];
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
    images: [
      "https://talentsuite.career141.com/images/p1.svg",
      "https://talentsuite.career141.com/images/p2.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p3.svg",
      "https://talentsuite.career141.com/images/p4.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p5.svg",
      "https://talentsuite.career141.com/images/p6.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p7.svg",
      "https://talentsuite.career141.com/images/p8.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p9.svg",
      "https://talentsuite.career141.com/images/p10.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p11.svg",
      "https://talentsuite.career141.com/images/p12.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p13.svg",
      "https://talentsuite.career141.com/images/p14.svg",
    ],
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
    images: [
      "https://talentsuite.career141.com/images/p1.svg",
      "https://talentsuite.career141.com/images/p14.svg",
    ],
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
  const [imageIndex, setImageIndex] = useState(0);

  // Auto-cycle dual images smoothly so all 14 speakers are continuously showcased in animation
  useEffect(() => {
    const delay = 3000 + (item.id % 4) * 400;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, delay);

    return () => clearInterval(timer);
  }, [item.id]);

  const handleHover = () => {
    setImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <article
      onMouseEnter={handleHover}
      style={{ borderWidth: "1.62px" }}
      className="relative flex h-[335px] w-full items-center justify-between overflow-hidden rounded-[30px] border-[#E3E8EC] bg-[#F7F9FA] p-7 xl:p-8 transition-colors duration-500"
    >
      {/* ── Left Content Block (Locked Width = Zero Text Reflow) ── */}
      <div
        className={[
          "flex h-full flex-col justify-between shrink-0",
          "w-[310px] xl:w-[340px]",
          "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left",
          isLarge ? "scale-100 opacity-100" : "scale-[0.96] opacity-95",
        ].join(" ")}
      >
        {isLarge ? (
          <>
            {/* Expanded State: Title at top, Description at bottom, No Icon (User Branch Style) */}
            <h3 className="font-geist text-[24px] xl:text-[27px] font-medium leading-snug text-[#161616]">
              {item.title}
            </h3>

            <p className="font-geist text-[14px] xl:text-[15px] leading-relaxed text-[#7D8590]">
              {item.description}
            </p>
          </>
        ) : (
          <>
            {/* Compact State: Icon at top (Exact User Branch Style: h-12 w-12 bg-[#E0F2F1]), Title & Description at bottom */}
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#E0F2F1]">
              <img src={item.icon} alt="" className="object-contain" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-geist text-[22px] xl:text-[24px] font-medium leading-snug text-[#161616]">
                {item.title}
              </h3>

              <p className="font-geist text-[14px] xl:text-[15px] leading-relaxed text-[#7D8590]">
                {item.description}
              </p>
            </div>
          </>
        )}
      </div>

      {/* ── Right Image Container (Smooth Reveal on Expansion from dev branch) ── */}
      <div
        className={[
          "relative h-full shrink-0 overflow-hidden rounded-[20px] bg-gray-100",
          "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isLarge
            ? "w-[230px] xl:w-[260px] opacity-100 translate-x-0 ml-4 xl:ml-6"
            : "w-0 opacity-0 translate-x-8 ml-0 pointer-events-none",
        ].join(" ")}
      >
        {item.images.map((src, idx) => (
          <img
            key={src + idx}
            src={src}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-[230px] xl:w-[260px] max-w-none object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              imageIndex === idx ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"
            }`}
          />
        ))}
      </div>
    </article>
  );
}

/* ── Mobile / Tablet Card Component ── */
function MobileThemeCard({ item }: { item: ThemeItem }) {
  const [imageIndex, setImageIndex] = useState(0);

  // Auto-cycle dual images smoothly like web view, plus allow tap to cycle
  useEffect(() => {
    const delay = 2800 + (item.id % 4) * 400;
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, delay);

    return () => clearInterval(timer);
  }, [item.id]);

  const handleToggle = () => {
    setImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <article
      onClick={handleToggle}
      onMouseEnter={handleToggle}
      style={{ borderWidth: "1.62px" }}
      className="group relative flex h-[485px] w-full flex-col overflow-hidden rounded-[28px] border-[#E3E8EC] bg-white p-5 sm:p-6 opacity-100 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer select-none"
    >
      {/* Increased Size Image Banner with Smooth Dual Speaker Image Animation */}
      <div className="relative z-10 h-[215px] w-full shrink-0 overflow-hidden rounded-[20px] bg-gray-100 shadow-sm">
        {item.images.map((src, idx) => (
          <img
            key={src + idx}
            src={src}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              imageIndex === idx
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 pointer-events-none z-0"
            }`}
          />
        ))}
      </div>

      {/* Content - Full text displayed with tight spacing */}
      <div className="relative z-10 flex flex-col pt-3.5">
        <h3 className="font-geist text-[18px] sm:text-[19px] font-bold leading-[1.25] text-[#161616]">
          {item.title}
        </h3>
        <p className="mt-1 font-geist text-[12px] font-semibold tracking-wide text-[#159A99]">
          {item.subtitle}
        </p>
        <p className="mt-2 font-geist text-[13px] leading-[1.48] text-[#57606A]">
          {item.description}
        </p>
      </div>
    </article>
  );
}