"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Photo } from "@/types/photo";
import { categoryLabels } from "@/types/photo";

interface ParallaxPhotoProps {
  photo: Photo;
  index: number;
  onClick: (photo: Photo) => void;
}

const layouts = [
  { width: "w-full", align: "" },
  { width: "w-4/5 md:w-3/5", align: "ml-auto" },
  { width: "w-full md:w-4/5", align: "mx-auto" },
  { width: "w-4/5 md:w-3/5", align: "" },
  { width: "w-full md:w-2/3", align: "ml-auto mr-0 md:mr-12" },
];

export function ParallaxPhoto({ photo, index, onClick }: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const layout = layouts[index % layouts.length];

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`${layout.width} ${layout.align}`}
    >
      <motion.div
        style={{ y, scale }}
        className="group relative overflow-hidden cursor-pointer"
        onClick={() => onClick(photo)}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={index < 2}
          className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 80vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <p className="text-xs tracking-[0.2em] uppercase text-detail/80">
            {categoryLabels[photo.category]}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
