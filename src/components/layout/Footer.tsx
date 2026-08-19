import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/data/site";
import { NewsletterForm } from "@/components/home/NewsletterForm";

const shopLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Handbags", href: "/collections/handbags" },
  { label: "Brands", href: "/brands" },
  { label: "Collections", href: "/collections" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Rare Finds", href: "/collections/rare-finds" },
];

const customerCareLinks = [
  { label: "Shipping & Delivery", href: "/pages/shipping" },
  { label: "Returns & Exchanges", href: "/pages/returns" },
  { label: "FAQ", href: "/pages/faq" },
  { label: "Privacy Policy", href: "/pages/privacy" },
  { label: "Terms & Conditions", href: "/pages/terms" },
  { label: "Contact Concierge", href: "/pages/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Column 1: Wordmark + newsletter */}
          <div className="lg:pr-8">
            <Link href="/" className="font-serif text-2xl tracking-[0.16em] text-ink">
              {site.wordmark}
            </Link>
            <p className="mt-4 max-w-sm font-sans text-[0.8125rem] leading-relaxed text-stone">
              {site.tagline} A curated house of exceptional handbags, selected for
              craftsmanship, provenance and enduring style.
            </p>

            <div className="mt-8 max-w-sm">
              <p className="mb-4 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                Newsletter
              </p>
              <NewsletterForm tone="light" />
            </div>
          </div>

          {/* Column 2: Shop */}
          <nav aria-label="Shop">
            <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
              Shop
            </p>
            <ul className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="link-underline font-sans text-[0.8125rem] text-stone transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Customer Care */}
          <nav aria-label="Customer Care">
            <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
              Customer Care
            </p>
            <ul className="flex flex-col gap-3">
              {customerCareLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="link-underline font-sans text-[0.8125rem] text-stone transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact Info */}
          <div aria-label="Contact Information">
            <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
              Contact &amp; Atelier
            </p>
            <div className="flex flex-col gap-4 font-sans text-[0.8125rem] text-stone">
              <p className="font-serif text-base text-ink">{site.legalName}</p>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-taupe" aria-hidden />
                <address className="leading-relaxed not-italic">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-taupe" aria-hidden />
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline hover:text-ink transition-colors"
                >
                  {site.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-taupe" aria-hidden />
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="link-underline hover:text-ink transition-colors"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[0.6875rem] text-taupe">
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

