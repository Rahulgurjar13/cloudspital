"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion";
import { SectionLabel } from "@/components/ui/Section";

// The kiosk's modules, grouped. `spots` are hotspot positions on the kiosk
// cut-out, in % of the image (1024 × 1536), so they stay on their part at any size.
const GROUPS = [
  {
    short: "Consultation",
    title: "Doctor consultation",
    spots: [[38.8, 33.9], [38.9, 20.3]],
    items: ["24 inch capacitive touch display", "Webcam", "AI noise cancellation stethoscope", "Otoscope, dermatoscope and oral camera"],
  },
  {
    short: "Testing hub",
    title: "Multi testing hub",
    spots: [[68.7, 60.5]],
    items: ["Blood pressure", "SpO2", "12 lead ECG", "Blood glucose", "Hemoglobin", "Uric acid", "Cholesterol mono", "AI RDT reading tray"],
  },
  {
    short: "Analyzer",
    title: "3 channel analyzer (quantitative)",
    spots: [[67.4, 52.2]],
    items: ["HbA1c", "Thyroid profile", "Vitamin D", "T3, T4, FT3, FT4", "CRP, CK MB, SAA, IL6", "PCT, CTNT, NT-PRO BNP", "D-Dimer", "SARS-CoV-2 NA, Antibody"],
  },
  {
    short: "Body & POC",
    title: "Body and point of care",
    spots: [[51.8, 86.6], [53, 44]],
    items: ["Body composition analyzer", "Wireless stadiometer", "Wireless spirometer", "Foetal scanner", "Lipid profile meter"],
  },
  {
    short: "Built in",
    title: "Built into the kiosk",
    spots: [[57.6, 7.5], [68, 76.5]],
    items: ["Panel light", "Keyboard", "Consumable drawer", "A4 laser printer"],
  },
];

const SPOTLIGHT = "radial-gradient(closest-side, #fff 52%, var(--color-canvas) 100%)";

const LEFT = [0, 3, 4];
const RIGHT = [1, 2];
const num = (i: number) => String(i + 1).padStart(2, "0");

// "Inside the kiosk", drawn like a technical callout sheet: the Health ATM in
// the middle, module groups as plain typography either side, and a leader line
// that draws from the active group to its hotspots. No boxes, no chips.
export function KioskAnatomy() {
  const [active, setActive] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);
  const spots = useRef<Record<string, HTMLButtonElement | null>>({});

  // Measure marker → hotspot positions whenever the active group or the
  // layout changes (ResizeObserver also fires once on observe).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const compute = () => {
      const m = markers.current[active];
      if (!m || m.offsetParent === null) return setPaths([]);
      const w = wrap.getBoundingClientRect();
      const a = m.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - w.left;
      const y1 = a.top + a.height / 2 - w.top;
      setPaths(
        GROUPS[active].spots.map((_, k) => {
          const s = spots.current[`${active}-${k}`];
          if (!s) return "";
          const b = s.getBoundingClientRect();
          const x2 = b.left + b.width / 2 - w.left;
          const y2 = b.top + b.height / 2 - w.top;
          const xm = x1 + (x2 - x1) * 0.4;
          return `M ${x1} ${y1} H ${xm} L ${x2} ${y2}`;
        }),
      );
    };
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [active]);

  const group = (i: number, side: "left" | "right") => {
    const g = GROUPS[i];
    const on = i === active;
    return (
      <div key={g.title} onMouseEnter={() => setActive(i)} className="relative border-t border-line py-5">
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 -top-px h-px origin-left bg-primary transition-transform duration-500 ease-out-soft ${on ? "scale-x-100" : "scale-x-0"}`}
        />
        <button
          type="button"
          onClick={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={`flex w-full items-baseline gap-3 text-left ${side === "right" ? "flex-row-reverse justify-end" : ""}`}
        >
          <span className={`t-small transition-colors duration-300 ${on ? "text-primary" : "text-muted"}`}>{num(i)}</span>
          <span className={`flex-1 t-h6 transition-colors duration-300 ${on ? "text-ink" : "text-ink/80"}`}>{g.title}</span>
          <span
            ref={(el) => {
              markers.current[i] = el;
            }}
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 self-center rounded-full transition-colors duration-300 ${on ? "bg-primary ring-4 ring-primary/15" : "bg-ink/20"}`}
          />
        </button>
        <p className={`mt-2 text-[15px] leading-relaxed transition-colors duration-300 ${on ? "text-ink" : "text-muted"}`}>
          {g.items.map((x, k) => (
            <span key={x}>
              {k > 0 ? <span className="px-1.5 text-ink/20" aria-hidden="true">/</span> : null}
              {x}
            </span>
          ))}
        </p>
      </div>
    );
  };

  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div>
          <SectionLabel>Inside the kiosk</SectionLabel>
          <h3 className="mt-3 text-[clamp(26px,2.6vw,38px)] leading-[1.15] tracking-[-0.05em] text-ink">
            What&apos;s inside the <span className="text-primary">Health ATM</span>
          </h3>
        </div>
        <p className="t-small text-muted">
          <span className="lg:hidden">Tap a number to explore each module</span>
          <span className="hidden lg:inline">Hover a module to trace it on the kiosk</span>
        </p>
      </div>

      <div ref={wrapRef} className="relative mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-12">
        <div className="hidden lg:col-span-4 lg:block lg:pr-6">{LEFT.map((i) => group(i, "left"))}</div>

        {/* the kiosk, straight on the page */}
        <div className="relative flex justify-center lg:col-span-4">
          <span aria-hidden="true" className="absolute bottom-1 left-1/2 h-6 w-48 -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl" />
          {/* white spotlight behind the kiosk; also the multiply blend's backdrop inside Reveal's stacking context */}
          <div className="relative aspect-[2/3] h-[300px] sm:h-[400px] lg:h-[470px]" style={{ backgroundImage: SPOTLIGHT }}>
            <Image
              src="/images/products/cloudspital-health-atm-kiosk.webp"
              alt="Cloudspital Health ATM kiosk with its modules numbered"
              fill
              sizes="(min-width: 1024px) 320px, 240px"
              className="object-contain mix-blend-multiply"
            />
            {GROUPS.map((g, i) =>
              g.spots.map(([x, y], k) => {
                const on = i === active;
                return (
                  <button
                    key={`${i}-${k}`}
                    ref={(el) => {
                      spots.current[`${i}-${k}`] = el;
                    }}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={g.title}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    {on ? (
                      <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    ) : null}
                    <span
                      className={`relative flex h-6 w-6 items-center justify-center rounded-full text-[11px] transition-all duration-300 ${
                        on ? "scale-110 bg-primary text-white" : "bg-white text-ink ring-1 ring-ink/15"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <div className="hidden lg:col-span-4 lg:block lg:pl-6">{RIGHT.map((i) => group(i, "right"))}</div>

        {/* leader lines for the active group (desktop), drawn over the kiosk, under the hotspots */}
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible lg:block">
          {paths.map((d, k) =>
            d ? (
              <motion.path
                key={`${active}-${k}`}
                d={d}
                fill="none"
                stroke="var(--color-primary)"
                strokeOpacity={0.85}
                strokeWidth={1.25}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null,
          )}
        </svg>

        {/* Phones / tablets: underline tabs + the selected group as a list */}
        <div className="min-w-0 lg:hidden">
          <div className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto border-b border-line px-5 sm:-mx-8 sm:px-8">
            {GROUPS.map((g, i) => (
              <button
                key={g.title}
                type="button"
                onClick={() => setActive(i)}
                className={`relative shrink-0 py-3 text-[15px] transition-colors duration-300 ${i === active ? "text-ink" : "text-muted"}`}
              >
                <span className={`mr-1.5 t-small ${i === active ? "text-primary" : "text-faint"}`}>{num(i)}</span>
                {g.short}
                {i === active ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" /> : null}
              </button>
            ))}
          </div>
          <ul className="grid grid-cols-2 gap-x-5">
            {GROUPS[active].items.map((x) => (
              <li key={x} className="border-b border-line py-2.5 text-[14px] leading-snug text-ink">
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
