import type { ProductSummary } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type ProductGridProps = {
  products: ProductSummary[];
  showActions?: boolean;
  /** Desktop column count; mobile is always two-up. */
  columns?: 3 | 4;
  /** Stagger the reveal of the first row only, to avoid a long cascade. */
  animate?: boolean;
  emptyMessage?: string;
};

export function ProductGrid({
  products,
  showActions = false,
  columns = 4,
  animate = true,
  emptyMessage = "No pieces match this selection.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-24 text-center font-sans text-sm text-stone">{emptyMessage}</p>
    );
  }

  const columnClass =
    columns === 3
      ? "grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid gap-x-4 gap-y-12 sm:gap-x-6 lg:gap-x-8 lg:gap-y-16 ${columnClass}`}>
      {products.map((product, index) =>
        animate ? (
          <Reveal key={product.id} delay={Math.min(index, columns) * 0.08} as="div">
            <ProductCard
              product={product}
              showActions={showActions}
              priority={index < 4}
              sizes={
                columns === 3
                  ? "(min-width: 1024px) 33vw, 50vw"
                  : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              }
            />
          </Reveal>
        ) : (
          <ProductCard
            key={product.id}
            product={product}
            showActions={showActions}
            priority={index < 4}
          />
        ),
      )}
    </div>
  );
}
