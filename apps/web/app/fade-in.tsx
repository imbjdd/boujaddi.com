"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  whileInView = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  whileInView?: boolean;
}) {
  const animationProps = whileInView
    ? {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" as const },
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
      }
    : {
        initial: { opacity: 0, y },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: "easeOut" as const },
      };

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  );
}
