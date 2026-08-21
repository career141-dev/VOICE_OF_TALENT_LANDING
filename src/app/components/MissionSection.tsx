"use client";

import { motion, type Variants } from "framer-motion";

const portraitImage = "/images/portrait.png";

const phraseVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
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
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]"
        >
          — The VOTA Mission
        </motion.p>

        {/* Right Heading with Instant Phrase Reveal */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <h2
            id="mission-title"
            className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.28] tracking-[-.03em] text-right max-[760px]:text-[27px]"
          >
            {/* Primary Dark Text */}
            <span className="text-[#202020]">
              <motion.span
                custom={0}
                variants={phraseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "150px" }}
                className="inline-block"
              >
                Behind every great organization,&nbsp;
              </motion.span>
              <motion.span
                custom={1}
                variants={phraseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "150px" }}
                className="inline-block"
              >
                successful team and&nbsp;
              </motion.span>
            </span>

            {/* Secondary Muted Text */}
            <span className="text-[#969696]">
              <motion.span
                custom={2}
                variants={phraseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "150px" }}
                className="inline-block"
              >
                life-changing career opportunity&nbsp;
              </motion.span>
              <motion.span
                custom={3}
                variants={phraseVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "150px" }}
                className="inline-block"
              >
                is someone who recognized potential.
              </motion.span>
            </span>
          </h2>

          {/* Floating Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{
              duration: 0.35,
              delay: 0.1,
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
