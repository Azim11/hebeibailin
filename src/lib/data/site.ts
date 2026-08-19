import type { Announcement } from "@/lib/types";

/**
 * Global site settings. Everything here is intended to become CMS-editable —
 * see `docs/CMS.md` for the mapping between these keys and admin fields.
 */
export const site = {
  name: "Hebei Bailin",
  shortName: "Hebei Bailin",
  /** Rendered as the wordmark in the header and footer. */
  wordmark: "HEBEI BAILIN",
  tagline: "The Art of the Handbag.",
  description:
    "A curated house of exceptional handbags — new, never-worn, and rare pieces selected for craftsmanship, provenance and enduring style.",
  url: "https://maisonrouviere.example.com",
  locale: "en_US",
  currency: "USD" as const,
  email: "bfvt6239@outlook.com",
  phone: "+1 2016443628",
  /** Registered legal entity, shown on the About and Contact pages. */
  legalName: "河北佰霖商贸有限公司",
  /** Registered business address — real and verified, used for legal/contact display. */
  address: {
    lines: [
      "China (Hebei) Pilot Free Trade Zone Beijing Daxing International Airport Economic Zone Hangyi Road Free Trade Zone Science and Technology Innovation Base 14353",
      "Daxing District, Hebei, 110115",
      "China",
    ],
  },
  /**
   * No public street address is published: the showroom is by appointment and
   * the address is shared on confirmation. Do not add a physical address here
   * unless it is a real, verified location.
   */
  showroom: {
    city: "Paris",
    region: "8ᵉ arrondissement",
    byAppointmentOnly: true,
    hours: [
      { day: "Monday — Friday", time: "10:00 — 18:00" },
      { day: "Saturday", time: "11:00 — 17:00" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "TikTok", href: "https://tiktok.com" },
    { name: "Pinterest", href: "https://pinterest.com" },
    { name: "WhatsApp", href: "https://wa.me/" },
  ],
  /** Orders at or above this value offer a concierge purchase path. */
  conciergeThreshold: 20000,
} as const;

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    message: "Complimentary Worldwide Shipping on Select Orders",
    href: "/pages/shipping",
    active: true,
  },
];
