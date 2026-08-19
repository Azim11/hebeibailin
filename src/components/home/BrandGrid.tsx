import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Brand tiles: slow image zoom, deepening scrim and a nudging arrow on hover. */
export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-warm py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="Maisons"
          title="Discover the Icons"
          description="The houses whose work defines the category — and whose pieces we know best."
          link={{ label: "All Brands", href: "/brands" }}
          align="left"
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {brands.map((brand, index) => (
            <Reveal key={brand.id} delay={(index % 3) * 0.1}>
              <Link
                href={`/brands/${brand.slug}`}
                className="group relative block aspect-4/5 overflow-hidden bg-bone sm:aspect-3/4"
              >
                <Image
                  src={brand.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-ink/25 transition-colors duration-700 group-hover:bg-ink/45" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="font-serif text-2xl text-ivory sm:text-[1.75rem]">
                    {brand.name}
                  </h3>
                  <span className="mt-2.5 inline-flex items-center gap-2 font-sans text-[0.5625rem] tracking-luxe text-ivory/80 uppercase sm:text-[0.625rem]">
                    Explore
                    <ArrowRight
                      className="size-3 transition-transform duration-500 group-hover:translate-x-1.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
