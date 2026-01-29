import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "@/components/about/AboutContent";
import { AboutPortrait } from "@/components/about/AboutPortrait";

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la demarche artistique de Sagnier, photographe de surf et d'ocean.",
};

export default function AboutPage() {
  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <AboutPortrait />
        <AboutContent />
      </div>
    </PageTransition>
  );
}
