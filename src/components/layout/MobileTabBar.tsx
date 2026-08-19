"use client";

import { Heart, Home, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

/**
 * Persistent bottom navigation on small screens. Hidden on the product page,
 * where the sticky "Add to Bag" bar takes the same space.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const { openSearch, openCart, toggleMobileNav } = useUI();
  const { cartCount, wishlistCount, hydrated } = useShop();

  if (pathname.startsWith("/products/") || pathname.startsWith("/checkout")) {
    return null;
  }

  const itemClass =
    "relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-sans text-[0.5625rem] tracking-luxe uppercase text-stone";

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/98 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch">
        <Link href="/" className={itemClass}>
          <Home className="size-[1.15rem]" aria-hidden />
          Home
        </Link>

        <button type="button" onClick={openSearch} className={itemClass}>
          <Search className="size-[1.15rem]" aria-hidden />
          Search
        </button>

        <Link href="/wishlist" className={itemClass}>
          <span className="relative">
            <Heart className="size-[1.15rem]" aria-hidden />
            {hydrated && wishlistCount > 0 ? (
              <span className="absolute -right-2 -top-1 size-1.5 rounded-full bg-champagne" />
            ) : null}
          </span>
          Saved
        </Link>

        <button type="button" onClick={openCart} className={itemClass}>
          <span className="relative">
            <ShoppingBag className="size-[1.15rem]" aria-hidden />
            {hydrated && cartCount > 0 ? (
              <span className="absolute -right-2 -top-1 size-1.5 rounded-full bg-champagne" />
            ) : null}
          </span>
          Bag
        </button>

        <button type="button" onClick={toggleMobileNav} className={itemClass}>
          <Menu className="size-[1.15rem]" aria-hidden />
          Menu
        </button>
      </div>
    </nav>
  );
}
