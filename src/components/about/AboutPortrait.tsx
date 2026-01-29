"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <div ref={ref}>
      <motion.div
        style={{ y, scale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative aspect-[3/4] overflow-hidden"
      >
        <Image
          src="/photos/portrait-01.svg"
          alt="Ruben Sagnier - photographe"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </motion.div>
    </div>
  );
}
