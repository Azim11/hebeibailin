"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { formatPrice } from "@/lib/format";
import { useCatalogue } from "@/store/catalogue";
import { useShop } from "@/store/shop";
import type { ProductSummary } from "@/lib/types";

export default function CartPage() {
  const { cart, setCartQuantity, removeFromCart, addToCart, hydrated } = useShop();
  const { byId, products } = useCatalogue();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent?: number;
    discountAmount?: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");

  const lines = cart
    .map((line) => ({ product: byId(line.productId), quantity: line.quantity }))
    .filter((entry): entry is { product: ProductSummary; quantity: number } =>
      Boolean(entry.product),
    );

  const subtotal = lines.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  const discountValue = appliedPromo
    ? appliedPromo.discountPercent
      ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
      : appliedPromo.discountAmount ?? 0
    : 0;

  const total = Math.max(0, subtotal - discountValue);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "WELCOME10" || code === "LUXE10") {
      setAppliedPromo({ code, discountPercent: 10 });
      setPromoCode("");
    } else if (code === "BAILIN1000" || code === "VIP1000") {
      setAppliedPromo({ code, discountAmount: 1000 });
      setPromoCode("");
    } else {
      setPromoError("Invalid promotional code. Try 'WELCOME10' for 10% off.");
    }
  };

  const handleAddSample = () => {
    const sample = products[0] || { id: "prd-001" };
    addToCart(sample.id, 1);
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-6 animate-spin border-2 border-champagne border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="bg-ivory py-12 lg:py-20">
      <Container size="wide">
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-line pb-8">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Curated Acquisition
          </p>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="font-serif text-[2.25rem] text-ink sm:text-[3rem]">
              Shopping Bag
            </h1>
            <span className="font-sans text-[0.75rem] tracking-luxe text-taupe uppercase">
              {lines.length} {lines.length === 1 ? "Piece" : "Pieces"} Selected
            </span>
          </div>
        </div>

        {lines.length === 0 ? (
          /* Empty Bag State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex size-16 items-center justify-center border border-line bg-warm text-taupe">
              <ShoppingBag className="size-8" />
            </div>
            <h2 className="mt-6 font-serif text-2xl text-ink sm:text-3xl">
              Your shopping bag is currently empty
            </h2>
            <p className="mt-3 max-w-md font-sans text-[0.875rem] leading-relaxed text-stone">
              Explore our curated vault of authenticated luxury handbags, rare collector
              configurations, and iconic silhouettes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/collections/handbags"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory transition-colors hover:bg-charcoal"
              >
                Explore Collection
                <ArrowRight className="size-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleAddSample}
                className="inline-flex items-center gap-2 border border-line bg-warm/60 px-6 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink transition-colors hover:border-taupe hover:bg-warm"
              >
                + Add Sample Bag to Test
              </button>
            </div>
          </div>
        ) : (
          /* Populated Bag Grid */
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
            {/* Bag Lines */}
            <div className="flex flex-col divide-y divide-line border-y border-line">
              {lines.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="grid gap-6 py-8 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-4/5 w-full overflow-hidden bg-warm group"
                  >
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        sizes="140px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                  </Link>

                  {/* Details */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                            {product.brand}
                          </p>
                          <Link
                            href={`/products/${product.slug}`}
                            className="mt-1 block font-serif text-xl text-ink transition-colors hover:text-champagne"
                          >
                            {product.name}
                          </Link>
                        </div>
                        <p className="font-serif text-xl text-ink whitespace-nowrap">
                          {formatPrice(product.price * quantity, product.currency)}
                        </p>
                      </div>

                      <p className="mt-1 font-sans text-[0.8125rem] text-stone">
                        {product.shortDescription}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 font-sans text-[0.6875rem] text-taupe uppercase">
                        <span>Condition: {product.condition}</span>
                        <span>·</span>
                        <span>SKU: {product.sku}</span>
                      </div>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                      <div className="flex items-center border border-line bg-warm/40">
                        <button
                          type="button"
                          onClick={() => setCartQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex size-9 items-center justify-center text-stone hover:text-ink transition-colors"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center font-sans text-xs text-ink font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCartQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex size-9 items-center justify-center text-stone hover:text-ink transition-colors"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="flex items-center gap-1.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-taupe hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="flex flex-col gap-8">
              <div className="border border-line bg-warm/60 p-8">
                <h3 className="font-serif text-xl text-ink">Acquisition Summary</h3>

                {/* Subtotal / Shipping / Discounts */}
                <div className="mt-6 flex flex-col gap-4 border-b border-line pb-6 font-sans text-[0.875rem]">
                  <div className="flex justify-between text-stone">
                    <span>Subtotal</span>
                    <span className="text-ink font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-stone">
                    <span className="flex items-center gap-1.5">
                      <Truck className="size-4 text-champagne" />
                      Insured Express Shipping
                    </span>
                    <span className="text-champagne uppercase text-[0.75rem] tracking-luxe font-medium">
                      Complimentary
                    </span>
                  </div>

                  {appliedPromo ? (
                    <div className="flex justify-between text-stone">
                      <span className="flex items-center gap-1.5 text-champagne">
                        <Tag className="size-4" />
                        Promo ({appliedPromo.code})
                      </span>
                      <span className="text-champagne font-medium">
                        -{formatPrice(discountValue)}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between text-stone">
                    <span>Estimated Taxes &amp; Duties</span>
                    <span className="text-taupe text-[0.75rem] uppercase tracking-luxe">
                      Calculated next
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-6 flex items-baseline justify-between">
                  <span className="font-serif text-lg text-ink">Total</span>
                  <span className="font-serif text-2xl text-ink font-normal">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Promo code form */}
                <form onSubmit={handleApplyPromo} className="mt-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promotional code (e.g. WELCOME10)"
                      className="w-full border border-line bg-ivory px-3.5 py-2.5 font-sans text-[0.8125rem] uppercase text-ink placeholder:normal-case placeholder:text-taupe focus:border-champagne focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="border border-ink bg-warm px-4 py-2.5 font-sans text-[0.6875rem] tracking-luxe uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError ? (
                    <p className="mt-2 font-sans text-xs text-red-600">{promoError}</p>
                  ) : null}
                  {appliedPromo ? (
                    <p className="mt-2 flex items-center gap-1.5 font-sans text-xs text-emerald-700">
                      <Check className="size-3.5" />
                      Promo code applied successfully!
                    </p>
                  ) : null}
                </form>

                {/* Checkout CTA */}
                <div className="mt-8">
                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center gap-2 border border-ink bg-ink py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory transition-colors hover:bg-charcoal"
                  >
                    <Lock className="size-3.5 text-champagne" />
                    Proceed to Secure Checkout
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="border border-line bg-bone/30 p-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <p className="font-sans text-[0.8125rem] text-stone">
                    <strong className="font-serif font-normal text-ink block">
                      Lifetime Authenticity Guarantee
                    </strong>
                    Every piece is physically verified by certified luxury specialists.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <p className="font-sans text-[0.8125rem] text-stone">
                    <strong className="font-serif font-normal text-ink block">
                      14-Day Evaluation &amp; Return Window
                    </strong>
                    Complimentary insured returns with intact security ribbon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
