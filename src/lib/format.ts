import type { Currency } from "@/lib/types";

const formatters = new Map<string, Intl.NumberFormat>();

/**
 * Currency formatting without decimals — luxury pricing is quoted in whole
 * units, and trailing ".00" reads as retail rather than boutique.
 */
export function formatPrice(amount: number, currency: Currency = "USD"): string {
  const key = currency;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    formatters.set(key, formatter);
  }
  return formatter.format(amount);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** Join non-empty parts with a middot — used for spec strings. */
export function specLine(...parts: (string | undefined | null)[]): string {
  return parts.filter(Boolean).join(" · ");
}
