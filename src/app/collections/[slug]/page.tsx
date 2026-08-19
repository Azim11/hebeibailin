import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageBanner } from "@/components/shop/PageBanner";
import { CollectionBrowser } from "@/components/shop/CollectionBrowser";
import {
  getBrands,
  getCategories,
  getCollectionBySlug,
  getCollections,
  getPriceBounds,
  getProductsInCollection,
  toSummaries,
} from "@/lib/cms";
import { breadcrumbSchema, jsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata(props: PageProps<"/collections/[slug]">) {
  const { slug } = await props.params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};

  return pageMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: collection.image,
  });
}

export default async function CollectionPage(props: PageProps<"/collections/[slug]">) {
  const { slug } = await props.params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const [products, brands, categories] = await Promise.all([
    getProductsInCollection(slug),
    getBrands(),
    getCategories(),
  ]);
  const priceBounds = await getPriceBounds(products);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: collection.name, href: `/collections/${collection.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(crumbs))}
      />

      <PageBanner
        eyebrow="Collection"
        title={collection.name.toUpperCase()}
        description={collection.description}
        image={collection.image}
      />

      <Breadcrumbs crumbs={crumbs} />

      <Container size="wide" className="pb-24 pt-4 lg:pb-32">
        {/* Reading the query string requires a Suspense boundary above the client tree. */}
        <Suspense fallback={<div className="py-24" />}>
          <CollectionBrowser
            products={toSummaries(products)}
            brands={brands}
            categories={categories}
            priceBounds={priceBounds}
          />
        </Suspense>
      </Container>
    </>
  );
}
