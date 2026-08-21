"use client";

import { motion, type Variants } from "framer-motion";

const line1Words = "Behind every great organization, successful team".split(" ");
const line2Words = "and life-changing career opportunity is someone".split(" ");
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
  return (
    <motion.h2
      id="mission-title"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      className="m-0 font-geist text-[clamp(22px,2.6vw,40px)] font-medium leading-[1.24] tracking-[-0.04em] text-right text-[#232323] max-[760px]:text-[22px]"
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

      <br />

      {/* Line 2 - Muted Text */}
      <span className="text-[#8d8d8d]">
        {line2Words.map((word, index) => (
          <motion.span
            key={`l2-${word}-${index}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}

        <br />

        {/* Line 3 - Muted Text */}
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
  );
}
