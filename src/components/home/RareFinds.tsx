import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductSummary } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CATEGORIES = [
  { label: "Limited Edition", href: "/collections/limited-edition" },
  { label: "Vintage", href: "/collections/vintage" },
  { label: "Special Order", href: "/collections/rare-finds?tag=special-order" },
  { label: "Collector's Pieces", href: "/collections/rare-finds" },
  { label: "Hard-to-Find", href: "/collections/rare-finds" },
];

/**
 * Editorial rare-finds row: one tall lead image with two supporting pieces,
 * rather than a uniform grid.
 */
export function RareFinds({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) return null;

  const [lead, ...rest] = products;
  const supporting = rest.slice(0, 2);

  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="For Collectors"
          title="Rare Finds"
          description="Exceptional pieces for collectors who appreciate the extraordinary."
          link={{ label: "View All", href: "/collections/rare-finds" }}
          align="left"
        />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          {/* Lead piece */}
          <Reveal>
            <Link href={`/products/${lead.slug}`} className="group block">
              <div className="relative aspect-4/5 overflow-hidden bg-warm lg:aspect-3/4">
                {lead.images[0] ? (
                  <Image
                    src={lead.images[0].url}
                    alt={lead.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                ) : null}
              </div>

              <div className="mt-6 flex items-end justify-between gap-6">
                <div>
                  <h3 className="font-serif text-3xl text-ink">{lead.name}</h3>
                  <p className="mt-1.5 font-sans text-[0.8125rem] text-stone">
                    {lead.shortDescription}
                  </p>
                </div>
                <p className="shrink-0 font-sans text-[0.9375rem] text-ink">
                  {formatPrice(lead.price, lead.currency)}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-6 lg:gap-8">
            {supporting.map((product, index) => (
              <Reveal key={product.id} delay={0.1 + index * 0.1}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-5 sm:gap-8"
                >
                  <div className="relative aspect-square w-32 shrink-0 overflow-hidden bg-warm sm:w-48">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        sizes="(min-width: 640px) 192px, 128px"
                        className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-serif text-xl text-ink sm:text-2xl">
                      {product.name}
                    </h3>
                    <p className="mt-1 font-sans text-[0.75rem] text-stone">
                      {product.shortDescription}
                    </p>
                    <p className="mt-3 font-sans text-[0.875rem] text-ink">
                      {formatPrice(product.price, product.currency)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}

            {/* Category rail */}
            <Reveal delay={0.3} className="mt-2 border-t border-line pt-8">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                Browse Rare
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {CATEGORIES.map((category) => (
                  <li key={category.label}>
                    <Link
                      href={category.href}
                      className="group inline-flex items-center gap-1.5 font-sans text-[0.8125rem] text-charcoal transition-colors hover:text-ink"
                    >
                      {category.label}
                      <ArrowRight
                        className="size-3 text-taupe transition-transform duration-500 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
