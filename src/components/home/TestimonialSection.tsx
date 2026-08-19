import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderNotice } from "@/components/ui/Notice";
import { testimonials } from "@/lib/data/editorial";

export function TestimonialSection() {
  const hasPlaceholders = testimonials.some((t) => t.placeholder);

  return (
    <section className="bg-warm py-20 lg:py-32">
      <Container>
        <SectionHeading eyebrow="Client Voices" title="What Our Clients Say" />

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={(index % 2) * 0.1}
              as="article"
              className="flex flex-col bg-warm p-8 lg:p-12"
            >
              <blockquote className="flex-1">
                <p className="font-serif text-[1.25rem] leading-[1.5] text-ink lg:text-[1.4rem]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>

              <footer className="mt-8 border-t border-line pt-6">
                <p className="font-sans text-[0.8125rem] text-ink">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-sans text-[0.6875rem] text-taupe">
                  {testimonial.country} · {testimonial.purchasedProduct}
                </p>
              </footer>
            </Reveal>
          ))}
        </div>

        {hasPlaceholders ? (
          <div className="mt-10">
            <PlaceholderNotice>
              Placeholder testimonials. Replace with real, attributable client
              feedback before launch — these are sample text, not genuine reviews.
            </PlaceholderNotice>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
