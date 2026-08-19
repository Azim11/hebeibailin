import type { Product } from "@/lib/types";
import { BAG_SHOTS } from "./images";

type ProductSeed = Pick<
  Product,
  | "name"
  | "slug"
  | "category"
  | "categorySlug"
  | "price"
  | "color"
  | "colorFamily"
  | "material"
  | "hardware"
  | "size"
  | "shortDescription"
  | "description"
  | "tags"
>;

const seeds: ProductSeed[] = [
  {
    name: "Espresso Structured Top Handle",
    slug: "espresso-structured-top-handle",
    category: "Top Handle",
    categorySlug: "top-handle",
    price: 1280,
    color: "Espresso",
    colorFamily: "Brown",
    material: "Full-Grain Leather",
    hardware: "Gold",
    size: "28 × 21 × 11 cm",
    shortDescription: "Full-grain leather · Brushed gold hardware",
    description: "A poised top-handle silhouette crafted in smooth espresso leather. Its clean flap, balanced proportions and understated turn-lock make it an elegant everyday piece without visible branding.",
    tags: ["structured", "top-handle", "brown"],
  },
  {
    name: "Ivory Quilted Shoulder Bag",
    slug: "ivory-quilted-shoulder-bag",
    category: "Shoulder Bags",
    categorySlug: "shoulder",
    price: 980,
    color: "Ivory",
    colorFamily: "White",
    material: "Lambskin Leather",
    hardware: "Gold",
    size: "25 × 17 × 8 cm",
    shortDescription: "Quilted lambskin · Fine chain strap",
    description: "Soft ivory leather, generous diamond quilting and a slender chain strap give this compact shoulder bag a refined evening-to-day character.",
    tags: ["quilted", "shoulder", "ivory"],
  },
  {
    name: "Noir Pebbled Leather Tote",
    slug: "noir-pebbled-leather-tote",
    category: "Tote Bags",
    categorySlug: "tote",
    price: 1150,
    color: "Noir",
    colorFamily: "Black",
    material: "Pebbled Leather",
    hardware: "Silver",
    size: "38 × 29 × 14 cm",
    shortDescription: "Pebbled leather · Matte silver hardware",
    description: "A spacious architectural tote in resilient pebbled leather. The open interior and comfortable shoulder handles are designed for polished daily use.",
    tags: ["tote", "black", "everyday"],
  },
  {
    name: "Burgundy Box Crossbody",
    slug: "burgundy-box-crossbody",
    category: "Crossbody",
    categorySlug: "crossbody",
    price: 890,
    color: "Burgundy",
    colorFamily: "Red",
    material: "Box Leather",
    hardware: "Gold",
    size: "23 × 18 × 8 cm",
    shortDescription: "Box leather · Adjustable shoulder strap",
    description: "A compact crossbody with a precise rectangular profile, rich burgundy finish and minimal geometric clasp. The adjustable leather strap offers hands-free versatility.",
    tags: ["crossbody", "burgundy", "compact"],
  },
  {
    name: "Camel Woven Hobo",
    slug: "camel-woven-hobo",
    category: "Shoulder Bags",
    categorySlug: "shoulder",
    price: 1380,
    color: "Camel",
    colorFamily: "Brown",
    material: "Woven Leather",
    hardware: "Gold",
    size: "36 × 28 × 12 cm",
    shortDescription: "Hand-woven leather · Sculptural profile",
    description: "Supple leather strips are woven into a relaxed, sculptural hobo shape. A warm camel tone and generous interior make it a tactile everyday statement.",
    tags: ["woven", "hobo", "camel"],
  },
  {
    name: "Forest Structured Satchel",
    slug: "forest-structured-satchel",
    category: "Top Handle",
    categorySlug: "top-handle",
    price: 1240,
    color: "Forest Green",
    colorFamily: "Green",
    material: "Grained Leather",
    hardware: "Gold",
    size: "30 × 22 × 10 cm",
    shortDescription: "Grained leather · Understated brass hardware",
    description: "A forest-green satchel with graceful gussets, a softly structured flap and an understated closure. Designed to feel timeless without relying on a logo.",
    tags: ["satchel", "green", "top-handle"],
  },
];

export const products: Product[] = seeds.map((seed, index) => ({
  id: `prd-${String(index + 1).padStart(3, "0")}`,
  brand: "",
  brandSlug: "unbranded",
  ...seed,
  collections: ["handbags", "new-arrivals", index < 3 ? "best-sellers" : "everyday-luxury"],
  currency: "USD",
  condition: "New / Never Worn",
  availability: "In Stock",
  images: [{ url: BAG_SHOTS[index], alt: seed.name, width: 1086, height: 1448 }],
  videos: [],
  origin: "Independent Atelier",
  sku: `HB-${String(index + 1).padStart(3, "0")}`,
  authenticityStatus: "Authenticated",
  includedItems: ["Bag", "Protective Dust Bag", "Care Card"],
  featured: index < 4,
  newArrival: true,
  rareFind: index >= 4,
  createdAt: new Date(Date.UTC(2026, 7, 18 - index)).toISOString(),
}));
