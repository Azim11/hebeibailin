import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";
import { Mail, MapPin, Phone, Shield } from "lucide-react";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Learn how ${site.legalName} (operating as ${site.name}) collects, protects, uses, and respects your personal data.`,
  path: "/pages/privacy",
});

const sections = [
  { id: "overview", title: "1. Overview & Data Controller" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "collection-methods", title: "3. How We Collect Your Data" },
  { id: "purposes-legal-basis", title: "4. Purposes & Legal Bases for Processing" },
  { id: "third-parties", title: "5. Third-Party Disclosures & Processors" },
  { id: "international-transfers", title: "6. International Data Transfers" },
  { id: "data-retention", title: "7. Data Retention Periods" },
  { id: "security-measures", title: "8. Security & Encryption Standards" },
  { id: "your-rights", title: "9. Your Data Protection Rights" },
  { id: "cookies", title: "10. Cookies & Tracking Technologies" },
  { id: "contact-dpo", title: "11. Contact & Data Protection Requests" },
];

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026";

  return (
    <>
      <PageBanner
        eyebrow="Legal & Privacy"
        title="Privacy Policy"
        description="Our commitment to safeguarding your personal information, respecting your privacy rights, and ensuring full transparency across all transactions."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          {/* Table of contents sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-line bg-warm/50 p-6">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Contents
              </p>
              <nav className="mt-4 flex flex-col gap-2.5">
                {sections.map((sec) => (
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
                  Last Updated: {lastUpdated}
                </p>
              </div>
            </div>
          </aside>

          {/* Policy Body */}
          <div className="flex flex-col gap-14 text-stone font-sans text-[0.9375rem] leading-relaxed">
            {/* Quick summary notice */}
            <Reveal className="border border-line bg-warm p-6 sm:p-8">
              <div className="flex items-center gap-3 text-ink">
                <Shield className="size-5 text-champagne" />
                <h3 className="font-serif text-xl">At a Glance</h3>
              </div>
              <p className="mt-3 text-[0.875rem] text-stone">
                We believe in uncompromising privacy. We never sell or rent your personal
                information. We only process data required to authenticate, insure, and
                deliver your orders, deliver personalized concierge services, and fulfill
                our legal obligations under international privacy laws.
              </p>
            </Reveal>

            {/* Section 1 */}
            <section id="overview" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                1. Overview &amp; Data Controller
              </h2>
              <p className="mt-4">
                This Privacy Policy explains how <strong>{site.legalName}</strong> (referred
                to as &ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) collects, uses, stores, and protects personal data obtained
                from clients, visitors, and partners when interacting with our website (
                <a href={site.url} className="text-ink underline">
                  {site.url}
                </a>
                ) or our private concierge services.
              </p>
              <p className="mt-3">
                For the purposes of applicable data protection legislation (including the
                General Data Protection Regulation (GDPR), the UK GDPR, and the California
                Consumer Privacy Act (CCPA)), the data controller responsible for your
                personal data is <strong>{site.legalName}</strong>.
              </p>
            </section>

            {/* Section 2 */}
            <section
              id="information-collected"
              className="scroll-mt-24 border-b border-line pb-12"
            >
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                2. Information We Collect
              </h2>
              <p className="mt-4">
                Depending on your interactions with us, we may collect and process the
                following categories of personal information:
              </p>
              <ul className="mt-4 flex flex-col gap-3 list-disc pl-5">
                <li>
                  <strong>Identity &amp; Contact Details:</strong> First and last name, title,
                  email address, telephone number, billing address, and physical shipping
                  destination.
                </li>
                <li>
                  <strong>Transactional Data:</strong> Details of items acquired, payment
                  references, order history, insurance paperwork, condition certificates,
                  and return or exchange requests. <em>(Note: Complete payment card details
                  are transmitted securely directly to our PCI-DSS Level 1 certified payment
                  processors and are never stored on our servers).</em>
                </li>
                <li>
                  <strong>Concierge &amp; Sourcing Correspondence:</strong> Inquiries, bag
                  wish lists, bespoke request specifications, private appointment notes, and
                  communication preferences.
                </li>
                <li>
                  <strong>Technical &amp; Browsing Data:</strong> IP address, browser type,
                  operating system, device specifications, approximate geolocation, pages
                  visited, time spent per page, and referral URLs.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section
              id="collection-methods"
              className="scroll-mt-24 border-b border-line pb-12"
            >
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                3. How We Collect Your Data
              </h2>
              <p className="mt-4">
                We collect personal information directly from you when you:
              </p>
              <ul className="mt-3 flex flex-col gap-2.5 list-disc pl-5">
                <li>Place an order or make a purchase inquiry on our website.</li>
                <li>Subscribe to our editorial newsletter or exclusive VIP releases.</li>
                <li>Contact our client advisors via email, telephone, or online forms.</li>
                <li>Submit a consignment or valuation request.</li>
                <li>Schedule a private appointment at our showroom or request a virtual viewing.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section
              id="purposes-legal-basis"
              className="scroll-mt-24 border-b border-line pb-12"
            >
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                4. Purposes &amp; Legal Bases for Processing
              </h2>
              <p className="mt-4">
                We process your personal data strictly under valid legal grounds:
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <div className="border border-line bg-warm/30 p-5">
                  <h3 className="font-serif text-lg text-ink">
                    A. Performance of a Contract
                  </h3>
                  <p className="mt-2 text-[0.875rem]">
                    To process your order, arrange insured worldwide courier transit, issue
                    authenticity certificates, and handle customer service or return requests.
                  </p>
                </div>
                <div className="border border-line bg-warm/30 p-5">
                  <h3 className="font-serif text-lg text-ink">
                    B. Legitimate Business Interests
                  </h3>
                  <p className="mt-2 text-[0.875rem]">
                    To maintain the security of our platform, prevent financial fraud, protect
                    high-value shipments, and analyze site performance to refine our curated
                    offerings.
                  </p>
                </div>
                <div className="border border-line bg-warm/30 p-5">
                  <h3 className="font-serif text-lg text-ink">
                    C. Legal &amp; Regulatory Obligations
                  </h3>
                  <p className="mt-2 text-[0.875rem]">
                    To maintain accounting records, comply with customs and cross-border trade
                    mandates, and adhere to anti-money laundering (AML) protocols.
                  </p>
                </div>
                <div className="border border-line bg-warm/30 p-5">
                  <h3 className="font-serif text-lg text-ink">D. Consent</h3>
                  <p className="mt-2 text-[0.875rem]">
                    Where you have provided explicit consent to receive our marketing
                    newsletters or personalized acquisition previews (which you may revoke at
                    any time).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="third-parties" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                5. Third-Party Disclosures &amp; Processors
              </h2>
              <p className="mt-4">
                We do not sell, license, or trade your personal data. We disclose your
                information only to trusted third-party service providers essential for our
                operations:
              </p>
              <ul className="mt-3 flex flex-col gap-2.5 list-disc pl-5">
                <li>
                  <strong>Payment Gateways:</strong> Encrypted financial processors (e.g.
                  Stripe, Apple Pay) for transaction settlement.
                </li>
                <li>
                  <strong>Logistics &amp; Insured Couriers:</strong> DHL Express, FedEx, UPS,
                  and armored transport services for white-glove, signature-verified delivery.
                </li>
                <li>
                  <strong>Authentication Registries:</strong> Secure record-keeping
                  infrastructure to preserve item provenance and serial certificate validation.
                </li>
                <li>
                  <strong>Legal &amp; Professional Advisors:</strong> Certified auditors, legal
                  counsel, and regulatory authorities when mandated by law.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section
              id="international-transfers"
              className="scroll-mt-24 border-b border-line pb-12"
            >
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                6. International Data Transfers
              </h2>
              <p className="mt-4">
                Because {site.name} operates globally, your data may be transferred to and
                processed in countries outside your country of residence. In such cases, we
                ensure standard contractual clauses (SCCs), adequacy decisions, or equivalent
                statutory safeguards are established to ensure your information receives an
                adequate level of protection.
              </p>
            </section>

            {/* Section 7 */}
            <section id="data-retention" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                7. Data Retention Periods
              </h2>
              <p className="mt-4">
                We retain personal data only for as long as necessary to fulfill the purposes
                outlined in this policy. Transaction records and provenance certificates are
                retained for a statutory period of 7 years to meet tax, auditing, and
                authentication verification requirements, after which data is securely deleted
                or anonymized.
              </p>
            </section>

            {/* Section 8 */}
            <section
              id="security-measures"
              className="scroll-mt-24 border-b border-line pb-12"
            >
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                8. Security &amp; Encryption Standards
              </h2>
              <p className="mt-4">
                We implement robust technical and organizational security measures, including
                TLS 1.3 encryption for data in transit, AES-256 encryption for stored data,
                multi-factor authentication, and strict access controls. Our staff and partners
                are bound by confidentiality obligations.
              </p>
            </section>

            {/* Section 9 */}
            <section id="your-rights" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                9. Your Data Protection Rights
              </h2>
              <p className="mt-4">
                Depending on your jurisdiction (such as the EU/EEA, UK, or California), you
                hold specific statutory rights regarding your personal data:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="border border-line bg-warm/20 p-4">
                  <strong className="block font-serif text-ink">Right to Access</strong>
                  <span className="text-[0.8125rem]">
                    Request a copy of the personal data we hold about you.
                  </span>
                </div>
                <div className="border border-line bg-warm/20 p-4">
                  <strong className="block font-serif text-ink">Right to Rectification</strong>
                  <span className="text-[0.8125rem]">
                    Request correction of inaccurate or incomplete information.
                  </span>
                </div>
                <div className="border border-line bg-warm/20 p-4">
                  <strong className="block font-serif text-ink">Right to Erasure</strong>
                  <span className="text-[0.8125rem]">
                    Request deletion of your data where no overriding legal obligation exists.
                  </span>
                </div>
                <div className="border border-line bg-warm/20 p-4">
                  <strong className="block font-serif text-ink">Right to Restriction &amp; Portability</strong>
                  <span className="text-[0.8125rem]">
                    Receive your data in a structured, machine-readable format.
                  </span>
                </div>
              </div>
            </section>

            {/* Section 10 */}
            <section id="cookies" className="scroll-mt-24 border-b border-line pb-12">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                10. Cookies &amp; Tracking Technologies
              </h2>
              <p className="mt-4">
                Our website utilizes essential session cookies (required for shopping bag
                functionality and secure checkout) as well as anonymous performance metrics.
                You may configure your browser to reject non-essential cookies at any time
                without affecting your ability to browse our collection.
              </p>
            </section>

            {/* Section 11 */}
            <section id="contact-dpo" className="scroll-mt-24">
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                11. Contact &amp; Data Protection Requests
              </h2>
              <p className="mt-4">
                To exercise any of your data rights or if you have questions regarding this
                policy, please direct inquiries to our Data Privacy Officer:
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
