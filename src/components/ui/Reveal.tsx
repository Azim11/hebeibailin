"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay, used to stagger siblings. */
  delay?: number;
  /** `up` translates in from below; `none` fades only. */
  direction?: "up" | "none";
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
};

/**
 * Scroll-triggered fade/rise. Animates once, and collapses to a plain fade
 * when the visitor has asked for reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  const offset = reduced || direction === "none" ? 0 : 24;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduced ? 0.2 : 0.9,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
