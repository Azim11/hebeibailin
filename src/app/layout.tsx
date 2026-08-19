import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { SearchOverlay } from "@/components/overlays/SearchOverlay";
import { CartDrawer } from "@/components/overlays/CartDrawer";
import { QuickViewModal } from "@/components/overlays/QuickViewModal";
import { CompareTray } from "@/components/overlays/CompareTray";
import { AuthProvider } from "@/store/auth";
import { ShopProvider } from "@/store/shop";
import { UIProvider } from "@/store/ui";
import { CatalogueProvider } from "@/store/catalogue";
import { getBrands, getCollections, getProducts, toSummaries } from "@/lib/cms";
import { announcements, site } from "@/lib/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Navigation data is fetched server-side so the mega menu reflects the CMS.
  const [brands, collections, products] = await Promise.all([
    getBrands(),
    getCollections(),
    getProducts(),
  ]);

  const announcement = announcements.find((a) => a.active) ?? null;

  // Overlays search the full catalogue; summaries keep the payload light.
  const catalogue = toSummaries(products);

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema(), websiteSchema()]),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>

        <AuthProvider>
          <CatalogueProvider products={catalogue}>
            <ShopProvider>
              <UIProvider>
                <AnnouncementBar announcement={announcement} />
                <Header brands={brands} collections={collections} />

                <main id="main" className="min-h-[60vh] pb-16 lg:pb-0">
                  {children}
                </main>

                <Footer />
                <MobileTabBar />

                <SearchOverlay />
                <CartDrawer />
                <QuickViewModal />
                <CompareTray />
              </UIProvider>
            </ShopProvider>
          </CatalogueProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
