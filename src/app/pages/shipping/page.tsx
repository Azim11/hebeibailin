import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Lock,
  Mail,
  Package,
  Phone,
  Plane,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Worldwide Shipping & Delivery",
  description: `Learn about insured worldwide shipping, dispatch timelines, discreet white-glove packaging, and customs handling at ${site.name}.`,
  path: "/pages/shipping",
});

const deliveryZones = [
  {
    region: "North America (US & Canada)",
    courier: "DHL Express / FedEx Priority",
    transitTime: "2 — 4 Business Days",
    cost: "Complimentary on select orders",
  },
  {
    region: "Europe & United Kingdom",
    courier: "DHL Express Priority",
    transitTime: "2 — 3 Business Days",
    cost: "Complimentary on select orders",
  },
  {
    region: "Asia Pacific & Middle East",
    courier: "DHL Express / FedEx Priority",
    transitTime: "2 — 5 Business Days",
    cost: "Complimentary on select orders",
  },
  {
    region: "Rest of the World",
    courier: "DHL Express International",
    transitTime: "3 — 7 Business Days",
    cost: "Calculated at checkout",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageBanner
        eyebrow="Client Care"
        title="Shipping & Delivery"
        description="Every piece travels in secure, discreet packaging with 100% full replacement value transit insurance and mandatory signature verification."
        variant="compact"
      />

      {/* 4 Pillars of Shipping */}
      <section className="border-b border-line bg-warm/60 py-12 lg:py-16">
        <Container size="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">100% Fully Insured</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Full replacement value coverage from the moment the parcel leaves our vault
                until it is signed for in your hands.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <Lock className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Discreet White-Glove Box</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Shipped in heavy-gauge unbranded outer packaging with tamper-evident security
                tape to ensure complete confidentiality.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <Plane className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Global Express Courier</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Direct express transit via DHL Express, FedEx Priority, or specialized private
                couriers to over 80 countries.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <Package className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Adult Signature Mandate</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Packages are never left unattended on porches or doorsteps; adult recipient
                signature is strictly enforced.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Delivery Schedule Table */}
      <Container size="wide" className="py-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Global Destinations
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            Estimated Delivery Timelines
          </h2>
          <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
            All orders undergo final inspection and serial verification before being
            dispatched within 24 to 48 business hours of payment confirmation.
          </p>
        </Reveal>

        <div className="mt-12 overflow-x-auto border border-line">
          <table className="w-full text-left font-sans text-[0.875rem]">
            <thead className="border-b border-line bg-warm font-sans text-[0.6875rem] tracking-luxe text-taupe uppercase">
              <tr>
                <th className="p-4 sm:px-6 sm:py-5 font-normal">Destination Region</th>
                <th className="p-4 sm:px-6 sm:py-5 font-normal">Carrier Service</th>
                <th className="p-4 sm:px-6 sm:py-5 font-normal">Transit Time</th>
                <th className="p-4 sm:px-6 sm:py-5 font-normal">Rates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-ivory">
              {deliveryZones.map((zone) => (
                <tr key={zone.region} className="transition-colors hover:bg-warm/30">
                  <td className="p-4 sm:px-6 sm:py-5 font-serif text-base text-ink font-normal">
                    {zone.region}
                  </td>
                  <td className="p-4 sm:px-6 sm:py-5 text-stone">{zone.courier}</td>
                  <td className="p-4 sm:px-6 sm:py-5 text-charcoal font-medium">
                    {zone.transitTime}
                  </td>
                  <td className="p-4 sm:px-6 sm:py-5 text-stone">{zone.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {/* Packaging & Customs Grid */}
      <section className="border-t border-line bg-bone/40 py-16 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Packaging Details */}
            <Reveal className="border border-line bg-ivory p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Package className="size-6 text-champagne" />
                <h3 className="font-serif text-2xl text-ink">Presentation &amp; Packaging</h3>
              </div>
              <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
                We believe that opening a piece should feel as ceremonial as acquiring it in
                a flagship salon. Each bag is nestled in museum-grade acid-free tissue paper,
                placed within its Maison dust bag, and boxed with custom archival support.
              </p>

              <div className="mt-6 flex flex-col gap-3.5 border-t border-line pt-6">
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    Includes certified Condition Report and official Certificate of
                    Authenticity.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    Hardware protectors and internal bolster pillows to preserve shape
                    throughout transit.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    Double-walled shock-absorbent outer master carton for maximum structural
                    protection.
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Customs & Duties */}
            <Reveal delay={0.12} className="border border-line bg-ivory p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <Globe2 className="size-6 text-champagne" />
                <h3 className="font-serif text-2xl text-ink">Customs, Duties &amp; Taxes</h3>
              </div>
              <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
                For cross-border international shipments, import tariffs, value-added taxes
                (VAT), and handling fees may be assessed by your local customs authority upon
                entry into your country.
              </p>

              <div className="mt-6 flex flex-col gap-3.5 border-t border-line pt-6">
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <span className="font-serif font-medium text-ink">Clearance:</span>
                  <span>
                    DHL Express and FedEx handle customs clearance directly, contacting you via
                    SMS or email with payment links if import duty is due.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <span className="font-serif font-medium text-ink">Concierge DDP:</span>
                  <span>
                    For orders over $20,000, our private concierge can arrange Delivered Duty
                    Paid (DDP) terms upon request.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Concierge Help Banner */}
      <Container size="wide" className="py-16 lg:py-24">
        <Reveal className="border border-line bg-warm p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Special Logistics
              </p>
              <h2 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">
                Have specific delivery requirements?
              </h2>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-stone">
                From coordinated weekend arrivals to private courier hand-deliveries, our
                concierge is ready to accommodate your preferences.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 font-sans text-[0.875rem] text-stone">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-charcoal hover:text-ink transition-colors"
                >
                  <Mail className="size-4 text-taupe" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-charcoal hover:text-ink transition-colors"
                >
                  <Phone className="size-4 text-taupe" />
                  <span>{site.phone}</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/pages/contact"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory transition-colors hover:bg-charcoal"
              >
                Contact Concierge
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/pages/returns"
                className="inline-flex items-center gap-2 border border-line bg-ivory px-6 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink transition-colors hover:border-taupe"
              >
                View Returns Policy
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
