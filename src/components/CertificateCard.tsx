"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuExpand,
  LuX,
} from "react-icons/lu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export interface CertificateLabels {
  open: string;
  close: string;
  prev: string;
  next: string;
  download: string;
}

interface CertificateCardProps {
  /** Certificate pages in reading order (a scan can span several pages). */
  pages: string[];
  /** Localized alt text for the scan. */
  alt: string;
  caption: string;
  /** Path of the downloadable PDF version. */
  pdfHref: string;
  /** Text direction of the surrounding page. */
  dir: "rtl" | "ltr";
  labels: CertificateLabels;
}

/**
 * Certificate scan preview with an accessible lightbox and a PDF download.
 * The image is the visual proof; the crawlable record lives beside it as text.
 */
export default function CertificateCard({
  pages,
  alt,
  caption,
  pdfHref,
  dir,
  labels,
}: CertificateCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const pageCount = pages.length;
  const hasPages = pageCount > 1;
  const src = pages[page];
  const isRtl = dir === "rtl";
  // In RTL the "next" control sits on the left, so the chevrons swap.
  const PrevIcon = isRtl ? LuChevronRight : LuChevronLeft;
  const NextIcon = isRtl ? LuChevronLeft : LuChevronRight;

  const step = useCallback(
    (delta: number) =>
      setPage((current) => (current + delta + pageCount) % pageCount),
    [pageCount],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setPage(0);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (hasPages && event.key === "ArrowRight") step(1);
      if (hasPages && event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, hasPages, step, close]);

  return (
    <div className="rounded-3xl border border-amber-500/25 bg-slate-950/70 p-4 sm:p-5 shadow-glass">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full aspect-[210/297] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        aria-label={labels.open}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1023px) 100vw, 448px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent p-4 opacity-90 transition-opacity group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-xl bg-slate-950/85 px-3 py-2 text-xs font-semibold text-amber-200 border border-amber-500/40">
            <LuExpand className="w-4 h-4" />
            {labels.open}
          </span>
        </span>
      </button>

      <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-400 text-center">
        {caption}
      </p>

      <a
        href={pdfHref}
        download
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "mt-4 w-full gap-2",
        )}
      >
        <LuDownload className="w-4 h-4" />
        {labels.download}
      </a>

      <AnimatePresence>
        {isOpen &&
          createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={close}
            >
              <div
                className="relative h-[85vh] w-full max-w-3xl"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="absolute top-4 end-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-white border border-white/20 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuX className="w-5 h-5" />
              </button>

              {hasPages && (
                <>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(-1);
                    }}
                    aria-label={labels.prev}
                    className="absolute start-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-white border border-white/20 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <PrevIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      step(1);
                    }}
                    aria-label={labels.next}
                    className="absolute end-3 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 text-white border border-white/20 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <NextIcon className="w-5 h-5" />
                  </button>
                </>
              )}

              <p className="absolute bottom-4 inset-x-0 mx-auto max-w-3xl px-4 text-center text-xs sm:text-sm text-slate-300">
                {caption}
              </p>
            </motion.div>,
            document.body,
          )}
      </AnimatePresence>
    </div>
  );
}
