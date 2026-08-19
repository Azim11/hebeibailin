import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** `wide` for editorial full-bleed sections, `narrow` for reading columns. */
  size?: "narrow" | "default" | "wide" | "full";
  className?: string;
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-[1440px]",
  wide: "max-w-[1760px]",
  full: "max-w-none",
} as const;

export function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
