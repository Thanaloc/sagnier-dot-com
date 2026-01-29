import { Photo } from "@/types/photo";

export const photos: Photo[] = [
  {
    id: "surf-01",
    src: "/photos/surf-01.svg",
    alt: "Surfeur dans une vague au coucher du soleil",
    width: 1600,
    height: 1067,
    category: "surf",
    featured: true,
    order: 1,
  },
  {
    id: "ocean-01",
    src: "/photos/ocean-01.svg",
    alt: "Vague se brisant sur la plage",
    width: 1600,
    height: 1067,
    category: "ocean",
    featured: true,
    order: 2,
  },
  {
    id: "surf-02",
    src: "/photos/surf-02.svg",
    alt: "Surfeur au takeoff",
    width: 1067,
    height: 1600,
    category: "surf",
    featured: true,
    order: 3,
  },
  {
    id: "paysage-01",
    src: "/photos/paysage-01.svg",
    alt: "Plage deserte au lever du jour",
    width: 1600,
    height: 900,
    category: "paysage",
    featured: true,
    order: 4,
  },
  {
    id: "ocean-02",
    src: "/photos/ocean-02.svg",
    alt: "Reflets dores sur l'ocean",
    width: 1600,
    height: 1067,
    category: "ocean",
    featured: false,
    order: 5,
  },
  {
    id: "surf-03",
    src: "/photos/surf-03.svg",
    alt: "Session de surf matinale",
    width: 1600,
    height: 1067,
    category: "surf",
    featured: false,
    order: 6,
  },
  {
    id: "portrait-01",
    src: "/photos/portrait-01.svg",
    alt: "Portrait de surfeur sur la plage",
    width: 1067,
    height: 1600,
    category: "portrait",
    featured: false,
    order: 7,
  },
  {
    id: "paysage-02",
    src: "/photos/paysage-02.svg",
    alt: "Coucher de soleil sur les dunes",
    width: 1600,
    height: 900,
    category: "paysage",
    featured: false,
    order: 8,
  },
  {
    id: "surf-04",
    src: "/photos/surf-04.svg",
    alt: "Aerial view de surfeurs",
    width: 1600,
    height: 1067,
    category: "surf",
    featured: false,
    order: 9,
  },
  {
    id: "ocean-03",
    src: "/photos/ocean-03.svg",
    alt: "Ecume et lumiere du matin",
    width: 1600,
    height: 1067,
    category: "ocean",
    featured: false,
    order: 10,
  },
];

export function getFeaturedPhotos(): Photo[] {
  return photos.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getPhotosByCategory(category: string | null): Photo[] {
  if (!category) return [...photos].sort((a, b) => a.order - b.order);
  return photos.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
