import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutContent } from "@/components/about/AboutContent";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { fetchSiteSettings } from "@/sanity/fetch";
import { pageShell } from "@/config/spacing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "A propos",
  description: "Decouvrez l'histoire et la demarche artistique de Ruben Sagnier, photographe de surf et d'ocean.",
};

export default async function AboutPage() {
  const settings = await fetchSiteSettings();

  return (
    <PageTransition className={pageShell}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-24 xl:gap-32">
        <div className="lg:w-1/2 xl:w-5/12">
          <AboutContent texts={settings?.aboutTexts ?? undefined} />
        </div>
        <div className="mt-24 lg:mt-0 lg:w-4/12 xl:w-3/12 xl:ml-auto pt-16 lg:pt-32">
          <AboutPortrait portraitUrl={settings?.aboutPortraitUrl ?? undefined} />
        </div>
      </div>
    </PageTransition>
  );
}
