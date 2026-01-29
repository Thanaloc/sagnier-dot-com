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
    <PageTransition className="pt-48 md:pt-56 pb-32 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24 xl:gap-32">
        <div className="lg:w-1/2 xl:w-5/12">
          <AboutContent />
        </div>
        <div className="mt-24 lg:mt-0 lg:w-1/2 xl:w-5/12 xl:ml-auto" style={{ paddingTop: "12rem" }}>
          <AboutPortrait />
        </div>
      </div>
    </PageTransition>
  );
}
