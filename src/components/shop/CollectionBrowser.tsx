"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { Brand, Category, ProductSummary, SortKey } from "@/lib/types";
import {
  colorFamilies,
  conditions,
  hardwareOptions,
  materials,
} from "@/lib/data/taxonomy";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterGroup } from "./FilterGroup";
import { PriceSlider } from "./PriceSlider";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

/** Facet keys that live in the query string as comma-separated lists. */
const LIST_FACETS = [
  "brand",
  "category",
  "condition",
  "color",
  "material",
  "hardware",
] as const;

type ListFacet = (typeof LIST_FACETS)[number];

type Selection = Record<ListFacet, string[]>;

const EMPTY_SELECTION: Selection = {
  brand: [],
  category: [],
  condition: [],
  color: [],
  material: [],
  hardware: [],
};

type CollectionBrowserProps = {
  products: ProductSummary[];
  brands: Brand[];
  categories: Category[];
  priceBounds: { min: number; max: number };
  /** Facets already implied by the page (e.g. a brand page) and so hidden. */
  lockedFacets?: ListFacet[];
};

export function CollectionBrowser({
  products,
  brands,
  categories,
  priceBounds,
  lockedFacets = [],
}: CollectionBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Filter state is derived from the URL, so selections survive a refresh and
  // can be linked to directly from the mega menu.
  const selection = useMemo<Selection>(() => {
    const next = { ...EMPTY_SELECTION };
    for (const facet of LIST_FACETS) {
      const raw = searchParams.get(facet);
      next[facet] = raw ? raw.split(",").filter(Boolean) : [];
    }
    return next;
  }, [searchParams]);

  const sort = (searchParams.get("sort") as SortKey) ?? "featured";

  const priceRange = useMemo<[number, number]>(() => {
    const min = Number(searchParams.get("minPrice"));
    const max = Number(searchParams.get("maxPrice"));
    return [
      Number.isFinite(min) && min > 0 ? min : priceBounds.min,
      Number.isFinite(max) && max > 0 ? max : priceBounds.max,
    ];
  }, [searchParams, priceBounds]);

  const priceTouched =
    priceRange[0] !== priceBounds.min || priceRange[1] !== priceBounds.max;

  /** Write params without adding history entries or jumping the scroll position. */
  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      const query = params.toString();
      router.replace(query ? `?${query}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  const toggleFacet = useCallback(
    (facet: ListFacet, value: string) => {
      updateParams((params) => {
        const current = params.get(facet)?.split(",").filter(Boolean) ?? [];
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        if (next.length) params.set(facet, next.join(","));
        else params.delete(facet);
      });
    },
    [updateParams],
  );

  const setPrice = useCallback(
    ([min, max]: [number, number]) => {
      updateParams((params) => {
        if (min > priceBounds.min) params.set("minPrice", String(min));
        else params.delete("minPrice");
        if (max < priceBounds.max) params.set("maxPrice", String(max));
        else params.delete("maxPrice");
      });
    },
    [updateParams, priceBounds],
  );

  const setSort = useCallback(
    (key: SortKey) => {
      updateParams((params) => {
        if (key === "featured") params.delete("sort");
        else params.set("sort", key);
      });
      setSortOpen(false);
    },
    [updateParams],
  );

  const clearAll = useCallback(() => {
    router.replace("?", { scroll: false });
  }, [router]);

  // Apply filters, then sort.
  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      if (selection.brand.length && !selection.brand.includes(product.brandSlug))
        return false;
      if (
        selection.category.length &&
        !selection.category.includes(product.categorySlug)
      )
        return false;
      if (selection.condition.length && !selection.condition.includes(product.condition))
        return false;
      if (selection.color.length && !selection.color.includes(product.colorFamily))
        return false;
      if (selection.material.length && !selection.material.includes(product.material))
        return false;
      if (selection.hardware.length && !selection.hardware.includes(product.hardware))
        return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
        );
      default:
        return sorted.sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });
    }
  }, [products, selection, priceRange, sort]);

  /** Count how many products in the unfiltered set carry each facet value. */
  const counts = useMemo(() => {
    const tally = (key: (p: ProductSummary) => string) => {
      const map = new Map<string, number>();
      for (const product of products) {
        const value = key(product);
        map.set(value, (map.get(value) ?? 0) + 1);
      }
      return map;
    };
    return {
      brand: tally((p) => p.brandSlug),
      category: tally((p) => p.categorySlug),
      condition: tally((p) => p.condition),
      color: tally((p) => p.colorFamily),
      material: tally((p) => p.material),
      hardware: tally((p) => p.hardware),
    };
  }, [products]);

  const activeCount =
    LIST_FACETS.reduce((sum, facet) => sum + selection[facet].length, 0) +
    (priceTouched ? 1 : 0);

  const show = (facet: ListFacet) => !lockedFacets.includes(facet);

  const filterPanel = (
    <>
      {show("brand") ? (
        <FilterGroup
          title="Brand"
          selected={selection.brand}
          onToggle={(value) => toggleFacet("brand", value)}
          options={brands
            .filter((b) => counts.brand.has(b.slug))
            .map((b) => ({
              value: b.slug,
              label: b.name,
              count: counts.brand.get(b.slug),
            }))}
        />
      ) : null}

      {show("category") ? (
        <FilterGroup
          title="Category"
          selected={selection.category}
          onToggle={(value) => toggleFacet("category", value)}
          options={categories
            .filter((c) => counts.category.has(c.slug))
            .map((c) => ({
              value: c.slug,
              label: c.name,
              count: counts.category.get(c.slug),
            }))}
        />
      ) : null}

      {show("condition") ? (
        <FilterGroup
          title="Condition"
          selected={selection.condition}
          onToggle={(value) => toggleFacet("condition", value)}
          options={conditions
            .filter((c) => counts.condition.has(c))
            .map((c) => ({ value: c, label: c, count: counts.condition.get(c) }))}
        />
      ) : null}

      {show("color") ? (
        <FilterGroup
          title="Colour"
          defaultOpen={false}
          selected={selection.color}
          onToggle={(value) => toggleFacet("color", value)}
          options={colorFamilies
            .filter((c) => counts.color.has(c))
            .map((c) => ({ value: c, label: c, count: counts.color.get(c) }))}
        />
      ) : null}

      {show("material") ? (
        <FilterGroup
          title="Material"
          defaultOpen={false}
          selected={selection.material}
          onToggle={(value) => toggleFacet("material", value)}
          options={materials
            .filter((m) => counts.material.has(m))
            .map((m) => ({ value: m, label: m, count: counts.material.get(m) }))}
        />
      ) : null}

      {show("hardware") ? (
        <FilterGroup
          title="Hardware"
          defaultOpen={false}
          selected={selection.hardware}
          onToggle={(value) => toggleFacet("hardware", value)}
          options={hardwareOptions
            .filter((h) => counts.hardware.has(h))
            .map((h) => ({ value: h, label: h, count: counts.hardware.get(h) }))}
        />
      ) : null}

      <FilterGroup title="Price">
        <PriceSlider
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange}
          onChange={setPrice}
        />
      </FilterGroup>
    </>
  );

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <h2 className="font-sans text-[0.625rem] tracking-luxe text-ink uppercase">
              Filter
            </h2>
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="font-sans text-[0.625rem] text-taupe uppercase transition-colors hover:text-ink"
              >
                Clear
              </button>
            ) : null}
          </div>
          {filterPanel}
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 font-sans text-[0.625rem] tracking-luxe text-ink uppercase lg:hidden"
          >
            <SlidersHorizontal className="size-3.5" aria-hidden />
            Filter
            {activeCount > 0 ? (
              <span className="text-champagne">({activeCount})</span>
            ) : null}
          </button>

          <p className="hidden font-sans text-[0.6875rem] text-taupe lg:block">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"}
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              aria-expanded={sortOpen}
              className="flex items-center gap-2 font-sans text-[0.625rem] tracking-luxe text-ink uppercase"
            >
              Sort: {SORTS.find((s) => s.key === sort)?.label ?? "Featured"}
              <ChevronDown
                className={`size-3.5 text-taupe transition-transform duration-300 ${
                  sortOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            <AnimatePresence>
              {sortOpen ? (
                <>
                  {/* Click-away layer */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full z-20 mt-3 w-52 border border-line bg-ivory py-2"
                  >
                    {SORTS.map((option) => (
                      <li key={option.key}>
                        <button
                          type="button"
                          onClick={() => setSort(option.key)}
                          className={`block w-full px-5 py-2.5 text-left font-sans text-[0.75rem] transition-colors hover:bg-warm ${
                            option.key === sort ? "text-ink" : "text-stone"
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Active filter chips */}
        {activeCount > 0 ? (
          <div className="flex flex-wrap items-center gap-2 pt-5">
            {LIST_FACETS.flatMap((facet) =>
              selection[facet].map((value) => {
                const label =
                  facet === "brand"
                    ? (brands.find((b) => b.slug === value)?.name ?? value)
                    : facet === "category"
                      ? (categories.find((c) => c.slug === value)?.name ?? value)
                      : value;
                return (
                  <button
                    key={`${facet}-${value}`}
                    type="button"
                    onClick={() => toggleFacet(facet, value)}
                    className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-sans text-[0.6875rem] text-charcoal transition-colors hover:border-ink"
                  >
                    {label}
                    <X className="size-3 text-taupe" aria-hidden />
                  </button>
                );
              }),
            )}

            {priceTouched ? (
              <button
                type="button"
                onClick={() => setPrice([priceBounds.min, priceBounds.max])}
                className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-sans text-[0.6875rem] text-charcoal transition-colors hover:border-ink"
              >
                Price
                <X className="size-3 text-taupe" aria-hidden />
              </button>
            ) : null}

            <button
              type="button"
              onClick={clearAll}
              className="ml-1 font-sans text-[0.6875rem] text-taupe underline underline-offset-4 transition-colors hover:text-ink"
            >
              Clear all
            </button>
          </div>
        ) : null}

        {/* Grid */}
        <div className="mt-10 lg:mt-12">
          {visible.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {visible.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 3}
                  sizes="(min-width: 1024px) 28vw, 50vw"
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl text-ink">Nothing matches yet</p>
              <p className="mx-auto mt-3 max-w-sm font-sans text-[0.875rem] text-stone">
                Try removing a filter, or let our sourcing team look for the piece on
                your behalf.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-8 border border-line-strong px-8 py-3.5 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/25 lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[86svh] flex-col bg-ivory lg:hidden"
            >
              <header className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
                <h2 className="font-sans text-[0.6875rem] tracking-luxe text-ink uppercase">
                  Filter
                </h2>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="-mr-2 p-2 text-ink"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5">
                {filterPanel}
              </div>

              <footer className="flex shrink-0 gap-3 border-t border-line px-5 py-4">
                <button
                  type="button"
                  onClick={clearAll}
                  className="h-12 flex-1 border border-line-strong font-sans text-[0.6875rem] tracking-luxe text-ink uppercase"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="h-12 flex-[2] border border-ink bg-ink font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase"
                >
                  Show {visible.length} {visible.length === 1 ? "Piece" : "Pieces"}
                </button>
              </footer>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
