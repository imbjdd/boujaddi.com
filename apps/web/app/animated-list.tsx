"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";

export function AnimatedList({
  children,
  className,
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <ul className={className}>
      {Children.map(children, (child, index) => (
        <motion.li
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.li>
      ))}
    </ul>
  );
}
