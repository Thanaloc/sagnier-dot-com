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
    <div className="space-y-20 text-center">
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="text-xs tracking-[0.5em] uppercase text-detail mb-8">A propos</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-wide text-foreground">
          Ruben Sagnier
        </h1>
      </motion.div>

      <div className="space-y-12">
        {fragments.map((text, i) => (
          <motion.p
            key={i}
            variants={transitions.slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-40px" }}
            className={
              i === 0
                ? "text-xl md:text-2xl text-foreground/80 leading-relaxed"
                : "text-base md:text-lg text-foreground/45 leading-loose"
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
        className="pt-4"
      >
        <Button href="/contact">Me contacter</Button>
      </motion.div>
    </div>
  );
}
