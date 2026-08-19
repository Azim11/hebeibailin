"use client";

import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useShop } from "@/store/shop";
import { useUI } from "@/store/ui";

type MobileQuickBuyProps = {
  product: Product;
};

export function MobileQuickBuy({ product }: MobileQuickBuyProps) {
  const { addToCart, isInCart } = useShop();
  const { openCart } = useUI();
  const inCart = isInCart(product.id);
  const isAvailable = product.availability === "In Stock";

  const handleAdd = () => {
    if (!isAvailable) return;
    addToCart(product.id);
    openCart();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-line bg-ivory/95 p-4 shadow-luxe backdrop-blur-md lg:hidden">
      <div>
        <p className="font-serif text-base text-ink line-clamp-1">{product.name}</p>
        <p className="font-sans text-xs font-semibold text-charcoal">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>

      <button
        onClick={handleAdd}
        disabled={!isAvailable}
        className="flex h-11 items-center gap-2 border border-ink bg-ink px-6 font-sans text-xs tracking-luxe text-ivory uppercase transition-colors hover:bg-transparent hover:text-ink disabled:opacity-50"
      >
        <ShoppingBag className="size-3.5" />
        {inCart ? "In Bag" : isAvailable ? "Add to Bag" : product.availability}
      </button>
    </div>
  );
}
