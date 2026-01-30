import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { Gallery } from "@/components/collection/Gallery";
import { fetchAllPhotos } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Collection",
  description: "Explorez la collection complete de photographies de surf, ocean et paysages.",
};

export default async function CollectionPage() {
  const photos = await fetchAllPhotos();

  return (
    <PageTransition className="pt-48 md:pt-56 pb-32" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
      <Gallery initialPhotos={photos} />
    </PageTransition>
  );
}
