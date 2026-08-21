"use client";

import { motion, type Variants } from "framer-motion";

const portraitImage = "/images/portrait.png";

const primaryWords = "Behind every great organization, successful team and".split(" ");
const secondaryWords = "life-changing career opportunity is someone who recognized potential.".split(" ");

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.016,
      delayChildren: 0,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative min-h-[380px] overflow-hidden bg-white px-[8.7%] pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20"
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        {/* Left Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]"
        >
          — The VOTA Mission
        </motion.p>

        {/* Right Heading with Fast Staggered Word Reveal */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <motion.h2
            id="mission-title"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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

          {/* Floating Portrait Image with smooth scroll entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -12, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.45,
              delay: 0.12,
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
