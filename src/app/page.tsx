import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { getFeaturedPhotos } from "@/data/photos";

export default function HomePage() {
  const featured = getFeaturedPhotos();

  return (
    <>
      <HeroSection />
      <FeaturedGrid photos={featured} />
    </>
  );
}
