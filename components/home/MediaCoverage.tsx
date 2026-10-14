"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";

// Press clippings and event coverage. Deployment photos live in the Gallery
// section; add new media images to /public/ and list them here.
const MEDIA = [
  { src: "/m5.webp", kind: "Newspaper report", title: "State hospitals roll out health ATMs for quick diagnostic tests", alt: "Newspaper report: state hospitals roll out health ATMs for quick diagnostic tests" },
  { src: "/m6.webp", kind: "Hindi newspaper", title: "Health ATM services covered in the Hindi press", alt: "Hindi newspaper coverage of Cloudspital Health ATM services" },
  { src: "/m1.webp", kind: "Event", title: "Cloudspital at IMA NATCON 2025", alt: "Cloudspital at IMA NATCON 2025" },
  { src: "/m8.webp", kind: "Inauguration", title: "Bareilly Cantonment Board inaugurates instant healthcare kiosk", alt: "Bareilly Cantonment Board inauguration of instant healthcare kiosk" },
  { src: "/m10.webp", kind: "Deployment", title: "Deployment at P.H.C Gadhavi, Dang, Gujarat", alt: "Cloudspital deployment at P.H.C Gadhavi, Dang, Gujarat" },
  { src: "/m3.webp", kind: "Feature", title: "Health ATM kiosk featured in media coverage", alt: "Cloudspital Health ATM kiosk featured in media coverage" },
];

// Left inset that lines the reel up with the page container while letting it
// run off the right edge of the screen.
const N = MEDIA.length;
const GAP = 20; // px between tiles (gap-5)
const num = (i: number) => String(i + 1).padStart(2, "0");

const INSET =
  "pl-5 scroll-pl-5 sm:pl-8 sm:scroll-pl-8 lg:pl-[calc(max(0px,(100vw_-_1440px)/2)_+_60px)] lg:scroll-pl-[calc(max(0px,(100vw_-_1440px)/2)_+_60px)]";

function RoundButton({ dir, disabled, onClick }: { dir: "prev" | "next"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous coverage" : "Next coverage"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <ArrowIcon className={`h-5 w-5 ${dir === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}

// "In the news" as a press reel: a compact header with arrow controls, then a
// row of clippings that runs off the right edge, with a progress rule below.
export function MediaCoverage() {
  const reel = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLSpanElement>(null);
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const [pos, setPos] = useState({ progress: 0, visible: 0.5, start: true, end: false, index: 0 });
  const [dragging, setDragging] = useState(false);
  const [cursorIn, setCursorIn] = useState(false);

  const onScroll = useCallback(() => {
    const el = reel.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const tile = el.querySelector("li") as HTMLElement | null;
    const stride = tile ? tile.offsetWidth + GAP : 1;
    setPos({
      progress: max > 0 ? el.scrollLeft / max : 0,
      visible: el.clientWidth / el.scrollWidth,
      start: el.scrollLeft <= 4,
      end: el.scrollLeft >= max - 4,
      index: el.scrollLeft >= max - 4 ? N - 1 : Math.min(N - 1, Math.round(el.scrollLeft / stride)),
    });
  }, []);

  // Measure once laid out and whenever the reel resizes.
  useEffect(() => {
    const el = reel.current;
    if (!el) return;
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onScroll]);

  const step = (dir: 1 | -1) => {
    const el = reel.current;
    const tile = el?.querySelector("li") as HTMLElement | null;
    if (!el || !tile) return;
    el.scrollBy({ left: dir * (tile.offsetWidth + GAP) * 2, behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch keeps native swipe). A drag cancels the click.
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !reel.current) return;
    drag.current = { active: true, x: e.clientX, left: reel.current.scrollLeft, moved: false };
    setDragging(true);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    // the "Drag" badge trails the pointer (CSS transition does the easing)
    const r = e.currentTarget.getBoundingClientRect();
    if (bubble.current) bubble.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    const d = drag.current;
    if (!d.active || !reel.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    reel.current.scrollLeft = d.left - dx;
  };

  return (
    <section className="overflow-hidden py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <SectionLabel>In the News</SectionLabel>
              <h2 className="mt-3 t-h3 text-ink lg:mt-4">Media Coverage</h2>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-5 lg:col-span-5">
              <div>
                <p className="max-w-[340px] t-lead text-muted">Cloudspital featured across leading publications and broadcasts.</p>
                <Link
                  href="/press/"
                  className="group mt-3 inline-flex items-center gap-2 t-body text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                >
                  Press room
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <RoundButton dir="prev" disabled={pos.start} onClick={() => step(-1)} />
                <span className="w-[68px] text-center t-small tabular-nums text-ink" aria-live="polite">
                  {num(pos.index)} <span className="text-muted">/ {num(N - 1)}</span>
                </span>
                <RoundButton dir="next" disabled={pos.end} onClick={() => step(1)} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <Reveal className="mt-10 lg:mt-12">
        <div
          className="relative"
          onPointerMove={onMove}
          onPointerEnter={(e) => e.pointerType === "mouse" && setCursorIn(true)}
          onPointerLeave={() => {
            setCursorIn(false);
            endDrag();
          }}
        >
          {/* "Drag" badge that stands in for the cursor over the reel (desktop) */}
          <span
            ref={bubble}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden transition-transform duration-200 ease-out lg:block"
          >
            <span
              className={`flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[13px] text-white shadow-[0_12px_30px_-10px_rgba(36,81,201,0.7)] transition-transform duration-300 ease-out-soft ${
                cursorIn ? (dragging ? "scale-90" : "scale-100") : "scale-0"
              }`}
            >
              <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
              <span className="mx-1">Drag</span>
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </span>
        <div
          ref={reel}
          onScroll={onScroll}
          onPointerDown={onDown}
          onPointerUp={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className={`no-scrollbar overflow-x-auto pr-5 sm:pr-8 lg:cursor-none ${dragging ? "snap-none select-none" : "snap-x snap-mandatory"} ${
            pos.end ? "" : "[mask-image:linear-gradient(to_right,#000_82%,transparent)]"
          } ${INSET}`}
        >
          <ul className="flex w-max gap-5">
            {MEDIA.map((m, i) => (
              <li key={m.src} className="w-[68vw] shrink-0 snap-start sm:w-[280px] lg:w-[300px]">
                <Link href="/press/" draggable={false} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-[20px] bg-white ring-1 ring-inset ring-ink/[0.06]">
                    <Image
                      src={m.src}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 68vw"
                      draggable={false}
                      className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] leading-none text-ink backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.08em] text-primary">{m.kind}</p>
                  <p className="mt-1.5 flex items-start justify-between gap-3 text-[16px] leading-snug text-ink">
                    <span className="line-clamp-2 transition-colors duration-300 group-hover:text-primary">{m.title}</span>
                    <ArrowIcon className="mt-0.5 h-4 w-4 shrink-0 -rotate-45 text-ink/30 transition-[transform,color] duration-300 group-hover:rotate-0 group-hover:text-primary" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </Reveal>

      {/* progress rule */}
      <Container className="mt-8">
        <div className="relative h-px bg-line" aria-hidden="true">
          <span
            className="absolute -top-px h-[3px] rounded-full bg-primary transition-[left] duration-150"
            style={{ width: `${pos.visible * 100}%`, left: `${pos.progress * (1 - pos.visible) * 100}%` }}
          />
        </div>
      </Container>
    </section>
  );
}
