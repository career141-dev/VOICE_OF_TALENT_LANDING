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
  const [isSmallWidgetHovered, setIsSmallWidgetHovered] = useState(false);

  const scrollCards = (direction: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: direction === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-6 py-20 text-[#262626] md:px-12 lg:px-[8.7%] lg:py-28">
      {/* Heading */}
      <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
        <div>
          <span className="inline-flex rounded-full border border-[rgba(21,154,153,0.2)] bg-[rgba(21,154,153,0.1)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#159A99]">
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-colors hover:bg-[#e6eeee]"
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F7FA] text-[#0B5959] transition-colors hover:bg-[#e6eeee]"
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

      {/* Desktop grid */}
      <div className="hidden w-full flex-col gap-6 xl:flex">
        {/* First row */}
        <div className="flex w-full gap-6">
          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSmallWidgetHovered ? "flex-[635]" : "flex-[970]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[0]}
              variant={isSmallWidgetHovered ? "small" : "large"}
            />
          </div>

          <div
            onMouseEnter={() => setIsSmallWidgetHovered(true)}
            onMouseLeave={() => setIsSmallWidgetHovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSmallWidgetHovered ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[1]}
              variant={isSmallWidgetHovered ? "large" : "small"}
            />
          </div>
        </div>

        {/* Second row */}
        <div className="flex w-full gap-6">
          <div
            onMouseEnter={() => setIsSmallWidgetHovered(true)}
            onMouseLeave={() => setIsSmallWidgetHovered(false)}
            className={[
              "min-w-0 cursor-pointer transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSmallWidgetHovered ? "flex-[970]" : "flex-[635]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[2]}
              variant={isSmallWidgetHovered ? "large" : "small"}
            />
          </div>

          <div
            className={[
              "min-w-0 transition-[flex] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isSmallWidgetHovered ? "flex-[635]" : "flex-[970]",
            ].join(" ")}
          >
            <ThemeCard
              item={themes[3]}
              variant={isSmallWidgetHovered ? "small" : "large"}
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
            <ThemeCard item={item} variant={item.image ? "large" : "small"} />
          </div>
        ))}
      </div>
    </section>
  );
}

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
      )}
    </article>
  );
}