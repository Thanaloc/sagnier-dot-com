import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { fetchFeaturedPhotos } from "@/sanity/fetch";

export default async function HomePage() {
  const featured = await fetchFeaturedPhotos();

  return (
    <>
      <HeroSection />
      <FeaturedGrid photos={featured} />
    </>
  );
}
