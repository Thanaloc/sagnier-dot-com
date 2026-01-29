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
    <div className="mb-40 md:mb-52">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-6">Explorer</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
          Collection
        </h1>
      </motion.div>

      <motion.div
        variants={transitions.fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-8 md:gap-10"
      >
        {categories.map((cat) => {
          const label = cat ? categoryLabels[cat] : "Tout";
          const isActive = active === cat;

          return (
            <button
              key={label}
              onClick={() => onChange(cat)}
              className={clsx(
                "relative text-[11px] tracking-[0.25em] uppercase transition-all duration-500 pb-3",
                isActive ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
              )}
            >
              {label}
              {isActive && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-detail rounded-full"
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
