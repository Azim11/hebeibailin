import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="bg-ink py-20 text-ivory lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
            Membership
          </p>
          <h2 className="mt-5 font-serif text-[2rem] leading-[1.1] text-ivory sm:text-[2.75rem]">
            Join the Inner Circle
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-ivory/70">
            Be the first to discover new arrivals, rare finds, private events and
            exclusive collections.
          </p>

          <div className="mx-auto mt-12 max-w-md">
            <NewsletterForm tone="dark" />
          </div>

          <p className="mt-6 font-sans text-[0.6875rem] text-ivory/40">
            We send a few times a month. Unsubscribe at any time.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
