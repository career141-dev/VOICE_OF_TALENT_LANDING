"use client";

import { motion, type Variants } from "framer-motion";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
}

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

export default function StaggeredText({
  text,
  className = "",
  delayChildren = 0.1,
  staggerChildren = 0.08,
  once = false,
}: StaggeredTextProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em] will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
