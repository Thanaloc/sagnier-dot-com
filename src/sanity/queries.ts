import { groq } from "next-sanity";

export const allPhotosQuery = groq`
  *[_type == "photo"] | order(order asc) {
    _id,
    title,
    image,
    alt,
    category,
    featured,
    order,
    "imageUrl": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "dimensions": image.asset->metadata.dimensions
  }
`;

export const featuredPhotosQuery = groq`
  *[_type == "photo" && featured == true] | order(order asc) {
    _id,
    title,
    image,
    alt,
    category,
    featured,
    order,
    "imageUrl": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "dimensions": image.asset->metadata.dimensions
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroImage,
    heroSubtitle,
    aboutPortrait,
    aboutTexts,
    contactBackground,
    "heroImageUrl": heroImage.asset->url,
    "aboutPortraitUrl": aboutPortrait.asset->url,
    "contactBackgroundUrl": contactBackground.asset->url,
    instagramUrl,
    linkedinUrl
  }
`;

export const photosByCategoryQuery = groq`
  *[_type == "photo" && category == $category] | order(order asc) {
    _id,
    title,
    image,
    alt,
    category,
    featured,
    order,
    "imageUrl": image.asset->url,
    "lqip": image.asset->metadata.lqip,
    "dimensions": image.asset->metadata.dimensions
  }
`;
