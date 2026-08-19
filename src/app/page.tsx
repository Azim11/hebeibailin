import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BrandGrid } from "@/components/home/BrandGrid";
import { NewArrivals } from "@/components/home/NewArrivals";
import { AuthenticitySection } from "@/components/home/AuthenticitySection";
import { RareFinds } from "@/components/home/RareFinds";
import { ConciergeSection } from "@/components/home/ConciergeSection";
import { SellSection } from "@/components/home/SellSection";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { FounderMessage } from "@/components/home/FounderMessage";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { PressStrip } from "@/components/home/PressStrip";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";

import {
  getFeaturedBrands,
  getFeaturedProducts,
  getNewArrivals,
  getRareFinds,
  toSummaries,
} from "@/lib/cms";
import { BAG_SHOTS, EDITORIAL, INTERIORS, photo } from "@/lib/data/images";

export default async function HomePage() {
  const [featured, brands, newArrivals, rareFinds] = await Promise.all([
    getFeaturedProducts(4),
    getFeaturedBrands(),
    getNewArrivals(12),
    getRareFinds(3),
  ]);

  return (
    <>
      <Hero image={photo("photo-1590874103328-eac38a683ce7", 2400, 1500)} />

      <FeaturedCollection products={toSummaries(featured, 1)} />

      <BrandGrid brands={brands} />

      <NewArrivals products={toSummaries(newArrivals)} />

      <AuthenticitySection />

      <RareFinds products={toSummaries(rareFinds, 1)} />

      <ConciergeSection image={photo("photo-1509631179647-0177331693ae", 1400, 1600)} />

      <StoryTeaser image={photo("photo-1584917865442-de89df76afd3", 2000, 1200)} />

      <FounderMessage />

      <SellSection image={photo("photo-1548036328-c9fa89d128fa", 1400, 1600)} />

      <ShowroomSection />

      <TestimonialSection />

      <PressStrip />

      <InstagramGrid
        images={BAG_SHOTS.slice(0, 6).map((id) => photo(id, 700, 700))}
      />

      <NewsletterSection />
    </>
  );
}
