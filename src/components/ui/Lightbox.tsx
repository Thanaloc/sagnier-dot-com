"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "@/types/photo";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function Lightbox({ photo, onClose, onNext, onPrev }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && onNext) onNext();
      else if (e.key === "ArrowLeft" && onPrev) onPrev();
      else if (e.key === "Tab") e.preventDefault();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!photo) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [photo, handleKeyDown]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4 transition-colors duration-500 z-10"
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {onPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 text-white/30 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4 transition-colors duration-500 z-10"
              aria-label="Photo precedente"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 text-white/30 hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4 transition-colors duration-500 z-10"
              aria-label="Photo suivante"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="90vw"
              className="max-w-full max-h-[85vh] object-contain w-auto h-auto"
              priority
              placeholder={photo.lqip ? "blur" : "empty"}
              blurDataURL={photo.lqip}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
