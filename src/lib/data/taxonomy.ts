import type { Brand, Category, Collection } from "@/lib/types";
import { BAG_SHOTS } from "./images";

/** This catalogue is intentionally independent and carries no brand taxonomy. */
export const brands: Brand[] = [];

export const categories: Category[] = [
  { id: "cat-top-handle", name: "Top Handle", slug: "top-handle", order: 1 },
  { id: "cat-shoulder", name: "Shoulder Bags", slug: "shoulder", order: 2 },
  { id: "cat-tote", name: "Tote Bags", slug: "tote", order: 3 },
  { id: "cat-crossbody", name: "Crossbody", slug: "crossbody", order: 4 },
];

export const colorFamilies = ["Black", "White", "Brown", "Red", "Green"];
export const conditions = ["New / Never Worn"];
export const hardwareOptions = ["Gold", "Silver"];
export const materials = [
  "Full-Grain Leather",
  "Lambskin Leather",
  "Pebbled Leather",
  "Box Leather",
  "Woven Leather",
  "Grained Leather",
];

export const collections: Collection[] = [
  {
    id: "col-handbags",
    name: "All Handbags",
    slug: "handbags",
    description: "The complete six-piece collection of original, logo-free luxury bags.",
    image: BAG_SHOTS[0],
    inMegaMenu: true,
    order: 1,
  },
  {
    id: "col-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Our newest independent leather silhouettes.",
    image: BAG_SHOTS[1],
    inMegaMenu: true,
    order: 2,
  },
  {
    id: "col-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The most requested shapes from our six-piece collection.",
    image: BAG_SHOTS[2],
    inMegaMenu: true,
    order: 3,
  },
  {
    id: "col-everyday",
    name: "Everyday Luxury",
    slug: "everyday-luxury",
    description: "Refined, practical bags designed for regular use.",
    image: BAG_SHOTS[4],
    inMegaMenu: true,
    order: 4,
  },
];

export const shopByLinks = [
  { label: "View All Six Bags", href: "/collections/handbags" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Top Handle", href: "/collections/handbags?category=top-handle" },
  { label: "Shoulder Bags", href: "/collections/handbags?category=shoulder" },
  { label: "Tote Bags", href: "/collections/handbags?category=tote" },
  { label: "Crossbody", href: "/collections/handbags?category=crossbody" },
];
