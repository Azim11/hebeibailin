import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans uppercase tracking-luxe transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-40 border";

const variants: Record<Variant, string> = {
  // Filled ink button — primary commerce actions.
  solid: "border-ink bg-ink text-ivory hover:bg-transparent hover:text-ink",
  // Hairline button on light ground — secondary actions.
  outline:
    "border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  // Text-only, for tertiary actions inside dense layouts.
  ghost: "border-transparent bg-transparent text-ink hover:text-champagne",
  // Inverted, for use over imagery and dark sections.
  light:
    "border-ivory/70 bg-transparent text-ivory hover:bg-ivory hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-5 text-[0.625rem]",
  md: "h-12 px-8 text-[0.6875rem]",
  lg: "h-14 px-10 text-[0.75rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
};

function classes({ variant = "solid", size = "md", fullWidth, className = "" }: SharedProps) {
  return [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");
}

export function Button({
  variant,
  size,
  className,
  children,
  fullWidth,
  ...rest
}: SharedProps & ComponentProps<"button">) {
  return (
    <button
      className={classes({ variant, size, className, children, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  fullWidth,
  href,
  ...rest
}: SharedProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={classes({ variant, size, className, children, fullWidth })}
      {...rest}
    >
      {children}
    </Link>
  );
}
