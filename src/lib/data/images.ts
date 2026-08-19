/**
 * Placeholder photography.
 *
 * Every URL below is stock imagery standing in for the boutique's own product
 * and editorial shots. Replace these with real, rights-cleared photography
 * before launch — the CMS layer reads image URLs as plain strings, so swapping
 * them requires no component changes.
 */

const CDN = "https://images.unsplash.com";

/** Build a sized, cropped CDN url for a photo id, or return local public paths directly. */
export function photo(id: string, width = 1400, height?: number): string {
  if (id.startsWith("/")) {
    return id;
  }
  const crop = height ? `&h=${height}&fit=crop` : "&fit=max";
  return `${CDN}/${id}?auto=format&q=80&w=${width}${crop}`;
}

/** Handbag / accessory still-life frames used for product imagery. */
export const BAG_SHOTS = [
  "photo-1584917865442-de89df76afd3", // Black luxury leather top-handle handbag
  "photo-1548036328-c9fa89d128fa", // Black quilted leather gold chain flap handbag
  "photo-1590874103328-eac38a683ce7", // Cognac tan structured top-handle handbag
  "photo-1594223274512-ad4803739b7c", // Ivory luxury leather shoulder handbag
  "photo-1566150905458-1bf1fc113f0d", // Crimson red leather luxury handbag
  "photo-1591561954557-26941169b49e", // Deep emerald green top-handle handbag
  "photo-1575032617751-6ddec2089882", // Cognac leather shopper tote handbag
  "photo-1601924994987-69e26d50dc26", // Minimal beige leather shoulder handbag
  "photo-1559563458-527698bf5295", // Black leather handbag on marble
  "photo-1581338834647-b0fb40704e21", // Designer handbag on marble pedestal
  "photo-1544816155-12df9643f363", // Burgundy luxury leather top-handle handbag
  "photo-1598532163257-ae3c6b2524b6", // Minimalist white leather shoulder handbag
  "photo-1547949003-9792a18a2601", // Black leather luxury clutch handbag
  "photo-1590739225287-bd2ea5183db7", // Powder pink luxury handbag
  "photo-1512436991641-6745cdb1723f", // Structured saddle leather handbag
  "photo-1553062407-98eeb64c6a62", // Monogrammed luxury canvas handbag
  "photo-1549439602-43ebca2327af", // White luxury leather tote handbag
  "photo-1605733513597-a8f8341084e6", // Rich tan leather travel duffle handbag
  "photo-1523170335258-f5ed11844a49", // Gold hardware lock on luxury handbag
  "photo-1600950207944-0d63e8edbc3f", // Turn-lock clasp on luxury leather handbag
  "photo-1563178406-4cdc2923acbc", // Metallic clasp detail on luxury handbag
  "photo-1614179689702-355944cd0918", // Fine leather grain texture on luxury handbag
  "photo-1517254797898-04edd251bfb3", // Quilted leather hardware close-up on handbag
  "photo-1509319117193-57bab727e09d", // Taupe neutral luxury handbag
  "photo-1516762689617-e1cffcef479d", // High fashion model carry with luxury black handbag
  "photo-1509631179647-0177331693ae", // Model carrying top-handle luxury handbag
] as const;

/** Wide editorial frames for heroes, banners and collection headers — all featuring luxury handbags. */
export const EDITORIAL = [
  "photo-1590874103328-eac38a683ce7", // Cognac tan Hermès style top-handle luxury handbag
  "photo-1548036328-c9fa89d128fa", // Black quilted luxury flap handbag
  "photo-1584917865442-de89df76afd3", // Minimal luxury leather structured handbag
  "photo-1509631179647-0177331693ae", // Trench coat editorial model carrying luxury top-handle handbag
  "photo-1490481651871-ab68de25d43d", // Parisian street style editorial model carrying luxury handbag
  "photo-1594223274512-ad4803739b7c", // Ivory luxury designer shoulder handbag
  "photo-1575032617751-6ddec2089882", // Cognac leather tote bag display frame
  "photo-1516762689617-e1cffcef479d", // Runway model carrying black leather luxury handbag
  "photo-1566150905458-1bf1fc113f0d", // Crimson red luxury leather handbag
  "photo-1591561954557-26941169b49e", // Emerald green luxury top-handle handbag
  "photo-1581338834647-b0fb40704e21", // Luxury handbag on marble display pedestal
  "photo-1553062407-98eeb64c6a62", // Monogrammed luxury canvas handbag
  "photo-1512436991641-6745cdb1723f", // Structured leather saddle handbag
  "photo-1544816155-12df9643f363", // Burgundy luxury leather top-handle handbag
  "photo-1590739225287-bd2ea5183db7", // Powder pink luxury handbag
  "photo-1601924994987-69e26d50dc26", // Minimal beige leather shoulder handbag
] as const;

/** Handbag display pedestals, boutique handbag cases and consultation setups. */
export const INTERIORS = [
  "photo-1581338834647-b0fb40704e21", // Luxury handbag on marble pedestal
  "photo-1575032617751-6ddec2089882", // Luxury handbag display shelf
  "photo-1590874103328-eac38a683ce7", // Top-handle luxury handbag in private salon
  "photo-1548036328-c9fa89d128fa", // Quilted handbag display suite
  "photo-1584917865442-de89df76afd3", // Minimalist handbag vault showcase
] as const;

/** Curators and models presenting/styling luxury handbags. */
export const PORTRAITS = [
  "photo-1509631179647-0177331693ae", // Curator holding top-handle luxury handbag
  "photo-1490481651871-ab68de25d43d", // Client advisor carrying luxury handbag
  "photo-1516762689617-e1cffcef479d", // Specialist carrying sleek black luxury handbag
  "photo-1509631179647-0177331693ae", // Head of curation carrying luxury handbag
  "photo-1490481651871-ab68de25d43d", // Master authenticator with handbag
  "photo-1516762689617-e1cffcef479d", // Concierge director with handbag
  "photo-1509631179647-0177331693ae", // Luxury curator with handbag
  "photo-1490481651871-ab68de25d43d", // Leather craftsman with handbag
  "photo-1516762689617-e1cffcef479d", // Valuation specialist with handbag
] as const;

/** Deterministically pick `count` entries from a pool, starting at `seed`. */
export function pick(pool: readonly string[], seed: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => pool[(seed + i * 7) % pool.length]);
}
