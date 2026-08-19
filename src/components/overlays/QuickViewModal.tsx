"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

/** Compact product preview so a visitor can add to bag without leaving the grid. */
export function QuickViewModal() {
  const { quickViewProduct: product, closeQuickView } = useUI();
  const { addToCart, isInCart, isWishlisted, toggleWishlist } = useShop();
  const [activeImage, setActiveImage] = useState(0);

  const sold = product?.availability === "Sold";

  return (
    <AnimatePresence onExitComplete={() => setActiveImage(0)}>
      {product ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeQuickView}
            className="fixed inset-0 z-[70] bg-ink/35"
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${product.brand} ${product.name} quick view`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[71] w-[min(64rem,calc(100vw-2rem))] max-h-[calc(100vh-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-ivory"
          >
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-10 p-2 text-ink transition-colors hover:text-champagne"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-4/5 bg-warm">
                {product.images[activeImage] ? (
                  <Image
                    src={product.images[activeImage].url}
                    alt={product.images[activeImage].alt}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover"
                  />
                ) : null}

                {product.images.length > 1 ? (
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={image.url}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-current={index === activeImage}
                        className={`h-1 w-7 transition-colors duration-400 ${
                          index === activeImage ? "bg-ink" : "bg-ink/25"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col justify-center px-7 py-10 sm:px-10">
                <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                  {product.brand}
                </p>
                <h2 className="mt-3 font-serif text-[1.75rem] leading-tight text-ink sm:text-[2.25rem]">
                  {product.name}
                </h2>
                <p className="mt-2 font-sans text-[0.8125rem] text-stone">
                  {product.shortDescription}
                </p>

                <p className="mt-6 font-sans text-xl text-ink">
                  {formatPrice(product.price, product.currency)}
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 font-sans text-[0.75rem]">
                  <div>
                    <dt className="text-taupe">Condition</dt>
                    <dd className="mt-0.5 text-ink">{product.condition}</dd>
                  </div>
                  <div>
                    <dt className="text-taupe">Availability</dt>
                    <dd className="mt-0.5 text-ink">{product.availability}</dd>
                  </div>
                  <div>
                    <dt className="text-taupe">Size</dt>
                    <dd className="mt-0.5 text-ink">{product.size}</dd>
                  </div>
                  <div>
                    <dt className="text-taupe">Hardware</dt>
                    <dd className="mt-0.5 text-ink">{product.hardware}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    disabled={sold}
                    className="flex h-12 items-center justify-center border border-ink bg-ink font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:border-line-strong disabled:bg-transparent disabled:text-taupe"
                  >
                    {sold ? "Sold" : isInCart(product.id) ? "In Your Bag" : "Add to Bag"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="flex h-12 items-center justify-center gap-2 border border-line-strong font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
                  >
                    <Heart
                      className={`size-3.5 ${isWishlisted(product.id) ? "fill-ink" : ""}`}
                      aria-hidden
                    />
                    {isWishlisted(product.id) ? "Saved" : "Add to Wishlist"}
                  </button>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeQuickView}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-[0.6875rem] tracking-luxe text-stone uppercase transition-colors hover:text-ink"
                >
                  View full details
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
