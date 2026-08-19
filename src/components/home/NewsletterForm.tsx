"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent } from "react";

/**
 * Newsletter capture.
 *
 * NOTE: this does not yet transmit anything. Wire the submit handler to your
 * email provider (or a route handler) before launch — the success state below
 * is local only, so nothing is actually subscribed.
 */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dark = tone === "dark";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p
        className={`flex items-center gap-2 font-sans text-[0.8125rem] ${
          dark ? "text-ivory/80" : "text-stone"
        }`}
      >
        <Check className="size-4 shrink-0" aria-hidden />
        Thank you — please check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-3 border-b pb-2.5"
      style={{ borderColor: dark ? "rgba(251,250,247,0.35)" : "var(--color-line-strong)" }}
    >
      <label htmlFor={`newsletter-${tone}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${tone}`}
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email Address"
        className={`w-full bg-transparent py-1 font-sans text-[0.875rem] focus:outline-none ${
          dark
            ? "text-ivory placeholder:text-ivory/45"
            : "text-ink placeholder:text-taupe"
        }`}
      />
      <button
        type="submit"
        className={`flex shrink-0 items-center gap-2 font-sans text-[0.625rem] tracking-luxe uppercase transition-colors ${
          dark ? "text-ivory hover:text-champagne" : "text-ink hover:text-champagne"
        }`}
      >
        Join
        <ArrowRight className="size-3.5" aria-hidden />
      </button>
    </form>
  );
}
