import Link from "next/link";
import type { ProductSummary } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewArrivals({ products }: { products: ProductSummary[] }) {
  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="The Collection"
          title="Six Signature Bags"
          description="Six original, logo-free silhouettes selected for their materials, proportion and everyday versatility."
        />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:grid-cols-3 lg:mt-20 lg:gap-x-8 lg:gap-y-16">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} showActions />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/collections/handbags"
            className="link-underline font-sans text-[0.6875rem] tracking-luxe text-ink uppercase"
          >
            View the complete collection
          </Link>
        </div>
      </Container>
    </section>
  );
}
