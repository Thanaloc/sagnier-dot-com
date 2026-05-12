import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityClient } from "next-sanity";

let _builder: ImageUrlBuilder | null = null;

function getBuilder(client: SanityClient): ImageUrlBuilder {
  if (!_builder) _builder = imageUrlBuilder(client);
  return _builder;
}

export function urlFor(client: SanityClient, source: SanityImageSource) {
  return getBuilder(client).image(source);
}
