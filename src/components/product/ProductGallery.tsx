"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, ShieldCheck, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImage } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

type ProductGalleryProps = {
  images: ProductImage[];
  title: string;
  brand: string;
  rareFind?: boolean;
  newArrival?: boolean;
};

export function ProductGallery({
  images,
  title,
  brand,
  rareFind,
  newArrival,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImage = images[activeIndex] ?? images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Display Frame */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-warm group border border-line/40">
        {activeImage ? (
          <Image
            src={activeImage.url}
            alt={activeImage.alt || `${brand} ${title}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-transform duration-700 ease-out ${
              isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        ) : null}

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none z-10">
          <Badge tone="dark" className="bg-ink/80 text-ivory backdrop-blur-md">
            <ShieldCheck className="size-3 text-champagne mr-1 inline" />
            Authenticated Piece
          </Badge>
          {rareFind ? (
            <Badge tone="rare" className="bg-champagne/90 text-ink">
              <Sparkles className="size-3 mr-1 inline" />
              Rare Find
            </Badge>
          ) : null}
          {newArrival ? (
            <Badge tone="default" className="bg-bone/90 text-charcoal">
              New Arrival
            </Badge>
          ) : null}
        </div>

        {/* Fullscreen Expand Action */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-luxe backdrop-blur-sm transition-transform duration-300 hover:scale-110"
          aria-label="Expand image fullscreen"
        >
          <Expand className="size-4" />
        </button>

        {/* Carousel arrows */}
        {images.length > 1 ? (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-ivory/80 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-ivory"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-ivory/80 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-ivory"
              aria-label="Next photograph"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        ) : null}
      </div>

      {/* Thumbnails Picker */}
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.url + idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative aspect-4/5 overflow-hidden bg-warm transition-all duration-300 border ${
                activeIndex === idx
                  ? "border-ink ring-1 ring-ink opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `View ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-md p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 flex size-12 items-center justify-center text-ivory transition-transform hover:scale-110"
            aria-label="Close fullscreen view"
          >
            <X className="size-6" />
          </button>

          <div className="relative aspect-4/5 max-h-[85vh] w-full max-w-4xl overflow-hidden">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 ? (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-ink/80 px-6 py-2 rounded-full border border-ivory/20 text-ivory font-sans text-xs tracking-luxe">
              <button onClick={handlePrev} className="hover:text-champagne">
                <ChevronLeft className="size-4" />
              </button>
              <span>
                {activeIndex + 1} / {images.length}
              </span>
              <button onClick={handleNext} className="hover:text-champagne">
                <ChevronRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
