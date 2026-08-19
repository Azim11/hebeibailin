import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  PackageCheck,
  Phone,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Returns & Exchanges Policy",
  description: `Understand our 14-day return and exchange policy, security tag requirements, and insured return procedure at ${site.name}.`,
  path: "/pages/returns",
});

const returnSteps = [
  {
    step: "01",
    title: "Request Return Authorization",
    description:
      "Contact our concierge within 14 calendar days of delivery at bfvt6239@outlook.com with your order number. We will issue a Return Merchandise Authorization (RMA) and a prepaid, fully insured shipping label.",
  },
  {
    step: "02",
    title: "Securely Repack the Piece",
    description:
      "Ensure the Hebei Bailin security tag remains untampered and intact. Pack the item in its original box with dust bags, clochette, lock, keys, shoulder straps, authenticity certificates, and accessories.",
  },
  {
    step: "03",
    title: "Insured Courier Handover",
    description:
      "Affix the prepaid courier label to the exterior carton. Hand over the package to the designated carrier (DHL Express / FedEx) or schedule a private white-glove pickup with our team.",
  },
  {
    step: "04",
    title: "Inspection & Prompt Refund",
    description:
      "Upon receipt at our intake atelier, our specialists inspect the item within 48 business hours to verify matching serial codes and condition. Full refunds are processed to your original payment method within 3–5 business days.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Client Care"
        title="Returns & Exchanges"
        description="A transparent, straightforward policy designed to allow confident inspection while preserving the provenance of rare luxury pieces."
        variant="compact"
      />

      {/* Highlights Bar */}
      <section className="border-b border-line bg-warm/60 py-12 lg:py-16">
        <Container size="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <Clock className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">14-Day Inspection</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Evaluate your piece in person for up to 14 days from the moment signature
                is confirmed upon delivery.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Security Tag Protection</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Returns are accepted on all pieces as long as our unique, tamper-evident
                security ribbon remains attached.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <Truck className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Fully Insured Transit</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                Every approved return travels via tracked priority courier with 100%
                coverage for full replacement value.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                <RotateCcw className="size-5" />
              </div>
              <h3 className="font-serif text-lg text-ink">Swift Refund Processing</h3>
              <p className="font-sans text-[0.8125rem] leading-relaxed text-stone">
                In-house inspection completed within 48 hours of delivery; funds returned
                directly to your original payment method.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Step-by-Step Return Process */}
      <Container size="wide" className="py-16 lg:py-24">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Step-by-Step
          </p>
          <h2 className="mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
            How to Return or Exchange a Piece
          </h2>
          <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
            We strive to make every client interaction seamless. Follow these four simple
            steps to return an item safely.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {returnSteps.map((item, index) => (
            <Reveal
              key={item.step}
              delay={index * 0.1}
              className="relative border border-line bg-warm/30 p-8"
            >
              <span className="font-serif text-4xl text-champagne/60 font-light">
                {item.step}
              </span>
              <h3 className="mt-5 font-serif text-xl text-ink">{item.title}</h3>
              <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-stone">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Security Tag Notice & Conditions Grid */}
      <section className="border-t border-line bg-bone/40 py-16 lg:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Security Tag Policy */}
            <Reveal className="border border-line bg-ivory p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <ShieldAlert className="size-6 text-champagne" />
                <h3 className="font-serif text-2xl text-ink">
                  Security Tag &amp; Inspection Policy
                </h3>
              </div>
              <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
                To guarantee the authenticity, condition, and unbroken provenance of every
                piece in our vault, each bag is fitted with a serialized, tamper-evident
                security tag prior to dispatch.
              </p>

              <div className="mt-6 flex flex-col gap-3.5 border-t border-line pt-6">
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    You may inspect the bag thoroughly, test zippers, and examine leather
                    while the tag remains in place.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    Removal, cutting, or tampering with the security ribbon will render the
                    item <strong>final sale</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                  <span>
                    All original accompaniments (boxes, dust bags, locks, keys, clochette,
                    authenticity cards) must be returned together.
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Non-returnable Items & Exchanges */}
            <Reveal delay={0.12} className="border border-line bg-ivory p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <PackageCheck className="size-6 text-champagne" />
                <h3 className="font-serif text-2xl text-ink">
                  Exchanges &amp; Custom Sourcing
                </h3>
              </div>
              <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
                Looking to exchange for a different colorway, leather, or silhouette? Our
                concierge team will gladly reserve your replacement piece and apply your
                credit immediately upon receiving your return.
              </p>

              <div className="mt-6 flex flex-col gap-3.5 border-t border-line pt-6">
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <span className="font-serif font-medium text-ink">Note:</span>
                  <span>
                    Bespoke sourcing orders acquired specifically upon request from private
                    archives or auction houses are considered final sale once delivered as
                    specified in the sourcing agreement.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-[0.875rem] text-charcoal">
                  <span className="font-serif font-medium text-ink">Taxes:</span>
                  <span>
                    Customs duties, taxes, or import levies assessed by your destination
                    government may require direct claims through your local customs office
                    for international returns.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Concierge Contact Banner */}
      <Container size="wide" className="py-16 lg:py-24">
        <Reveal className="border border-line bg-warm p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Need Assistance?
              </p>
              <h2 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">
                Initiate a Return with our Concierge Desk
              </h2>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-stone">
                Our specialists are available to answer any questions regarding condition,
                pickup scheduling, or tracking your refund.
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
                href="/pages/faq"
                className="inline-flex items-center gap-2 border border-line bg-ivory px-6 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink transition-colors hover:border-taupe"
              >
                <HelpCircle className="size-4 text-taupe" />
                View FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
