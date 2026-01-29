export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: PhotoCategory;
  featured: boolean;
  order: number;
}

export type PhotoCategory = "surf" | "ocean" | "portrait" | "paysage";

export const categoryLabels: Record<PhotoCategory, string> = {
  surf: "Surf",
  ocean: "Ocean",
  portrait: "Portrait",
  paysage: "Paysage",
};
