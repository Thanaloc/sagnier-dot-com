import imageUrlBuilder from "@sanity/image-url";
import { getClient } from "./client";
import type { SanityImageSource } from "@sanity/image-url";

export function urlFor(source: SanityImageSource) {
  const client = getClient();
  if (!client) throw new Error("Sanity client not configured");
  return imageUrlBuilder(client).image(source);
}
