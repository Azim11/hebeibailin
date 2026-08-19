import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { getCollections } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collections",
  description:
    "Browse the house collections — new arrivals, rare finds, vintage, investment bags and everyday luxury.",
  path: "/collections",
});

export default async function CollectionsIndexPage() {
  const collections = await getCollections();

  return (
    <>
      <PageBanner
        eyebrow="Browse"
        title="Collections"
        description="Curated groupings of the collection, from the newest arrivals to the pieces collectors wait years to see."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {collections.map((collection, index) => (
            <Reveal key={collection.id} delay={(index % 3) * 0.1}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-warm">
                  <Image
                    src={collection.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-ink/25" />
                </div>

                <h2 className="mt-5 font-serif text-2xl text-ink">{collection.name}</h2>
                <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-stone">
                  {collection.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-luxe text-ink uppercase">
                  Explore
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
    </>
  );
}
