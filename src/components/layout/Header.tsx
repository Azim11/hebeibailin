"use client";

import { AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Brand, Collection } from "@/lib/types";
import { site } from "@/lib/data/site";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";
import { MegaMenu, type MenuKey } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

type NavItem = { key: MenuKey; label: string; href: string; hasMenu: boolean };

const NAV: NavItem[] = [
  { key: "new", label: "New Arrivals", href: "/collections/new-arrivals", hasMenu: false },
  { key: "handbags", label: "Handbags", href: "/collections/handbags", hasMenu: true },
  { key: "brands", label: "Brands", href: "/brands", hasMenu: true },
  { key: "collections", label: "Collections", href: "/collections", hasMenu: true },
  { key: "accessories", label: "Accessories", href: "/collections/accessories", hasMenu: false },
  { key: "about", label: "About", href: "/pages/about", hasMenu: true },
  { key: "contact", label: "Contact", href: "/pages/contact", hasMenu: false },
];

/** Small superscript count shown on the bag and wishlist icons. */
function Counter({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1 min-w-4 rounded-full bg-ink px-1 text-center font-sans text-[0.5625rem] leading-4 text-ivory">
      {value > 99 ? "99+" : value}
    </span>
  );
}

export function Header({
  brands,
  collections,
}: {
  brands: Brand[];
  collections: Collection[];
}) {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const { openSearch, openCart, toggleMobileNav, mobileNavOpen } = useUI();
  const { cartCount, wishlistCount, hydrated } = useShop();

  // A hairline appears under the header only once the page has scrolled, so the
  // hero meets the navigation without a visible seam.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // A short grace period stops the panel flickering as the pointer crosses the
  // gap between the trigger and the panel itself.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm transition-[border-color] duration-500 ${
          scrolled || openMenu ? "border-b border-line" : "border-b border-transparent"
        }`}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-16 max-w-[1760px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={toggleMobileNav}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            className="-ml-2 p-2 text-ink lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>

          {/* Desktop: wordmark left */}
          <Link
            href="/"
            className="hidden shrink-0 font-serif text-xl tracking-[0.18em] text-ink lg:block"
          >
            {site.wordmark}
          </Link>

          {/* Mobile: wordmark centred */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-base tracking-[0.16em] text-ink lg:hidden"
          >
            {site.shortName.toUpperCase()}
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => {
                const active = openMenu === item.key;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => {
                        cancelClose();
                        setOpenMenu(item.hasMenu ? item.key : null);
                      }}
                      onFocus={() => setOpenMenu(item.hasMenu ? item.key : null)}
                      aria-expanded={item.hasMenu ? active : undefined}
                      className={`relative block py-6 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors duration-300 ${
                        active ? "text-champagne" : "text-charcoal hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="p-2 text-ink transition-colors hover:text-champagne"
            >
              <Search className="size-[1.15rem]" aria-hidden />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="hidden p-2 text-ink transition-colors hover:text-champagne lg:block"
            >
              <User className="size-[1.15rem]" aria-hidden />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${hydrated && wishlistCount ? ` (${wishlistCount} items)` : ""}`}
              className="relative hidden p-2 text-ink transition-colors hover:text-champagne lg:block"
            >
              <Heart className="size-[1.15rem]" aria-hidden />
              {hydrated ? <Counter value={wishlistCount} /> : null}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag${hydrated && cartCount ? ` (${cartCount} items)` : ""}`}
              className="relative p-2 text-ink transition-colors hover:text-champagne"
            >
              <ShoppingBag className="size-[1.15rem]" aria-hidden />
              {hydrated ? <Counter value={cartCount} /> : null}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {openMenu ? (
            <div onMouseEnter={cancelClose} key={openMenu}>
              <MegaMenu
                menu={openMenu}
                brands={brands}
                collections={collections}
                onNavigate={() => setOpenMenu(null)}
              />
            </div>
          ) : null}
        </AnimatePresence>
      </header>

      <MobileNav brands={brands} collections={collections} />
    </>
  );
}
