"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Heart,
  HelpCircle,
  Lock,
  MessageCircle,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { isWishlisted, toggleWishlist, addToCart, isInCart, toggleCompare, isComparing } =
    useShop();
  const { openCart } = useUI();
  const [added, setAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const comparing = isComparing(product.id);
  const inCart = isInCart(product.id);
  const isAvailable = product.availability === "In Stock";

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(product.id);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col">
      {/* Catalogue reference */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-[0.6875rem] tracking-luxe-wide text-champagne uppercase">
          {product.category}
        </span>
        <span className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
          SKU: {product.sku}
        </span>
      </div>

      {/* Product Title */}
      <h1 className="mt-3 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3rem]">
        {product.name}
      </h1>

      {/* Short Description */}
      <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-stone">
        {product.shortDescription}
      </p>

      {/* Price & Availability Row */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4 border-y border-line py-5">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-[2rem] text-ink">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.compareAtPrice ? (
            <span className="font-sans text-sm text-taupe line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-block size-2 rounded-full ${
              isAvailable ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          <span className="font-sans text-[0.6875rem] tracking-luxe text-charcoal uppercase">
            {product.availability}
          </span>
        </div>
      </div>

      {/* Condition & Attributes Pill Grid */}
      <dl className="mt-6 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div className="bg-warm/80 p-3">
          <dt className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
            Condition
          </dt>
          <dd className="mt-1 font-sans text-[0.8125rem] font-medium text-ink">
            {product.condition}
          </dd>
        </div>
        <div className="bg-warm/80 p-3">
          <dt className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
            Color
          </dt>
          <dd className="mt-1 font-sans text-[0.8125rem] font-medium text-ink">
            {product.color}
          </dd>
        </div>
        <div className="bg-warm/80 p-3">
          <dt className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
            Material
          </dt>
          <dd className="mt-1 font-sans text-[0.8125rem] font-medium text-ink">
            {product.material}
          </dd>
        </div>
        <div className="bg-warm/80 p-3">
          <dt className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
            Hardware
          </dt>
          <dd className="mt-1 font-sans text-[0.8125rem] font-medium text-ink">
            {product.hardware}
          </dd>
        </div>
      </dl>

      {/* What's Included */}
      {product.includedItems.length > 0 ? (
        <div className="mt-6">
          <p className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
            Includes
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.includedItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 bg-bone px-3 py-1 font-sans text-[0.6875rem] text-charcoal"
              >
                <Check className="size-3 text-champagne" />
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          onClick={handleAddToCart}
          disabled={!isAvailable}
          className="flex h-14 flex-1 items-center justify-center gap-3 border border-ink bg-ink px-8 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink disabled:opacity-50"
        >
          <ShoppingBag className="size-4" />
          {added
            ? "Added to Bag"
            : inCart
            ? "In Your Bag"
            : isAvailable
            ? "Add to Bag"
            : product.availability}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`flex size-14 items-center justify-center border border-line-strong transition-colors ${
              wishlisted ? "border-ink bg-ink text-ivory" : "hover:border-ink hover:text-ink text-charcoal"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`size-5 ${wishlisted ? "fill-current text-rose-400" : ""}`} />
          </button>

          <button
            onClick={() => toggleCompare(product.id)}
            className={`flex size-14 items-center justify-center border border-line-strong transition-colors ${
              comparing ? "border-ink bg-ink text-ivory" : "hover:border-ink hover:text-ink text-charcoal"
            }`}
            aria-label={comparing ? "Remove from compare" : "Add to compare"}
          >
            <Scale className="size-5" />
          </button>
        </div>
      </div>

      {/* Private Concierge Inquiry Box */}
      <div className="mt-6 border border-champagne/40 bg-warm/60 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-sans text-[0.625rem] tracking-luxe text-champagne uppercase">
              Concierge Service
            </p>
            <h3 className="mt-1 font-serif text-lg text-ink">Private Client Advisory</h3>
            <p className="mt-1 font-sans text-xs text-stone">
              Prefer a private salon viewing or video consultation with a specialist?
            </p>
          </div>
          <Sparkles className="size-5 shrink-0 text-champagne" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-ink px-4 py-2 font-sans text-[0.625rem] tracking-luxe text-ink uppercase transition-colors hover:bg-ink hover:text-ivory"
          >
            <MessageCircle className="size-3.5 text-emerald-600" />
            WhatsApp Specialist
          </a>
          <Link
            href="/pages/contact"
            className="inline-flex items-center gap-2 border border-line-strong px-4 py-2 font-sans text-[0.625rem] tracking-luxe text-charcoal uppercase transition-colors hover:border-ink hover:text-ink"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 text-xs text-stone sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-5 shrink-0 text-champagne" />
          <div>
            <p className="font-sans text-[0.6875rem] font-medium text-ink uppercase tracking-luxe">
              100% Authenticity Guaranteed
            </p>
            <p className="text-[0.75rem] text-taupe">Double-certified by internal specialists.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="size-5 shrink-0 text-champagne" />
          <div>
            <p className="font-sans text-[0.6875rem] font-medium text-ink uppercase tracking-luxe">
              Insured Express Delivery
            </p>
            <p className="text-[0.75rem] text-taupe">White-glove courier with signature required.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
