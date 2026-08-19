"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { ProductSummary } from "@/lib/types";

/**
 * Read-only catalogue projection shared with client components.
 *
 * The bag drawer, compare tray and wishlist all hold product *ids*; this
 * context is how they resolve those back to displayable records without each
 * page having to pass the catalogue down by hand.
 */

type CatalogueValue = {
  products: ProductSummary[];
  byId: (id: string) => ProductSummary | undefined;
  resolve: (ids: string[]) => ProductSummary[];
};

const CatalogueContext = createContext<CatalogueValue | null>(null);

export function CatalogueProvider({
  products,
  children,
}: {
  products: ProductSummary[];
  children: ReactNode;
}) {
  const value = useMemo<CatalogueValue>(() => {
    const index = new Map(products.map((p) => [p.id, p]));
    return {
      products,
      byId: (id) => index.get(id),
      // Ids for products that have since left the catalogue are dropped.
      resolve: (ids) =>
        ids.map((id) => index.get(id)).filter((p): p is ProductSummary => Boolean(p)),
    };
  }, [products]);

  return (
    <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>
  );
}

export function useCatalogue(): CatalogueValue {
  const ctx = useContext(CatalogueContext);
  if (!ctx) throw new Error("useCatalogue must be used within <CatalogueProvider>");
  return ctx;
}
