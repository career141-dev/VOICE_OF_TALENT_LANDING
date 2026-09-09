"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
export default function CoreConversationThemes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const lastSwipeTime = useRef<number>(0);
  const containerTouchStartX = useRef<number | null>(null);
  const containerTouchStartY = useRef<number | null>(null);
  const containerTouchTime = useRef<number>(0);

  const totalThemes = themes.length;

  const prevIndex = (activeIndex - 1 + totalThemes) % totalThemes;
  const nextIndex = (activeIndex + 1) % totalThemes;

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
    if (now - lastSwipeTime.current < 350) return;
    lastSwipeTime.current = now;
    handlePrev();
  }, [handlePrev]);

  const triggerNext = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 350) return;
    lastSwipeTime.current = now;
    handleNext();
  }, [handleNext]);

  const handleSelectTheme = (index: number, dir?: number) => {
    if (index === activeIndex) return;
    setDirection(dir ?? (index > activeIndex ? 1 : -1));
    setActiveIndex(index);
  };

  /* ── Container Touch Swiping by Hand (For swipes starting on side cards / container) ── */
  const handleContainerTouchStart = (e: React.TouchEvent) => {
    containerTouchStartX.current = e.touches[0].clientX;
    containerTouchStartY.current = e.touches[0].clientY;
    containerTouchTime.current = Date.now();
  };

  const handleContainerTouchEnd = (e: React.TouchEvent) => {
    if (containerTouchStartX.current === null || containerTouchStartY.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? containerTouchStartX.current;
    const endY = e.changedTouches[0]?.clientY ?? containerTouchStartY.current;
    const diffX = endX - containerTouchStartX.current;
    const diffY = endY - containerTouchStartY.current;
    const elapsed = Date.now() - containerTouchTime.current;
    const speedX = Math.abs(diffX) / Math.max(elapsed, 1);

    // If horizontal swipe is detected (> 30px or quick flick)
    if ((Math.abs(diffX) > 30 || (Math.abs(diffX) > 15 && speedX > 0.25)) && Math.abs(diffX) > Math.abs(diffY)) {
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
    <section className="w-full bg-[#FAFCFC] px-4 sm:px-6 py-16 text-[#1A1A1A] md:px-12 lg:px-[7%] xl:px-[8.7%] lg:py-20 overflow-hidden">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-start max-xl:items-center max-xl:text-center lg:mb-12">
        <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[12px] sm:text-[13.62px] font-semibold leading-[100%] tracking-normal uppercase text-[#159A99] mb-3">
          CURATED TOPICS
        </span>

        <h2 className="mt-2 font-cal font-normal text-[28px] sm:text-[38px] md:text-[50px] leading-[110%] tracking-normal text-[#262626] capitalize">
          Core Conversation Themes
        </h2>
      </div>

      {/* ── DESKTOP 3-WIDGET VIEW (Aligned to Header Left & Right Edges) ── */}
      <div className="hidden lg:block w-full">
        <div className="flex w-full items-center justify-between gap-6 xl:gap-8 min-h-[470px] xl:min-h-[510px]">
          {/* ── Left Widget (Aligned with header left 'Core' title edge) ── */}
          <div className="w-[28%] xl:w-[28.5%] shrink-0">
            <SideThemeCard
              item={themes[prevIndex]}
              onClick={() => handleSelectTheme(prevIndex, -1)}
            />
          </div>

          {/* ── Middle Widget (Active Item: Taller & Prominent #159A99) ── */}
          <div className="w-[42%] xl:w-[41%] shrink-0">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={themes[activeIndex].id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ActiveCenterThemeCard item={themes[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Widget (Aligned with header right navigation arrow edge) ── */}
          <div className="w-[28%] xl:w-[28.5%] shrink-0">
            <SideThemeCard
              item={themes[nextIndex]}
              onClick={() => handleSelectTheme(nextIndex, 1)}
            />
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE VIEW (3-Card Stack with Real-Time Hand Swiping & Touch Gestures) ── */}
      <div
        onTouchStart={handleContainerTouchStart}
        onTouchEnd={handleContainerTouchEnd}
        className="relative flex w-full items-center justify-center py-4 min-h-[380px] sm:min-h-[430px] lg:hidden select-none"
        style={{ touchAction: "pan-y" }}
      >
        {/* Left Peeking Card (Previous - White & Shadow) */}
        <button
          type="button"
          onClick={triggerPrev}
          aria-label="Previous theme"
          className="absolute left-[-8px] sm:left-1 z-10 w-[74%] sm:w-[65%] max-w-[280px] sm:max-w-[320px] h-[310px] sm:h-[350px] rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_14px_36px_rgba(0,0,0,0.14),0_3px_12px_rgba(0,0,0,0.08)] scale-[0.92] cursor-pointer transition-all duration-300 active:scale-90 outline-none"
        />

        {/* Center Active Card (Hand Swipeable with Elastic Physics, Heading & Description) */}
        <div className="relative z-20 w-[76%] sm:w-[72%] max-w-[310px] sm:max-w-[350px] min-h-[360px] sm:min-h-[400px]">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={themes[activeIndex].id}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? "105%" : "-105%",
                  opacity: 0,
                  scale: 0.92,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  zIndex: 0,
                  x: dir > 0 ? "-105%" : "105%",
                  opacity: 0,
                  scale: 0.92,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.28, ease: "easeInOut" },
                scale: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              }}
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_e, info) => {
                const swipeThreshold = 25;
                const velocityThreshold = 150;
                if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
                  triggerNext();
                } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
                  triggerPrev();
                }
              }}
              className="w-full select-none cursor-grab active:cursor-grabbing touch-pan-y"
              style={{ touchAction: "pan-y" }}
            >
              <article
                className="flex h-[360px] sm:h-[400px] w-full flex-col justify-between items-center text-center overflow-hidden rounded-[26px] sm:rounded-[30px] bg-[#159A99] px-6 pt-7 pb-12 sm:px-8 sm:pt-9 sm:pb-16 shadow-[0_20px_50px_rgba(21,154,153,0.35)] pointer-events-none"
              >
                {/* Heading */}
                <h3 className="font-cal text-[23px] sm:text-[26px] font-normal leading-[1.2] text-white">
                  {themes[activeIndex].title}
                </h3>

                {/* Description - Lifted higher with increased font size */}
                <p className="font-geist text-[15.5px] sm:text-[17.5px] font-light leading-[1.58] text-white/95">
                  {themes[activeIndex].description}
                </p>
              </article>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Peeking Card (Next - White & Shadow) */}
        <button
          type="button"
          onClick={triggerNext}
          aria-label="Next theme"
          className="absolute right-[-8px] sm:right-1 z-10 w-[74%] sm:w-[65%] max-w-[280px] sm:max-w-[320px] h-[310px] sm:h-[350px] rounded-[22px] sm:rounded-[26px] bg-white shadow-[0_14px_36px_rgba(0,0,0,0.14),0_3px_12px_rgba(0,0,0,0.08)] scale-[0.92] cursor-pointer transition-all duration-300 active:scale-90 outline-none"
        />
      </div>

      {/* ── DOWN DOT PAGINATION (Dynamic 5-Dot Window on Mobile, Full on Desktop) ── */}
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

        {/* Mobile / Tablet: Dynamic 5-Dot Window (< 1024px) */}
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
                  className={`transition-all duration-300 ease-out cursor-pointer rounded-full ${
                    isActive
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
                className={`transition-all duration-400 ease-out cursor-pointer rounded-full ${
                  isActive
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
    </section>
  );
}

/* ── Middle Active Card Component (Teal #159A99, Cal Sans Heading & Description positioned higher) ── */
function ActiveCenterThemeCard({ item }: { item: ThemeItem }) {
  return (
    <article
      className="relative flex h-[440px] xl:h-[480px] w-full flex-col justify-between items-center text-center overflow-hidden rounded-[28px] xl:rounded-[34px] bg-[#159A99] px-8 pt-8 pb-16 sm:px-11 sm:pt-10 sm:pb-20 xl:px-14 xl:pt-11 xl:pb-24 shadow-[0_22px_56px_rgba(21,154,153,0.32)] transition-all duration-500"
    >
      {/* Heading / Title - Cal Sans font */}
      <h3 className="font-cal text-[28px] sm:text-[32px] xl:text-[36px] font-normal leading-[1.18] text-white max-w-[490px]">
        {item.title}
      </h3>

      {/* Description - Positioned higher up from bottom with increased font size */}
      <p className="font-geist text-[17.5px] sm:text-[19.5px] xl:text-[21.5px] font-light leading-[1.6] text-white/95 max-w-[470px]">
        {item.description}
      </p>
    </article>
  );
}

/* ── Side Card Component (Shorter & Vertically Centered: Cal Sans Heading) ── */
function SideThemeCard({
  item,
  onClick,
}: {
  item: ThemeItem;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="group relative flex h-[330px] xl:h-[360px] w-full flex-col justify-center items-center text-center overflow-hidden rounded-[24px] xl:rounded-[28px] bg-[#F5F7FA] p-7 xl:p-10 border-[1.5px] border-[#E0E0E0] shadow-sm transition-all duration-400 hover:bg-white hover:border-[#159A99]/50 hover:shadow-md cursor-pointer select-none"
    >
      {/* ONLY Heading (Title) - Cal Sans */}
      <h3 className="font-cal text-[21px] sm:text-[23px] xl:text-[25px] font-normal leading-[1.3] text-[#161616] group-hover:text-[#159A99] transition-colors max-w-[280px]">
        {item.title}
      </h3>
    </article>
  );
}
