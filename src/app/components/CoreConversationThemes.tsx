"use client";

import React, { useRef, useState } from "react";

const topicImage = "/images/video.png";

type ThemeItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
};

const themes: ThemeItem[] = [
  {
    id: 1,
    title: "AI & Automation in Recruitment",
    description:
      "How Sri Lankan organizations are leveraging smart AI screening and automated pipelines while safeguarding the vital human touch in talent matching.",
    image: topicImage,
    icon: "/icons/career.png",
  },
  {
    id: 2,
    title: "Building TA Careers",
    description:
      "Navigating the modern talent acquisition profession — key skills, executive influence, and long-term career growth in high-demand markets.",
    image: topicImage,
    icon: "/icons/career.png",
  },
  {
    id: 3,
    title: "Candidate Experience",
    description:
      "Designing transparent, empathetic interview journeys that elevate employer brand prestige and build lasting talent relationships.",
    image: topicImage,
    icon: "/icons/people.png",
  },
  {
    id: 4,
    title: "Strategic Leadership Lessons",
    description:
      "Actionable insights from veteran HR heads on agile workforce planning, culture transformation, and steering talent through economic shifts.",
    image: topicImage,
    icon: "/icons/people.png",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isRow1Hovered, setIsRow1Hovered] = useState(false);
  const [isRow2Hovered, setIsRow2Hovered] = useState(false);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-16 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-24">
      {/* Heading */}
      <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
        <div>
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-geist text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
            Curated Topics
          </span>

          <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight md:text-4xl">
            Core Conversation Themes
          </h2>
        </div>

        {/* Navigation Arrows for Mobile/Tablet Slider */}
        <div className="flex items-center gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Previous themes"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-colors hover:bg-[#e6eeee] active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollCards("right")}
            aria-label="Next themes"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-colors hover:bg-[#e6eeee] active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP GRID: Smooth Interactive Flex Expansion ── */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* Row 1 */}
        <div className="flex w-full gap-6">
          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isRow1Hovered ? "flex-[635]" : "flex-[970]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[0]}
              variant={isRow1Hovered ? "small" : "large"}
            />
          </div>

          <div
            onMouseEnter={() => setIsRow1Hovered(true)}
            onMouseLeave={() => setIsRow1Hovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isRow1Hovered ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[1]}
              variant={isRow1Hovered ? "large" : "small"}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setIsRow2Hovered(true)}
            onMouseLeave={() => setIsRow2Hovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isRow2Hovered ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[2]}
              variant={isRow2Hovered ? "large" : "small"}
            />
          </div>

          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[flex]",
              isRow2Hovered ? "flex-[635]" : "flex-[970]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[3]}
              variant={isRow2Hovered ? "small" : "large"}
            />
          </div>
        </div>
      </div>

      {/* ── TABLET & MOBILE VIEW: Beautiful Aligned Horizontal Cards ── */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 pt-2 xl:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((item) => (
          <div
            key={item.id}
            className="w-[290px] sm:w-[360px] shrink-0 snap-start"
          >
            <MobileThemeCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Desktop Theme Card Component ── */
function ThemeCard({
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
        "group relative flex h-[335px] w-full overflow-hidden rounded-[29.98px] border-[1.62px] border-[#E0E0E0] bg-[#F5F7FA]",
        "transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg",
        isLarge ? "flex-row" : "flex-col",
      ].join(" ")}
    >
      {isLarge ? (
        <>
          <div className="flex min-w-0 flex-1 flex-col justify-between p-8 lg:px-[42px] lg:py-[36px]">
            <h3 className="max-w-[340px] font-geist text-2xl font-medium leading-[1.2] text-[#151515] lg:text-[31px]">
              {item.title}
            </h3>

            <p className="mt-8 max-w-[380px] font-geist text-sm leading-[1.45] text-[#7A7A7A] lg:mt-0 lg:text-[16px]">
              {item.description}
            </p>
          </div>

          <div className="relative w-[42%] shrink-0 p-6 pl-0">
            <div className="h-full w-full overflow-hidden rounded-[20px]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[rgba(21,154,153,0.10)]">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-12 w-12 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-8 lg:px-[42px] lg:py-[36px]">
          <div className="flex h-[60.7px] w-[60.7px] items-center justify-center rounded-[14px] bg-[rgba(21,154,153,0.10)]">
            <img
              src={item.icon}
              alt=""
              className="object-contain h-8 w-8"
            />
          </div>

          <div>
            <h3 className="mb-3 font-geist text-2xl font-medium leading-[1.2] text-[#151515] lg:text-[31px]">
              {item.title}
            </h3>

            <p className="max-w-[455px] font-geist text-sm leading-[1.45] text-[#7A7A7A] lg:text-[16px]">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

/* ── Mobile / Tablet Specific Card Component ── */
function MobileThemeCard({ item }: { item: ThemeItem }) {
  return (
    <article className="flex h-[380px] w-full flex-col justify-between overflow-hidden rounded-[24px] border-[1.5px] border-[#E0E0E0] bg-[#F5F7FA] p-6 shadow-sm transition-shadow active:shadow-md">
      {/* Top Header with Icon and Badge */}
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[rgba(21,154,153,0.10)]">
          <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
        </div>
        <span className="rounded-full border border-[#D6D6D6] bg-white px-3 py-1 font-geist text-[11px] font-semibold uppercase text-[#159A99]">
          Theme {item.id}
        </span>
      </div>

      {/* Image Preview Banner */}
      {item.image && (
        <div className="my-3 h-[140px] w-full overflow-hidden rounded-[16px]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Title & Unique Description */}
      <div>
        <h3 className="font-geist text-[18px] sm:text-[20px] font-medium leading-snug text-[#151515]">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-geist text-[13px] leading-relaxed text-[#7A7A7A]">
          {item.description}
        </p>
      </div>
    </article>
  );
}