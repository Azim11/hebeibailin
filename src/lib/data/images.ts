/**
 * Original, unbranded luxury bag photography stored in `public/images/bags`.
 *
 * The small local pool is intentionally reused across catalogue and editorial
 * surfaces so the storefront never depends on a third-party image host.
 */

export const BAG_SHOTS = [
  "/images/bags/espresso-structured.png",
  "/images/bags/ivory-quilted.png",
  "/images/bags/black-tote.png",
  "/images/bags/burgundy-crossbody.png",
  "/images/bags/camel-woven.png",
  "/images/bags/forest-satchel.png",
] as const;

export const EDITORIAL = [
  "/images/editorial/atelier.png",
  "/images/editorial/artisan-craft.png",
  "/images/editorial/concierge-portrait.png",
  "/images/editorial/authentication-tools.png",
  "/images/editorial/showroom.png",
  "/images/editorial/packaging.png",
] as const;

export const INTERIORS = [
  EDITORIAL[4],
  EDITORIAL[0],
  EDITORIAL[1],
] as const;

export const PORTRAITS = [EDITORIAL[2]] as const;

/** Keep the existing data API while ensuring every image resolves locally. */
export function photo(id: string, width = 1400, height?: number): string {
  void width;
  void height;
  return id;
}

/** Deterministically pick `count` entries from a pool, starting at `seed`. */
export function pick(pool: readonly string[], seed: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => pool[(seed + i * 7) % pool.length]);
}
