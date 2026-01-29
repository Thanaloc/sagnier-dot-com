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
    <div style={{ marginBottom: "10rem" }}>
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
        className="flex flex-wrap items-center justify-center gap-10 md:gap-12"
      >
        {categories.map((cat) => {
          const label = cat ? categoryLabels[cat] : "Tout";
          const isActive = active === cat;

          return (
            <button
              key={label}
              onClick={() => onChange(cat)}
              className={clsx(
                "relative text-[11px] tracking-[0.25em] uppercase transition-all duration-500 pb-3 group cursor-pointer",
                isActive ? "text-foreground" : "text-foreground/50 hover:text-foreground/90"
              )}
            >
              <motion.span
                className="inline-block"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {label}
              </motion.span>
              {isActive ? (
                <motion.span
                  layoutId="filter-active"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-detail rounded-full"
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-foreground/30 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
