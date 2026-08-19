import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
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
  getFeaturedProducts,
  getNewArrivals,
  getRareFinds,
  toSummaries,
} from "@/lib/cms";
import { BAG_SHOTS, photo } from "@/lib/data/images";

export default async function HomePage() {
  const [featured, newArrivals, rareFinds] = await Promise.all([
    getFeaturedProducts(4),
    getNewArrivals(12),
    getRareFinds(3),
  ]);

  return (
    <>
      <Hero image={photo(BAG_SHOTS[0], 2400, 1500)} />

      <FeaturedCollection products={toSummaries(featured, 1)} />

      <NewArrivals products={toSummaries(newArrivals)} />

      <AuthenticitySection />

      <RareFinds products={toSummaries(rareFinds, 1)} />

      <ConciergeSection image={photo(BAG_SHOTS[5], 1400, 1600)} />

      <StoryTeaser image={photo(BAG_SHOTS[4], 2000, 1200)} />

      <FounderMessage />

      <SellSection image={photo(BAG_SHOTS[1], 1400, 1600)} />

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
