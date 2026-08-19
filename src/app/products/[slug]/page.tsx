import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/product/ProductCard";
import { MobileQuickBuy } from "@/components/product/MobileQuickBuy";
import {
  getProductBySlug,
  getProductsByBrand,
  getProductsInCollection,
  getProducts,
  toSummaries,
} from "@/lib/cms";
import { breadcrumbSchema, jsonLd, pageMetadata, productSchema } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return pageMetadata({
    title: `${product.brand} ${product.name}`,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.images[0]?.url,
  });
}

export default async function ProductDetailPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Fetch related products (same brand or same category)
  const brandProducts = await getProductsByBrand(product.brandSlug);
  const relatedProducts = brandProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: product.brand, href: `/brands/${product.brandSlug}` },
    { name: product.name, href: `/products/${product.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema(crumbs),
          productSchema(product),
        ])}
      />

      <Breadcrumbs crumbs={crumbs} />

      <main className="py-8 lg:py-16">
        <Container size="wide">
          {/* Main Product Showcase Grid */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Gallery Column */}
            <div className="lg:col-span-7">
              <ProductGallery
                images={product.images}
                title={product.name}
                brand={product.brand}
                rareFind={product.rareFind}
                newArrival={product.newArrival}
              />
            </div>

            {/* Info & Purchase Column */}
            <div className="lg:col-span-5">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Complete Tabs & Specifications */}
          <ProductTabs product={product} />

          {/* Concierge Sourcing Callout Banner */}
          <section className="mt-16 bg-warm/70 border border-line p-8 lg:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-champagne" />
                  <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                    Private Sourcing
                  </p>
                </div>
                <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
                  Seeking a Specific {product.brand} Silhouette?
                </h3>
                <p className="mt-2 font-sans text-xs text-stone leading-relaxed">
                  Our private client team sources rare Hermès, Chanel, and Dior configurations directly through our worldwide collector network.
                </p>
              </div>

              <Link
                href="/pages/sourcing"
                className="inline-flex h-12 items-center gap-2 border border-ink bg-ink px-8 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors hover:bg-transparent hover:text-ink whitespace-nowrap"
              >
                Request a Custom Piece
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>

          {/* Related Luxury Products Section */}
          {relatedProducts.length > 0 ? (
            <section className="mt-20 lg:mt-28">
              <div className="flex items-end justify-between border-b border-line pb-6">
                <div>
                  <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                    Curated Collection
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
                    More From {product.brand}
                  </h2>
                </div>
                <Link
                  href={`/brands/${product.brandSlug}`}
                  className="hidden font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors hover:text-champagne sm:block"
                >
                  View All {product.brand}
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {toSummaries(relatedProducts).map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} showActions />
                ))}
              </div>
            </section>
          ) : null}
        </Container>

        {/* Sticky Mobile Quick-Buy */}
        <MobileQuickBuy product={product} />
      </main>
    </>
  );
}
