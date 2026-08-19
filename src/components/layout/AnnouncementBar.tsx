"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/types";

const DISMISS_KEY = "mr.announcement.dismissed";

/**
 * Slim top bar. The message is CMS-driven; dismissal is remembered per
 * announcement id, so publishing new copy shows the bar again.
 */
export function AnnouncementBar({ announcement }: { announcement: Announcement | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    try {
      const dismissed = window.localStorage.getItem(DISMISS_KEY);
      setVisible(dismissed !== announcement.id);
    } catch {
      setVisible(true);
    }
  }, [announcement]);

  if (!announcement) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, announcement.id);
    } catch {
      // Storage unavailable — the bar simply returns on next load.
    }
  };

  const message = (
    <span className="font-sans text-[0.625rem] tracking-luxe uppercase sm:text-[0.6875rem]">
      {announcement.message}
    </span>
  );

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          key={announcement.id}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-ink text-ivory"
        >
          <div className="relative flex items-center justify-center px-12 py-2.5 text-center">
            {announcement.href ? (
              <Link href={announcement.href} className="link-underline">
                {message}
              </Link>
            ) : (
              message
            )}

            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ivory/60 transition-colors hover:text-ivory"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
