"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";
import type { Photo } from "@/types/photo";

interface FeaturedGridProps {
  photos: Photo[];
}

export function FeaturedGrid({ photos }: FeaturedGridProps) {
  return (
    <section className="px-8 py-40 md:px-16 lg:px-24">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-28"
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-6">Selection</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-wide text-foreground">
          Les images qui racontent
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {photos.map((photo, index) => (
          <FeaturedPhoto key={photo.id} photo={photo} index={index} />
        ))}
      </div>

      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mt-32"
      >
        <Button href="/collection" variant="outline">
          Toute la collection
        </Button>
      </motion.div>
    </section>
  );
}

function FeaturedPhoto({ photo, index }: { photo: Photo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.98]);

  const isWide = index === 0;

  return (
    <motion.div
      ref={ref}
      variants={transitions.parallaxReveal}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      className={isWide ? "w-full" : "w-full md:w-4/5 mx-auto"}
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
            sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 80vw"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
}
