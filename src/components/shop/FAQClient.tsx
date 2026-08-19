"use client";

import { useMemo, useState } from "react";
import { Search, X, Plus, Minus, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export type FAQItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

type FAQClientProps = {
  categories: string[];
  items: FAQItem[];
};

export function FAQClient({ categories, items }: FAQClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([items[0]?.id ?? ""]));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-10">
      {/* Search & Categories Bar */}
      <div className="flex flex-col gap-6">
        {/* Search input */}
        <div className="relative max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-taupe"
            aria-hidden
          />
          <input
            id="faq-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword, authentication, shipping, returns..."
            className="w-full border border-line bg-warm/50 py-3.5 pl-11 pr-10 font-sans text-[0.875rem] text-ink placeholder:text-taupe focus:border-champagne focus:bg-ivory focus:outline-none transition-colors"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-taupe hover:text-ink transition-colors"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-6">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
              selectedCategory === "All"
                ? "bg-ink text-ivory"
                : "border border-line bg-warm/40 text-stone hover:border-taupe hover:text-ink"
            }`}
          >
            All Questions ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter((i) => i.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-sans text-[0.75rem] tracking-luxe uppercase transition-all ${
                  isSelected
                    ? "bg-ink text-ivory"
                    : "border border-line bg-warm/40 text-stone hover:border-taupe hover:text-ink"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-line py-16 text-center">
          <HelpCircle className="size-8 text-taupe" />
          <p className="mt-4 font-serif text-xl text-ink">No questions found</p>
          <p className="mt-1 font-sans text-[0.875rem] text-stone">
            Try adjusting your search query or choosing another category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 border border-ink px-5 py-2.5 font-sans text-[0.75rem] tracking-luxe uppercase text-ink hover:bg-ink hover:text-ivory transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="divide-y divide-line border-y border-line">
          {filteredItems.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div key={item.id} className="transition-colors hover:bg-warm/20">
                <h2>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="font-sans text-[0.625rem] tracking-luxe-wide text-champagne uppercase">
                        {item.category}
                      </span>
                      <span className="font-serif text-lg text-ink sm:text-xl">
                        {item.question}
                      </span>
                    </div>
                    <span className="mt-1 flex size-7 shrink-0 items-center justify-center border border-line bg-warm text-stone transition-colors">
                      {isOpen ? (
                        <Minus className="size-3.5" aria-hidden />
                      ) : (
                        <Plus className="size-3.5" aria-hidden />
                      )}
                    </span>
                  </button>
                </h2>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-12 font-sans text-[0.9375rem] leading-relaxed text-stone">
                        <p className="whitespace-pre-line">{item.answer}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
