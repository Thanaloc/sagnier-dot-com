import type { Metadata } from "next";
import Image from "next/image";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la demarche artistique de Sagnier, photographe de surf et d'ocean.",
};

export default function AboutPage() {
  return (
    <PageTransition className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
          <Image
            src="/photos/portrait-01.svg"
            alt="Sagnier - photographe"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        <AboutContent />
      </div>
    </PageTransition>
  );
}
