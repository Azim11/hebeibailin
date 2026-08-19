"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/data/site";
import { useCatalogue } from "@/store/catalogue";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

function Line({
  product,
  quantity,
}: {
  product: ProductSummary;
  quantity: number;
}) {
  const { setCartQuantity, removeFromCart } = useShop();
  const { closeCart } = useUI();

  return (
    <li className="flex gap-4 py-6">
      <Link
        href={`/products/${product.slug}`}
        onClick={closeCart}
        className="relative aspect-4/5 w-24 shrink-0 overflow-hidden bg-warm"
      >
        {product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
          {product.brand}
        </p>
        <Link
          href={`/products/${product.slug}`}
          onClick={closeCart}
          className="mt-1 font-serif text-base leading-snug text-ink"
        >
          {product.name}
        </Link>
        <p className="mt-0.5 font-sans text-[0.6875rem] text-stone">
          {product.shortDescription}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex items-center border border-line">
            <button
              type="button"
              onClick={() => setCartQuantity(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex size-8 items-center justify-center text-stone transition-colors hover:text-ink"
            >
              <Minus className="size-3" aria-hidden />
            </button>
            <span className="min-w-6 text-center font-sans text-xs text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setCartQuantity(product.id, quantity + 1)}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex size-8 items-center justify-center text-stone transition-colors hover:text-ink"
            >
              <Plus className="size-3" aria-hidden />
            </button>
          </div>

          <p className="font-sans text-[0.8125rem] text-ink">
            {formatPrice(product.price * quantity, product.currency)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeFromCart(product.id)}
        aria-label={`Remove ${product.name} from bag`}
        className="-mt-1 h-fit p-1 text-taupe transition-colors hover:text-ink"
      >
        <X className="size-3.5" aria-hidden />
      </button>
    </li>
  );
}

export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { cart, hydrated } = useShop();
  const { byId } = useCatalogue();

  const lines = cart
    .map((line) => ({ product: byId(line.productId), quantity: line.quantity }))
    .filter((entry): entry is { product: ProductSummary; quantity: number } =>
      Boolean(entry.product),
    );

  const subtotal = lines.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );

  // Above the concierge threshold we route the client to a specialist rather
  // than pushing a very large amount through the standard checkout.
  const conciergeOnly = subtotal >= site.conciergeThreshold;

  return (
    <AnimatePresence>
      {cartOpen ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-ink/25"
          />

          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-md flex-col bg-ivory"
          >
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
              <h2 className="font-sans text-[0.6875rem] tracking-luxe text-ink uppercase">
                Shopping Bag
                {hydrated && lines.length > 0 ? ` (${lines.length})` : ""}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="-mr-2 p-2 text-ink transition-colors hover:text-champagne"
              >
                <X className="size-5" aria-hidden />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <ShoppingBag className="size-7 text-taupe" aria-hidden />
                <p className="font-serif text-2xl text-ink">Your bag is empty</p>
                <p className="max-w-xs font-sans text-[0.8125rem] leading-relaxed text-stone">
                  Pieces you add will appear here. Our collection changes weekly.
                </p>
                <Link
                  href="/collections/handbags"
                  onClick={closeCart}
                  className="mt-2 border border-ink bg-ink px-8 py-3.5 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink"
                >
                  Explore Handbags
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto overscroll-contain px-6">
                  <ul className="divide-y divide-line">
                    {lines.map(({ product, quantity }) => (
                      <Line key={product.id} product={product} quantity={quantity} />
                    ))}
                  </ul>
                </div>

                <footer className="shrink-0 border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[0.6875rem] tracking-luxe text-stone uppercase">
                      Subtotal
                    </span>
                    <span className="font-sans text-lg text-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mt-2 font-sans text-[0.6875rem] text-taupe">
                    Shipping and duties calculated at checkout.
                  </p>

                  {conciergeOnly ? (
                    <p className="mt-4 border border-line bg-warm px-4 py-3 font-sans text-[0.6875rem] leading-relaxed text-stone">
                      For orders of this value, a specialist will confirm the pieces
                      and arrange payment and delivery with you directly.
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-col gap-2.5">
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex h-12 items-center justify-center border border-ink bg-ink font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink"
                    >
                      {conciergeOnly ? "Request to Purchase" : "Checkout"}
                    </Link>
                    <Link
                      href="/cart"
                      onClick={closeCart}
                      className="flex h-12 items-center justify-center border border-line-strong font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
                    >
                      View Bag
                    </Link>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
