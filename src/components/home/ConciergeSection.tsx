import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Split editorial band pointing at the sourcing request form. */
export function ConciergeSection({ image }: { image: string }) {
  return (
    <section className="bg-warm">
      <div className="grid lg:grid-cols-2">
        <Reveal direction="none" className="relative min-h-[22rem] lg:min-h-[38rem]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <div className="flex items-center py-16 lg:py-28">
          <Container size="full" className="max-w-xl px-5 sm:px-10 lg:px-16">
            <Reveal>
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Concierge
              </p>
              <h2 className="mt-5 font-serif text-[2rem] leading-[1.1] text-ink sm:text-[2.5rem] lg:text-[3rem]">
                Looking for Something Specific?
              </h2>
              <p className="mt-6 font-sans text-[0.9375rem] leading-relaxed text-stone">
                Can&rsquo;t find the handbag you&rsquo;re looking for? Our sourcing team
                can help locate rare and hard-to-find pieces through our trusted
                network.
              </p>

              <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-8 font-sans text-[0.8125rem] text-stone">
                <li>Tell us the brand, size, leather and hardware you want.</li>
                <li>We search our network of collectors, consignors and partners.</li>
                <li>You review photography and a condition report before committing.</li>
              </ul>

              <Link
                href="/pages/contact"
                className="mt-10 inline-flex h-14 items-center border border-ink bg-ink px-10 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink"
              >
                Request a Bag
              </Link>
            </Reveal>
          </Container>
        </div>
      </div>
    </section>
  );
}
