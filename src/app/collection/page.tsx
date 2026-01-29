import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Gallery } from "@/components/collection/Gallery";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Collection",
  description: "Explorez la collection complete de photographies de surf, ocean et paysages.",
};

export default function CollectionPage() {
  return (
    <PageTransition className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
      <SectionTitle
        title="Collection"
        subtitle="Chaque image est un instant suspendu entre ciel et mer"
      />
      <Gallery initialPhotos={photos} />
    </PageTransition>
  );
}
