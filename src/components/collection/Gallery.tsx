"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo, PhotoCategory } from "@/types/photo";
import { categoryLabels } from "@/types/photo";
import { getPhotosByCategory } from "@/data/photos";
import { GalleryFilter } from "./GalleryFilter";
import { Lightbox } from "@/components/ui/Lightbox";
import { transitions } from "@/config/theme";

interface GalleryProps {
  initialPhotos: Photo[];
}

const categoryOrder: PhotoCategory[] = ["surf", "ocean", "portrait", "paysage"];

export function Gallery({ initialPhotos }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filteredPhotos = useMemo(
    () => getPhotosByCategory(activeCategory),
    [activeCategory]
  );

  const groupedPhotos = useMemo(() => {
    if (activeCategory) return null;
    const groups: Partial<Record<PhotoCategory, Photo[]>> = {};
    for (const cat of categoryOrder) {
      const catPhotos = initialPhotos.filter((p) => p.category === cat);
      if (catPhotos.length > 0) {
        groups[cat] = catPhotos.sort((a, b) => a.order - b.order);
      }
    }
    return groups;
  }, [activeCategory, initialPhotos]);

  const currentIndex = lightboxPhoto
    ? filteredPhotos.findIndex((p) => p.id === lightboxPhoto.id)
    : -1;

  const goNext = useCallback(() => {
    if (currentIndex < filteredPhotos.length - 1) {
      setLightboxPhoto(filteredPhotos[currentIndex + 1]);
    }
  }, [currentIndex, filteredPhotos]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setLightboxPhoto(filteredPhotos[currentIndex - 1]);
    }
  }, [currentIndex, filteredPhotos]);

  return (
    <>
      <GalleryFilter active={activeCategory} onChange={setActiveCategory} />

      <AnimatePresence mode="wait">
        {groupedPhotos ? (
          <motion.div
            key="grouped"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-28 md:space-y-40"
          >
            {categoryOrder.map((cat) => {
              const catPhotos = groupedPhotos[cat];
              if (!catPhotos) return null;
              return (
                <CategorySection
                  key={cat}
                  category={cat}
                  photos={catPhotos}
                  onPhotoClick={setLightboxPhoto}
                />
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: "5rem" }}
          >
            <PhotoGrid photos={filteredPhotos} onPhotoClick={setLightboxPhoto} />
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onNext={currentIndex < filteredPhotos.length - 1 ? goNext : undefined}
        onPrev={currentIndex > 0 ? goPrev : undefined}
      />
    </>
  );
}

function CategorySection({
  category,
  photos,
  onPhotoClick,
}: {
  category: PhotoCategory;
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}) {
  return (
    <section>
      <motion.div
        variants={transitions.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-12 md:mb-16"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-detail/60 mb-3">
          {categoryLabels[category]}
        </p>
        <div className="w-12 h-px bg-foreground/10" />
      </motion.div>

      <PhotoGrid photos={photos} onPhotoClick={onPhotoClick} />
    </section>
  );
}

function PhotoGrid({
  photos,
  onPhotoClick,
}: {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5">
      {photos.map((photo, index) => (
        <GridPhoto
          key={photo.id}
          photo={photo}
          index={index}
          onClick={onPhotoClick}
        />
      ))}
    </div>
  );
}

function GridPhoto({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: (photo: Photo) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index % 3 * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="mb-4 md:mb-5 break-inside-avoid group cursor-pointer"
      onClick={() => onClick(photo)}
    >
      <div className="relative overflow-hidden rounded-sm">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/70">
            {categoryLabels[photo.category]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
