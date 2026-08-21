"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      "How Sri Lankan organizations are using smart automation without losing the vital human element of talent matching.",
    image: topicImage,
    icon: "/icons/career.png",
  },
  {
    id: 2,
    title: "Building TA Careers",
    description:
      "How Sri Lankan organizations are using smart automation without losing the vital human element of talent matching.",
    image: topicImage,
    icon: "/icons/career.png",
  },
  {
    id: 3,
    title: "Candidate Experience",
    description:
      "How Sri Lankan organizations are using smart automation without losing the vital human element of talent matching.",
    image: topicImage,
    icon: "/icons/people.png",
  },
  {
    id: 4,
    title: "Strategic Leadership Lessons",
    description:
      "How Sri Lankan organizations are using smart automation without losing the vital human element of talent matching.",
    image: topicImage,
    icon: "/icons/people.png",
  },
];

export default function CoreConversationThemes() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [row1Hovered, setRow1Hovered] = useState<number | null>(null);
  const [row2Hovered, setRow2Hovered] = useState<number | null>(null);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  // Row 1: default card 0 is large, card 1 is small
  const isRow1Card0Large = row1Hovered === null ? true : row1Hovered === 0;
  const isRow1Card1Large = row1Hovered === 1;

  // Row 2: default card 2 is small, card 3 is large
  const isRow2Card2Large = row2Hovered === 2;
  const isRow2Card3Large = row2Hovered === null ? true : row2Hovered === 3;

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 flex items-end justify-between gap-6 lg:mb-14"
      >
        <div>
          <span className="inline-flex items-center rounded-[123.833px] border-[1.238px] border-[rgba(21,154,153,0.20)] bg-[rgba(21,154,153,0.10)] px-[14.86px] py-[7.43px] font-['Geist'] text-[13.622px] font-semibold leading-normal uppercase text-[#159A99] mb-3">
            Curated Topics
          </span>

          <h2 className="mt-4 font-['Geist'] text-3xl font-bold tracking-tight md:text-4xl">
            Core Conversation Themes
          </h2>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            aria-label="Previous themes"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-all duration-300 hover:bg-[#e6eeee] hover:scale-105 active:scale-95"
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-all duration-300 hover:bg-[#e6eeee] hover:scale-105 active:scale-95"
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
      </motion.div>

      {/* Desktop grid */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* First row */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setRow1Hovered(0)}
            onMouseLeave={() => setRow1Hovered(null)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isRow1Card0Large ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[0]}
              isLarge={isRow1Card0Large}
            />
          </div>

          <div
            onMouseEnter={() => setRow1Hovered(1)}
            onMouseLeave={() => setRow1Hovered(null)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isRow1Card1Large ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[1]}
              isLarge={isRow1Card1Large}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setRow2Hovered(2)}
            onMouseLeave={() => setRow2Hovered(null)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isRow2Card2Large ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[2]}
              isLarge={isRow2Card2Large}
            />
          </div>

          <div
            onMouseEnter={() => setRow2Hovered(3)}
            onMouseLeave={() => setRow2Hovered(null)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              isRow2Card3Large ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[3]}
              isLarge={isRow2Card3Large}
            />
          </div>
        </div>
      </div>

      {/* Tablet/mobile horizontal cards */}
      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 xl:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {themes.map((item) => (
          <div
            key={item.id}
            className="w-[320px] shrink-0 snap-start sm:w-[480px]"
          >
            <ThemeCard item={item} isLarge={true} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ThemeCard({
  item,
  isLarge,
}: {
  item: ThemeItem;
  isLarge: boolean;
}) {
  return (
    <article
      className="group relative flex h-[335px] w-full overflow-hidden rounded-[29.98px] border-[1.62px] border-[#E0E0E0] bg-[#F5F7FA] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(21,154,153,0.12),0_8px_16px_-4px_rgba(0,0,0,0.06)] hover:border-[#cfd8d8]"
    >
      {/* ── EXPANDED / LARGE VIEW ── */}
      <div
        className={`absolute inset-0 flex h-full w-full transition-opacity duration-600 ease-in-out ${
          isLarge ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
        }`}
      >
        <div className="flex min-w-0 flex-1 flex-col justify-between p-8 lg:px-[42px] lg:py-[36px]">
          <h3 className="max-w-[340px] font-['Geist'] text-2xl font-medium leading-[1.2] text-[#151515] lg:text-[31px]">
            {item.title}
          </h3>

          <p className="mt-8 max-w-[380px] font-['Geist'] text-sm leading-[1.45] text-[#7A7A7A] lg:mt-0 lg:text-[16px]">
            {item.description}
          </p>
        </div>

        <div className="relative w-[42%] shrink-0 p-6 pl-0">
          <div className="h-full w-full overflow-hidden rounded-[20px]">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
      </div>

      {/* ── COMPACT / SMALL VIEW ── */}
      <div
        className={`absolute inset-0 flex h-full w-full flex-col justify-between p-8 lg:px-[42px] lg:py-[36px] transition-opacity duration-600 ease-in-out ${
          !isLarge ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
        }`}
      >
        <div className="flex h-[60.7px] w-[60.7px] items-center justify-center rounded-[14px] bg-[rgba(21,154,153,0.10)] transition-transform duration-500 group-hover:scale-105">
          <img
            src={item.icon}
            alt=""
            className="object-contain"
          />
        </div>

        <div>
          <h3 className="mb-3 font-['Geist'] text-2xl font-medium leading-[1.2] text-[#151515] lg:text-[31px]">
            {item.title}
          </h3>

          <p className="max-w-[455px] font-['Geist'] text-sm leading-[1.45] text-[#7A7A7A] lg:text-[16px]">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
}