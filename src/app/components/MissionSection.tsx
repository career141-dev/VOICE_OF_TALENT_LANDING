"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const portraitImage = "/images/portrait.png";

const primaryWords = "Behind every great organization, successful team and".split(" ");
const secondaryWords = "life-changing career opportunity is someone who recognized potential.".split(" ");

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.012,
      delayChildren: 0,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Expands bottom margin by 400px so it triggers WAY before the user reaches it - zero white screen lag!
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px 400px 0px" });

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-[380px] overflow-hidden bg-white px-[8.7%] pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20"
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        {/* Left Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]"
        >
          — The VOTA Mission
        </motion.p>

        {/* Right Heading with Instant Reveal */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <motion.h2
            id="mission-title"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.28] tracking-[-.03em] text-right max-[760px]:text-[27px]"
          >
            {/* Primary Dark Words */}
            <span className="text-[#202020]">
              {primaryWords.map((word, index) => (
                <motion.span
                  key={`primary-${index}`}
                  variants={wordVariants}
                  className="inline-block mr-[0.28em] will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
            </span>{" "}
            {/* Secondary Muted Words */}
            <span className="text-[#969696]">
              {secondaryWords.map((word, index) => (
                <motion.span
                  key={`secondary-${index}`}
                  variants={wordVariants}
                  className="inline-block mr-[0.28em] will-change-transform"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          {/* Floating Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10, y: 12 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: -8, y: 0 } : { opacity: 0, scale: 0.9, rotate: -10, y: 12 }}
            transition={{
              duration: 0.35,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="absolute left-[30%] top-[60px] z-[2] h-[150px] w-[150px] overflow-hidden rounded-[6px] shadow-lg max-[760px]:left-[18%] max-[760px]:top-[148px]"
          >
            <img
              className="h-full w-full object-cover"
              src={portraitImage}
              alt="A member of the Voice of Talent community"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
