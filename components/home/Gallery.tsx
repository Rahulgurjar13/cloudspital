"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";

// On-the-ground gallery — real deployment photography only (no renders):
// one large lead photo beside a 2×2 block, with a keyboard-navigable lightbox.
const PHOTOS = [
  {
    src: "/images/mmu-field.webp",
    alt: "Cloudspital mobile medical unit with consultation and screening bays, deployed in the field",
    caption: "Mobile medical unit",
    span: "sm:col-span-2 lg:col-span-6 lg:row-span-2",
    w: 1448,
    h: 1086,
  },
  {
    src: "/m7.webp",
    alt: "Ribbon-cutting at a Cloudspital Health ATM kiosk inauguration",
    caption: "Inauguration",
    span: "lg:col-span-3",
    w: 320,
    h: 426,
  },
  {
    src: "/m4.webp",
    alt: "Ribbon-cutting at the launch of a Cloudspital Health ATM kiosk",
    caption: "Launch ceremony",
    span: "lg:col-span-3",
    w: 320,
    h: 375,
  },
  {
    src: "/m9.webp",
    alt: "Cloudspital team and local officials beside a deployed Health ATM kiosk",
    caption: "On-site deployment",
    span: "lg:col-span-3",
    w: 320,
    h: 427,
  },
  {
    src: "/m2.webp",
    alt: "Cloudspital Health ATM kiosk installation with the team",
    caption: "Installation",
    span: "lg:col-span-3",
    w: 320,
    h: 320,
  },
] as const;
const COUNT = PHOTOS.length;

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + COUNT) % COUNT)), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % COUNT)), []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="Gallery"
            title="Cloudspital in the field"
            description="Health ATM kiosks, telemedicine setups and deployments — from installations and inaugurations to everyday screenings on the ground."
          />
        </Reveal>

        <div className="mt-12 grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:auto-rows-[290px]">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.05} className={p.span}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[20px] bg-mist"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 t-small text-ink">
                  {p.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>

          <div className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={PHOTOS[open].src}
              alt={PHOTOS[open].alt}
              width={PHOTOS[open].w}
              height={PHOTOS[open].h}
              sizes="100vw"
              className="mx-auto h-auto max-h-[80vh] w-auto rounded-[20px] bg-white object-contain"
            />
            <p className="mt-4 text-center t-small text-white/70">
              {PHOTOS[open].caption} · {open + 1} / {COUNT}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
