"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart, Scale, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { ProductSummary } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

type ProductCardProps = {
  product: ProductSummary;
  /** Renders the View Details / Add to Bag pair beneath the card. */
  showActions?: boolean;
  /** `wide` uses a taller frame for editorial rows. */
  priority?: boolean;
  sizes?: string;
};

export function ProductCard({
  product,
  showActions = false,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { isWishlisted, toggleWishlist, addToCart, isInCart, toggleCompare, isComparing } =
    useShop();
  const { openQuickView } = useUI();

  const href = `/products/${product.slug}`;
  const primary = product.images[0];
  const secondary = product.images[1];
  const sold = product.availability === "Sold";
  const wishlisted = isWishlisted(product.id);
  const comparing = isComparing(product.id);
  const inCart = isInCart(product.id);

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <Link
          href={href}
          className="relative block aspect-4/5 overflow-hidden bg-warm"
          aria-label={`${product.brand} ${product.name}`}
        >
          {primary ? (
            <Image
              src={primary.url}
              alt={primary.alt}
              fill
              sizes={sizes}
              priority={priority}
              className={`object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hovered && secondary ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />
          ) : null}

          {/* Second frame revealed on hover */}
          {secondary ? (
            <Image
              src={secondary.url}
              alt=""
              fill
              sizes={sizes}
              aria-hidden
              className={`object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          ) : null}

          {sold ? <div className="absolute inset-0 bg-ivory/45" /> : null}
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {sold ? <Badge tone="sold">Sold</Badge> : null}
          {product.rareFind && !sold ? <Badge tone="rare">Rare</Badge> : null}
          {product.newArrival && !product.rareFind && !sold ? <Badge>New</Badge> : null}
          {product.availability === "Reserved" ? <Badge tone="dark">Reserved</Badge> : null}
        </div>

        {/* Wishlist + compare */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="flex size-8 items-center justify-center bg-ivory/90 text-ink transition-colors hover:bg-ivory"
          >
            <Heart
              className={`size-[0.9rem] ${wishlisted ? "fill-ink" : ""}`}
              aria-hidden
            />
          </button>

          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-label={comparing ? "Remove from comparison" : "Add to comparison"}
            aria-pressed={comparing}
            className={`flex size-8 items-center justify-center transition-all duration-500 hover:bg-ivory ${
              comparing
                ? "bg-ink text-ivory opacity-100"
                : "bg-ivory/90 text-ink opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            }`}
          >
            <Scale className="size-[0.9rem]" aria-hidden />
          </button>
        </div>

        {/* Quick view — desktop hover affordance only */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 lg:block">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="w-full bg-ivory/95 py-3 font-sans text-[0.625rem] tracking-luxe text-ink uppercase transition-colors hover:bg-ink hover:text-ivory"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Information */}
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-serif text-[1.0625rem] leading-snug text-ink">
          <Link href={href} className="link-underline">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1 font-sans text-[0.75rem] text-stone">
          {product.shortDescription}
        </p>

        <p className="mt-1 font-sans text-[0.6875rem] text-taupe">
          {product.condition}
        </p>

        <div className="mt-2.5 flex items-baseline gap-2">
          <p className="font-sans text-[0.875rem] text-ink">
            {formatPrice(product.price, product.currency)}
          </p>
          {product.compareAtPrice ? (
            <p className="font-sans text-[0.75rem] text-taupe line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </p>
          ) : null}
        </div>

        {showActions ? (
          <div className="mt-4 flex gap-2">
            <Link
              href={href}
              className="flex h-10 flex-1 items-center justify-center border border-line-strong font-sans text-[0.625rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product.id)}
              disabled={sold}
              aria-label={`Add ${product.brand} ${product.name} to bag`}
              className="flex h-10 w-11 shrink-0 items-center justify-center border border-ink bg-ink text-ivory transition-colors duration-500 hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:border-line-strong disabled:bg-transparent disabled:text-taupe"
            >
              {inCart ? (
                <Check className="size-[0.9rem]" aria-hidden />
              ) : (
                <ShoppingBag className="size-[0.9rem]" aria-hidden />
              )}
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
