import Link from "next/link";
import { site } from "@/lib/data/site";
import { NewsletterForm } from "@/components/home/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Handbags", href: "/collections/handbags" },
      { label: "Brands", href: "/brands" },
      { label: "Collections", href: "/collections" },
      { label: "Accessories", href: "/collections/accessories" },
      { label: "Rare Finds", href: "/collections/rare-finds" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Bag Sourcing", href: "/pages/sourcing" },
      { label: "Sell Your Bag", href: "/pages/sell" },
      { label: "Authentication", href: "/pages/authenticity" },
      { label: "Appointments", href: "/pages/appointments" },
      { label: "Concierge", href: "/pages/contact" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact", href: "/pages/contact" },
      { label: "Shipping", href: "/pages/shipping" },
      { label: "Returns", href: "/pages/returns" },
      { label: "FAQ", href: "/pages/faq" },
      { label: "Privacy", href: "/pages/privacy" },
      { label: "Terms", href: "/pages/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-warm">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-10">
          {/* Wordmark + newsletter */}
          <div className="lg:pr-12">
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

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
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
          ))}

          <nav aria-label="Follow">
            <p className="mb-6 font-sans text-[0.625rem] tracking-luxe-wide text-taupe uppercase">
              Follow
            </p>
            <ul className="flex flex-col gap-3">
              {site.social.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-sans text-[0.8125rem] text-stone transition-colors hover:text-ink"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[0.6875rem] text-taupe">
            © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          </p>
          <p className="font-sans text-[0.6875rem] text-taupe">
            {site.showroom.city}, {site.showroom.region} · By appointment
          </p>
        </div>
      </div>
    </footer>
  );
}
