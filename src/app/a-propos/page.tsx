import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "@/components/about/AboutContent";
import { AboutPortrait } from "@/components/about/AboutPortrait";

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la demarche artistique de Ruben Sagnier, photographe de surf et d'ocean.",
};

export default function AboutPage() {
  return (
    <PageTransition className="pt-40 pb-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <AboutContent />
        <div className="mt-24">
          <AboutPortrait />
        </div>
      </div>
    </PageTransition>
  );
}
