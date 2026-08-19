import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageBanner } from "@/components/shop/PageBanner";
import { CollectionBrowser } from "@/components/shop/CollectionBrowser";
import {
  getBrandBySlug,
  getBrands,
  getCategories,
  getPriceBounds,
  getProductsByBrand,
  toSummaries,
} from "@/lib/cms";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata(props: PageProps<"/brands/[slug]">) {
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return {};

  return pageMetadata({
    title: `${brand.name} Handbags`,
    description: brand.description,
    path: `/brands/${brand.slug}`,
    image: brand.image,
  });
}

export default async function BrandPage(props: PageProps<"/brands/[slug]">) {
  const { slug } = await props.params;
  const brand = await getBrandBySlug(slug);
  if (!brand) notFound();

  const [products, brands, categories] = await Promise.all([
    getProductsByBrand(slug),
    getBrands(),
    getCategories(),
  ]);
  const priceBounds = await getPriceBounds(products);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))}
      />

      <PageBanner
        eyebrow="Maison"
        title={brand.name}
        description={brand.tagline}
        image={brand.image}
      />

      <Breadcrumbs crumbs={crumbs} />

      <Container size="wide" className="pb-24 pt-4 lg:pb-32">
        <div className="mb-14 max-w-3xl border-b border-line pb-12 lg:mb-16">
          <p className="font-sans text-[0.9375rem] leading-relaxed text-stone">
            {brand.description}
          </p>
        </div>

        {products.length > 0 ? (
          <Suspense fallback={<div className="py-24" />}>
            <CollectionBrowser
              products={toSummaries(products)}
              brands={brands}
              categories={categories}
              priceBounds={priceBounds}
              // The brand is fixed by the route, so hide that facet.
              lockedFacets={["brand"]}
            />
          </Suspense>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-ink">
              Nothing from this house right now
            </p>
            <p className="mx-auto mt-3 max-w-sm font-sans text-[0.875rem] text-stone">
              Our sourcing team can look for a specific piece on your behalf.
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
