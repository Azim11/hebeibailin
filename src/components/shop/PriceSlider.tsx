"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";

type PriceSliderProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

/**
 * Dual-thumb range control built from two overlaid `input[type=range]`
 * elements, so it stays keyboard operable and announces values to screen
 * readers. The thumbs cannot cross: each clamps against the other.
 */
export function PriceSlider({ min, max, value, onChange }: PriceSliderProps) {
  const [local, setLocal] = useState<[number, number]>(value);

  // Follow external resets (e.g. "Clear all filters").
  useEffect(() => setLocal(value), [value]);

  const step = Math.max(100, Math.round((max - min) / 200 / 100) * 100);

  const commit = (next: [number, number]) => {
    setLocal(next);
    onChange(next);
  };

  const lowPercent = ((local[0] - min) / (max - min)) * 100;
  const highPercent = ((local[1] - min) / (max - min)) * 100;

  const thumb =
    "pointer-events-none absolute inset-x-0 top-1/2 h-0 w-full -translate-y-1/2 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-ink [&::-webkit-slider-thumb]:bg-ivory [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-ink [&::-moz-range-thumb]:bg-ivory";

  return (
    <div>
      <div className="relative h-8">
        {/* Track */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
        {/* Selected span */}
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-ink"
          style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={local[0]}
          aria-label="Minimum price"
          onChange={(event) =>
            commit([Math.min(Number(event.target.value), local[1] - step), local[1]])
          }
          className={thumb}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={local[1]}
          aria-label="Maximum price"
          onChange={(event) =>
            commit([local[0], Math.max(Number(event.target.value), local[0] + step)])
          }
          className={thumb}
        />
      </div>

      <div className="mt-2 flex items-center justify-between font-sans text-[0.75rem] text-stone">
        <span>{formatPrice(local[0])}</span>
        <span>
          {formatPrice(local[1])}
          {local[1] >= max ? "+" : ""}
        </span>
      </div>
    </div>
  );
}
