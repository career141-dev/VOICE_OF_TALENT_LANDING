"use client";

import { motion } from "framer-motion";

const portraitImage = "/images/portrait.png";

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative min-h-[380px] overflow-hidden bg-white px-[8.7%] pt-[100px] text-[#202020] max-[760px]:min-h-[500px] max-[760px]:px-6 max-[760px]:pb-16 max-[760px]:pt-20"
      aria-labelledby="mission-title"
    >
      <div className="flex items-start justify-between gap-20 max-[760px]:flex-col max-[760px]:gap-12">
        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 shrink-0 text-[23px] font-semibold uppercase tracking-[-.02em] text-[#159a99] max-[760px]:text-[11px]"
        >
          — The VOTA Mission
        </motion.p>

        {/* Mission statement & portrait */}
        <div className="relative w-[min(68%,820px)] text-right max-[760px]:w-full">
          <motion.h2
            id="mission-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="m-0 font-geist text-[clamp(25px,2.1vw,36px)] font-medium leading-[1.22] tracking-[-.03em] text-right max-[760px]:text-[27px]"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#202020]"
            >
              Behind every great organization, successful team and
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#969696]"
            >
              life-changing career opportunity is someone who recognized potential.
            </motion.span>
          </motion.h2>

          {/* Floating tilted portrait image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -15, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -8, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              stiffness: 180,
              damping: 18,
            }}
            whileHover={{
              rotate: -4,
              scale: 1.06,
              transition: { duration: 0.4, ease: "easeOut" },
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
