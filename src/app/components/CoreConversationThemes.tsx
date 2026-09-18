"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

type ThemeItem = {
  id: number;
  title: string;
  description: string;
};

const themes: ThemeItem[] = [
  {
    id: 1,
    title: "The changing role of Talent Acquisition",
    description:
      "How modern talent teams are evolving from operational recruiters into strategic advisors who shape workforce strategy and long-term organizational success.",
  },
  {
    id: 2,
    title: "Building a meaningful career in Talent Acquisition",
    description:
      "Navigating the talent acquisition profession with purpose — developing key competencies, stakeholder trust, and sustainable career progression in competitive markets.",
  },
  {
    id: 3,
    title: "Recognizing potential beyond a resume",
    description:
      "Evaluating mindset, problem-solving ability, and culture-add to discover exceptional talent beyond conventional credentials and traditional job qualifications.",
  },
  {
    id: 4,
    title: "Creating better candidate experiences",
    description:
      "Designing transparent, empathetic interview journeys that elevate employer brand prestige, respect applicant time, and build lasting professional relationships.",
  },
  {
    id: 5,
    title: "The relationship between talent and business growth",
    description:
      "Understanding how visionary hiring directly drives bottom-line profitability, fuels market expansion, and establishes sustainable competitive differentiation.",
  },
  {
    id: 6,
    title: "Technology, AI and the future of recruitment",
    description:
      "Leveraging smart automation and AI-driven screening to optimize hiring velocity while fiercely safeguarding the vital human touch in decision-making.",
  },
  {
    id: 7,
    title: "Leadership lessons from inside the industry",
    description:
      "Unfiltered leadership insights on navigating disruption, building resilient team cultures, and guiding talent through dynamic economic shifts.",
  },
  {
    id: 8,
    title: "The future of Sri Lanka's workforce",
    description:
      "Empowering the next generation of local professionals with globally competitive skills, adaptable mindsets, and cross-industry opportunities.",
  },
];

// Keep this in sync with the box `transition.duration` values below (in ms).
const DESKTOP_BOX_DURATION_MS = 450;
const MOBILE_BOX_DURATION_MS = 450;
// Both cards are vertically centered (top-1/2 -translate-y-1/2) and their
// height keeps animating for the full box duration while the description
// paragraph mounts instantly the moment a card becomes active — so a longer
// description (more wrapped lines) pushes the centered content further,
// making the reveal visibly drift/"run" more the bigger the paragraph is.
// Wait until the height animation has essentially settled before fading
// text in, so the reveal no longer depends on how much text a theme has.
const DESKTOP_REVEAL_DELAY_MS = 380;
const MOBILE_REVEAL_DELAY_MS = 380;
// Text fade-up duration once revealed: see the `duration-[280ms]` classes below.

function getCircularDiff(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function CoreConversationThemes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // NEW: while true, all title/description text is opacity-0.
  // This is what actually kills the shake — text only ever becomes
  // visible once the card has finished resizing/moving.
  const [textHidden, setTextHidden] = useState(false);
  const textTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Separate flag for the mobile carousel, revealed later than desktop —
  // see MOBILE_REVEAL_DELAY_MS above.
  const [mobileTextHidden, setMobileTextHidden] = useState(false);
  const mobileTextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastSwipeTime = useRef<number>(0);
  const totalThemes = themes.length;

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalThemes) % totalThemes);
  }, [totalThemes]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalThemes);
  }, [totalThemes]);

  const triggerPrev = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 400) return;
    lastSwipeTime.current = now;
    handlePrev();
  }, [handlePrev]);

  const triggerNext = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 400) return;
    lastSwipeTime.current = now;
    handleNext();
  }, [handleNext]);

  const handleSelectTheme = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // NEW: every time the active card changes, hide text immediately,
  // then reveal it once the box animation has essentially finished.
  useEffect(() => {
    setTextHidden(true);
    if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    textTimeoutRef.current = setTimeout(() => {
      setTextHidden(false);
    }, DESKTOP_REVEAL_DELAY_MS);

    setMobileTextHidden(true);
    if (mobileTextTimeoutRef.current) clearTimeout(mobileTextTimeoutRef.current);
    mobileTextTimeoutRef.current = setTimeout(() => {
      setMobileTextHidden(false);
    }, MOBILE_REVEAL_DELAY_MS);

    return () => {
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      if (mobileTextTimeoutRef.current) clearTimeout(mobileTextTimeoutRef.current);
    };
  }, [activeIndex]);

  /* ── Auto-play Movement (Advances every 6.5s, pauses on hover / touch) ── */
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused, handleNext, activeIndex]);

  /* ── Container Touch Swiping for Mobile Carousel ── */
  const containerTouchStartX = useRef<number | null>(null);
  const containerTouchStartY = useRef<number | null>(null);
  const containerTouchTime = useRef<number>(0);

  const handleContainerTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    containerTouchStartX.current = e.touches[0].clientX;
    containerTouchStartY.current = e.touches[0].clientY;
    containerTouchTime.current = Date.now();
  };

  const handleContainerTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (containerTouchStartX.current === null || containerTouchStartY.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? containerTouchStartX.current;
    const endY = e.changedTouches[0]?.clientY ?? containerTouchStartY.current;
    const diffX = endX - containerTouchStartX.current;
    const diffY = endY - containerTouchStartY.current;
    const elapsed = Date.now() - containerTouchTime.current;
    const speedX = Math.abs(diffX) / Math.max(elapsed, 1);

    if ((Math.abs(diffX) > 25 || (Math.abs(diffX) > 15 && speedX > 0.2)) && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        triggerNext();
      } else {
        triggerPrev();
      }
    }

    containerTouchStartX.current = null;
    containerTouchStartY.current = null;
  };

  return (
    <section className="w-full overflow-hidden bg-[#FAFCFC] px-4 sm:px-10 md:px-12 lg:px-[8.7%] py-16 md:py-20 lg:py-24 text-[#1A1A1A]">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-start max-xl:items-center max-xl:text-center lg:mb-12 px-2 sm:px-0">
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] sm:text-[13.62px] font-semibold leading-[100%] tracking-normal uppercase text-[#159A99] mb-3">
            CURATED TOPICS
          </span>

          <h2 className="mt-3 font-cal font-normal text-[28px] sm:text-[38px] md:text-[50px] leading-[110%] tracking-normal text-[#262626] capitalize">
            Core Conversation Themes
          </h2>
        </div>

        {/* ── DESKTOP 3-WIDGET CONTINUOUS CAROUSEL (Left -> Center -> Right Real Movement) ── */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden lg:block relative w-full h-[470px] xl:h-[510px]"
        >
          {themes.map((theme, idx) => {
            const diff = getCircularDiff(idx, activeIndex, totalThemes);
            const isVisible = Math.abs(diff) <= 2;
            if (!isVisible) return null;

            const isActive = diff === 0;

            return (
              <motion.article
                key={`desktop-theme-card-${theme.id}`}
                initial={false}
                animate={{
                  left: diff === 0 ? "50%" : diff === -1 ? "0%" : diff === 1 ? "72%" : diff < -1 ? "-32%" : "104%",
                  x: diff === 0 ? "-50%" : "0%",
                  width: diff === 0 ? "42%" : "28%",
                  height: diff === 0 ? "440px" : "330px",
                  zIndex: diff === 0 ? 30 : 20,
                  opacity: Math.abs(diff) <= 1 ? 1 : 0,
                  backgroundColor: diff === 0 ? "#159A99" : "#F5F7FA",
                  borderColor: diff === 0 ? "rgba(21, 154, 153, 0)" : "rgba(21, 154, 153, 1)",
                  boxShadow:
                    diff === 0
                      ? "0 22px 56px rgba(21, 154, 153, 0.32)"
                      : "0 4px 14px rgba(0, 0, 0, 0.04)",
                  pointerEvents: Math.abs(diff) <= 1 ? "auto" : "none",
                }}
                transition={{
                  duration: DESKTOP_BOX_DURATION_MS / 1000,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                  transform: "translate3d(0,0,0)",
                }}
                onClick={() => {
                  if (diff === -1) handlePrev();
                  if (diff === 1) handleNext();
                }}
                className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center rounded-[28px] xl:rounded-[34px] border-[1.5px] select-none px-7 xl:px-10 py-6 ${isActive
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-white hover:shadow-md transition-colors"
                  }`}
              >
                {/* Title + description reveal as ONE unit, only once the box
                  has (almost) finished resizing — this is what prevents the
                  visible reflow/jump regardless of how long a theme's
                  description is. A gentle fade-up (not a flat opacity pop)
                  reads as an intentional entrance rather than the text
                  "running" into place. No CSS transition on font-size or
                  max-width; they just snap while invisible. */}
                <div
                  className={`flex flex-col items-center transition-[opacity,transform] ease-out ${textHidden ? "opacity-0 translate-y-2 duration-150" : "opacity-100 translate-y-0 duration-[280ms]"
                    }`}
                >
                  <h3
                    className={`font-cal font-normal leading-[1.2] ${isActive
                        ? "text-white text-[28px] sm:text-[32px] xl:text-[36px] max-w-[490px]"
                        : "text-[#161616] text-[21px] sm:text-[23px] xl:text-[25px] max-w-[280px]"
                      }`}
                  >
                    {theme.title}
                  </h3>

                  {isActive && (
                    <p className="mt-5 max-w-[470px] font-geist text-[17px] sm:text-[19px] xl:text-[21px] font-light leading-[1.6] text-white/95">
                      {theme.description}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── TABLET & MOBILE VIEW (Continuous Carousel: Prev glides left, Next glides to center) ── */}
        <div
          onTouchStart={handleContainerTouchStart}
          onTouchEnd={handleContainerTouchEnd}
          className="relative flex w-full items-center justify-center py-4 min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:hidden select-none overflow-hidden"
          style={{ touchAction: "pan-y" }}
        >
          {themes.map((theme, idx) => {
            const diff = getCircularDiff(idx, activeIndex, totalThemes);
            const isVisible = Math.abs(diff) <= 2;
            if (!isVisible) return null;

            const isActive = diff === 0;

            return (
              <motion.article
                key={`mobile-theme-card-${theme.id}`}
                initial={false}
                animate={{
                  left: "50%",
                  x:
                    diff === 0
                      ? "-50%"
                      : diff === -1
                        ? "calc(-50% - 24px)"
                        : diff === 1
                          ? "calc(-50% + 24px)"
                          : diff < -1
                            ? "calc(-50% - 110%)"
                            : "calc(-50% + 110%)",
                  width: "84%",
                  height: diff === 0 ? "350px" : "290px",
                  zIndex: diff === 0 ? 20 : 10,
                  opacity: diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.95 : 0,
                  backgroundColor: diff === 0 ? "#159A99" : "#F5F7FA",
                  borderColor: diff === 0 ? "rgba(21, 154, 153, 0)" : "rgba(21, 154, 153, 1)",
                  boxShadow: "none",
                  pointerEvents: Math.abs(diff) <= 1 ? "auto" : "none",
                }}
                transition={{
                  duration: MOBILE_BOX_DURATION_MS / 1000,
                  ease: [0.25, 1, 0.5, 1],
                }}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                  transform: "translate3d(0,0,0)",
                }}
                onClick={() => {
                  if (diff === -1) triggerPrev();
                  if (diff === 1) triggerNext();
                }}
                className="absolute top-1/2 -translate-y-1/2 w-full max-w-[310px] sm:max-w-[480px] md:max-w-[600px] flex flex-col justify-center items-center text-center rounded-[26px] sm:rounded-[34px] border-[1.5px] px-5 py-6 sm:px-9 sm:py-8 md:px-12 md:py-9 cursor-pointer overflow-hidden select-none"
              >
                {/* Content: only visible when active AND the box has
                  finished moving into place. A gentle fade-up (not a flat
                  opacity pop) reads as an intentional entrance rather than
                  the text "running" into place. */}
                <div
                  className={`flex flex-col items-center justify-center gap-[18px] sm:gap-[24px] md:gap-[28px] transition-[opacity,transform] ease-out ${isActive && !mobileTextHidden
                      ? "opacity-100 translate-y-0 duration-[280ms]"
                      : "opacity-0 translate-y-2 duration-150 pointer-events-none"
                    }`}
                >
                  <h3 className="font-cal text-[21px] sm:text-[25px] md:text-[29px] font-normal leading-[1.2] text-white max-w-[255px] sm:max-w-[420px] md:max-w-[540px]">
                    {theme.title}
                  </h3>
                  <p className="font-geist text-[13.5px] sm:text-[15px] md:text-[17px] font-light leading-[1.5] text-white/95 max-w-[255px] sm:max-w-[420px] md:max-w-[520px]">
                    {theme.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── DOWN DOT PAGINATION (Dynamic 5-Dot Window on Mobile/Tablet, Full on Desktop) ── */}
        <div className="mt-10 lg:mt-12 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={triggerPrev}
            aria-label="Previous theme"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EEF2] text-[#57606A] transition-all hover:bg-[#159A99] hover:text-white active:scale-95 cursor-pointer shadow-xs mr-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile & Tablet: Dynamic 5-Dot Window (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 h-3">
            {(() => {
              const total = themes.length;
              const maxVisible = 5;
              const half = Math.floor(maxVisible / 2);
              let start = activeIndex - half;
              if (start < 0) start = 0;
              if (start + maxVisible > total) start = Math.max(0, total - maxVisible);
              const visibleIndices = Array.from({ length: Math.min(total, maxVisible) }, (_, i) => start + i);

              return visibleIndices.map((idx) => {
                const isActive = idx === activeIndex;
                const isEdgeSmall =
                  (idx === start && start > 0) ||
                  (idx === start + maxVisible - 1 && start + maxVisible < total);

                return (
                  <button
                    key={`mobile-theme-dot-${themes[idx].id}`}
                    type="button"
                    onClick={() => handleSelectTheme(idx)}
                    aria-label={`Jump to theme: ${themes[idx].title}`}
                    title={themes[idx].title}
                    className={`transition-all duration-300 ease-out cursor-pointer rounded-full ${isActive
                        ? "w-7 h-2.5 bg-[#159A99] shadow-sm"
                        : isEdgeSmall
                          ? "w-1.5 h-1.5 bg-[#D5DCE2]"
                          : "w-2.5 h-2.5 bg-[#D5DCE2] hover:bg-[#9EADB7]"
                      }`}
                  />
                );
              });
            })()}
          </div>

          {/* Desktop: Full 8 Dots (>= 1024px) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {themes.map((theme, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={`desktop-theme-dot-${theme.id}`}
                  type="button"
                  onClick={() => handleSelectTheme(idx)}
                  aria-label={`Jump to theme: ${theme.title}`}
                  title={theme.title}
                  className={`transition-all duration-400 ease-out cursor-pointer rounded-full ${isActive
                      ? "w-8 h-2.5 bg-[#159A99] shadow-sm"
                      : "w-2.5 h-2.5 bg-[#D5DCE2] hover:bg-[#9EADB7] hover:scale-125"
                    }`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={triggerNext}
            aria-label="Next theme"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8EEF2] text-[#57606A] transition-all hover:bg-[#159A99] hover:text-white active:scale-95 cursor-pointer shadow-xs ml-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}