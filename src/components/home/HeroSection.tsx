"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { transitions } from "@/config/theme";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/photos/surf-01.svg')",
          y: imageY,
          scale: imageScale,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-16"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={transitions.stagger}
          className="text-center"
        >
          <motion.p
            variants={transitions.fadeUp}
            className="text-xs md:text-sm tracking-[0.5em] uppercase text-detail mb-8 font-light"
          >
            Photographie
          </motion.p>

          <motion.h1
            variants={transitions.fadeUp}
            className="text-6xl md:text-8xl lg:text-9xl font-display tracking-[0.06em] text-foreground"
          >
            Sagnier
          </motion.h1>

          <motion.p
            variants={transitions.fadeUp}
            className="mt-10 text-base md:text-lg text-foreground/40 tracking-[0.08em] max-w-lg mx-auto"
          >
            Capturer l&apos;instant, sublimer la vague
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/25">
            Scroll
          </span>
          <span className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
