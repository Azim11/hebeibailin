import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { founder } from "@/lib/data/editorial";

export function FounderMessage() {
  return (
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

            <Link
              href="/pages/about"
              className="mt-10 inline-flex h-12 items-center border border-line-strong px-9 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory"
            >
              Read Our Story
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
