import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Small tracked label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  link?: { label: string; href: string };
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  link,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={[
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        link && !centered ? "sm:flex-row sm:items-end sm:justify-between" : "",
        className,
      ].join(" ")}
    >
      <div className={centered ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow ? (
          <p className="mb-4 font-sans text-[0.6875rem] tracking-luxe-wide text-champagne uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-serif text-[2rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 font-sans text-[0.9375rem] leading-relaxed text-stone">
            {description}
          </p>
        ) : null}
      </div>

      {link ? (
        <Link
          href={link.href}
          className="link-underline font-sans text-[0.6875rem] tracking-luxe text-ink uppercase shrink-0"
        >
          {link.label}
        </Link>
      ) : null}
    </Reveal>
  );
}
