import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductSummary } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Editorial feature row. Uses large photography rather than compact cards, and
 * alternates the vertical offset so the row reads as a magazine spread.
 */
export function FeaturedCollection({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Featured"
          title={
            <>
              The Season&rsquo;s
              <br />
              Most Coveted
            </>
          }
          description="Four pieces chosen this month for the quality of their construction and the difficulty of finding them elsewhere."
        />

        <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-x-8">
          {products.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 0.1}
              as="article"
              // Offsetting alternate columns breaks the grid rhythm on desktop.
              className={index % 2 === 1 ? "lg:mt-20" : ""}
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-3/4 overflow-hidden bg-warm">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  ) : null}
                </div>

                <h3 className="mt-6 font-serif text-2xl leading-snug text-ink">
                  {product.name}
                </h3>
                <p className="mt-1.5 font-sans text-[0.8125rem] text-stone">
                  {product.shortDescription}
                </p>
                <p className="mt-4 font-sans text-[0.9375rem] text-ink">
                  {formatPrice(product.price, product.currency)}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-luxe text-ink uppercase">
                  View Product
                  <ArrowRight
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
