import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { FAQClient, type FAQItem } from "@/components/shop/FAQClient";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions (FAQ)",
  description: `Find answers to common questions about authenticity, ordering, insured worldwide shipping, and returns at ${site.name}.`,
  path: "/pages/faq",
});

const faqCategories = [
  "Authenticity & Provenance",
  "Ordering & Payment",
  "Shipping & Delivery",
  "Returns & Refunds",
  "Condition & Inspection",
  "Concierge & Appointments",
];

const faqItems: FAQItem[] = [
  {
    id: "auth-1",
    category: "Authenticity & Provenance",
    question: "How does Hebei Bailin authenticate its handbags?",
    answer:
      "Every single piece in our collection undergoes a rigorous, multi-stage physical inspection conducted in-house by our veteran luxury specialists. We examine stitch count, stitch tension, foil stamping font and depth, hardware alloy density and engravings, blind stamps/date codes, leather grain, and interior craftsmanship against extensive archival references from each Maison. We do not rely solely on automated algorithms; human expertise with decades of experience validates every detail before a bag is catalogued.",
  },
  {
    id: "auth-2",
    category: "Authenticity & Provenance",
    question: "Does each bag come with an Authenticity Certificate?",
    answer:
      "Yes. Every purchase from Hebei Bailin includes our official Certificate of Authenticity and comprehensive Condition Report, stating the item's individual serial or blind stamp number, verified provenance, and technical attributes. We offer a lifetime 100% money-back authenticity guarantee.",
  },
  {
    id: "auth-3",
    category: "Authenticity & Provenance",
    question: "Are you affiliated with the brands you sell?",
    answer:
      "Hebei Bailin is an independent creator and curator of original, logo-free luxury handbags. Our collection is not presented as merchandise from any third-party fashion house.",
  },
  {
    id: "order-1",
    category: "Ordering & Payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept major international credit and debit cards (Visa, Mastercard, American Express), Apple Pay, and direct wire transfer / bank transfer. For high-value collector pieces and transactions exceeding $20,000, we provide a private concierge wire service and trusted escrow payment options upon request.",
  },
  {
    id: "order-2",
    category: "Ordering & Payment",
    question: "Can I place a bag on hold while I make my decision?",
    answer:
      "Due to the singular rarity of our collection, pieces cannot be held informally. However, you may contact our private concierge to arrange a 24-hour formal reservation upon placing a refundable hold deposit.",
  },
  {
    id: "order-3",
    category: "Ordering & Payment",
    question: "Is shopping on your website secure?",
    answer:
      "Yes. All payment transactions and data transmissions are encrypted using industry-standard TLS/SSL encryption. We do not store full credit card numbers on our servers; payments are processed through PCI-DSS Level 1 compliant payment gateways.",
  },
  {
    id: "ship-1",
    category: "Shipping & Delivery",
    question: "Where do you ship, and how long does delivery take?",
    answer:
      "We ship globally to over 80 countries using express priority couriers (DHL Express, FedEx Priority, and UPS Saver). Standard express delivery takes between 2 to 5 business days depending on your destination city. Orders are dispatched within 24–48 business hours after authentication verification and payment clearance.",
  },
  {
    id: "ship-2",
    category: "Shipping & Delivery",
    question: "Is my shipment fully insured in transit?",
    answer:
      "Yes, 100%. Every shipment dispatched by Hebei Bailin is fully insured for its entire replacement value from our hands to yours. Packages are sent in discreet, unbranded exterior packaging with tamper-evident security tape, and an adult signature is strictly required upon delivery.",
  },
  {
    id: "ship-3",
    category: "Shipping & Delivery",
    question: "How are customs duties and import taxes handled?",
    answer:
      "International shipments may be subject to import duties, value-added tax (VAT), and customs clearance fees levied by the destination country's government. Unless a Delivered Duty Paid (DDP) arrangement has been specifically confirmed with our concierge team prior to dispatch, import charges remain the responsibility of the recipient.",
  },
  {
    id: "return-1",
    category: "Returns & Refunds",
    question: "What is your return policy?",
    answer:
      "We offer a 14-day inspection and return window from the date your package is delivered and signed for. To remain eligible for a full refund, the item must be in the exact condition received, with the unsevered Hebei Bailin security tag attached, and accompanied by all original packaging, dust bag, keys, lock, strap, and documentation.",
  },
  {
    id: "return-2",
    category: "Returns & Refunds",
    question: "How do I initiate a return?",
    answer:
      "To initiate a return, contact our client concierge at bfvt6239@outlook.com or phone +1 2016443628 within 14 days of delivery. We will issue a Return Merchandise Authorization (RMA) number and provide pre-paid, fully insured return shipping labels along with detailed repackaging instructions.",
  },
  {
    id: "return-3",
    category: "Returns & Refunds",
    question: "What happens if the security tag is cut or removed?",
    answer:
      "Our distinct security tag is applied to every piece prior to dispatch. If this tag is removed, cut, tampered with, or re-attached, the item becomes final sale and is no longer eligible for return or refund. This policy protects both our collectors and the integrity of our authenticated inventory.",
  },
  {
    id: "return-4",
    category: "Returns & Refunds",
    question: "How quickly are refunds processed?",
    answer:
      "Once your returned item is received at our inspection facility, our specialists review its condition within 48 business hours. Upon approval, your full refund (minus any non-refundable expedited shipping fees) is issued to your original payment method within 3–5 business days.",
  },
  {
    id: "cond-1",
    category: "Condition & Inspection",
    question: "How do you determine condition ratings?",
    answer:
      "We apply a meticulous four-tier condition grading standard:\n• New / Never Worn: Flawless, pristine condition with factory hardware foils intact and full original boutique packaging.\n• Excellent: Pre-owned with faint or imperceptible signs of careful handling; hardware is bright and leather is immaculate.\n• Very Good: Light signs of gentle use, such as minor hairline surface scratches on metal or subtle softening of leather corners, all documented in detail.\n• Pre-Owned: Visible patina or signs of wear consistent with age, thoroughly itemized with macro photography in the item report.",
  },
  {
    id: "cond-2",
    category: "Condition & Inspection",
    question: "Are the photos on the website of the actual bag?",
    answer:
      "Yes, always. Every photograph on Hebei Bailin depicts the exact piece currently available in our vault. We never use stock studio photography. All images are captured in natural balanced lighting without cosmetic retouching so you see the accurate color, texture, and character of the piece.",
  },
  {
    id: "cond-3",
    category: "Condition & Inspection",
    question: "Can I request additional high-resolution photos or video?",
    answer:
      "Certainly. If you require closer inspection of stamping, corner wear, interior lining, or a demonstration of how the bag sits on a mannequin, reach out to our concierge. We will gladly supply private video walkthroughs and macro photos.",
  },
  {
    id: "conc-1",
    category: "Concierge & Appointments",
    question: "Can I view pieces in person at your showroom?",
    answer:
      "Yes. We welcome clients to our private showroom by prior appointment only. To schedule a private viewing, please contact us with the specific reference numbers you wish to examine, and our team will prepare the presentation.",
  },
  {
    id: "conc-2",
    category: "Concierge & Appointments",
    question: "Do you offer bespoke bag sourcing?",
    answer:
      "Yes. If you are seeking a specific holy grail silhouette, exotic leather, discontinued colorway, or specific production year, our global sourcing network spans trusted collectors and private archives worldwide. Contact our Sourcing Desk to submit your wish list.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageBanner
        eyebrow="Help & Guidance"
        title="Frequently Asked Questions"
        description="Comprehensive answers regarding authenticity verification, ordering, insured global transit, and returns."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          {/* Main FAQ Client */}
          <div>
            <FAQClient categories={faqCategories} items={faqItems} />
          </div>

          {/* Sidebar Concierge Support Card */}
          <div className="flex flex-col gap-8">
            <Reveal className="border border-line bg-warm p-8">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Client Concierge
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">
                Still have a question?
              </h3>
              <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-stone">
                Our luxury advisors and authentication specialists are available to
                assist you with condition reports, high-resolution media, or order inquiries.
              </p>

              <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 font-sans text-[0.875rem] text-charcoal hover:text-ink transition-colors"
                >
                  <Mail className="size-4 text-taupe" />
                  <span>{site.email}</span>
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 font-sans text-[0.875rem] text-charcoal hover:text-ink transition-colors"
                >
                  <Phone className="size-4 text-taupe" />
                  <span>{site.phone}</span>
                </a>
              </div>

              <div className="mt-8">
                <Link
                  href="/pages/contact"
                  className="inline-flex w-full items-center justify-center gap-2 border border-ink bg-ink px-6 py-3.5 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory transition-colors hover:bg-charcoal"
                >
                  Contact Concierge
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="border border-line bg-bone/50 p-8">
              <div className="flex items-center gap-3 text-ink">
                <ShieldCheck className="size-6 text-champagne" />
                <h4 className="font-serif text-lg">Lifetime Guarantee</h4>
              </div>
              <p className="mt-3 font-sans text-[0.8125rem] leading-relaxed text-stone">
                Every piece authenticated by {site.name} is backed by our full money-back
                guarantee of authenticity.
              </p>
              <Link
                href="/pages/about"
                className="link-underline mt-4 inline-block font-sans text-[0.75rem] tracking-luxe uppercase text-ink"
              >
                Learn about our process &rarr;
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
