import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "@/components/about/AboutContent";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { fetchSiteSettings } from "@/sanity/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la demarche artistique de Ruben Sagnier, photographe de surf et d'ocean.",
};

export default async function AboutPage() {
  const settings = await fetchSiteSettings();

  return (
    <PageTransition className="pb-32 px-8 md:px-16 lg:px-24" style={{ paddingTop: "10rem" }}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24 xl:gap-32">
        <div className="lg:w-1/2 xl:w-5/12" style={{ paddingLeft: "2rem" }}>
          <AboutContent texts={settings?.aboutTexts ?? undefined} />
        </div>
        <div className="mt-24 lg:mt-0 lg:w-4/12 xl:w-3/12 xl:ml-auto" style={{ paddingTop: "8rem" }}>
          <AboutPortrait portraitUrl={settings?.aboutPortraitUrl ?? undefined} />
        </div>
      </div>
    </PageTransition>
  );
}
