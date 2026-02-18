"use client";

import { motion } from "motion/react";
import { Children, type ReactNode } from "react";

export function StaggerChildren({
  children,
  className,
  childClassName,
  staggerDelay = 0.06,
  whileInView = false,
}: {
  children: ReactNode;
  className?: string;
  childClassName?: string;
  staggerDelay?: number;
  whileInView?: boolean;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        const props = whileInView
          ? {
              initial: { opacity: 0, y: 12 } as const,
              whileInView: { opacity: 1, y: 0 } as const,
              viewport: { once: true, margin: "-30px" as const },
              transition: {
                duration: 0.4,
                delay: index * staggerDelay,
                ease: "easeOut" as const,
              },
            }
          : {
              initial: { opacity: 0, y: 12 } as const,
              animate: { opacity: 1, y: 0 } as const,
              transition: {
                duration: 0.4,
                delay: index * staggerDelay,
                ease: "easeOut" as const,
              },
            };

        return (
          <motion.div className={childClassName} {...props}>
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
