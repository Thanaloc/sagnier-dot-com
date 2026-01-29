"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { transitions } from "@/config/theme";
import type { PhotoCategory } from "@/types/photo";
import { categoryLabels } from "@/types/photo";

interface GalleryFilterProps {
  active: PhotoCategory | null;
  onChange: (category: PhotoCategory | null) => void;
}

const categories: (PhotoCategory | null)[] = [null, "surf", "ocean", "portrait", "paysage"];

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="mb-24 md:mb-32">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-detail mb-4">Explorer</p>
        <h1 className="text-4xl md:text-6xl font-display font-light tracking-wide text-foreground">
          Collection
        </h1>
        <div className="mt-6 w-12 h-px bg-detail/40 mx-auto" />
      </motion.div>

      <motion.div
        variants={transitions.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
      >
        {categories.map((cat) => {
          const label = cat ? categoryLabels[cat] : "Tout";
          const isActive = active === cat;

          return (
            <button
              key={label}
              onClick={() => onChange(cat)}
              className={clsx(
                "relative text-xs tracking-[0.2em] uppercase transition-colors duration-500 pb-2",
                isActive ? "text-detail" : "text-foreground/40 hover:text-foreground/70"
              )}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-detail"
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
