import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { fetchFeaturedPhotos, fetchSiteSettings } from "@/sanity/fetch";

export const revalidate = 3600;

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    fetchFeaturedPhotos(),
    fetchSiteSettings(),
  ]);

  return (
    <>
      <HeroSection
        heroImageUrl={settings?.heroImageUrl ?? undefined}
        heroSubtitle={settings?.heroSubtitle ?? undefined}
      />
      <FeaturedGrid photos={featured} />
    </>
  );
}
