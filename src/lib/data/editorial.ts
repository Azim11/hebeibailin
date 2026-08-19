import type { PressMention, Testimonial } from "@/lib/types";
import { INTERIORS, PORTRAITS, photo } from "./images";

/**
 * PLACEHOLDER CONTENT — REPLACE BEFORE LAUNCH.
 *
 * Every testimonial below is invented sample copy, flagged with
 * `placeholder: true`. The UI renders a visible notice while that flag is set,
 * so nothing fabricated can reach production unnoticed. Swap in real,
 * attributable client feedback and set the flag to false.
 */
export const testimonials: Testimonial[] = [
  {
    id: "tst-1",
    quote:
      "The bag was even more beautiful in person. The entire experience felt incredibly personal and professional, from the first message to the moment it arrived.",
    name: "Sample Client",
    country: "United Kingdom",
    purchasedProduct: "Hermès Kelly 28 Sellier",
    placeholder: true,
  },
  {
    id: "tst-2",
    quote:
      "I had been searching for this exact configuration for two years. Their sourcing team found it in a matter of weeks and kept me informed the whole way through.",
    name: "Sample Client",
    country: "Singapore",
    purchasedProduct: "Hermès Birkin 25",
    placeholder: true,
  },
  {
    id: "tst-3",
    quote:
      "The condition report was honest to the millimetre. Nothing was oversold, which is rare, and it is the reason I have bought three times since.",
    name: "Sample Client",
    country: "United States",
    purchasedProduct: "Chanel Classic Flap Medium",
    placeholder: true,
  },
  {
    id: "tst-4",
    quote:
      "Consigning was effortless. The valuation was clear, the photography was better than I could have managed, and the piece sold within the month.",
    name: "Sample Client",
    country: "United Arab Emirates",
    purchasedProduct: "Louis Vuitton Capucines MM",
    placeholder: true,
  },
];

/**
 * PLACEHOLDER — display a press logo only where the business holds the right
 * to use it. These entries render as plain wordmarks, never as trademarked
 * logo artwork, and are flagged for replacement.
 */
export const press: PressMention[] = [
  { id: "prs-1", name: "Publication One", placeholder: true },
  { id: "prs-2", name: "Publication Two", placeholder: true },
  { id: "prs-3", name: "Publication Three", placeholder: true },
  { id: "prs-4", name: "Publication Four", placeholder: true },
  { id: "prs-5", name: "Publication Five", placeholder: true },
];

/** The three-step intake every consigned or purchased piece passes through. */
export const authenticationSteps = [
  {
    number: "01",
    title: "Initial Inspection",
    body: "Each piece is unpacked, photographed and logged on arrival. We record measurements, date stamps, blind stamps and serial details, and note every mark before any handling takes place.",
  },
  {
    number: "02",
    title: "Expert Authentication",
    body: "Our specialists examine construction, stitch count and angle, hardware weight and engraving, leather grain and interior stamping against reference examples from the relevant production period.",
  },
  {
    number: "03",
    title: "Final Quality Review",
    body: "A second specialist reviews the file independently. Condition is graded, the report is written, and only pieces that clear both reviews are listed for sale.",
  },
];

export const founder = {
  name: "Élise Rouvière",
  title: "Founder & Head of Curation",
  portrait: photo("photo-1509631179647-0177331693ae", 1200, 1500),
  message:
    "I started buying and selling bags because I could not bear to see a beautifully made object treated as disposable. A well-built handbag outlives trends, outlives its first owner, and often becomes the thing a family actually keeps. My work is simply to make sure the right piece reaches the right person, honestly described, and in the condition I would want to receive it myself.",
  placeholder: true,
};

export const storyChapters = [
  {
    title: "How it began",
    body: "Hebei Bailin began in a single room above a leather workshop, with a notebook of clients and a habit of asking too many questions about provenance. What started as sourcing for friends became a practice built around one idea: that the story of a bag matters as much as its condition.",
  },
  {
    title: "Expertise",
    body: "Our specialists come from auction houses, restoration workshops and the ateliers themselves. Between them they have handled tens of thousands of pieces, and they are the reason we can say what we say about a bag with precision rather than enthusiasm.",
  },
  {
    title: "Philosophy",
    body: "We buy slowly. A piece enters the collection because the craftsmanship, the condition and the provenance are all right — not because it will move quickly. That restraint is why the collection stays small and why our clients return.",
  },
  {
    title: "The client experience",
    body: "Every client works with a named specialist. Questions are answered by the person who examined the bag, additional photography is sent on request, and nothing is shipped until you are certain.",
  },
];

export const showroomImages = [
  photo("photo-1581338834647-b0fb40704e21", 1400, 900),
  photo("photo-1575032617751-6ddec2089882", 1400, 1000),
  photo("photo-1590874103328-eac38a683ce7", 1400, 1000),
];

export const instagramPosts = [
  { id: "ig-1", href: "https://instagram.com", caption: "Kelly 28 Sellier in Noir Epsom" },
  { id: "ig-2", href: "https://instagram.com", caption: "A morning of authentication" },
  { id: "ig-3", href: "https://instagram.com", caption: "Constance 18, Étoupe" },
  { id: "ig-4", href: "https://instagram.com", caption: "Vintage Chanel, 1992" },
  { id: "ig-5", href: "https://instagram.com", caption: "New arrivals, unboxed" },
  { id: "ig-6", href: "https://instagram.com", caption: "Inside the showroom" },
];
