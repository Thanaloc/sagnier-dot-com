import { getClient } from "./client";
import { urlFor } from "./image";
import { allPhotosQuery, featuredPhotosQuery, siteSettingsQuery } from "./queries";
import type { Photo, SanityPhoto } from "@/types/photo";
import type { SanityClient } from "next-sanity";

export interface SiteSettings {
  heroImageUrl: string | null;
  heroSubtitle: string | null;
  aboutPortraitUrl: string | null;
  aboutTexts: string[] | null;
  contactBackgroundUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
}

export const SANITY_CACHE_TAGS = {
  photos: "sanity:photos",
  settings: "sanity:settings",
} as const;

function sanityToPhoto(client: SanityClient, sp: SanityPhoto): Photo {
  const width = sp.dimensions?.width ?? 1600;
  const height = sp.dimensions?.height ?? 1067;

  return {
    id: sp._id,
    src: urlFor(client, sp.image).width(2400).quality(90).auto("format").url(),
    alt: sp.alt,
    width,
    height,
    category: sp.category,
    featured: sp.featured,
    order: sp.order,
    lqip: sp.lqip,
  };
}

async function safeFetch<T>(
  query: string,
  tag: string
): Promise<{ client: SanityClient; data: T } | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const data = await client.fetch<T>(
      query,
      {},
      { next: { tags: [tag] } }
    );
    return { client, data };
  } catch (error) {
    console.warn(`Sanity fetch failed for tag "${tag}":`, error);
    return null;
  }
}

export async function fetchAllPhotos(): Promise<Photo[]> {
  const result = await safeFetch<SanityPhoto[]>(allPhotosQuery, SANITY_CACHE_TAGS.photos);
  if (result && result.data.length > 0) {
    return result.data.map((sp) => sanityToPhoto(result.client, sp));
  }

  const { photos } = await import("@/data/photos");
  return [...photos].sort((a, b) => a.order - b.order);
}

export async function fetchFeaturedPhotos(): Promise<Photo[]> {
  const result = await safeFetch<SanityPhoto[]>(featuredPhotosQuery, SANITY_CACHE_TAGS.photos);
  if (result && result.data.length > 0) {
    return result.data.map((sp) => sanityToPhoto(result.client, sp));
  }

  const { getFeaturedPhotos } = await import("@/data/photos");
  return getFeaturedPhotos();
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const result = await safeFetch<SiteSettings | null>(
    siteSettingsQuery,
    SANITY_CACHE_TAGS.settings
  );
  return result?.data ?? null;
}
