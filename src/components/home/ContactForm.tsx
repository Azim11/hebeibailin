"use client";

import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextArea, TextField } from "@/components/ui/Field";

/**
 * Contact form.
 *
 * NOTE: this does not yet transmit anything. Wire the submit handler to your
 * inbox or a route handler before launch — the success state below is local
 * only, so nothing is actually sent.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-start gap-3 border border-line-strong px-6 py-8">
        <Check className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
        <p className="font-sans text-[0.9375rem] leading-relaxed text-ink">
          Thank you — your message has been received. A member of our team will
          be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full Name" name="name" type="text" required />
        <TextField label="Email Address" name="email" type="email" required />
      </div>
      <TextField label="Subject" name="subject" type="text" />
      <TextArea label="Message" name="message" rows={6} required />
      <Button type="submit" size="lg" className="self-start">
        Send Message
      </Button>
    </form>
  );
}
