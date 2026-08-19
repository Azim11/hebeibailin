import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { getBrands, getProducts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Brands",
  description:
    "The maisons we know best — Hermès, Chanel, Louis Vuitton, Goyard, Dior, Gucci and more.",
  path: "/brands",
});

export default async function BrandsIndexPage() {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);

  // Show how deep the collection runs for each house.
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.brandSlug, (counts.get(product.brandSlug) ?? 0) + 1);
  }

  return (
    <>
      <PageBanner
        eyebrow="Maisons"
        title="Discover the Icons"
        description="The houses whose work defines the category — and whose construction, hardware and leathers our specialists know in detail."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {brands.map((brand, index) => {
            const count = counts.get(brand.slug) ?? 0;
            return (
              <Reveal key={brand.id} delay={(index % 3) * 0.08}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="group relative block aspect-4/5 overflow-hidden bg-bone sm:aspect-3/4"
                >
                  <Image
                    src={brand.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/30 transition-colors duration-700 group-hover:bg-ink/50" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                    <h2 className="font-serif text-2xl text-ivory sm:text-[1.75rem]">
                      {brand.name}
                    </h2>
                    <p className="mt-1.5 font-sans text-[0.6875rem] text-ivory/60">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 font-sans text-[0.5625rem] tracking-luxe text-ivory/85 uppercase sm:text-[0.625rem]">
                      Explore
                      <ArrowRight
                        className="size-3 transition-transform duration-500 group-hover:translate-x-1.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </>
  );
}
