"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, FileText, Truck, Scale } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductTabsProps = {
  product: Product;
};

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "specs" | "authenticity" | "shipping">("details");

  return (
    <div className="mt-16 border-t border-line pt-12 lg:mt-24 lg:pt-16">
      {/* Tabs Selector Bar */}
      <div className="flex border-b border-line overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 border-b-2 px-6 py-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors whitespace-nowrap ${
            activeTab === "details"
              ? "border-ink font-semibold text-ink"
              : "border-transparent text-taupe hover:text-ink"
          }`}
        >
          <FileText className="size-3.5" />
          Craftsmanship & Description
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 border-b-2 px-6 py-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors whitespace-nowrap ${
            activeTab === "specs"
              ? "border-ink font-semibold text-ink"
              : "border-transparent text-taupe hover:text-ink"
          }`}
        >
          <Scale className="size-3.5" />
          Full Specifications
        </button>

        <button
          onClick={() => setActiveTab("authenticity")}
          className={`flex items-center gap-2 border-b-2 px-6 py-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors whitespace-nowrap ${
            activeTab === "authenticity"
              ? "border-ink font-semibold text-ink"
              : "border-transparent text-taupe hover:text-ink"
          }`}
        >
          <ShieldCheck className="size-3.5 text-champagne" />
          Authentication Report
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 border-b-2 px-6 py-4 font-sans text-[0.6875rem] tracking-luxe uppercase transition-colors whitespace-nowrap ${
            activeTab === "shipping"
              ? "border-ink font-semibold text-ink"
              : "border-transparent text-taupe hover:text-ink"
          }`}
        >
          <Truck className="size-3.5" />
          Delivery & Returns
        </button>
      </div>

      {/* Tab Content Panes */}
      <div className="py-8">
        {/* Tab 1: Details */}
        {activeTab === "details" ? (
          <div className="mx-auto max-w-3xl">
            <h3 className="font-serif text-2xl text-ink">The Silhouette & Story</h3>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-stone">
              {product.description}
            </p>

            <div className="mt-8 grid gap-4 border-l-2 border-champagne bg-warm/50 p-6 sm:grid-cols-2">
              <div>
                <p className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                  Provenential Character
                </p>
                <p className="mt-1 font-sans text-sm text-charcoal font-medium">
                  {product.year ? `Crafted in ${product.year} · ${product.origin}` : product.origin}
                </p>
              </div>
              <div>
                <p className="font-sans text-[0.625rem] tracking-luxe text-taupe uppercase">
                  Hardware & Finish
                </p>
                <p className="mt-1 font-sans text-sm text-charcoal font-medium">
                  {product.hardware} Hardware · {product.material} Leather
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Tab 2: Specifications */}
        {activeTab === "specs" ? (
          <div className="mx-auto max-w-3xl">
            <dl className="divide-y divide-line border-y border-line text-sm">
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Model Name</dt>
                <dd className="col-span-2 font-medium text-ink">{product.name}</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Category</dt>
                <dd className="col-span-2 text-charcoal">{product.category}</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Dimensions</dt>
                <dd className="col-span-2 text-charcoal">{product.size}</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Color & Family</dt>
                <dd className="col-span-2 text-charcoal">{product.color} ({product.colorFamily})</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Material / Leather</dt>
                <dd className="col-span-2 text-charcoal">{product.material}</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Hardware Finish</dt>
                <dd className="col-span-2 text-charcoal">{product.hardware}</dd>
              </div>
              {product.year ? (
                <div className="grid grid-cols-3 py-3.5">
                  <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Production Year</dt>
                  <dd className="col-span-2 text-charcoal">{product.year}</dd>
                </div>
              ) : null}
              {product.origin ? (
                <div className="grid grid-cols-3 py-3.5">
                  <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Country of Origin</dt>
                  <dd className="col-span-2 text-charcoal">{product.origin}</dd>
                </div>
              ) : null}
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Condition Grade</dt>
                <dd className="col-span-2 font-medium text-ink">{product.condition}</dd>
              </div>
              <div className="grid grid-cols-3 py-3.5">
                <dt className="font-sans text-xs text-taupe uppercase tracking-luxe">Included Items</dt>
                <dd className="col-span-2 text-charcoal">{product.includedItems.join(", ")}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        {/* Tab 3: Authenticity Report */}
        {activeTab === "authenticity" ? (
          <div className="mx-auto max-w-3xl">
            <div className="bg-ink text-ivory p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-champagne" />
                <h3 className="font-serif text-2xl text-ivory">Dual-Certified Authentication Report</h3>
              </div>

              <p className="mt-4 font-sans text-xs text-ivory/70 leading-relaxed">
                This exact piece passed our three-stage physical inspection before being logged into our vault collection.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-ivory/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-champagne mt-0.5" />
                  <span>Stitching alignment and thread tension inspected under optical magnification.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-champagne mt-0.5" />
                  <span>Hardware engraving depth, weight, and turn-lock mechanism tolerance verified.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-4 shrink-0 text-champagne mt-0.5" />
                  <span>Leather grain, density, heat stamp foil density, and blind stamps cross-referenced with archive databases.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {/* Tab 4: Shipping & Delivery */}
        {activeTab === "shipping" ? (
          <div className="mx-auto max-w-3xl">
            <h3 className="font-serif text-2xl text-ink">White-Glove Courier & Returns</h3>
            <p className="mt-4 font-sans text-sm text-stone leading-relaxed">
              Every handbag is packaged in custom museum-grade protective packaging, sealed with tamper-evident security security tape, and shipped via fully insured express air courier.
            </p>

            <div className="mt-6 grid gap-4 text-xs sm:grid-cols-2">
              <div className="border border-line p-4">
                <p className="font-sans font-medium text-ink uppercase tracking-luxe">Express Shipping</p>
                <p className="mt-1 text-taupe">Complimentary worldwide delivery with signature requirement on delivery.</p>
              </div>
              <div className="border border-line p-4">
                <p className="font-sans font-medium text-ink uppercase tracking-luxe">14-Day Return Window</p>
                <p className="mt-1 text-taupe">Return eligible within 14 days provided security tag remains intact.</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
