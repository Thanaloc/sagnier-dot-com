"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
}

export function SectionTitle({ title, subtitle, label }: SectionTitleProps) {
  return (
    <motion.div
      variants={transitions.fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className="text-center mb-16 md:mb-24"
    >
      {label && (
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-6">{label}</p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wide text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-base md:text-lg text-foreground/40 tracking-wider max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
