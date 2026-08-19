import Image from "next/image";
import { Container } from "@/components/ui/Container";

type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  /** `compact` for utility pages, `editorial` for collection landings. */
  variant?: "editorial" | "compact";
};

/** Top-of-page editorial banner shared by collection, brand and content pages. */
export function PageBanner({
  eyebrow,
  title,
  description,
  image,
  variant = "editorial",
}: PageBannerProps) {
  if (variant === "compact" || !image) {
    return (
      <section className="border-b border-line py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.05] text-ink sm:text-[3rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
                {description}
              </p>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[22rem] items-end overflow-hidden bg-ink lg:min-h-[30rem]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/15" />

      <Container size="wide" className="relative pb-12 pt-24 lg:pb-16">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-ivory/70 uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 font-serif text-[2.25rem] leading-[1.02] text-ivory sm:text-[3rem] lg:text-[3.75rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-xl font-sans text-[0.9375rem] leading-relaxed text-ivory/75">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
