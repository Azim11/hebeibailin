import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Homepage teaser for the full story page. */
export function StoryTeaser({ image }: { image: string }) {
  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <Reveal className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-ink lg:min-h-[36rem]">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/30 to-transparent" />

          <div className="w-full p-8 sm:p-12 lg:p-20">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-ivory/70 uppercase">
              Our Story
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-[2rem] leading-[1.05] text-ivory sm:text-[3rem] lg:text-[3.75rem]">
              A Passion for Exceptional Bags
            </h2>
            <p className="mt-6 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-ivory/75">
              A small house built on one idea — that a beautifully made bag deserves
              to be understood before it is sold.
            </p>
            <Link
              href="/pages/about"
              className="mt-9 inline-flex h-13 items-center border border-ivory/60 px-9 py-4 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-ivory hover:text-ink"
            >
              Read Our Story
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
