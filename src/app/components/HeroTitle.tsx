"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <motion.h1
      id="top"
      className="absolute left-1/2 top-[18%] z-[2] m-0 w-[min(92%,935px)] -translate-x-1/2 cursor-pointer select-none text-center font-cal text-[clamp(48px,6.3vw,95px)] font-normal uppercase leading-[1.1] text-white max-[760px]:top-[20%] max-[760px]:text-[clamp(42px,12vw,64px)]"
      initial={{ scale: 1, y: 0, zIndex: 2 }}
      whileHover={{
        scale: 1.04,
        y: -6,
        zIndex: 6,
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 22,
          mass: 0.8,
        },
      }}
    >
      Voices of Talent
      <br />
      Acquisition
    </motion.h1>
  );
}
