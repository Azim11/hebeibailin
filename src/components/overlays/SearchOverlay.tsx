"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProductSummary } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useUI } from "@/store/ui";
import { useCatalogue } from "@/store/catalogue";

const POPULAR = ["Top Handle", "Shoulder Bag", "Tote", "Crossbody", "New Arrivals"];

/** Rank matches so brand and name hits sort above material or tag hits. */
function rank(list: ProductSummary[], query: string, limit = 6): ProductSummary[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return list
    .map((p) => {
      const name = `${p.brand} ${p.name}`.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score += 100;
      if (name.includes(q)) score += 50;
      if (p.brand.toLowerCase().includes(q)) score += 30;
      if (p.category.toLowerCase().includes(q)) score += 20;
      if (p.tags.some((t) => t.includes(q))) score += 15;
      if (p.material.toLowerCase().includes(q)) score += 10;
      if (p.color.toLowerCase().includes(q)) score += 10;
      return { p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.p);
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const { products: index } = useCatalogue();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      // Focus after the panel has begun animating in.
      const id = window.setTimeout(() => inputRef.current?.focus(), 260);
      return () => window.clearTimeout(id);
    }
  }, [searchOpen]);

  const results = useMemo(() => rank(index, query), [index, query]);
  const trimmed = query.trim();

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          key="search"
          role="dialog"
          aria-modal="true"
          aria-label="Search our collection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ivory"
        >
          <div className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8 lg:pt-14">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="-mr-2 p-2 text-ink transition-colors hover:text-champagne"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-center font-serif text-[2rem] leading-tight text-ink sm:text-[2.75rem]">
                Search Our Collection
              </h2>

              <form
                role="search"
                onSubmit={(event) => event.preventDefault()}
                className="mx-auto mt-10 flex max-w-2xl items-center gap-3 border-b border-line-strong pb-3 focus-within:border-ink"
              >
                <Search className="size-4 shrink-0 text-taupe" aria-hidden />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search handbags, colors, styles..."
                  aria-label="Search handbags, colors, styles"
                  className="w-full bg-transparent py-1 font-sans text-base text-ink placeholder:text-taupe focus:outline-none sm:text-lg"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="p-1 text-taupe hover:text-ink"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                ) : null}
              </form>
            </motion.div>

            {/* Popular searches, shown until the visitor types */}
            {!trimmed ? (
              <div className="mx-auto mt-12 max-w-2xl">
                <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                  Popular Searches
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="border border-line px-4 py-2 font-sans text-[0.75rem] text-charcoal transition-colors duration-500 hover:border-ink hover:text-ink"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Live results */}
            {trimmed ? (
              <div className="mx-auto mt-12 max-w-2xl">
                {results.length > 0 ? (
                  <>
                    <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                      {results.length} {results.length === 1 ? "Result" : "Results"}
                    </p>

                    <ul className="mt-5 divide-y divide-line border-y border-line">
                      {results.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={closeSearch}
                            className="group flex items-center gap-5 py-4"
                          >
                            <div className="relative size-20 shrink-0 overflow-hidden bg-warm">
                              {product.images[0] ? (
                                <Image
                                  src={product.images[0].url}
                                  alt=""
                                  fill
                                  sizes="80px"
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              ) : null}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="font-sans text-[0.5625rem] tracking-luxe text-taupe uppercase">
                                {product.brand}
                              </p>
                              <p className="mt-1 truncate font-serif text-lg text-ink">
                                {product.name}
                              </p>
                              <p className="mt-0.5 truncate font-sans text-xs text-stone">
                                {product.shortDescription}
                              </p>
                            </div>

                            <p className="shrink-0 font-sans text-[0.8125rem] text-ink">
                              {formatPrice(product.price, product.currency)}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>

                  </>
                ) : (
                  <div className="py-12 text-center">
                    <p className="font-sans text-sm text-stone">
                      No pieces match &ldquo;{trimmed}&rdquo;.
                    </p>
                    <p className="mt-3 font-sans text-[0.8125rem] text-taupe">
                      Our sourcing team can look for it on your behalf.
                    </p>
                    <Link
                      href="/pages/contact"
                      onClick={closeSearch}
                      className="mt-6 inline-flex items-center gap-2 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase"
                    >
                      Contact us
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
