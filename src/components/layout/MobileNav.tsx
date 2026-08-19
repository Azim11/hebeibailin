"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Brand, Collection } from "@/lib/types";
import { site } from "@/lib/data/site";
import { shopByLinks } from "@/lib/data/taxonomy";
import { useUI } from "@/store/ui";

type Section = { key: string; label: string; links: { label: string; href: string }[] };

/** Full-height slide-in navigation for small screens. */
export function MobileNav({
  brands,
  collections,
}: {
  brands: Brand[];
  collections: Collection[];
}) {
  const { mobileNavOpen, closeMobileNav } = useUI();
  const [expanded, setExpanded] = useState<string | null>("handbags");

  const sections: Section[] = [
    { key: "handbags", label: "Handbags", links: shopByLinks },
    {
      key: "brands",
      label: "Brands",
      links: brands.map((b) => ({ label: b.name, href: `/brands/${b.slug}` })),
    },
    {
      key: "collections",
      label: "Collections",
      links: collections
        .filter((c) => c.inMegaMenu)
        .map((c) => ({ label: c.name, href: `/collections/${c.slug}` })),
    },
    {
      key: "about",
      label: "About",
      links: [
        { label: "Our Story", href: "/pages/about" },
        { label: "Authentication", href: "/pages/authenticity" },
        { label: "Bag Sourcing", href: "/pages/sourcing" },
        { label: "Sell or Consign", href: "/pages/sell" },
        { label: "Appointments", href: "/pages/appointments" },
        { label: "Contact", href: "/pages/contact" },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {mobileNavOpen ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMobileNav}
            className="fixed inset-0 z-[60] bg-ink/25 lg:hidden"
          />

          <motion.nav
            key="panel"
            aria-label="Mobile"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[61] flex w-[88%] max-w-sm flex-col bg-ivory lg:hidden"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <Link
                href="/"
                onClick={closeMobileNav}
                className="font-serif text-base tracking-[0.16em] text-ink"
              >
                {site.shortName.toUpperCase()}
              </Link>
              <button
                type="button"
                onClick={closeMobileNav}
                aria-label="Close menu"
                className="-mr-2 p-2 text-ink"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
              <Link
                href="/collections/new-arrivals"
                onClick={closeMobileNav}
                className="block border-b border-line py-4 font-sans text-[0.75rem] tracking-luxe text-ink uppercase"
              >
                New Arrivals
              </Link>

              {sections.map((section) => {
                const open = expanded === section.key;
                return (
                  <div key={section.key} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : section.key)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between py-4 text-left font-sans text-[0.75rem] tracking-luxe text-ink uppercase"
                    >
                      {section.label}
                      <ChevronDown
                        className={`size-4 text-taupe transition-transform duration-400 ${
                          open ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-3.5 pb-5">
                            {section.links.map((link) => (
                              <Link
                                key={link.href + link.label}
                                href={link.href}
                                onClick={closeMobileNav}
                                className="font-sans text-[0.9375rem] text-stone"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/collections/accessories"
                onClick={closeMobileNav}
                className="block border-b border-line py-4 font-sans text-[0.75rem] tracking-luxe text-ink uppercase"
              >
                Accessories
              </Link>

              <div className="mt-8 flex flex-col gap-3.5">
                <Link
                  href="/account"
                  onClick={closeMobileNav}
                  className="font-sans text-[0.8125rem] text-stone"
                >
                  My Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={closeMobileNav}
                  className="font-sans text-[0.8125rem] text-stone"
                >
                  Wishlist
                </Link>
                <Link
                  href="/compare"
                  onClick={closeMobileNav}
                  className="font-sans text-[0.8125rem] text-stone"
                >
                  Compare
                </Link>
              </div>
            </div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
