"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

type Option = { value: string; label: string; count?: number };

type FilterGroupProps = {
  title: string;
  options?: Option[];
  selected?: string[];
  onToggle?: (value: string) => void;
  defaultOpen?: boolean;
  children?: ReactNode;
};

/** Collapsible facet. Renders `children` instead of a checkbox list when given. */
export function FilterGroup({
  title,
  options,
  selected = [],
  onToggle,
  defaultOpen = true,
  children,
}: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-[0.625rem] tracking-luxe text-ink uppercase">
          {title}
          {selected.length > 0 ? (
            <span className="ml-2 text-champagne">({selected.length})</span>
          ) : null}
        </span>
        <ChevronDown
          className={`size-3.5 text-taupe transition-transform duration-400 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              {children ?? (
                <ul className="flex flex-col gap-2.5">
                  {options?.map((option) => {
                    const checked = selected.includes(option.value);
                    return (
                      <li key={option.value}>
                        <label className="flex cursor-pointer items-center gap-3 font-sans text-[0.8125rem] text-charcoal">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => onToggle?.(option.value)}
                            className="sr-only"
                          />
                          <span
                            className={`flex size-4 shrink-0 items-center justify-center border transition-colors duration-300 ${
                              checked
                                ? "border-ink bg-ink text-ivory"
                                : "border-line-strong bg-transparent"
                            }`}
                            aria-hidden
                          >
                            {checked ? <Check className="size-2.5" /> : null}
                          </span>

                          <span className="flex-1">{option.label}</span>

                          {typeof option.count === "number" ? (
                            <span className="font-sans text-[0.6875rem] text-taupe">
                              {option.count}
                            </span>
                          ) : null}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
