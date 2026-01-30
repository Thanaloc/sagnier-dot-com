"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tidal = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface AboutPortraitProps {
  portraitUrl?: string;
}

export function AboutPortrait({ portraitUrl }: AboutPortraitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const src = portraitUrl ?? "/photos/portrait-01.svg";

  return (
    <div ref={ref}>
      <motion.div
        style={{ y }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.8, delay: 1.2, ease: tidal }}
        className="relative aspect-[3/4] overflow-hidden"
      >
        <Image
          src={src}
          alt="Ruben Sagnier — photographe"
          fill
          className="object-cover brightness-[0.85]"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>
    </div>
  );
}
