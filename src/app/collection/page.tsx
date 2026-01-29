import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { Gallery } from "@/components/collection/Gallery";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Collection",
  description: "Explorez la collection complete de photographies de surf, ocean et paysages.",
};

export default function CollectionPage() {
  return (
    <PageTransition className="pt-48 md:pt-56 pb-32 px-8 md:px-16 lg:px-24">
      <Gallery initialPhotos={photos} />
    </PageTransition>
  );
}
