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
import type { CartLine, Product } from "@/lib/types";

/**
 * Bag, wishlist, compare tray and recently-viewed state.
 *
 * Persisted to localStorage so a session survives a refresh. Reads happen in an
 * effect rather than during render so the server and first client render agree;
 * `hydrated` lets consumers avoid flashing counts that are about to change.
 */

const STORAGE_KEY = "mr.shop.v1";
const MAX_COMPARE = 4;
const MAX_RECENT = 8;

type PersistedState = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
};

const EMPTY: PersistedState = {
  cart: [],
  wishlist: [],
  compare: [],
  recentlyViewed: [],
};

type ShopContextValue = PersistedState & {
  hydrated: boolean;
  cartCount: number;
  wishlistCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  isComparing: (productId: string) => boolean;
  clearCompare: () => void;
  recordView: (productId: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage(): PersistedState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      compare: Array.isArray(parsed.compare) ? parsed.compare : [],
      recentlyViewed: Array.isArray(parsed.recentlyViewed)
        ? parsed.recentlyViewed
        : [],
    };
  } catch {
    // Corrupt or unavailable storage should never break the storefront.
    return EMPTY;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be full or blocked (private mode); state stays in memory.
    }
  }, [state, hydrated]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setState((prev) => {
      const existing = prev.cart.find((l) => l.productId === productId);
      const cart = existing
        ? prev.cart.map((l) =>
            l.productId === productId
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          )
        : [
            ...prev.cart,
            { productId, quantity, addedAt: new Date().toISOString() },
          ];
      return { ...prev, cart };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((l) => l.productId !== productId),
    }));
  }, []);

  const setCartQuantity = useCallback((productId: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      cart:
        quantity <= 0
          ? prev.cart.filter((l) => l.productId !== productId)
          : prev.cart.map((l) =>
              l.productId === productId ? { ...l, quantity } : l,
            ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, cart: [] }));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId)
        ? prev.wishlist.filter((id) => id !== productId)
        : [productId, ...prev.wishlist],
    }));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id) => id !== productId),
    }));
  }, []);

  const toggleCompare = useCallback((productId: string) => {
    setState((prev) => {
      if (prev.compare.includes(productId)) {
        return {
          ...prev,
          compare: prev.compare.filter((id) => id !== productId),
        };
      }
      // Oldest entry drops out once the tray is full.
      const next = [...prev.compare, productId].slice(-MAX_COMPARE);
      return { ...prev, compare: next };
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      compare: prev.compare.filter((id) => id !== productId),
    }));
  }, []);

  const clearCompare = useCallback(() => {
    setState((prev) => ({ ...prev, compare: [] }));
  }, []);

  const recordView = useCallback((productId: string) => {
    setState((prev) => {
      if (prev.recentlyViewed[0] === productId) return prev;
      const rest = prev.recentlyViewed.filter((id) => id !== productId);
      return { ...prev, recentlyViewed: [productId, ...rest].slice(0, MAX_RECENT) };
    });
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    return {
      ...state,
      hydrated,
      cartCount: state.cart.reduce((sum, l) => sum + l.quantity, 0),
      wishlistCount: state.wishlist.length,
      addToCart,
      removeFromCart,
      setCartQuantity,
      clearCart,
      isInCart: (id) => state.cart.some((l) => l.productId === id),
      toggleWishlist,
      removeFromWishlist,
      isWishlisted: (id) => state.wishlist.includes(id),
      toggleCompare,
      removeFromCompare,
      isComparing: (id) => state.compare.includes(id),
      clearCompare,
      recordView,
    };
  }, [
    state,
    hydrated,
    addToCart,
    removeFromCart,
    setCartQuantity,
    clearCart,
    toggleWishlist,
    removeFromWishlist,
    toggleCompare,
    removeFromCompare,
    clearCompare,
    recordView,
  ]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within <ShopProvider>");
  return ctx;
}

/** Resolve cart lines against a catalogue, dropping products that no longer exist. */
export function resolveCart(cart: CartLine[], catalogue: Product[]) {
  const index = new Map(catalogue.map((p) => [p.id, p]));
  return cart
    .map((line) => {
      const product = index.get(line.productId);
      return product ? { line, product } : null;
    })
    .filter((entry): entry is { line: CartLine; product: Product } =>
      Boolean(entry),
    );
}
