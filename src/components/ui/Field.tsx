"use client";

import { ChevronDown } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";

const controlClasses =
  "w-full border-b border-line bg-transparent py-3 font-sans text-[0.9375rem] text-ink placeholder:text-taupe focus:border-ink focus:outline-none transition-colors duration-300";

const labelClasses =
  "block font-sans text-[0.625rem] tracking-luxe text-stone uppercase";

type FieldWrapperProps = {
  label: string;
  hint?: ReactNode;
  required?: boolean;
  children: (id: string) => ReactNode;
  className?: string;
};

function FieldWrapper({ label, hint, required, children, className = "" }: FieldWrapperProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required ? <span className="text-champagne"> *</span> : null}
      </label>
      {children(id)}
      {hint ? <p className="font-sans text-xs text-taupe">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  required,
  className,
  ...rest
}: { label: string; hint?: ReactNode; className?: string } & ComponentProps<"input">) {
  return (
    <FieldWrapper label={label} hint={hint} required={required} className={className}>
      {(id) => <input id={id} required={required} className={controlClasses} {...rest} />}
    </FieldWrapper>
  );
}

export function TextArea({
  label,
  hint,
  required,
  className,
  rows = 4,
  ...rest
}: { label: string; hint?: ReactNode; className?: string } & ComponentProps<"textarea">) {
  return (
    <FieldWrapper label={label} hint={hint} required={required} className={className}>
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          required={required}
          className={`${controlClasses} resize-none`}
          {...rest}
        />
      )}
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  hint,
  required,
  className,
  options,
  placeholder = "Select",
  ...rest
}: {
  label: string;
  hint?: ReactNode;
  className?: string;
  options: string[];
  placeholder?: string;
} & ComponentProps<"select">) {
  return (
    <FieldWrapper label={label} hint={hint} required={required} className={className}>
      {(id) => (
        <div className="relative">
          <select
            id={id}
            required={required}
            className={`${controlClasses} appearance-none pr-8`}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-taupe"
            aria-hidden
          />
        </div>
      )}
    </FieldWrapper>
  );
}
