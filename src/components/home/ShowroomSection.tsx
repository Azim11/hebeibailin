import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/data/site";
import { showroomImages } from "@/lib/data/editorial";

/**
 * Showroom band.
 *
 * Only the city and district are shown. A full street address must not be
 * published here unless it is a real, verified location the business wants
 * public — appointments are confirmed with the exact address by email.
 */
export function ShowroomSection() {
  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-16/10 overflow-hidden bg-warm">
              <Image
                src={showroomImages[0]}
                alt="The showroom interior"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-warm">
              <Image
                src={showroomImages[1]}
                alt=""
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden bg-warm">
              <Image
                src={showroomImages[2]}
                alt=""
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-center">
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              The Showroom
            </p>
            <h2 className="mt-5 font-serif text-[2rem] leading-[1.1] text-ink sm:text-[2.5rem] lg:text-[3rem]">
              Experience the Collection in Person
            </h2>
            <p className="mt-6 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-stone">
              Our showroom is private and open by appointment, so the pieces you have
              asked to see are prepared before you arrive. A specialist will be with
              you throughout.
            </p>

            <dl className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                  Location
                </dt>
                <dd className="mt-2 font-sans text-[0.875rem] text-charcoal">
                  {site.showroom.city}
                  <br />
                  {site.showroom.region}
                  <br />
                  <span className="text-taupe">
                    Exact address shared on confirmation
                  </span>
                </dd>
              </div>

              <div>
                <dt className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                  Hours
                </dt>
                <dd className="mt-2 flex flex-col gap-1 font-sans text-[0.875rem] text-charcoal">
                  {site.showroom.hours.map((entry) => (
                    <span key={entry.day}>
                      {entry.day} · {entry.time}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/pages/contact"
                className="flex h-14 items-center justify-center border border-ink bg-ink px-9 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:bg-transparent hover:text-ink"
              >
                Book an Appointment
              </Link>
              <Link
                href="/pages/contact"
                className="flex h-14 items-center justify-center border border-line-strong px-9 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink"
              >
                Virtual Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
