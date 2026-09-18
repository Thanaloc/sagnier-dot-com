import type { Metadata } from "next";
import { PageTransition } from "@/components/layout/PageTransition";
import { Gallery } from "@/components/collection/Gallery";
import { fetchAllPhotos } from "@/sanity/fetch";
import { pageShell } from "@/config/spacing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Explorez la collection complète de photographies de surf, océan et paysages.",
};

export default async function CollectionPage() {
  const photos = await fetchAllPhotos();

  return (
    <PageTransition className={pageShell}>
      <Gallery initialPhotos={photos} />
    </PageTransition>
  );
}
