import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { authenticationSteps, founder, storyChapters } from "@/lib/data/editorial";
import { EDITORIAL } from "@/lib/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `The story behind ${site.name} — a curated house of exceptional handbags, and the specialists who authenticate every piece.`,
  path: "/pages/about",
});

export default function AboutPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Story"
        title="About Us"
        description="A curated house of exceptional handbags, built on craftsmanship, provenance and honest description."
        image="/images/about_banner.jpg"
      />

      <Container size="narrow" className="py-16 lg:py-24">
        <div className="flex flex-col gap-14 lg:gap-20">
          {storyChapters.map((chapter, index) => (
            <Reveal key={chapter.title} delay={(index % 2) * 0.1}>
              <h2 className="font-serif text-2xl text-ink sm:text-[1.75rem]">
                {chapter.title}
              </h2>
              <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
                {chapter.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Atelier & Showroom Showcase */}
      <section className="border-y border-line bg-bone py-16 lg:py-24">
        <Container size="wide">
          <Reveal>
            <div className="relative aspect-16/9 w-full overflow-hidden rounded-xs bg-warm shadow-xs">
              <Image
                src="/images/about_banner.jpg"
                alt="Hebei Bailin curation studio and atelier"
                fill
                sizes="(min-width: 1280px) 1440px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <p className="font-serif text-base tracking-wide text-ink">
                The Hebei Bailin Curation Studio & Atelier
              </p>
              <p className="font-sans text-[0.6875rem] tracking-luxe text-taupe uppercase">
                Craftsmanship · Authentication · Preservation
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-warm py-20 lg:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <div className="relative aspect-4/5 overflow-hidden bg-bone">
                <Image
                  src={founder.portrait}
                  alt={`Portrait of ${founder.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                A Note From Our Founder
              </p>
              <blockquote className="mt-8">
                <p className="font-serif text-[1.5rem] leading-[1.45] text-ink sm:text-[1.875rem]">
                  &ldquo;{founder.message}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-10">
                <p className="font-serif text-xl text-ink">{founder.name}</p>
                <p className="mt-1 font-sans text-[0.6875rem] tracking-luxe text-taupe uppercase">
                  {founder.title}
                </p>
              </footer>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Authentication process */}
      <section className="bg-ink py-20 text-ivory lg:py-32">
        <Container size="wide">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Our Process
            </p>
            <h2 className="mt-5 font-serif text-[2rem] leading-[1.1] text-ivory sm:text-[2.75rem] lg:text-[3.25rem]">
              Authenticity, Without Compromise
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-ivory/70">
              Every piece in our collection is carefully inspected and authenticated
              before it reaches our clients.
            </p>
          </Reveal>

          <ol className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-16">
            {authenticationSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.12} as="li">
                <p className="font-serif text-5xl text-champagne/70">{step.number}</p>
                <h3 className="mt-6 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase">
                  {step.title}
                </h3>
                <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-ivory/60">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Registered company details */}
      <Container size="narrow" className="py-16 lg:py-24">
        <Reveal className="border-t border-line pt-10">
          <p className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
            Registered Company
          </p>
          <p className="mt-4 font-serif text-xl text-ink">{site.legalName}</p>
          <address className="mt-3 font-sans text-[0.875rem] leading-relaxed text-stone not-italic">
            {site.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-4 font-sans text-[0.875rem] text-stone">
            {site.email} · {site.phone}
          </p>
        </Reveal>
      </Container>
    </>
  );
}
