"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import type { Photo, PhotoCategory } from "@/types/photo";
import { getPhotosByCategory } from "@/data/photos";
import { GalleryFilter } from "./GalleryFilter";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Lightbox } from "@/components/ui/Lightbox";

interface GalleryProps {
  initialPhotos: Photo[];
}

export function Gallery({ initialPhotos }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  const filteredPhotos = useMemo(
    () => getPhotosByCategory(activeCategory),
    [activeCategory]
  );

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

      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              priority={index < 3}
              onClick={setLightboxPhoto}
            />
          ))}
        </AnimatePresence>
      </div>

      <Lightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onNext={currentIndex < filteredPhotos.length - 1 ? goNext : undefined}
        onPrev={currentIndex > 0 ? goPrev : undefined}
      />
    </>
  );
}
