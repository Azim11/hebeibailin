"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  /** Open on first render — used for the primary Description panel. */
  defaultOpen?: boolean;
};

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="border-t border-line">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-sans text-[0.6875rem] tracking-luxe text-ink uppercase">
            {title}
          </span>
          {open ? (
            <Minus className="size-4 shrink-0 text-stone" aria-hidden />
          ) : (
            <Plus className="size-4 shrink-0 text-stone" aria-hidden />
          )}
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 font-sans text-[0.875rem] leading-relaxed text-stone">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="border-b border-line">{children}</div>;
}
