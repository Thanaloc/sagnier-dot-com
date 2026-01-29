"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import type { CSSProperties, ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function PageTransition({ children, className, style }: PageTransitionProps) {
  return (
    <motion.div
      initial={transitions.page.initial}
      animate={transitions.page.animate}
      exit={transitions.page.exit}
      transition={transitions.page.transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
