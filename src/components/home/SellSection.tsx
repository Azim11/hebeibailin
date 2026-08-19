import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Consignment band. Image sits right so it mirrors the concierge band above. */
export function SellSection({ image }: { image: string }) {
  return (
    <section>
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex items-center py-16 lg:order-1 lg:py-28">
          <Container size="full" className="max-w-xl px-5 sm:px-10 lg:ml-auto lg:px-16">
            <Reveal>
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                Sell &amp; Consign
              </p>
              <h2 className="mt-5 font-serif text-[2rem] leading-[1.1] text-ink sm:text-[2.5rem] lg:text-[3rem]">
                Ready to Sell Your Bag?
              </h2>
              <p className="mt-6 font-sans text-[0.9375rem] leading-relaxed text-stone">
                Turn your exceptional handbag into an opportunity. Request a valuation
                from our team.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pages/contact"
                  className="flex h-14 items-center justify-center border border-ink bg-ink px-10 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink"
                >
                  Sell Your Bag
                </Link>
                <Link
                  href="/pages/contact"
                  className="flex h-14 items-center justify-center border border-line-strong px-10 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
                >
                  Request a Valuation
                </Link>
              </div>
            </Reveal>
          </Container>
        </div>

        <Reveal
          direction="none"
          className="relative order-1 min-h-[22rem] lg:order-2 lg:min-h-[38rem]"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
