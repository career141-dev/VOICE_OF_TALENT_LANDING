"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SPEAKER_IMAGES = [
  "https://talentsuite.career141.com/images/p1.svg",
  "https://talentsuite.career141.com/images/p2.svg",
  "https://talentsuite.career141.com/images/p3.svg",
  "https://talentsuite.career141.com/images/p4.svg",
  "https://talentsuite.career141.com/images/p5.svg",
  "https://talentsuite.career141.com/images/p6.svg",
  "https://talentsuite.career141.com/images/p7.svg",
  "https://talentsuite.career141.com/images/p8.svg",
  "https://talentsuite.career141.com/images/p9.svg",
  "https://talentsuite.career141.com/images/p10.svg",
  "https://talentsuite.career141.com/images/p11.svg",
  "https://talentsuite.career141.com/images/p12.svg",
  "https://talentsuite.career141.com/images/p13.svg",
  "https://talentsuite.career141.com/images/p14.svg",
];

interface MissionSpeakerWidgetProps {
  currentIndex: number;
  isMobile?: boolean;
}

const imageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

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
      <div className="relative -rotate-[6deg] w-[130px] h-[92px] sm:w-[155px] sm:h-[108px] md:w-[170px] md:h-[118px] rounded-[10px] sm:rounded-[12px] overflow-hidden select-none pointer-events-none bg-neutral-100 shadow-md">
        <AnimatePresence initial={false}>
          <motion.img
            key={safeIndex}
            src={SPEAKER_IMAGES[safeIndex]}
            alt={`Voice of Talent Speaker ${safeIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            loading="eager"
            decoding="async"
          />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <span className="relative inline-block w-[78px] sm:w-[104px] md:w-[126px] min-[1367px]:w-[148px] h-0 align-baseline select-none mr-2 sm:mr-3 md:mr-3.5">
      <span className="absolute left-[-6px] sm:left-[-10px] md:left-[-14px] min-[1367px]:left-[-18px] bottom-[-28px] sm:bottom-[-40px] md:bottom-[-48px] min-[1367px]:bottom-[-56px] w-[78px] h-[55px] sm:w-[104px] sm:h-[72px] md:w-[126px] md:h-[88px] min-[1367px]:w-[148px] min-[1367px]:h-[102px] -rotate-[6deg] rounded-[8px] sm:rounded-[12px] md:rounded-[14px] overflow-hidden pointer-events-none bg-neutral-100 shadow-md">
        <AnimatePresence initial={false}>
          <motion.img
            key={safeIndex}
            src={SPEAKER_IMAGES[safeIndex]}
            alt={`Voice of Talent Speaker ${safeIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            loading="eager"
            decoding="async"
          />
        </AnimatePresence>
      </span>
    </span>
  );
}
