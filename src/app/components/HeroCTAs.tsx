"use client";

import { motion } from "framer-motion";

const R2_MEDIA_URL = (process.env.NEXT_PUBLIC_R2_MEDIA_URL || "").replace(/\/+$/, "");

const arrowRight     = `${R2_MEDIA_URL}/icons/arrow-right.svg`;
const arrowRightDark = `${R2_MEDIA_URL}/icons/arrow-right-dark.svg`;

function Arrow({ source }: { source: string }) {
  return <img className="h-[17px] w-[17px] object-contain" src={source} alt="" />;
}

export default function HeroCTAs() {
  return (
    <div className="mt-[clamp(25px,3.5vw,50px)] flex justify-center gap-[19px] max-[760px]:mx-auto max-[760px]:mt-[34px] max-[760px]:w-max max-[760px]:flex-col">

      {/* Primary — Watch the Series */}
      <motion.a
        href="#episodes"
        className="group relative inline-flex h-[50px] items-center justify-center gap-2 overflow-hidden rounded-[25px] bg-[#159a99] px-[22px] text-[14px] font-semibold uppercase text-white no-underline max-[760px]:h-[44px]"
        initial={{ boxShadow: "0 5px 10px rgba(21,154,153,0.30)" }}
        whileHover={{
          scale: 1.045,
          y: -3,
          boxShadow: "0 14px 32px rgba(21,154,153,0.52), 0 4px 12px rgba(21,154,153,0.28)",
          transition: { type: "spring", stiffness: 380, damping: 20, mass: 0.7 },
        }}
        whileTap={{
          scale: 0.97,
          y: 0,
          transition: { type: "spring", stiffness: 500, damping: 25 },
        }}
      >
        {/* Shimmer sweep on hover */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[25px]"
          initial={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0) 50%, transparent 70%)", x: "-100%" }}
          whileHover={{
            x: "100%",
            background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)",
            transition: { duration: 0.55, ease: "easeInOut" },
          }}
          aria-hidden="true"
        />
        Watch the Series
        <motion.span
          whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
        >
          <Arrow source={arrowRight} />
        </motion.span>
      </motion.a>

      {/* Secondary — Explore VOTA */}
      <motion.a
        href="#speakers"
        className="group relative inline-flex h-[50px] items-center justify-center gap-2 overflow-hidden rounded-[25px] border border-[#e0e0e0] bg-white px-[22px] text-[14px] font-semibold uppercase text-black no-underline max-[760px]:h-[44px]"
        initial={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        whileHover={{
          scale: 1.045,
          y: -3,
          boxShadow: "0 14px 32px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.07)",
          borderColor: "#c0c0c0",
          transition: { type: "spring", stiffness: 380, damping: 20, mass: 0.7 },
        }}
        whileTap={{
          scale: 0.97,
          y: 0,
          transition: { type: "spring", stiffness: 500, damping: 25 },
        }}
      >
        {/* Subtle dark shimmer */}
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[25px]"
          initial={{ background: "linear-gradient(110deg, transparent 30%, rgba(0,0,0,0) 50%, transparent 70%)", x: "-100%" }}
          whileHover={{
            x: "100%",
            background: "linear-gradient(110deg, transparent 20%, rgba(0,0,0,0.04) 50%, transparent 80%)",
            transition: { duration: 0.55, ease: "easeInOut" },
          }}
          aria-hidden="true"
        />
        Explore VOTA
        <motion.span
          whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 18 } }}
        >
          <Arrow source={arrowRightDark} />
        </motion.span>
      </motion.a>

    </div>
  );
}
