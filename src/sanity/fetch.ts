import { getClient } from "./client";
import { urlFor } from "./image";
import { allPhotosQuery, featuredPhotosQuery, siteSettingsQuery } from "./queries";
import type { Photo, SanityPhoto } from "@/types/photo";

export interface SiteSettings {
  heroImageUrl: string | null;
  heroSubtitle: string | null;
  aboutPortraitUrl: string | null;
  aboutTexts: string[] | null;
  contactBackgroundUrl: string | null;
}

function sanityToPhoto(sp: SanityPhoto): Photo {
  const width = sp.dimensions?.width ?? 1600;
  const height = sp.dimensions?.height ?? 1067;

  return {
    id: sp._id,
    src: urlFor(sp.image).width(2400).quality(95).auto("format").url(),
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

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const client = getClient();

  if (client) {
    try {
      const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery);
      if (settings) return settings;
    } catch {
      console.warn("Sanity settings fetch failed, using defaults");
    }
  }

  return null;
}
