import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Fingerprint,
  Layers,
  Lock,
  Mail,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Authentication & Provenance Standards",
  description: `Discover the rigorous multi-point physical authentication process and lifetime guarantee behind every luxury handbag at ${site.name}.`,
  path: "/pages/authenticity",
});

const inspectionPillars = [
  {
    icon: Fingerprint,
    title: "Leather & Skin Structure",
    subtitle: "Grain, Density & Scent",
    description:
      "Every hide possesses unique cellular hallmarks. We examine grain follicle distribution, hand-feel suppleness, weight, and authentic vegetable-tanned aromas under magnification to distinguish genuine European tannery hides from coated synthetics.",
  },
  {
    icon: Scale,
    title: "Hardware Metallurgy",
    subtitle: "Alloy Density & Engravings",
    description:
      "Authentic luxury hardware features solid brass or palladium-plated alloys with precise mass. We inspect engraving depth, laser vs rotary tool kerning, screw threading (such as Hermès flat-head screws), and zipper track resistance.",
  },
  {
    icon: Layers,
    title: "Saddle-Stitch Topology",
    subtitle: "Hand-Sewn 28° Slant",
    description:
      "Master artisans stitch by hand using dual needles and beeswax-coated linen thread, creating a signature 28-degree slant. Machine counterfeits produce straight, parallel stitches lacking the organic tension and durability of authentic craftsmanship.",
  },
  {
    icon: Search,
    title: "Foil Stamping & Typography",
    subtitle: "Heat Dwell Time & Font Kerning",
    description:
      "Heat-pressed metallic foils (gold and silver leaf) must exhibit clean edge sharpness without ink bleed, calibrated foil adhesion, and period-accurate typeface kerning matching the Maison's historical stamping dies.",
  },
  {
    icon: Cpu,
    title: "Date Codes & RFID Validation",
    subtitle: "Blind Stamps & Microchips",
    description:
      "We verify year letters, artisan identification stamps, serial sequences, and modern NFC/RFID microchip signatures against our verified reference database, confirming chronological consistency with hardware and leather eras.",
  },
  {
    icon: FileCheck2,
    title: "Interior Architecture",
    subtitle: "Linings, Zipper Stops & Pockets",
    description:
      "The internal construction reveals the true discipline of the atelier. We inspect chevre kidskin or lambskin linings, zipper end-stops (e.g. Lampo, riri, or custom Maison pulls), interior stamping, and structural reinforcement boards.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Intake & Macrophotography",
    description:
      "On arrival at our vault, the piece is unboxed in a temperature-controlled atelier. We record high-resolution macro imagery of every surface, date code, hardware engraving, and corner seam.",
  },
  {
    step: "02",
    title: "Multi-Point Physical Inspection",
    description:
      "Our primary luxury specialist conducts an exhaustive physical analysis against archival reference specimens, examining stitch count, leather grain, and weight.",
  },
  {
    step: "03",
    title: "Secondary Peer Review",
    description:
      "A second senior authenticator independently evaluates the piece and condition file. Only items that receive unanimous clearance proceed to the collection.",
  },
  {
    step: "04",
    title: "Certification & Security Sealing",
    description:
      "We issue our official Certificate of Authenticity with unique serial registration and attach our serialized, tamper-evident security ribbon prior to white-glove dispatch.",
  },
];

export default function AuthenticityPage() {
  return (
    <>
      <PageBanner
        eyebrow="Provenance & Verification"
        title="The Science of Authenticity"
        description="Every piece in our vault undergoes exhaustive, multi-point physical verification conducted by master luxury specialists. No algorithms, no guesswork — only uncompromising precision."
        image="/images/about_banner.jpg"
      />

      {/* Guarantee Highlights Bar */}
      <section className="border-b border-line bg-warm/80 py-12 lg:py-16">
        <Container size="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center border border-line bg-ivory text-champagne">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-ink">
                  Lifetime Authenticity Guarantee
                </h3>
                <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-stone">
                  Full 100% money-back guarantee on every piece, backed by our official
                  embossed Certificate of Authenticity.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center border border-line bg-ivory text-champagne">
                <Search className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-ink">Human Expert Verification</h3>
                <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-stone">
                  Evaluated in person by seasoned specialists with decades of experience
                  handling tens of thousands of collector items.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center border border-line bg-ivory text-champagne">
                <Lock className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-ink">Serialized Security Ribbon</h3>
                <p className="mt-1 font-sans text-[0.8125rem] leading-relaxed text-stone">
                  Every delivered item features a tamper-evident seal linking directly to its
                  archival condition and provenance dossier.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The 6 Inspection Pillars */}
      <Container size="wide" className="py-20 lg:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Our Methodology
          </p>
          <h2 className="mt-3 font-serif text-[2.25rem] leading-tight text-ink sm:text-[3rem]">
            The 6 Pillars of Micro-Inspection
          </h2>
          <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
            Counterfeits have grown increasingly sophisticated, but machine replication
            cannot reproduce the tactile discipline and micro-tolerances of heritage hand
            craftsmanship.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {inspectionPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal
                key={pillar.title}
                delay={index * 0.08}
                className="border border-line bg-warm/30 p-8 transition-colors hover:bg-warm/60"
              >
                <div className="flex size-10 items-center justify-center border border-line bg-ivory text-champagne">
                  <Icon className="size-5" />
                </div>
                <p className="mt-6 font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                  {pillar.subtitle}
                </p>
                <h3 className="mt-1 font-serif text-xl text-ink">{pillar.title}</h3>
                <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-stone">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* 4-Step Intake & Verification Workflow */}
      <section className="border-y border-line bg-ink py-20 text-ivory lg:py-32">
        <Container size="wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Intake Protocol
            </p>
            <h2 className="mt-3 font-serif text-[2.25rem] leading-tight text-ivory sm:text-[3rem]">
              The Four-Stage Verification Journey
            </h2>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-ivory/70">
              No piece enters our sales catalogue without passing through two independent
              evaluations and an archival provenance audit.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.step}
                delay={index * 0.1}
                className="border border-ivory/15 bg-white/5 p-8 backdrop-blur-xs"
              >
                <span className="font-serif text-4xl text-champagne/80 font-light">
                  {step.step}
                </span>
                <h3 className="mt-6 font-serif text-xl text-ivory">{step.title}</h3>
                <p className="mt-3 font-sans text-[0.875rem] leading-relaxed text-ivory/60">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certificate & Documentation Section */}
      <Container size="wide" className="py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-4/3 w-full overflow-hidden border border-line bg-warm shadow-xs">
              <Image
                src="/images/hero_luxury_bag.jpg"
                alt="Hebei Bailin authentication certificate and inspection tools"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Official Provenance
            </p>
            <h2 className="mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.75rem]">
              What Accompanies Every Acquisition
            </h2>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
              Every handbag acquired from {site.name} arrives with a comprehensive provenance
              dossier that establishes and preserves its long-term investment value.
            </p>

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 font-sans text-[0.875rem]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                <span className="text-charcoal">
                  <strong>Certificate of Authenticity:</strong> Serialized, embossed
                  certificate detailing production year, blind stamp, and leather grade.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                <span className="text-charcoal">
                  <strong>Detailed Condition Report:</strong> Transparent assessment of
                  hardware shine, leather patina, and interior condition.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-champagne" />
                <span className="text-charcoal">
                  <strong>Tamper-Evident Security Ribbon:</strong> Allows comprehensive home
                  inspection while guaranteeing provenance during the 14-day return window.
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/collections/handbags"
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Browse Authenticated Vault
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Concierge Consultation Card */}
      <Container size="wide" className="pb-20 lg:pb-32">
        <Reveal className="border border-line bg-warm p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Questions on a Specific Reference?
              </p>
              <h2 className="mt-3 font-serif text-2xl text-ink sm:text-3xl">
                Speak Directly with an In-House Specialist
              </h2>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-stone">
                Our evaluators are available to share high-resolution macro imagery, video
                walkthroughs of stamping and stitching, or answer questions regarding
                provenance.
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
                className="inline-flex items-center gap-2 border border-ink bg-ink px-8 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ivory hover:bg-charcoal transition-colors"
              >
                Contact Concierge
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/pages/faq"
                className="inline-flex items-center gap-2 border border-line bg-ivory px-6 py-4 font-sans text-[0.75rem] tracking-luxe uppercase text-ink hover:border-taupe transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
