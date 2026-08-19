import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/shop/PageBanner";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/home/ContactForm";
import { site } from "@/lib/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.legalName} — company details, email and phone.`,
  path: "/pages/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Questions about a piece, an order, or anything else — our team is here to help."
        variant="compact"
      />

      <Container size="wide" className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Company Information
            </p>
            <h2 className="mt-4 font-serif text-2xl text-ink sm:text-[1.75rem]">
              {site.legalName}
            </h2>

            <dl className="mt-10 flex flex-col gap-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-4 shrink-0 text-taupe" aria-hidden />
                <div>
                  <dt className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                    Business Address
                  </dt>
                  <dd className="mt-2 font-sans text-[0.875rem] leading-relaxed text-charcoal">
                    {site.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="mt-1 size-4 shrink-0 text-taupe" aria-hidden />
                <div>
                  <dt className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                    Email
                  </dt>
                  <dd className="mt-2 font-sans text-[0.875rem] text-charcoal">
                    <a href={`mailto:${site.email}`} className="link-underline hover:text-ink">
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 size-4 shrink-0 text-taupe" aria-hidden />
                <div>
                  <dt className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                    Phone
                  </dt>
                  <dd className="mt-2 font-sans text-[0.875rem] text-charcoal">
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      className="link-underline hover:text-ink"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
              Send a Message
            </p>
            <h2 className="mt-4 font-serif text-2xl text-ink sm:text-[1.75rem]">
              We&apos;d Love to Hear From You
            </h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
