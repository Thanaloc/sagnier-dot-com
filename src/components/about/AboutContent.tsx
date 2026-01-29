"use client";

import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";

export function AboutContent() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={transitions.stagger}
      className="order-1 lg:order-2"
    >
      <motion.p
        variants={transitions.fadeUp}
        className="text-sm tracking-[0.3em] uppercase text-detail mb-4"
      >
        A propos
      </motion.p>

      <motion.h1
        variants={transitions.fadeUp}
        className="text-4xl md:text-5xl font-extralight tracking-[0.1em] uppercase text-foreground mb-8"
      >
        Sagnier
      </motion.h1>

      <motion.div
        variants={transitions.fadeUp}
        className="space-y-5 text-foreground/70 leading-relaxed"
      >
        <p>
          Passionné par l&apos;océan et le surf depuis toujours, je capture
          ces instants éphémères où la lumière rencontre la vague, où le
          mouvement se fige dans l&apos;éternité.
        </p>
        <p>
          Mon approche photographique est guidée par l&apos;authenticité du
          moment. Pas de mise en scène, pas d&apos;artifice — juste la mer,
          la lumière, et l&apos;énergie brute de l&apos;océan.
        </p>
        <p>
          Basé sur la côte atlantique, je travaille au rythme des marées et
          des saisons, à la recherche de cette lumière parfaite qui
          transforme une simple vague en oeuvre d&apos;art.
        </p>
      </motion.div>

      <motion.div variants={transitions.fadeUp} className="mt-10">
        <Button href="/contact">Me contacter</Button>
      </motion.div>
    </motion.div>
  );
}
