"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container } from "@/components/ui/Section";
import pod from "@/public/images/products/cloudspital-smart-health-kiosk.png";

const WORD = "Healthcare";
const TRUST = ["AIIMS co-developed", "DPIIT recognised", "GeM listed", "CDSCO approved"];
const EASE = [0.22, 1, 0.36, 1] as const;

// Card surface layers (kept as strings: multi-stop gradients read better here than as classes).
// --spot-y follows the product: high on phones, mid-card on desktop.
const SURFACE = [
  "radial-gradient(46% 52% at 50% var(--spot-y), rgba(112, 152, 246, 0.9), rgba(112, 152, 246, 0) 100%)",
  "radial-gradient(135% 115% at 50% var(--spot-y), #2853cc 0%, #1b40a8 45%, #0d226b 100%)",
].join(", ");
const BEAM = "conic-gradient(from 150deg at 50% -8%, transparent 0deg, rgba(255, 255, 255, 0.2) 30deg, transparent 60deg)";
const BEAM_MASK = "linear-gradient(to bottom, #000 0%, transparent 85%)";
const FLOOR = "radial-gradient(closest-side, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))";
const WARM = "radial-gradient(closest-side, rgba(255, 128, 48, 0.32), rgba(255, 128, 48, 0))";
const REFLECT_MASK = "linear-gradient(to bottom, #000 0px, transparent 64px)";
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Feature callouts pinned to the pod (desktop only), positioned in % of the
// product image so they stay on their feature at any size.
const CALLOUTS = [
  { side: "left", top: "40%", at: "93%", title: "Remote doctor", caption: "Private teleconsult booth" },
  { side: "right", top: "41%", at: "93%", title: "Full vitals check", caption: "Results in minutes" },
] as const;

// Hero in three layers so the product can step slightly out of the frame:
//   1. the gradient card (background only, clipped),
//   2. the pod — its top rises a little above the card's top edge,
//   3. the copy — always on top, so the pod never covers the headline.
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="pb-10 pt-2 lg:pb-16">
      {/* Oversized display word, resolving letter by letter */}
      <Container>
        <p
          aria-hidden="true"
          className="t-display flex justify-between overflow-hidden whitespace-nowrap text-ink"
        >
          {WORD.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: "40%", filter: "blur(12px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.05 * i, ease: EASE }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </Container>

      <div className="relative mx-2.5 mt-10 sm:mx-5 sm:mt-12 lg:mt-12">
        {/* 1 — the card: a studio backdrop lit from behind the product */}
        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          style={{ backgroundImage: SURFACE }}
          className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_90px_-45px_rgba(23,55,143,0.75)] [--spot-y:17%] sm:[--spot-y:22%] lg:rounded-[40px] lg:[--spot-y:46%]"
        >
          {/* stage light falling onto the product */}
          <div className="pointer-events-none absolute inset-0 blur-2xl" style={{ backgroundImage: BEAM, maskImage: BEAM_MASK, WebkitMaskImage: BEAM_MASK }} />
          {/* halo: the Cloudspital logo's arcs, rising behind the product */}
          <svg
            viewBox="-100 -100 200 100"
            className="pointer-events-none absolute left-1/2 top-[12px] h-auto w-[380px] -translate-x-1/2 sm:top-0 sm:w-[540px] lg:top-[calc(62%-400px)] lg:w-[800px]"
          >
            <defs>
              <linearGradient id="hero-arc" x1="0" y1="-100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              { r: 99, o: 0.16 },
              { r: 84, o: 0.26 },
              { r: 69, o: 0.4 },
            ].map(({ r, o }) => (
              <path
                key={r}
                d={`M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`}
                fill="none"
                stroke="url(#hero-arc)"
                strokeOpacity={o}
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {/* soft bloom behind the product */}
          <div className="pointer-events-none absolute left-1/2 top-[148px] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-[80px] sm:top-[190px] lg:top-[42%] lg:h-[520px] lg:w-[520px] lg:blur-[110px]" />
          {/* floor: a pool of light, warm bounce from the pod's orange, contact shadow */}
          <div className="pointer-events-none absolute left-1/2 top-[288px] sm:top-[368px] lg:bottom-[66px] lg:top-auto">
            <span className="absolute left-1/2 top-1/2 h-[60px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] sm:h-[76px] sm:w-[440px] lg:h-[96px] lg:w-[620px]" style={{ backgroundImage: FLOOR }} />
            <span className="absolute left-1/2 top-1/2 h-[46px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-md sm:h-[56px] sm:w-[330px] lg:h-[72px] lg:w-[460px] lg:blur-lg" style={{ backgroundImage: WARM }} />
            <span className="absolute left-1/2 top-1/2 h-7 w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0b1a4a]/55 blur-lg sm:w-[270px] lg:h-10 lg:w-[400px] lg:blur-xl" />
          </div>
          {/* the pod mirrored on a glossy floor, fading out quickly */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
            className="pointer-events-none absolute inset-x-0 top-[284px] flex h-[316px] justify-center sm:top-[362px] sm:h-[404px] lg:top-[calc(100%-80px)] lg:h-[calc(100%-18px)]"
            style={{ maskImage: REFLECT_MASK, WebkitMaskImage: REFLECT_MASK }}
          >
            <Image
              src={pod}
              alt=""
              sizes="(min-width: 1024px) 560px, 70vw"
              className="h-full w-auto max-w-none object-contain opacity-30 blur-[1px]"
              style={{ transform: "scaleY(-1)" }}
            />
          </motion.div>
          {/* fine grain so the gradient reads as a surface, not a fill */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          {/* glass edge: hairline border and a light catch along the top */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
          <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
        </motion.div>

        {/* 2 — the pod, its top stepping a little out of the card */}
        <div className="pointer-events-none absolute inset-x-0 top-[-20px] z-10 flex h-[316px] justify-center sm:top-[-28px] sm:h-[404px] lg:bottom-[58px] lg:top-auto lg:h-[calc(100%-18px)]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 70, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
            className="relative h-full"
          >
            {CALLOUTS.map((c) => (
              <motion.div
                key={c.title}
                initial={reduce ? false : { opacity: 0, x: c.side === "left" ? 12 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
                style={c.side === "left" ? { top: c.top, right: c.at } : { top: c.top, left: c.at }}
                className={`absolute z-10 hidden -translate-y-1/2 items-center gap-3 whitespace-nowrap xl:flex ${
                  c.side === "left" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <span className={c.side === "left" ? "text-right" : "text-left"}>
                  <span className="block text-[15px] font-medium text-white">{c.title}</span>
                  <span className="mt-0.5 block text-[13px] text-white/65">{c.caption}</span>
                </span>
                <span
                  className={`h-px w-16 ${
                    c.side === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"
                  } from-white/10 to-white/80`}
                />
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-white/70 motion-safe:animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.2)]" />
                </span>
              </motion.div>
            ))}
            <Image
              src={pod}
              alt="Cloudspital smart health pod with integrated diagnostic devices, touch display and printer"
              priority
              sizes="(min-width: 1024px) 560px, 70vw"
              className="h-full w-auto max-w-none object-contain drop-shadow-[0_28px_36px_rgba(8,20,60,0.4)]"
            />
          </motion.div>
        </div>

        {/* 3 — copy, always above the pod */}
        <div className="relative z-20 grid min-h-[620px] lg:min-h-[640px] lg:grid-cols-12">
          {/* phones: room for the pod */}
          <div aria-hidden="true" className="order-1 h-[308px] sm:h-[390px] lg:hidden" />

          {/* Headline (bottom-left) */}
          <div className="order-2 flex flex-col justify-end gap-6 px-6 pb-8 pt-6 text-white sm:px-10 lg:order-none lg:col-span-4 lg:px-[60px] lg:pb-[60px]">
            <p className="t-label text-white/85 lg:text-[18px]">[&nbsp;Health care Redefined&nbsp;]</p>
            <h1 className="t-h3 max-w-[460px] text-white lg:text-[clamp(34px,2.9vw,42px)]">
              Quality healthcare, <span className="text-white/60">anywhere needed</span>
            </h1>
            <BookDemoDialog>
              <ArrowButton href="/contact/" variant="light">
                Book a demo
              </ArrowButton>
            </BookDemoDialog>
          </div>

          {/* Supporting copy (bottom-right) */}
          <div className="order-3 flex flex-col justify-end gap-6 px-6 pb-10 text-white sm:px-10 lg:col-span-4 lg:col-start-9 lg:px-0 lg:pb-[60px] lg:pl-8 lg:pr-[60px]">
            <p className="t-lead text-white/90">
              Health ATM kiosks, Tele-ICU and telemedicine systems that bring
              hospital-grade screening and critical care to clinics, villages,
              workplaces and government health programs across India.
            </p>
            <ul className="flex flex-wrap gap-2 border-t border-white/20 pt-5">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] py-1.5 pl-1.5 pr-3.5 text-[13px] leading-none text-white ring-1 ring-inset ring-white/20"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
