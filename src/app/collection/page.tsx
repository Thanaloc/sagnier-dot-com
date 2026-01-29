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
    <PageTransition className="pt-32 pb-24 px-6 md:px-12 lg:px-20">
      <Gallery initialPhotos={photos} />
    </PageTransition>
  );
}
