"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";
import type { Photo } from "@/types/photo";

interface FeaturedGridProps {
  photos: Photo[];
}

const layouts = [
  { width: "w-full", align: "mx-auto" },
  { width: "w-full md:w-3/5", align: "md:ml-auto" },
  { width: "w-full md:w-4/5", align: "mx-auto" },
  { width: "w-full md:w-3/5", align: "md:mr-auto" },
  { width: "w-full md:w-4/5", align: "mx-auto" },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const spacingMaxRem = 10;

export function FeaturedGrid({ photos }: FeaturedGridProps) {
  const spacings = useMemo(
    () => photos.map((_, i) => Math.round(seededRandom(i) * spacingMaxRem * 4) / 4),
    [photos]
  );

  return (
    <section className="px-8 py-48 md:px-16 lg:px-24">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-40"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">Selection</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wide text-foreground">
          Les images qui racontent
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <FeaturedPhoto
            key={photo.id}
            photo={photo}
            index={index}
            spacingRem={index === 0 ? 0 : spacings[index]}
          />
        ))}
      </div>

      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mt-44"
      >
        <Button href="/collection" variant="pill">
          Toute la collection
        </Button>
      </motion.div>
    </section>
  );
}

function FeaturedPhoto({
  photo,
  index,
  spacingRem,
}: {
  photo: Photo;
  index: number;
  spacingRem: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  const layout = layouts[index % layouts.length];

  return (
    <motion.div
      ref={ref}
      variants={transitions.parallaxReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className={`${layout.width} ${layout.align}`}
      style={{ marginTop: `${spacingRem}rem` }}
    >
      <div className="group relative overflow-hidden">
        <motion.div style={{ y, scale }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority={index < 2}
            className="w-full h-auto object-cover transition-all duration-1000 ease-out group-hover:scale-[1.02]"
            sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 70vw"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
}
