"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { PhotoCategory } from "@/types/photo";
import { categoryLabels } from "@/types/photo";

interface GalleryFilterProps {
  active: PhotoCategory | null;
  onChange: (category: PhotoCategory | null) => void;
}

const categories: (PhotoCategory | null)[] = [null, "surf", "ocean", "portrait", "paysage"];

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
      {categories.map((cat) => {
        const label = cat ? categoryLabels[cat] : "Tout";
        const isActive = active === cat;

        return (
          <button
            key={label}
            onClick={() => onChange(cat)}
            className={clsx(
              "relative text-xs md:text-sm tracking-[0.15em] uppercase transition-colors duration-300 pb-1",
              isActive ? "text-detail" : "text-foreground/50 hover:text-foreground"
            )}
          >
            {label}
            {isActive && (
              <motion.span
                layoutId="filter-underline"
                className="absolute bottom-0 left-0 right-0 h-px bg-detail"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
