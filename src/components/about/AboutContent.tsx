"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";

const tidal = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const defaultFragments = [
  "Passionn\u00e9 par l\u2019oc\u00e9an et le surf depuis toujours.",
  "Je capture ces instants \u00e9ph\u00e9m\u00e8res o\u00f9 la lumi\u00e8re rencontre la vague, o\u00f9 le mouvement se fige dans l\u2019\u00e9ternit\u00e9.",
  "Mon approche est guid\u00e9e par l\u2019authenticit\u00e9 du moment.",
  "Pas de mise en sc\u00e8ne, pas d\u2019artifice \u2014 juste la mer, la lumi\u00e8re, et l\u2019\u00e9nergie brute de l\u2019oc\u00e9an.",
  "Bas\u00e9 sur la c\u00f4te atlantique, je travaille au rythme des mar\u00e9es et des saisons.",
];

interface AboutContentProps {
  texts?: string[];
}

export function AboutContent({ texts }: AboutContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const fragments = texts && texts.length > 0 ? texts : defaultFragments;

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
        className="text-center"
        style={{ marginTop: "4rem" }}
      >
        <Button href="/contact" variant="pill">Me contacter</Button>
      </motion.div>
    </motion.div>
  );
}
