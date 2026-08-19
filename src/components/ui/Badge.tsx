import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** `sold` mutes the badge; `rare` gives it the champagne accent. */
  tone?: "default" | "rare" | "sold" | "dark";
  className?: string;
};

const tones = {
  default: "bg-ivory/95 text-ink",
  rare: "bg-champagne text-ivory",
  sold: "bg-taupe/90 text-ivory",
  dark: "bg-ink text-ivory",
} as const;

export function Badge({ children, tone = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 font-sans text-[0.5625rem] tracking-luxe uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
