"use client";

import React, { useRef, useState } from "react";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

export function IndustryVoicesSection() {
  const items = [
    "ONE INDUSTRY.",
    "MANY VOICES.",
    "ONE FUTURE.",
    "ONE INDUSTRY.",
    "MANY VOICES.",
    "ONE FUTURE.",
  ];

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDragRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startXRef.current = e.clientX - currentDragRef.current;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if setPointerCapture fails on some touch devices
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newOffset = e.clientX - startXRef.current;
    currentDragRef.current = newOffset;
    setDragOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0A5B5B]">
      <div
        className="
          relative
          flex
          min-h-[320px]
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-cover
          bg-center
          sm:min-h-[400px]
          lg:min-h-[505px]
        "
        style={{
          backgroundImage: `url('${R2_MEDIA_URL}/images/Movement Banner.png')`,
        }}
      >
        {/* Interactive swipeable/draggable headline row */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute left-0 top-[20%] z-10 w-full overflow-hidden select-none touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            className="industry-marquee flex w-max whitespace-nowrap"
            style={{
              transform: `translateX(${dragOffset}px)`,
              animationPlayState: isDragging ? "paused" : "running",
            }}
          >
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="
                  industry-word
                  inline-block
                  origin-center
                  will-change-transform
                  mr-10
                  font-['Geist']
                  text-[48px]
                  font-bold
                  uppercase
                  leading-none
                  tracking-[-0.04em]
                  sm:text-[72px]
                  lg:text-[110px]
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Fixed description */}
        <p className="relative z-10 mx-auto mt-28 max-w-[1500px] px-6 text-center font-['Geist'] text-[18px] leading-[1.55] text-white sm:text-[24px] lg:mt-36 lg:text-[31px]">
          VOTA is building a community that recognizes the value of Talent
          Acquisition and gives its professionals the platform they deserve.
        </p>
      </div>

      <style>
        {`
          .industry-marquee {
            animation: industry-marquee 18s linear infinite;
          }

          .industry-word {
            color: #a6b9b9;
            opacity: 0.72;
            transform: scale(1);
          }

          .industry-word:nth-child(3n + 1) {
            animation: word-one 18s linear infinite;
          }

          .industry-word:nth-child(3n + 2) {
            animation: word-two 18s linear infinite;
          }

          .industry-word:nth-child(3n + 3) {
            animation: word-three 18s linear infinite;
          }

          @keyframes industry-marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          /*
            Only phrase 1 is white from 0% through 29%.
            It fades out completely by 33%.
          */
          @keyframes word-one {
            0%,
            28% {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.045);
            }

            3% {
              transform: scale(1.1);
            }

            33%,
            100% {
              color: #a6b9b9;
              opacity: 0.72;
              transform: scale(1);
            }
          }

          /*
            Phrase 2 does not become white until phrase 1
            has completed its fade-out.
          */
          @keyframes word-two {
            0%,
            33% {
              color: #a6b9b9;
              opacity: 0.72;
              transform: scale(1);
            }

            37% {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.1);
            }

            41%,
            61% {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.045);
            }

            66%,
            100% {
              color: #a6b9b9;
              opacity: 0.72;
              transform: scale(1);
            }
          }

          /*
            Phrase 3 begins only after phrase 2 has returned
            fully to gray.
          */
          @keyframes word-three {
            0%,
            66% {
              color: #a6b9b9;
              opacity: 0.72;
              transform: scale(1);
            }

            70% {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.1);
            }

            74%,
            94% {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.045);
            }

            100% {
              color: #a6b9b9;
              opacity: 0.72;
              transform: scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .industry-marquee,
            .industry-word {
              animation: none;
            }

            .industry-word:nth-child(2) {
              color: #ffffff;
              opacity: 1;
              transform: scale(1.045);
            }
          }
        `}
      </style>
    </section>
  );
}