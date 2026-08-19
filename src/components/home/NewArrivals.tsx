"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProductSummary } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TABS = [
  { key: "all", label: "All" },
  { key: "hermes", label: "Hermès" },
  { key: "chanel", label: "Chanel" },
  { key: "louis-vuitton", label: "Louis Vuitton" },
  { key: "other", label: "Other Brands" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const NAMED_BRANDS = new Set(["hermes", "chanel", "louis-vuitton"]);

export function NewArrivals({ products }: { products: ProductSummary[] }) {
  const [tab, setTab] = useState<TabKey>("all");

  const filtered = useMemo(() => {
    if (tab === "all") return products;
    // "Other Brands" collects everything outside the three named houses.
    if (tab === "other") return products.filter((p) => !NAMED_BRANDS.has(p.brandSlug));
    return products.filter((p) => p.brandSlug === tab);
  }, [products, tab]);

  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Just In"
          title="New Arrivals"
          description="The most recent pieces to complete authentication and enter the collection."
        />

        {/* Brand tabs */}
        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Filter new arrivals by brand"
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-b border-line px-2"
          >
            {TABS.map((item) => {
              const active = tab === item.key;
              return (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.key)}
                  className={`relative -mb-px pb-3 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors duration-400 ${
                    active ? "text-ink" : "text-taupe hover:text-charcoal"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="new-arrivals-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-ink"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                  {filtered.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} showActions />
                  ))}
                </div>
              ) : (
                <p className="py-16 text-center font-sans text-sm text-stone">
                  Nothing has arrived from this house recently. Our sourcing team can
                  look on your behalf.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/collections/new-arrivals"
            className="flex h-12 items-center border border-line-strong px-10 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory"
          >
            View All New Arrivals
          </Link>
        </div>
      </Container>
    </section>
  );
}
