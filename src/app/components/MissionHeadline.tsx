"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import MissionSpeakerWidget, { SPEAKER_IMAGES } from "./MissionSpeakerWidget";

const line1Words = "Behind every great organization, successful team".split(" ");
const line2_mutedWords = "life-changing career opportunity is someone".split(" ");
const line3Words = "who recognized potential.".split(" ");

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export default function MissionHeadline() {
  const [speakerIndex, setSpeakerIndex] = useState(0);

  // Auto-change speaker image every 2.5 seconds with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeakerIndex((prev) => (prev + 1) % SPEAKER_IMAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <motion.h2
        id="mission-title"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="m-0 font-geist text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] min-[1025px]:text-[34px] xl:text-[40px] font-medium leading-[1.35] min-[1025px]:leading-[1.24] tracking-[-0.02em] min-[1025px]:tracking-[-0.04em] text-left min-[1025px]:text-right text-[#232323]"
      >
        {/* Line 1 - Dark Text */}
        <span className="text-[#232323]">
          {line1Words.map((word, index) => (
            <motion.span
              key={`l1-${word}-${index}`}
              variants={wordVariants}
              className="inline-block mr-[0.25em] will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </span>

        <br className="hidden min-[1025px]:inline" />

        {/* Line 2 - "and" (dark) + Muted Text */}
        <span>
          <motion.span
            variants={wordVariants}
            className="inline-block mr-[0.25em] text-[#232323] will-change-transform"
          >
            and
          </motion.span>
          <span className="text-[#8d8d8d]">
            {line2_mutedWords.map((word, index) => (
              <motion.span
                key={`l2-${word}-${index}`}
                variants={wordVariants}
                className="inline-block mr-[0.25em] will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </span>

        <br className="hidden min-[1025px]:inline" />

        {/* Line 3 - Speaker Widget + Muted Text */}
        <span className="text-[#8d8d8d]">
          {/* Desktop inline tilted widget */}
          <motion.span
            variants={wordVariants}
            className="hidden min-[1025px]:inline-block will-change-transform align-baseline"
          >
            <MissionSpeakerWidget currentIndex={speakerIndex} />
          </motion.span>
          {line3Words.map((word, index) => (
            <motion.span
              key={`l3-${word}-${index}`}
              variants={wordVariants}
              className="inline-block mr-[0.25em] will-change-transform"
            >
              {word}
            </motion.span>
          ))}
        </span>
      </motion.h2>

      {/* Mobile & Tablet speaker image (<= 1024px) - right aligned */}
      <div className="flex justify-end min-[1025px]:hidden -mt-8 sm:-mt-10 md:-mt-12 mr-1 sm:mr-3 md:mr-4 relative z-[2] pointer-events-none">
        <MissionSpeakerWidget currentIndex={speakerIndex} isMobile />
      </div>
    </div>
  );
}
