"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tidal = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface HeroSectionProps {
  heroImageUrl?: string;
  heroSubtitle?: string;
}

export function HeroSection({ heroImageUrl, heroSubtitle }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.45, 0.75]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  const bgImage = heroImageUrl ?? "/photos/surf-01.svg";

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        initial={{ scale: 1.15, filter: "blur(12px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 2.2, ease: tidal }}
        style={{
          backgroundImage: `url('${bgImage}')`,
          y: imageY,
          scale: imageScale,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-16"
      >
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: tidal }}
            className="text-xs md:text-sm tracking-[0.5em] uppercase text-detail mb-8 font-light"
          >
            Photographie
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2, ease: tidal }}
            className="text-6xl md:text-8xl lg:text-9xl font-display tracking-[0.06em] text-foreground"
          >
            Ruben Sagnier
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1, ease: tidal }}
            className="mt-10 text-base md:text-lg text-foreground/40 tracking-[0.08em] max-w-lg mx-auto"
          >
            {heroSubtitle ?? "Capturer l\u2019instant, sublimer la vague"}
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5, ease: tidal }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="text-[9px] tracking-[0.3em] uppercase text-foreground/25"
          >
            Scroll
          </motion.span>
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 3.2, duration: 1.2, ease: tidal }}
            className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent origin-top"
          />
          <motion.span
            animate={{ y: [0, 16, 0] }}
            transition={{ delay: 4.5, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-foreground/20"
          />
        </div>
      </motion.div>
    </section>
  );
}
