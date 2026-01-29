"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      variants={transitions.fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] uppercase text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm md:text-base text-foreground/50 tracking-wider max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 w-12 h-px bg-detail mx-auto" />
    </motion.div>
  );
}
