"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageBanner } from "@/components/shop/PageBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useShop } from "@/store/shop";
import { useCatalogue } from "@/store/catalogue";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Wishlist", href: "/wishlist" },
];

export default function WishlistPage() {
  const { wishlist, hydrated } = useShop();
  const { resolve } = useCatalogue();

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-6 animate-spin border-2 border-champagne border-t-transparent" />
      </div>
    );
  }

  const products = resolve(wishlist);

  return (
    <>
      <PageBanner
        eyebrow="Saved Pieces"
        title="Your Wishlist"
        description="Holy grail silhouettes and rare finds you've set aside, kept safe until you're ready."
        variant="compact"
      />

      <Breadcrumbs crumbs={crumbs} />

      <Container size="wide" className="pb-24 pt-4 lg:pb-32">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-line bg-warm/30 py-24 text-center">
            <div className="flex size-16 items-center justify-center border border-line bg-warm text-taupe">
              <Heart className="size-8" />
            </div>
            <h2 className="mt-6 font-serif text-2xl text-ink sm:text-3xl">
              Your wishlist is empty
            </h2>
            <p className="mt-3 max-w-md font-sans text-[0.875rem] leading-relaxed text-stone">
              Save rare finds and holy grail silhouettes by clicking the heart icon on any
              piece.
            </p>
            <Link
              href="/collections/handbags"
              className="mt-8 inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory transition-colors hover:bg-charcoal"
            >
              Explore Collection
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between border-b border-line pb-6">
              <p className="font-sans text-[0.75rem] tracking-luxe text-taupe uppercase">
                {products.length} {products.length === 1 ? "Piece" : "Pieces"} Saved
              </p>
            </div>
            <div className="mt-10">
              <ProductGrid products={products} showActions />
            </div>
          </>
        )}
      </Container>
    </>
  );
}
