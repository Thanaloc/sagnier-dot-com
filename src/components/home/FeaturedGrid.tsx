"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { transitions } from "@/config/theme";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Photo } from "@/types/photo";

interface FeaturedGridProps {
  photos: Photo[];
}

export function FeaturedGrid({ photos }: FeaturedGridProps) {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-20">
      <SectionTitle
        title="Selection"
        subtitle="Les images qui racontent une histoire"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            variants={transitions.fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.1 }}
            className={index === 0 ? "md:col-span-2" : ""}
          >
            <div className="group relative overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                priority={index < 2}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Button href="/collection">Toute la collection</Button>
      </motion.div>
    </section>
  );
}
