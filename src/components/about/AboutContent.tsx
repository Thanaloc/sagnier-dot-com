"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";

const fragments = [
  "Passionné par l'océan et le surf depuis toujours.",
  "Je capture ces instants éphémères où la lumière rencontre la vague, où le mouvement se fige dans l'éternité.",
  "Mon approche photographique est guidée par l'authenticité du moment. Pas de mise en scène, pas d'artifice — juste la mer, la lumière, et l'énergie brute de l'océan.",
  "Basé sur la côte atlantique, je travaille au rythme des marées et des saisons, à la recherche de cette lumière parfaite qui transforme une simple vague en oeuvre d'art.",
];

export function AboutContent() {
  return (
    <div className="order-1 lg:order-2 space-y-16">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="text-xs tracking-[0.4em] uppercase text-detail mb-6">A propos</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-wide text-foreground">
          Sagnier
        </h1>
        <div className="mt-6 w-12 h-px bg-detail/40" />
      </motion.div>

      <div className="space-y-10">
        {fragments.map((text, i) => (
          <motion.p
            key={i}
            variants={transitions.slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className={
              i === 0
                ? "text-xl md:text-2xl text-foreground/90 font-light leading-relaxed"
                : "text-base md:text-lg text-foreground/60 leading-relaxed font-light"
            }
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Button href="/contact">Me contacter</Button>
      </motion.div>
    </div>
  );
}
