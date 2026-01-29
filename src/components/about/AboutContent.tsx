"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

const tidal = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fragments = [
  "Passionné par l'océan et le surf depuis toujours.",
  "Je capture ces instants éphémères où la lumière rencontre la vague, où le mouvement se fige dans l'éternité.",
  "Mon approche est guidée par l'authenticité du moment.",
  "Pas de mise en scène, pas d'artifice — juste la mer, la lumière, et l'énergie brute de l'océan.",
  "Basé sur la côte atlantique, je travaille au rythme des marées et des saisons.",
];

export function AboutContent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <motion.div ref={ref} style={{ y }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: tidal }}
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">A propos</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
          Ruben Sagnier
        </h1>
      </motion.div>

      <div className="space-y-10" style={{ marginTop: "5rem" }}>
        {fragments.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.8 + i * 0.2,
              ease: tidal,
            }}
            className={
              i === 0
                ? "text-xl md:text-2xl text-foreground/80 leading-relaxed"
                : "text-base md:text-lg text-foreground/40 leading-loose"
            }
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2, ease: tidal }}
        style={{ marginTop: "4rem" }}
      >
        <Button href="/contact" variant="pill">Me contacter</Button>
      </motion.div>
    </motion.div>
  );
}
