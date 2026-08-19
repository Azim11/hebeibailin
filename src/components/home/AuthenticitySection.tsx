import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { authenticationSteps } from "@/lib/data/editorial";

/**
 * Trust section.
 *
 * The copy deliberately describes the *process* rather than promising an
 * outcome. Do not add absolute guarantees ("100% authentic", "guaranteed
 * genuine") unless the business actually offers that guarantee in writing.
 */
export function AuthenticitySection() {
  return (
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

        <Reveal delay={0.2} className="mt-16 flex justify-center lg:mt-20">
          <Link
            href="/pages/authenticity"
            className="flex h-14 items-center border border-ivory/60 px-10 text-center font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-ivory hover:text-ink"
          >
            Learn About Our Authentication Process
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
