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

/**
 * Handbag / accessory still-life frames used for product imagery.
 * Every Unsplash id below has been opened and confirmed to show an actual
 * handbag — do not add an id here without viewing the photo first, since
 * Unsplash ids that merely resolve (HTTP 200) are not necessarily on-subject.
 */
export const BAG_SHOTS = [
  "/images/hero_luxury_bag.jpg", // Generated Tan Top-Handle Luxury Handbag
  "/images/chanel_classic_black.jpg", // Generated Chanel Black Quilted Flap Handbag
  "/images/dior_lady_latte.jpg", // Generated Dior Lady Latte Quilted Handbag
  "/images/bottega_jodie_brown.jpg", // Generated Bottega Jodie Woven Leather Handbag
  "/images/goyard_tote_black.jpg", // Generated Goyard Black Chevron Tote Bag
  "photo-1584917865442-de89df76afd3", // Orange top-handle handbag in boutique window
  "photo-1548036328-c9fa89d128fa", // Black quilted leather gold-chain flap handbag (Gucci Marmont)
  "photo-1590874103328-eac38a683ce7", // Tan woven leather top-handle handbag in boutique window
  "photo-1594223274512-ad4803739b7c", // Teal leather top-handle handbag
  "photo-1566150905458-1bf1fc113f0d", // Pink chevron-quilted chain clutch
  "photo-1591561954557-26941169b49e", // Floral-print leather top-handle handbag
  "photo-1575032617751-6ddec2089882", // Burgundy croc-embossed crossbody handbag
  "photo-1598532163257-ae3c6b2524b6", // Woven tan leather tote with chain handle
  "photo-1559563458-527698bf5295", // Grey chain-strap handbag styled on a vanity
  "photo-1605733513597-a8f8341084e6", // Grey leather satchel with top handle
  "photo-1705909237050-7a7625b47fac", // Black leather boxy handbag
  "photo-1637759292654-a12cb2be085e", // Cognac leather handbag handle detail
  "photo-1691480150204-66dd1eb77391", // Cognac leather structured satchel
  "photo-1640901555383-7335ec5a6476", // Yellow croc-embossed handbag
  "photo-1702326626601-74d2e86922b4", // Black leather bucket bag hardware detail
  "photo-1664187284276-2f3254cdc7dc", // Black leather handbag on a sunlit table
] as const;

/** Wide editorial frames for heroes, banners and collection headers — all featuring luxury handbags. */
export const EDITORIAL = [
  "/images/hero_luxury_bag.jpg", // Generated Hero Tan Luxury Handbag
  "/images/chanel_classic_black.jpg", // Generated Black Quilted Flap Handbag
  "/images/dior_lady_latte.jpg", // Generated Dior Lady Latte Handbag
  "/images/bottega_jodie_brown.jpg", // Generated Bottega Jodie Woven Handbag
  "/images/goyard_tote_black.jpg", // Generated Goyard Chevron Tote
  "photo-1589731119540-c4586781dae1", // Editorial model carrying a Christian Dior Lady Dior bag
  "photo-1506152983158-b4a74a01c721", // Styled white leather handbag with sunglasses
  "photo-1524498250077-390f9e378fc0", // Woman carrying a teal leather handbag
  "photo-1559127452-9328c6b697bd", // Model in tailored black suit holding an orange croc clutch
  "photo-1649544284889-2c30c3267013", // Burgundy croc top-handle handbag on pink stairs
  "photo-1584917865442-de89df76afd3", // Orange top-handle handbag in boutique window
  "photo-1590874103328-eac38a683ce7", // Tan woven leather top-handle handbag in boutique window
  "photo-1591561954557-26941169b49e", // Floral-print leather top-handle handbag
] as const;

/** Boutique interiors, display cases and showroom consultation setups. */
export const INTERIORS = [
  "photo-1769981653696-5ce5a59263bf", // Luxury boutique clothing display (Celine)
  "photo-1764512680324-048f158cab2b", // Luxury boutique glass display cases
  "photo-1775021723698-b9afeaa084d1", // Jewelry and accessory display shelf
  "photo-1774110073583-2475ab5ed8b2", // Luxury boutique window display (Bulgari)
  "photo-1782834294716-8e28c18bdba6", // Marble staircase inside a luxury store
] as const;

/** Curators, specialists and clients presenting/styling luxury handbags. */
export const PORTRAITS = [
  "photo-1604904612715-47bf9d9bc670", // Polished professional portrait, grey blazer
  "photo-1581065178047-8ee15951ede6", // Polished professional portrait, black blazer
  "photo-1616065297556-f05bc00c9a3e", // Polished professional portrait, black blazer
  "photo-1563132337-f159f484226c", // Polished professional portrait, orange blazer
] as const;

/** Deterministically pick `count` entries from a pool, starting at `seed`. */
export function pick(pool: readonly string[], seed: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => pool[(seed + i * 7) % pool.length]);
}
