"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={transitions.page.initial}
      animate={transitions.page.animate}
      exit={transitions.page.exit}
      transition={transitions.page.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
