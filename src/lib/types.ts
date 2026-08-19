/**
 * Domain types for the storefront.
 *
 * These mirror the shape a CMS / database is expected to return, so the data
 * access layer in `src/lib/cms.ts` can be swapped from static seed data to a
 * real backend without touching components.
 */

export type Currency = "USD" | "EUR" | "GBP" | "AED";

export type Condition =
  | "New / Never Worn"
  | "Excellent"
  | "Very Good"
  | "Pre-Owned";

export type Availability = "In Stock" | "Reserved" | "Sold" | "On Request";

export type AuthenticityStatus = "Authenticated" | "In Review" | "Not Reviewed";

export type Hardware = "Gold" | "Palladium" | "Silver" | "Ruthenium" | "Other";

export type ProductImage = {
  url: string;
  alt: string;
  /** Optional aspect hint used by the gallery for layout stability. */
  width?: number;
  height?: number;
};

export type ProductVideo = {
  url: string;
  poster?: string;
  alt: string;
};

export type Product = {
  id: string;
  brand: string;
  /** Slug of the brand, matches `Brand.slug`. */
  brandSlug: string;
  name: string;
  slug: string;
  /** Silhouette / model family, e.g. "Birkin", "Tote". */
  category: string;
  categorySlug: string;
  /** Editorial collections this piece belongs to. */
  collections: string[];
  price: number;
  /** Optional original retail, used to render a strike-through comparison. */
  compareAtPrice?: number;
  currency: Currency;
  condition: Condition;
  availability: Availability;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  videos: ProductVideo[];
  color: string;
  colorFamily: string;
  material: string;
  hardware: Hardware;
  size: string;
  /** Year of production, when known. */
  year?: number;
  origin?: string;
  sku: string;
  authenticityStatus: AuthenticityStatus;
  includedItems: string[];
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  rareFind: boolean;
  /** ISO-8601 timestamp. */
  createdAt: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  /** Short editorial standfirst shown on brand landing pages. */
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
  /** Display order in navigation and brand grids. */
  order: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  /** Surfaced in the "Collections" mega-menu column. */
  inMegaMenu: boolean;
  order: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  country: string;
  purchasedProduct: string;
  /**
   * Seed testimonials are illustrative placeholders. Anything with
   * `placeholder: true` must be replaced with real, attributable customer
   * feedback before the site goes live.
   */
  placeholder: boolean;
};

export type PressMention = {
  id: string;
  name: string;
  /**
   * Only render a press logo the business is licensed to display. Seed entries
   * are wordmarks for illustration and carry `placeholder: true`.
   */
  placeholder: boolean;
};

/** Homepage announcement bar — editable from the CMS. */
export type Announcement = {
  id: string;
  message: string;
  href?: string;
  active: boolean;
};

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export type ProductFilters = {
  brands: string[];
  categories: string[];
  conditions: string[];
  colors: string[];
  materials: string[];
  hardware: string[];
  collections: string[];
  minPrice?: number;
  maxPrice?: number;
  query?: string;
};

/** A line in the shopping bag. */
export type CartLine = {
  productId: string;
  quantity: number;
  addedAt: string;
};

export type Order = {
  id: string;
  reference: string;
  placedAt: string;
  status: "Processing" | "Authenticating" | "Shipped" | "Delivered";
  total: number;
  currency: Currency;
  items: { productId: string; quantity: number; price: number }[];
};

export type Address = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

/**
 * The projection sent to client components (cards, search, quick view).
 *
 * Long-form fields are dropped and the image set is trimmed to the two frames a
 * card actually needs, which keeps the serialised payload small when a server
 * page hands a large grid to the client.
 */
export type ProductSummary = Omit<
  Product,
  "description" | "videos" | "includedItems" | "origin" | "authenticityStatus"
>;
