import type { Metadata } from "next";
import type { Product } from "@/lib/types";
import { site } from "@/lib/data/site";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/**
 * Product metadata: title, description, canonical and Open Graph image.
 * The first product photograph doubles as the OG image.
 */
export function productMetadata(product: Product): Metadata {
  const title = `${product.brand} ${product.name} — ${product.shortDescription}`;
  const description =
    product.description.length > 155
      ? `${product.description.slice(0, 152).trimEnd()}…`
      : product.description;
  const path = `/products/${product.slug}`;
  const image = product.images[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(path),
      images: image
        ? [{ url: image, width: 1400, height: 1750, alt: product.images[0].alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: absoluteUrl(path),
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const AVAILABILITY_SCHEMA: Record<Product["availability"], string> = {
  "In Stock": "https://schema.org/InStock",
  Reserved: "https://schema.org/PreOrder",
  Sold: "https://schema.org/SoldOut",
  "On Request": "https://schema.org/LimitedAvailability",
};

const CONDITION_SCHEMA: Record<Product["condition"], string> = {
  "New / Never Worn": "https://schema.org/NewCondition",
  Excellent: "https://schema.org/UsedCondition",
  "Very Good": "https://schema.org/UsedCondition",
  "Pre-Owned": "https://schema.org/UsedCondition",
};

/** schema.org Product, emitted as JSON-LD on the product detail page. */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand} ${product.name}`,
    sku: product.sku,
    description: product.description,
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    color: product.color,
    material: product.material,
    itemCondition: CONDITION_SCHEMA[product.condition],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: product.currency,
      price: product.price,
      availability: AVAILABILITY_SCHEMA[product.availability],
      itemCondition: CONDITION_SCHEMA[product.condition],
      seller: { "@type": "Organization", name: site.name },
    },
  };
}

/** schema.org BreadcrumbList from an ordered list of crumbs. */
export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    sameAs: site.social.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** Serialise JSON-LD for a `<script type="application/ld+json">` tag. */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data) };
}
