"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Photo } from "@/types/photo";

interface PhotoCardProps {
  photo: Photo;
  priority?: boolean;
  onClick?: (photo: Photo) => void;
}

export function PhotoCard({ photo, priority = false, onClick }: PhotoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden cursor-pointer"
      onClick={() => onClick?.(photo)}
    >
      <div className="relative overflow-hidden">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          priority={priority}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
