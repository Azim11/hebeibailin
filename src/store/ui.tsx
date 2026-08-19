"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { ProductSummary } from "@/lib/types";

/**
 * Overlay coordination: search, bag drawer, mobile navigation, quick view.
 *
 * Only one overlay is open at a time, and any of them locks body scroll.
 */

type UIContextValue = {
  searchOpen: boolean;
  cartOpen: boolean;
  mobileNavOpen: boolean;
  quickViewProduct: ProductSummary | null;
  openSearch: () => void;
  closeSearch: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleMobileNav: () => void;
  closeMobileNav: () => void;
  openQuickView: (product: ProductSummary) => void;
  closeQuickView: () => void;
  closeAll: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductSummary | null>(null);
  const pathname = usePathname();

  const anyOpen = searchOpen || cartOpen || mobileNavOpen || Boolean(quickViewProduct);

  const closeAll = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(false);
    setMobileNavOpen(false);
    setQuickViewProduct(null);
  }, []);

  // Navigating away should never leave an overlay stranded on screen.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  // Lock body scroll while an overlay is open, compensating for the scrollbar
  // so the page behind does not shift horizontally.
  useEffect(() => {
    if (!anyOpen) return;
    const { body, documentElement } = document;
    const scrollbar = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [anyOpen]);

  useEffect(() => {
    if (!anyOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen, closeAll]);

  const value = useMemo<UIContextValue>(
    () => ({
      searchOpen,
      cartOpen,
      mobileNavOpen,
      quickViewProduct,
      openSearch: () => {
        closeAll();
        setSearchOpen(true);
      },
      closeSearch: () => setSearchOpen(false),
      openCart: () => {
        closeAll();
        setCartOpen(true);
      },
      closeCart: () => setCartOpen(false),
      toggleMobileNav: () =>
        setMobileNavOpen((open) => {
          if (!open) {
            setSearchOpen(false);
            setCartOpen(false);
            setQuickViewProduct(null);
          }
          return !open;
        }),
      closeMobileNav: () => setMobileNavOpen(false),
      openQuickView: (product) => {
        closeAll();
        setQuickViewProduct(product);
      },
      closeQuickView: () => setQuickViewProduct(null),
      closeAll,
    }),
    [searchOpen, cartOpen, mobileNavOpen, quickViewProduct, closeAll],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}
