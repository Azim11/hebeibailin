"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCatalogue } from "@/store/catalogue";
import { useShop } from "@/store/shop";

/**
 * Docked tray listing products staged for comparison. Hidden on the compare
 * page itself, where the full table is already on screen.
 */
export function CompareTray() {
  const { compare, removeFromCompare, clearCompare, hydrated } = useShop();
  const { resolve } = useCatalogue();
  const pathname = usePathname();

  const products = resolve(compare);
  const visible = hydrated && products.length > 0 && pathname !== "/compare";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-16 z-30 border-t border-line bg-ivory/98 backdrop-blur-sm lg:bottom-0"
        >
          <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 py-3 sm:px-8 lg:px-12">
            <p className="hidden shrink-0 font-sans text-[0.625rem] tracking-luxe text-taupe uppercase sm:block">
              Compare ({products.length})
            </p>

            <ul className="flex flex-1 items-center gap-2.5 overflow-x-auto no-scrollbar">
              {products.map((product) => (
                <li key={product.id} className="relative shrink-0">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block size-14 overflow-hidden bg-warm"
                    aria-label={`${product.brand} ${product.name}`}
                  >
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : null}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(product.id)}
                    aria-label={`Remove ${product.name} from comparison`}
                    className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center bg-ink text-ivory"
                  >
                    <X className="size-2.5" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={clearCompare}
              className="hidden shrink-0 font-sans text-[0.625rem] tracking-luxe text-taupe uppercase transition-colors hover:text-ink sm:block"
            >
              Clear
            </button>

          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
