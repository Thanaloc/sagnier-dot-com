import { getClient } from "./client";
import { urlFor } from "./image";
import { allPhotosQuery, featuredPhotosQuery } from "./queries";
import type { Photo, SanityPhoto } from "@/types/photo";

function sanityToPhoto(sp: SanityPhoto): Photo {
  const width = sp.dimensions?.width ?? 1600;
  const height = sp.dimensions?.height ?? 1067;

  return {
    id: sp._id,
    src: urlFor(sp.image).width(1600).quality(85).auto("format").url(),
    alt: sp.alt,
    width,
    height,
    category: sp.category,
    featured: sp.featured,
    order: sp.order,
    lqip: sp.lqip,
  };
}

export async function fetchAllPhotos(): Promise<Photo[]> {
  const client = getClient();

  if (client) {
    try {
      const sanityPhotos = await client.fetch<SanityPhoto[]>(allPhotosQuery);
      if (sanityPhotos && sanityPhotos.length > 0) {
        return sanityPhotos.map(sanityToPhoto);
      }
    } catch {
      console.warn("Sanity fetch failed, falling back to static data");
    }
  }

  const { photos } = await import("@/data/photos");
  return [...photos].sort((a, b) => a.order - b.order);
}

export async function fetchFeaturedPhotos(): Promise<Photo[]> {
  const client = getClient();

  if (client) {
    try {
      const sanityPhotos = await client.fetch<SanityPhoto[]>(featuredPhotosQuery);
      if (sanityPhotos && sanityPhotos.length > 0) {
        return sanityPhotos.map(sanityToPhoto);
      }
    } catch {
      console.warn("Sanity fetch failed, falling back to static data");
    }
  }

  const { getFeaturedPhotos } = await import("@/data/photos");
  return getFeaturedPhotos();
}
