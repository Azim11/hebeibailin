import type { Brand, Category, Collection } from "@/lib/types";
import { EDITORIAL, INTERIORS, photo } from "./images";

/**
 * Brands, collections and silhouettes.
 *
 * The mega menu, filter panels and brand grids all read from these arrays, so
 * adding a brand in the CMS surfaces it everywhere without further wiring.
 */

export const brands: Brand[] = [
  {
    id: "brand-hermes",
    name: "Hermès",
    slug: "hermes",
    tagline: "The benchmark for saddlery-born craft.",
    description:
      "Founded as a harness workshop, Hermès still builds each bag by a single artisan, start to finish. Waiting lists are long and supply is deliberately scarce — which is precisely why the secondary market matters.",
    image: photo("photo-1590874103328-eac38a683ce7", 1200, 1500),
    featured: true,
    order: 1,
  },
  {
    id: "brand-chanel",
    name: "Chanel",
    slug: "chanel",
    tagline: "Quilted leather, chain strap, permanence.",
    description:
      "The Classic Flap redefined how a bag could be carried. Diamond quilting, the interlocking clasp and a chain shoulder strap remain among the most recognisable signatures in fashion.",
    image: photo("photo-1548036328-c9fa89d128fa", 1200, 1500),
    featured: true,
    order: 2,
  },
  {
    id: "brand-louis-vuitton",
    name: "Louis Vuitton",
    slug: "louis-vuitton",
    tagline: "Travel-born, coated canvas, built to be used.",
    description:
      "Trunk-making heritage translated into everyday luggage. Monogram and Damier canvas age gracefully, and the house's collaborations have created some of the most sought-after limited runs of the last two decades.",
    image: photo("photo-1584917865442-de89df76afd3", 1200, 1500),
    featured: true,
    order: 3,
  },
  {
    id: "brand-goyard",
    name: "Goyard",
    slug: "goyard",
    tagline: "Hand-painted chevron, quietly discreet.",
    description:
      "No advertising, no e-commerce, few boutiques. Goyardine canvas is applied by hand, and personalisation is part of the ritual — which makes each piece difficult to replicate and difficult to find.",
    image: photo("photo-1553062407-98eeb64c6a62", 1200, 1500),
    featured: true,
    order: 4,
  },
  {
    id: "brand-dior",
    name: "Dior",
    slug: "dior",
    tagline: "Couture proportion, cannage precision.",
    description:
      "From the Lady Dior's cannage topstitching to the Saddle's revived curve, the house treats a handbag as an extension of couture construction.",
    image: photo("photo-1594223274512-ad4803739b7c", 1200, 1500),
    featured: true,
    order: 5,
  },
  {
    id: "brand-gucci",
    name: "Gucci",
    slug: "gucci",
    tagline: "Florentine leather, unmistakable hardware.",
    description:
      "Equestrian hardware, the horsebit and the web stripe — Gucci's archive is deep, and its reissues have made vintage references newly collectible.",
    image: photo("photo-1512436991641-6745cdb1723f", 1200, 1500),
    featured: true,
    order: 6,
  },
  {
    id: "brand-prada",
    name: "Prada",
    slug: "prada",
    tagline: "Intellectual minimalism in nylon and saffiano.",
    description:
      "Prada made technical nylon a luxury material and saffiano leather a modern classic. Restraint is the point.",
    image: photo("photo-1601924994987-69e26d50dc26", 1200, 1500),
    featured: false,
    order: 7,
  },
  {
    id: "brand-fendi",
    name: "Fendi",
    slug: "fendi",
    tagline: "Roman craft with a sense of humour.",
    description:
      "The Baguette turned a shoulder bag into a cultural object. Fendi's fur, leather and shearling work remains among the most technically ambitious in Italy.",
    image: photo("photo-1517254797898-04edd251bfb3", 1200, 1500),
    featured: false,
    order: 8,
  },
  {
    id: "brand-bottega-veneta",
    name: "Bottega Veneta",
    slug: "bottega-veneta",
    tagline: "When your own initials are enough.",
    description:
      "Intrecciato weaving requires no logo. Bottega's leather is chosen for how it softens, and its silhouettes have become the quiet luxury reference point.",
    image: photo("photo-1614179689702-355944cd0918", 1200, 1500),
    featured: false,
    order: 9,
  },
  {
    id: "brand-other",
    name: "Other Brands",
    slug: "other-brands",
    tagline: "Celine, Loewe, Saint Laurent and beyond.",
    description:
      "A rotating selection from houses we admire — acquired when the piece, the condition and the provenance are right.",
    image: photo("photo-1509319117193-57bab727e09d", 1200, 1500),
    featured: false,
    order: 10,
  },
];

export const categories: Category[] = [
  { id: "cat-birkin", name: "Birkin", slug: "birkin", order: 1 },
  { id: "cat-kelly", name: "Kelly", slug: "kelly", order: 2 },
  { id: "cat-top-handle", name: "Top Handle", slug: "top-handle", order: 3 },
  { id: "cat-shoulder", name: "Shoulder Bags", slug: "shoulder", order: 4 },
  { id: "cat-crossbody", name: "Crossbody", slug: "crossbody", order: 5 },
  { id: "cat-tote", name: "Tote Bags", slug: "tote", order: 6 },
  { id: "cat-mini", name: "Mini Bags", slug: "mini", order: 7 },
  { id: "cat-clutch", name: "Clutches", slug: "clutch", order: 8 },
  { id: "cat-evening", name: "Evening Bags", slug: "evening", order: 9 },
  { id: "cat-accessories", name: "Accessories", slug: "accessories", order: 10 },
];

export const collections: Collection[] = [
  {
    id: "col-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description:
      "The most recent pieces to complete authentication and enter the collection.",
    image: photo("photo-1594223274512-ad4803739b7c", 1800, 1000),
    inMegaMenu: true,
    order: 1,
  },
  {
    id: "col-rare-finds",
    name: "Rare Finds",
    slug: "rare-finds",
    description:
      "Exceptional pieces for collectors who appreciate the extraordinary.",
    image: photo("photo-1590874103328-eac38a683ce7", 1800, 1000),
    inMegaMenu: true,
    order: 2,
  },
  {
    id: "col-limited-edition",
    name: "Limited Edition",
    slug: "limited-edition",
    description:
      "Seasonal runs, collaborations and special orders produced in small numbers.",
    image: photo("photo-1566150905458-1bf1fc113f0d", 1800, 1000),
    inMegaMenu: true,
    order: 3,
  },
  {
    id: "col-vintage",
    name: "Vintage",
    slug: "vintage",
    description:
      "Pieces from earlier decades, selected for character as much as condition.",
    image: photo("photo-1544816155-12df9643f363", 1800, 1000),
    inMegaMenu: true,
    order: 4,
  },
  {
    id: "col-investment",
    name: "Investment Bags",
    slug: "investment-bags",
    description:
      "Silhouettes with a long record of holding their value on the secondary market.",
    image: photo("photo-1548036328-c9fa89d128fa", 1800, 1000),
    inMegaMenu: true,
    order: 5,
  },
  {
    id: "col-everyday",
    name: "Everyday Luxury",
    slug: "everyday-luxury",
    description:
      "Bags built to be carried daily — forgiving leathers and practical proportions.",
    image: photo("photo-1575032617751-6ddec2089882", 1800, 1000),
    inMegaMenu: true,
    order: 6,
  },
  {
    id: "col-statement",
    name: "Statement Pieces",
    slug: "statement-pieces",
    description: "Colour, exotic texture and silhouettes that carry a room.",
    image: photo("photo-1591561954557-26941169b49e", 1800, 1000),
    inMegaMenu: true,
    order: 7,
  },
  {
    id: "col-handbags",
    name: "Luxury Handbags",
    slug: "handbags",
    description:
      "Explore our curated collection of exceptional handbags, from timeless icons to rare and collectible pieces.",
    image: photo("photo-1584917865442-de89df76afd3", 1800, 1000),
    inMegaMenu: false,
    order: 8,
  },
  {
    id: "col-accessories",
    name: "Luxury Accessories",
    slug: "accessories",
    description:
      "Small leather goods, silk and hardware chosen with the same eye as the bags.",
    image: photo("photo-1563178406-4cdc2923acbc", 1800, 1000),
    inMegaMenu: false,
    order: 9,
  },
  {
    id: "col-best-sellers",
    name: "Best Sellers",
    slug: "best-sellers",
    description: "The silhouettes our clients return for most often.",
    image: photo("photo-1601924994987-69e26d50dc26", 1800, 1000),
    inMegaMenu: false,
    order: 10,
  },
];

/** Silhouette links shown in the "Handbags" mega-menu column. */
export const shopByLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "Top Handle", href: "/collections/handbags?category=top-handle" },
  { label: "Shoulder Bags", href: "/collections/handbags?category=shoulder" },
  { label: "Crossbody", href: "/collections/handbags?category=crossbody" },
  { label: "Tote Bags", href: "/collections/handbags?category=tote" },
  { label: "Mini Bags", href: "/collections/handbags?category=mini" },
  { label: "Clutches", href: "/collections/handbags?category=clutch" },
  { label: "Evening Bags", href: "/collections/handbags?category=evening" },
];

export const colorFamilies = [
  "Black",
  "White",
  "Brown",
  "Beige",
  "Red",
  "Blue",
  "Green",
  "Pink",
  "Other",
];

export const materials = [
  "Togo",
  "Epsom",
  "Clemence",
  "Lambskin",
  "Calfskin",
  "Canvas",
  "Exotic",
];

export const hardwareOptions = ["Gold", "Palladium", "Silver", "Other"];

export const conditions = [
  "New / Never Worn",
  "Excellent",
  "Very Good",
  "Pre-Owned",
];
