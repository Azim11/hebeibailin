import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderNotice } from "@/components/ui/Notice";
import { press } from "@/lib/data/editorial";

/**
 * "As seen in" strip.
 *
 * Rendered as plain wordmarks rather than logo artwork — a press logo should
 * only appear here where the business holds the right to display it.
 */
export function PressStrip() {
  const hasPlaceholders = press.some((p) => p.placeholder);

  return (
    <section className="border-y border-line py-14 lg:py-20">
      <Container>
        <Reveal className="text-center">
          <p className="font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
            As Seen In
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            {press.map((mention) => (
              <li
                key={mention.id}
                className="font-serif text-lg tracking-[0.14em] text-taupe uppercase sm:text-xl"
              >
                {mention.name}
              </li>
            ))}
          </ul>

          {hasPlaceholders ? (
            <div className="mt-10">
              <PlaceholderNotice>
                Placeholder wordmarks. Display a publication&rsquo;s name or logo only
                where the business has been featured and holds permission to show it.
              </PlaceholderNotice>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
