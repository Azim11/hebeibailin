import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";
import { AlertCircle, FileText, Mail, MapPin, Phone, Scale } from "lucide-react";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms, conditions, and legal agreements governing the use of ${site.name} and the acquisition of luxury goods from ${site.legalName}.`,
  path: "/pages/terms",
});

const termsSections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "authenticity", title: "2. Authenticity Guarantee & Condition" },
  { id: "brand-disclaimer", title: "3. Brand Disclaimer & Independence" },
  { id: "pricing-orders", title: "4. Pricing, Listings & Order Acceptance" },
  { id: "concierge-orders", title: "5. High-Value Concierge Orders" },
  { id: "payment-terms", title: "6. Payment & Anti-Fraud Verification" },
  { id: "shipping-risk", title: "7. Insured Shipping & Title Transfer" },
  { id: "returns-inspection", title: "8. Returns, Inspection & Security Tags" },
  { id: "sourcing-bespoke", title: "9. Custom Sourcing & Consignment" },
  { id: "intellectual-property", title: "10. Intellectual Property Rights" },
  { id: "liability", title: "11. Limitation of Liability & Warranties" },
  { id: "governing-law", title: "12. Governing Law & Dispute Resolution" },
  { id: "contact", title: "13. Inquiries & Contact Details" },
];

export default function TermsPage() {
  const lastUpdated = "August 19, 2026";

  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms governing your access to our website, private concierge services, and the acquisition of luxury handbags and collectible pieces."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          {/* Table of contents sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-line bg-warm/50 p-6">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Sections
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {termsSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="font-sans text-[0.8125rem] text-stone hover:text-ink transition-colors leading-snug"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 border-t border-line pt-4">
                <p className="font-sans text-[0.6875rem] text-taupe">
                  Effective Date: {lastUpdated}
                </p>
              </div>
            </div>
          </aside>

          {/* Terms Content */}
          <div className="flex flex-col gap-14 text-stone font-sans text-[0.9375rem] leading-relaxed">
            {/* Quick summary notice */}
            <Reveal className="border border-line bg-warm p-6 sm:p-8">
              <div className="flex items-center gap-3 text-ink">
                <Scale className="size-5 text-champagne" />
                <h3 className="font-serif text-xl">Legal Notice</h3>
              </div>
              <p className="mt-3 text-[0.875rem] text-stone">
                Please review these Terms &amp; Conditions carefully before completing any
                purchase or utilizing our concierge services. By accessing our platform or
                placing an order, you agree to be bound by these provisions.
              </p>
            </Reveal>

            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                1. Acceptance of Terms
              </h2>
              <p className="mt-4">
                These Terms &amp; Conditions constitute a legally binding agreement between you
                (&ldquo;Client&rdquo;, &ldquo;User&rdquo;, or &ldquo;You&rdquo;) and{" "}
                <strong>{site.legalName}</strong> (operating internationally as &ldquo;
                {site.name}&rdquo;).
              </p>
              <p className="mt-3">
                By browsing, registering an account, booking a showroom appointment, or
                purchasing any piece through <strong>{site.url}</strong>, you acknowledge that
                you have read, understood, and agreed to adhere to these Terms as well as our{" "}
                <Link href="/pages/privacy" className="text-ink underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/pages/returns" className="text-ink underline">
                  Return Policy
                </Link>
                .
              </p>
            </section>

            {/* Section 2 */}
            <section id="authenticity" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                2. Authenticity Guarantee &amp; Condition
              </h2>
              <p className="mt-4">
                Every piece in our catalogue undergoes rigorous, multi-point physical
                authentication conducted by our in-house luxury specialists. We guarantee the
                authenticity of all items sold on {site.name} for life.
              </p>
              <p className="mt-3">
                Items are described and graded in accordance with our strict condition rating
                system (&ldquo;New / Never Worn&rdquo;, &ldquo;Excellent&rdquo;, &ldquo;Very
                Good&rdquo;, &ldquo;Pre-Owned&rdquo;). Because our collection comprises vintage,
                rare, and pre-owned pieces, micro-imperfections consistent with age and gentle
                handling are catalogued in the condition report accompanying each listing.
              </p>
            </section>

            {/* Section 3 */}
            <section id="brand-disclaimer" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                3. Brand Disclaimer &amp; Independence
              </h2>
              <div className="mt-4 border border-line bg-bone/40 p-5">
                <div className="flex items-center gap-2.5 text-ink font-serif text-base">
                  <AlertCircle className="size-4 text-champagne" />
                  <span>Important Trademark Clarification</span>
                </div>
                <p className="mt-2 text-[0.875rem] text-stone">
                  {site.name} and {site.legalName} are independent curators, authenticators,
                  and resellers of genuine luxury items. We are not an authorized dealer,
                  distributor, associate, or affiliate of Hermès, Chanel, Louis Vuitton,
                  Christian Dior, Goyard, Saint Laurent, or any other designer Maison. All brand
                  names, logos, and trademarks displayed on this website are the sole property
                  of their respective registered owners.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="pricing-orders" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                4. Pricing, Listings &amp; Order Acceptance
              </h2>
              <p className="mt-4">
                All prices are listed in <strong>{site.currency}</strong> (United States
                Dollars) unless explicitly specified otherwise. While we endeavor to maintain
                absolute accuracy in our inventory and pricing, rare technical or typographical
                errors may occur.
              </p>
              <p className="mt-3">
                Receipt of an electronic order confirmation does not signify our final
                acceptance of your order. We reserve the right to decline or cancel any order
                prior to dispatch in instances of pricing errors, inventory discrepancies, or
                failed security screening. In such events, all funds will be returned
                immediately.
              </p>
            </section>

            {/* Section 5 */}
            <section id="concierge-orders" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                5. High-Value Concierge Orders
              </h2>
              <p className="mt-4">
                For orders exceeding <strong>${site.conciergeThreshold.toLocaleString()} USD</strong>
                , our private concierge desk oversees transaction verification, identity
                confirmation, and specialized armored or white-glove transport arrangements.
                Payment via direct wire transfer or trusted third-party escrow may be required
                for transactions of this magnitude.
              </p>
            </section>

            {/* Section 6 */}
            <section id="payment-terms" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                6. Payment &amp; Anti-Fraud Verification
              </h2>
              <p className="mt-4">
                We accept major international credit/debit cards, bank wire transfers, and
                approved digital payment services. To protect our collectors against
                unauthorized transactions, orders may be subject to enhanced identity
                verification (including proof of address and 3D-Secure 2.0 authorization) prior
                to fulfillment.
              </p>
            </section>

            {/* Section 7 */}
            <section id="shipping-risk" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                7. Insured Shipping &amp; Title Transfer
              </h2>
              <p className="mt-4">
                All deliveries are handled via tracked priority couriers (DHL Express, FedEx,
                UPS) with 100% full replacement value transit insurance. An adult signature and
                government-issued identification are strictly mandatory upon delivery.
              </p>
              <p className="mt-3">
                Title and risk of loss pass to the Client upon verified delivery and signature
                at the specified destination address.
              </p>
            </section>

            {/* Section 8 */}
            <section id="returns-inspection" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                8. Returns, Inspection &amp; Security Tags
              </h2>
              <p className="mt-4">
                Clients are entitled to a <strong>14-day inspection period</strong> from the
                date of delivery. To qualify for a refund:
              </p>
              <ul className="mt-3 flex flex-col gap-2.5 list-disc pl-5">
                <li>
                  The <strong>serialized security tag</strong> attached to the item must remain
                  completely intact, unsevered, and untampered with.
                </li>
                <li>
                  The item must be returned in the exact condition documented in the condition
                  report, with all original accessories, boxes, dust bags, locks, and paperwork.
                </li>
                <li>
                  A Return Merchandise Authorization (RMA) must be obtained from our concierge
                  prior to shipping.
                </li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="sourcing-bespoke" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                9. Custom Sourcing &amp; Consignment
              </h2>
              <p className="mt-4">
                Bespoke sourcing agreements entered into on behalf of a client to locate rare or
                specific collector pieces are governed by individual sourcing contracts. Sourcing
                deposits and bespoke acquired pieces that conform to the agreed condition report
                are deemed final sale.
              </p>
            </section>

            {/* Section 10 */}
            <section id="intellectual-property" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                10. Intellectual Property Rights
              </h2>
              <p className="mt-4">
                All original photography, high-resolution imagery, editorial texts, branding,
                and web layout on {site.url} are the exclusive intellectual property of{" "}
                <strong>{site.legalName}</strong>. Unauthorized reproduction, scraping, or
                commercial exploitation without our prior written consent is strictly prohibited.
              </p>
            </section>

            {/* Section 11 */}
            <section id="liability" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                11. Limitation of Liability &amp; Warranties
              </h2>
              <p className="mt-4">
                To the fullest extent permitted by applicable law, {site.name} shall not be
                liable for any indirect, incidental, special, or consequential damages arising
                out of or in connection with the purchase of goods or use of our services. Our
                total aggregate liability shall in no circumstance exceed the total purchase
                price paid by the Client for the specific item in dispute.
              </p>
            </section>

            {/* Section 12 */}
            <section id="governing-law" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                12. Governing Law &amp; Dispute Resolution
              </h2>
              <p className="mt-4">
                These Terms and any contractual disputes arising out of or related to your
                transactions with {site.name} shall be governed by and construed in accordance
                with applicable laws. The parties agree to submit to the competent jurisdiction
                for resolution of any dispute that cannot be amicably settled.
              </p>
            </section>

            {/* Section 13 */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                13. Inquiries &amp; Contact Details
              </h2>
              <p className="mt-4">
                If you have any questions or require clarification regarding these Terms &amp;
                Conditions, please contact our legal and customer relations team:
              </p>

              <div className="mt-6 border border-line bg-warm p-6">
                <p className="font-serif text-xl text-ink">{site.legalName}</p>
                <div className="mt-4 flex flex-col gap-3 font-sans text-[0.875rem] text-charcoal">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-taupe" />
                    <span>
                      {site.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-taupe" />
                    <a href={`mailto:${site.email}`} className="link-underline hover:text-ink">
                      {site.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-taupe" />
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      className="link-underline hover:text-ink"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
