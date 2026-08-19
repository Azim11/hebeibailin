"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/**
 * Full-height editorial hero with a slow parallax drift on the image.
 * The parallax is disabled entirely under `prefers-reduced-motion`.
 */
export function Hero({ image }: { image: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex h-[92svh] min-h-[560px] items-end overflow-hidden bg-ink lg:h-[calc(100svh-4.5rem)]"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient scrim keeps the headline legible over any crop */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/10" />

      <div className="relative mx-auto w-full max-w-[1760px] px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[0.625rem] tracking-luxe-wide text-ivory/70 uppercase"
        >
          The Art of the Handbag
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-serif text-[3rem] leading-[0.95] text-ivory sm:text-[4.5rem] lg:text-[6rem]"
        >
          Timeless. Iconic.
          <br />
          Yours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-lg font-sans text-[0.9375rem] leading-relaxed text-ivory/80"
        >
          Discover a curated collection of exceptional handbags, selected for
          craftsmanship, rarity and timeless style.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/collections/handbags"
            className="flex h-14 items-center justify-center border border-ivory bg-ivory px-10 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:bg-transparent hover:text-ivory"
          >
            Shop Handbags
          </Link>
          <Link
            href="/collections/new-arrivals"
            className="flex h-14 items-center justify-center border border-ivory/60 px-10 font-sans text-[0.6875rem] tracking-luxe text-ivory uppercase transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-ink"
          >
            Explore New Arrivals
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
