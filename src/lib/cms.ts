import type {
  Brand,
  Collection,
  Product,
  ProductFilters,
  ProductSummary,
  SortKey,
} from "@/lib/types";
import { products } from "@/lib/data/products";
import { brands, categories, collections } from "@/lib/data/taxonomy";

/**
 * Data access layer.
 *
 * Every read the UI performs goes through this module. Today it resolves
 * against static seed data; swapping in a CMS or database means reimplementing
 * these functions (as async calls) and changing nothing else. The signatures
 * are already `Promise`-returning for that reason.
 */

/**
 * The seed arrays are static, so the sorted/derived views below are computed
 * once at module scope rather than on every call. Cloudflare Workers reuse a
 * warm isolate's module state across requests, so this work runs once per
 * isolate instead of once per request — the free plan's 10ms CPU budget has
 * none to spare for re-sorting the same lists on every page.
 */
const sortedBrands = [...brands].sort((a, b) => a.order - b.order);
const featuredBrands = sortedBrands.filter((b) => b.featured);
const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
const sortedCollections = [...collections].sort((a, b) => a.order - b.order);
const collectionBySlug = new Map(collections.map((c) => [c.slug, c]));
const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
const productById = new Map(products.map((p) => [p.id, p]));
const productBySlug = new Map(products.map((p) => [p.slug, p]));
const catalogueSummaries = toSummaries(products);

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getCatalogueSummaries(): Promise<ProductSummary[]> {
  return catalogueSummaries;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return productBySlug.get(slug) ?? null;
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  return ids.map((id) => productById.get(id)).filter((p): p is Product => Boolean(p));
}

export async function getBrands(): Promise<Brand[]> {
  return sortedBrands;
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  return featuredBrands;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return brandBySlug.get(slug) ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  return sortedCollections;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  return collectionBySlug.get(slug) ?? null;
}

export async function getCategories() {
  return sortedCategories;
}

/** Products belonging to a collection slug, honouring the virtual collections. */
export async function getProductsInCollection(slug: string): Promise<Product[]> {
  switch (slug) {
    case "new-arrivals":
      return sortProducts(products.filter((p) => p.newArrival), "newest");
    case "rare-finds":
      return products.filter((p) => p.rareFind);
    case "best-sellers":
      return products.filter(
        (p) => p.collections.includes("best-sellers") || p.featured,
      );
    case "handbags":
      return products.filter((p) => p.categorySlug !== "accessories");
    case "accessories":
      return products.filter((p) => p.categorySlug === "accessories");
    default:
      return products.filter((p) => p.collections.includes(slug));
  }
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  return products.filter((p) => p.brandSlug === brandSlug);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return products.filter((p) => p.featured).slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  return sortProducts(
    products.filter((p) => p.newArrival),
    "newest",
  ).slice(0, limit);
}

export async function getRareFinds(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.rareFind).slice(0, limit);
}

/** Related pieces: same brand first, then same silhouette, never the product itself. */
export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const sameBrand = products.filter(
    (p) => p.id !== product.id && p.brandSlug === product.brandSlug,
  );
  const sameCategory = products.filter(
    (p) =>
      p.id !== product.id &&
      p.brandSlug !== product.brandSlug &&
      p.categorySlug === product.categorySlug,
  );
  return [...sameBrand, ...sameCategory].slice(0, limit);
}

/** Bounds for the price range slider, rounded outward to clean values. */
export async function getPriceBounds(list: Product[] = products) {
  if (list.length === 0) return { min: 0, max: 0 };
  const prices = list.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices) / 100) * 100,
    max: Math.ceil(Math.max(...prices) / 1000) * 1000,
  };
}

const EMPTY_FILTERS: ProductFilters = {
  brands: [],
  categories: [],
  conditions: [],
  colors: [],
  materials: [],
  hardware: [],
  collections: [],
};

/** Apply the facet filters. An empty facet means "no constraint". */
export function filterProducts(
  list: Product[],
  filters: Partial<ProductFilters>,
): Product[] {
  const f = { ...EMPTY_FILTERS, ...filters };
  const query = f.query?.trim().toLowerCase();

  return list.filter((p) => {
    if (f.brands.length && !f.brands.includes(p.brandSlug)) return false;
    if (f.categories.length && !f.categories.includes(p.categorySlug)) return false;
    if (f.conditions.length && !f.conditions.includes(p.condition)) return false;
    if (f.colors.length && !f.colors.includes(p.colorFamily)) return false;
    if (f.materials.length && !f.materials.includes(p.material)) return false;
    if (f.hardware.length && !f.hardware.includes(p.hardware)) return false;
    if (f.collections.length && !f.collections.some((c) => p.collections.includes(c)))
      return false;
    if (typeof f.minPrice === "number" && p.price < f.minPrice) return false;
    if (typeof f.maxPrice === "number" && p.price > f.maxPrice) return false;

    if (query) {
      const haystack = [
        p.brand,
        p.name,
        p.category,
        p.color,
        p.material,
        p.hardware,
        p.shortDescription,
        p.sku,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
      );
    case "featured":
    default:
      return copy.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
  }
}

/** Lightweight search used by the overlay; ranks brand and name matches first. */
export function searchProducts(list: Product[], query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = list
    .map((p) => {
      const name = `${p.brand} ${p.name}`.toLowerCase();
      let score = 0;
      if (name.startsWith(q)) score += 100;
      if (name.includes(q)) score += 50;
      if (p.brand.toLowerCase().includes(q)) score += 30;
      if (p.category.toLowerCase().includes(q)) score += 20;
      if (p.tags.some((t) => t.includes(q))) score += 15;
      if (p.material.toLowerCase().includes(q) || p.color.toLowerCase().includes(q))
        score += 10;
      return { product: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}

/** Facet counts for the collection page, computed against the visible list. */
export function facetCounts(list: Product[], key: keyof Product): Map<string, number> {
  const counts = new Map<string, number>();
  for (const product of list) {
    const value = product[key];
    if (typeof value !== "string") continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

/**
 * Trim a product to the fields client components need. Cards use two images
 * (rest state and hover), so the remainder is dropped from the payload.
 */
export function toSummary(product: Product, imageCount = 2): ProductSummary {
  const {
    description: _description,
    videos: _videos,
    includedItems: _includedItems,
    origin: _origin,
    authenticityStatus: _authenticityStatus,
    ...rest
  } = product;
  return { ...rest, images: product.images.slice(0, imageCount) };
}

export function toSummaries(list: Product[], imageCount = 2): ProductSummary[] {
  return list.map((p) => toSummary(p, imageCount));
}
