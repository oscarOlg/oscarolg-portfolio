"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before the animation starts */
  delay?: number;
  /** Which direction the element slides in from */
  direction?: "up" | "left" | "right" | "none";
}

/**
 * Wraps children in a Framer Motion div that fades + slides into view
 * when the element scrolls into the viewport. Triggers only once.
 */
export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 28 : 0,
    x: direction === "left" ? 28 : direction === "right" ? -28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
