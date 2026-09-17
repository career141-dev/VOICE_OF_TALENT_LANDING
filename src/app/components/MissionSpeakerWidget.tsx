"use client";

import { useEffect } from "react";

export const SPEAKER_IMAGES = [
  "https://talentsuite.career141.com/images/p1.webp",
  "https://talentsuite.career141.com/images/p2.webp",
  "https://talentsuite.career141.com/images/p3.webp",
  "https://talentsuite.career141.com/images/p4.webp",
  "https://talentsuite.career141.com/images/p5.webp",
  "https://talentsuite.career141.com/images/p6.webp",
  "https://talentsuite.career141.com/images/p7.webp",
  "https://talentsuite.career141.com/images/p8.webp",
  "https://talentsuite.career141.com/images/p9.webp",
  "https://talentsuite.career141.com/images/p10.webp",
  "https://talentsuite.career141.com/images/p11.webp",
  "https://talentsuite.career141.com/images/p12.webp",
  "https://talentsuite.career141.com/images/p13.webp",
  "https://talentsuite.career141.com/images/p14.webp",
];

interface MissionSpeakerWidgetProps {
  currentIndex: number;
  isMobile?: boolean;
}

export default function MissionSpeakerWidget({ currentIndex, isMobile = false }: MissionSpeakerWidgetProps) {
  // Preload all 14 speaker SVG images on mount for instant, flicker-free scroll and auto-cycling animation
  useEffect(() => {
    SPEAKER_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const safeIndex = ((currentIndex % SPEAKER_IMAGES.length) + SPEAKER_IMAGES.length) % SPEAKER_IMAGES.length;

  if (isMobile) {
    return (
      <div className="relative rotate-[6deg] w-[130px] h-[92px] sm:w-[155px] sm:h-[108px] md:w-[175px] md:h-[122px] lg:w-[190px] lg:h-[132px] rounded-[10px] sm:rounded-[12px] md:rounded-[14px] overflow-hidden select-none pointer-events-none bg-neutral-100 shadow-md">
        {SPEAKER_IMAGES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Voices of Talent Acquisition Speaker ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-in-out ${
              idx === safeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="eager"
            decoding="async"
          />
        ))}
      </div>
    );
  }

  return (
    <span className="relative inline-block w-[78px] sm:w-[104px] md:w-[126px] lg:w-[140px] xl:w-[148px] h-0 align-baseline select-none mr-2 sm:mr-3 md:mr-3.5">
      <span className="absolute left-[-6px] sm:left-[-10px] md:left-[-14px] lg:left-[-16px] xl:left-[-18px] bottom-[-28px] sm:bottom-[-40px] md:bottom-[-48px] lg:bottom-[-52px] xl:bottom-[-56px] w-[78px] h-[55px] sm:w-[104px] sm:h-[72px] md:w-[126px] md:h-[88px] lg:w-[140px] lg:h-[98px] xl:w-[148px] xl:h-[102px] -rotate-[6deg] rounded-[8px] sm:rounded-[12px] md:rounded-[14px] overflow-hidden pointer-events-none bg-neutral-100 shadow-md">
        {SPEAKER_IMAGES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Voices of Talent Acquisition Speaker ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-in-out ${
              idx === safeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            loading="eager"
            decoding="async"
          />
        ))}
      </span>
    </span>
  );
}
