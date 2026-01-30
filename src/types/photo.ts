export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: PhotoCategory;
  featured: boolean;
  order: number;
  lqip?: string;
}

export interface SanityPhoto {
  _id: string;
  title: string;
  image: SanityImageAsset;
  alt: string;
  category: PhotoCategory;
  featured: boolean;
  order: number;
  imageUrl: string;
  lqip?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface SanityImageAsset {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export type PhotoCategory = "surf" | "ocean" | "portrait" | "paysage";

export const categoryLabels: Record<PhotoCategory, string> = {
  surf: "Surf",
  ocean: "Ocean",
  portrait: "Portrait",
  paysage: "Paysage",
};
