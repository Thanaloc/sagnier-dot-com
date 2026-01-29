"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { transitions } from "@/config/theme";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/photos/surf-01.svg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={transitions.stagger}
        className="relative z-10 text-center px-6"
      >
        <motion.p
          variants={transitions.fadeUp}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-detail mb-4"
        >
          Photographie
        </motion.p>

        <motion.h1
          variants={transitions.fadeUp}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.15em] uppercase text-foreground"
        >
          Sagnier
        </motion.h1>

        <motion.p
          variants={transitions.fadeUp}
          className="mt-6 text-base md:text-lg text-foreground/60 tracking-wider max-w-md mx-auto font-light"
        >
          Capturer l&apos;instant, sublimer la vague
        </motion.p>

        <motion.div variants={transitions.fadeUp} className="mt-10">
          <Button href="/collection" variant="outline">
            Voir la collection
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}
