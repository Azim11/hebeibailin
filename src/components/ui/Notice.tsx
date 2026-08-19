import { Info } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Renders a visible note that surrounding content is placeholder data awaiting
 * real copy. Keeping this in the UI (rather than a code comment) makes it hard
 * for sample testimonials or press logos to reach production unnoticed.
 */
export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto flex max-w-2xl items-start justify-center gap-2 text-center font-sans text-[0.6875rem] leading-relaxed text-taupe">
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
