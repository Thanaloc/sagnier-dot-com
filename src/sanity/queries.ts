import { groq } from "next-sanity";

const photoProjection = groq`
  _id,
  title,
  image,
  alt,
  category,
  featured,
  order,
  "lqip": image.asset->metadata.lqip,
  "dimensions": image.asset->metadata.dimensions
`;

export const allPhotosQuery = groq`
  *[_type == "photo"] | order(order asc) {
    ${photoProjection}
  }
`;

export const featuredPhotosQuery = groq`
  *[_type == "photo" && featured == true] | order(order asc) {
    ${photoProjection}
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
    ${photoProjection}
  }
`;
