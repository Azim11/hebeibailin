"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Brand, Collection } from "@/lib/types";
import { shopByLinks } from "@/lib/data/taxonomy";

export type MenuKey = "new" | "handbags" | "brands" | "collections" | "accessories" | "about" | "contact";

type MegaMenuProps = {
  menu: MenuKey;
  brands: Brand[];
  collections: Collection[];
  onNavigate: () => void;
};

const panel = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

function ColumnTitle({ children }: { children: string }) {
  return (
    <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
      {children}
    </p>
  );
}

function MenuLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="link-underline font-sans text-[0.8125rem] text-charcoal transition-colors hover:text-ink"
    >
      {children}
    </Link>
  );
}

/** Editorial tile used at the right edge of each panel. */
function FeatureTile({
  href,
  image,
  eyebrow,
  title,
  onNavigate,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  onNavigate: () => void;
}) {
  return (
    <Link href={href} onClick={onNavigate} className="group block">
      <div className="relative aspect-4/5 overflow-hidden bg-warm">
        <Image
          src={image}
          alt=""
          fill
          sizes="20vw"
          className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>
      <p className="mt-4 font-sans text-[0.5625rem] tracking-luxe-wide text-champagne uppercase">
        {eyebrow}
      </p>
      <p className="mt-1.5 flex items-center gap-2 font-serif text-lg text-ink">
        {title}
        <ArrowRight
          className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
          aria-hidden
        />
      </p>
    </Link>
  );
}

export function MegaMenu({ menu, brands, collections, onNavigate }: MegaMenuProps) {
  const menuCollections = collections.filter((c) => c.inMegaMenu);

  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full border-t border-line bg-ivory"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-12 py-14 lg:grid-cols-[1fr_1fr_1fr_320px]">
        {menu === "handbags" ? (
          <>
            <div className="flex flex-col">
              <ColumnTitle>Shop By</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                {shopByLinks.slice(0, 5).map((link) => (
                  <MenuLink key={link.label} href={link.href} onNavigate={onNavigate}>
                    {link.label}
                  </MenuLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Silhouettes</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                {shopByLinks.slice(5).map((link) => (
                  <MenuLink key={link.label} href={link.href} onNavigate={onNavigate}>
                    {link.label}
                  </MenuLink>
                ))}
                <MenuLink href="/collections/handbags" onNavigate={onNavigate}>
                  View All Handbags
                </MenuLink>
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Price</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/collections/handbags?maxPrice=3000" onNavigate={onNavigate}>
                  Under $3,000
                </MenuLink>
                <MenuLink
                  href="/collections/handbags?minPrice=3000&maxPrice=10000"
                  onNavigate={onNavigate}
                >
                  $3,000 — $10,000
                </MenuLink>
                <MenuLink
                  href="/collections/handbags?minPrice=10000&maxPrice=25000"
                  onNavigate={onNavigate}
                >
                  $10,000 — $25,000
                </MenuLink>
                <MenuLink href="/collections/handbags?minPrice=25000" onNavigate={onNavigate}>
                  $25,000 and above
                </MenuLink>
              </div>
            </div>
            <FeatureTile
              href="/collections/new-arrivals"
              image={collections[0]?.image ?? ""}
              eyebrow="Just In"
              title="New Arrivals"
              onNavigate={onNavigate}
            />
          </>
        ) : null}

        {menu === "brands" ? (
          <>
            <div className="flex flex-col lg:col-span-2">
              <ColumnTitle>Maisons</ColumnTitle>
              <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
                {brands.map((brand) => (
                  <MenuLink
                    key={brand.slug}
                    href={`/brands/${brand.slug}`}
                    onNavigate={onNavigate}
                  >
                    {brand.name}
                  </MenuLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Discover</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/brands" onNavigate={onNavigate}>
                  All Brands
                </MenuLink>
                <MenuLink href="/collections/investment-bags" onNavigate={onNavigate}>
                  Investment Bags
                </MenuLink>
                <MenuLink href="/collections/rare-finds" onNavigate={onNavigate}>
                  Rare Finds
                </MenuLink>
                <MenuLink href="/collections/new-arrivals" onNavigate={onNavigate}>
                  New Arrivals
                </MenuLink>
              </div>
            </div>
            <FeatureTile
              href={`/brands/${brands[0]?.slug ?? "hermes"}`}
              image={brands[0]?.image ?? ""}
              eyebrow="Maison"
              title={brands[0]?.name ?? "Hermès"}
              onNavigate={onNavigate}
            />
          </>
        ) : null}

        {menu === "collections" ? (
          <>
            <div className="flex flex-col lg:col-span-2">
              <ColumnTitle>Collections</ColumnTitle>
              <div className="grid grid-cols-2 gap-x-10 gap-y-3.5">
                {menuCollections.map((collection) => (
                  <MenuLink
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    onNavigate={onNavigate}
                  >
                    {collection.name}
                  </MenuLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Featured</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/collections/new-arrivals" onNavigate={onNavigate}>
                  New Arrivals
                </MenuLink>
                <MenuLink href="/collections/investment-bags" onNavigate={onNavigate}>
                  Investment Bags
                </MenuLink>
                <MenuLink href="/collections/rare-finds" onNavigate={onNavigate}>
                  Rare Finds
                </MenuLink>
              </div>
            </div>
            <FeatureTile
              href="/collections/rare-finds"
              image={menuCollections[1]?.image ?? ""}
              eyebrow="For Collectors"
              title="Rare Finds"
              onNavigate={onNavigate}
            />
          </>
        ) : null}

        {menu === "about" ? (
          <>
            <div className="flex flex-col">
              <ColumnTitle>The House</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/pages/about" onNavigate={onNavigate}>
                  Our Story
                </MenuLink>
                <MenuLink href="/pages/contact" onNavigate={onNavigate}>
                  Contact Concierge
                </MenuLink>
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Customer Care</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/pages/shipping" onNavigate={onNavigate}>
                  Shipping &amp; Delivery
                </MenuLink>
                <MenuLink href="/pages/returns" onNavigate={onNavigate}>
                  Returns &amp; Exchanges
                </MenuLink>
                <MenuLink href="/pages/faq" onNavigate={onNavigate}>
                  FAQ
                </MenuLink>
              </div>
            </div>
            <div className="flex flex-col">
              <ColumnTitle>Legal &amp; Trust</ColumnTitle>
              <div className="flex flex-col items-start gap-3.5">
                <MenuLink href="/pages/privacy" onNavigate={onNavigate}>
                  Privacy Policy
                </MenuLink>
                <MenuLink href="/pages/terms" onNavigate={onNavigate}>
                  Terms &amp; Conditions
                </MenuLink>
              </div>
            </div>
            <FeatureTile
              href="/pages/about"
              image={collections[3]?.image ?? ""}
              eyebrow="Since the beginning"
              title="Our Story"
              onNavigate={onNavigate}
            />
          </>
        ) : null}
      </div>
    </motion.div>
  );
}
