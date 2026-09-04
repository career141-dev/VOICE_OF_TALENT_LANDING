"use client";

import React, { useRef, useState, useEffect } from "react";

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

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentDragRef = useRef(0);

  // Pause rAF when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track and continuously interpolate word styling based on proximity to center
  useEffect(() => {
    let animId: number;

    const checkCenter = () => {
      if (isVisibleRef.current && itemRefs.current.length > 0) {
        const screenCenter = window.innerWidth / 2;
        // Radius of smooth influence area around screen center
        const radius = Math.min(window.innerWidth * 0.42, 400);

        itemRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const wordCenter = rect.left + rect.width / 2;
          const dist = Math.abs(wordCenter - screenCenter);
          const rawProximity = Math.max(0, 1 - dist / radius);
          // S-curve ease-in-out for silky organic transition
          const smooth = 0.5 - 0.5 * Math.cos(rawProximity * Math.PI);

          const opacity = 0.45 + 0.55 * smooth;
          const scale = 1 + 0.05 * smooth;
          const translateY = -2.5 * smooth;
          const r = Math.round(166 + (255 - 166) * smooth);
          const g = Math.round(185 + (255 - 185) * smooth);
          const b = Math.round(185 + (255 - 185) * smooth);

          el.style.opacity = opacity.toFixed(3);
          el.style.transform = `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(3)})`;
          el.style.color = `rgb(${r}, ${g}, ${b})`;
        });
      }

      animId = requestAnimationFrame(checkCenter);
    };

    animId = requestAnimationFrame(checkCenter);

    return () => cancelAnimationFrame(animId);
  }, []);

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
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#0A5B5B]">
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
          className={`absolute left-0 top-[18%] sm:top-[19%] z-10 w-full overflow-hidden select-none touch-pan-y py-6 sm:py-8 -my-6 sm:-my-8 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Single Unified Marquee Track */}
          <div
            className="industry-marquee flex w-max whitespace-nowrap py-3 sm:py-4 items-center"
            style={{
              transform: `translateX(${dragOffset}px)`,
              animationPlayState: isDragging ? "paused" : "running",
            }}
          >
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="
                  inline-block
                  origin-center
                  mr-6
                  sm:mr-8
                  lg:mr-10
                  font-['Geist']
                  text-[48px]
                  font-bold
                  uppercase
                  leading-[1.15]
                  tracking-[-0.04em]
                  sm:text-[72px]
                  lg:text-[110px]
                  py-2
                  transform-gpu
                  will-change-[transform,opacity,color]
                  text-[#a6b9b9]
                  opacity-45
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

          @keyframes industry-marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .industry-marquee {
              animation: none;
            }
          }
        `}
      </style>
    </section>
  );
}