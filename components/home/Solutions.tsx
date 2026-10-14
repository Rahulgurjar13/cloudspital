"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { HUB_STRUCTURE } from "@/lib/site-structure";
import { HUB_LABELS } from "@/components/layout/nav-data";
import { Reveal } from "@/components/motion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { Kiosk, HeartPulse, Stethoscope, Building, Ambulance, Database } from "@/components/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const META: Record<string, { desc: string; icon: Icon }> = {
  "health-atm-kiosk": { icon: Kiosk, desc: "Walk up kiosks that screen 50+ health parameters in minutes, no technician needed." },
  "tele-icu": { icon: HeartPulse, desc: "Remote intensivists monitor critical patients 24/7 through a hub and spoke model." },
  telemedicine: { icon: Stethoscope, desc: "Carts and point of care devices that turn any room into a consultation point." },
  "government-health-kiosk": { icon: Building, desc: "ABDM/ABHA ready kiosks built for PHCs, GeM procurement and state programs." },
  "mobile-medical-unit": { icon: Ambulance, desc: "Fully equipped vans that take diagnostics and consults to the last mile." },
  resources: { icon: Database, desc: "Original data, buyer guides and a glossary for decision makers and procurers." },
};

const RANK = { P0: 0, P1: 1, P2: 2 } as const;

// Each hub with its short label and three most important topics (P0 first).
const ITEMS = HUB_STRUCTURE.map((h, i) => ({
  slug: h.slug,
  title: h.title,
  short: HUB_LABELS[h.slug] ?? h.title,
  num: String(i + 1).padStart(2, "0"),
  ...META[h.slug],
  topics: [...h.spokes].sort((a, b) => RANK[a.priority] - RANK[b.priority]).slice(0, 3),
}));
const TOTAL = String(ITEMS.length).padStart(2, "0");
const AUTOPLAY_MS = 6000;

const PANEL_BG =
  "radial-gradient(80% 65% at 88% 8%, rgba(125, 165, 250, 0.55), rgba(125, 165, 250, 0) 70%), linear-gradient(160deg, #2a56d0 0%, #1d43b0 52%, #122d7c 100%)";

type Item = (typeof ITEMS)[number];

// The open-state content shared by the desktop panel and the phone card.
function Detail({ it, titleClass }: { it: Item; titleClass: string }) {
  return (
    <>
      <h3 className={titleClass}>
        <Link href={`/${it.slug}/`} className="hover:underline hover:decoration-white/40 hover:underline-offset-4">
          {it.title}
        </Link>
      </h3>
      <p className="mt-3 t-body text-white/80">{it.desc}</p>
      <ul className="mt-5 border-t border-white/20">
        {it.topics.map((t) => (
          <li key={t.slug} className="border-b border-white/15">
            <Link
              href={`/${it.slug}/${t.slug}/`}
              className="group flex items-center justify-between gap-4 py-2.5 text-[15px] text-white/90 transition-colors hover:text-white"
            >
              {t.title}
              <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// Number pill (its fill doubles as the autoplay timer) and the explore arrow.
function TopRow({ it, timerKey }: { it: Item; timerKey?: string }) {
  return (
    <div className="relative flex items-start justify-between gap-6">
      <span className="relative inline-flex h-10 items-center overflow-hidden rounded-full border border-white/40 px-4 t-small text-white">
        {timerKey ? (
          <span
            key={timerKey}
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-white/20 animate-[grow-x_6s_linear_both]"
          />
        ) : null}
        <span className="relative">
          {it.num} / {TOTAL}
        </span>
      </span>
      <Link
        href={`/${it.slug}/`}
        aria-label={`Explore ${it.title}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform duration-300 hover:scale-105"
      >
        <ArrowIcon className="h-5 w-5 -rotate-45" />
      </Link>
    </div>
  );
}

// Six solution hubs, sized to fit one screen. Desktop: an expanding gallery
// that tours itself while in view (paused under the pointer). Phones and
// tablets: a swipe row of the same panels with page dots, app style.
export function Solutions() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [page, setPage] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(galleryRef, { amount: 0.6 });
  const reduce = useReducedMotion();
  const autoplay = inView && !hovering && !reduce;

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, autoplay]);

  const onRowScroll = () => {
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (!row || !card) return;
    setPage(Math.round(row.scrollLeft / (card.offsetWidth + 12)));
  };

  return (
    <section className="pb-14 pt-12 sm:pb-20 sm:pt-14 lg:pb-[120px] lg:pt-16">
      <Container>
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <SectionLabel>Our solutions</SectionLabel>
              <h2 className="mt-3 t-h3 text-ink lg:mt-4">One platform, every point of care</h2>
            </div>
            <p className="t-lead text-muted lg:col-span-4">
              From a village kiosk to a tertiary ICU, connected, compliant and built for Indian healthcare.
            </p>
          </div>
        </Reveal>

        {/* Desktop: expanding panels, height tied to the viewport */}
        <Reveal className="mt-8 hidden xl:block">
          <div
            ref={galleryRef}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="flex h-[clamp(430px,calc(100svh-330px),520px)] gap-3"
          >
            {ITEMS.map((it, i) => {
              const on = i === active;
              const Icon = it.icon;
              return (
                <div
                  key={it.slug}
                  onMouseEnter={() => setActive(i)}
                  className={`relative min-w-0 shrink basis-0 overflow-hidden rounded-[28px] bg-gradient-to-b from-white to-[#eef2fa] ring-1 ring-inset ring-line transition-[flex-grow] duration-700 ease-out-soft ${
                    on ? "grow-[4.2]" : "grow"
                  }`}
                >
                  {/* blue surface + oversized icon watermark for the open panel */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
                    style={{ backgroundImage: PANEL_BG }}
                  />
                  <Icon
                    aria-hidden="true"
                    strokeWidth={0.6}
                    className={`pointer-events-none absolute -right-14 -top-14 h-72 w-72 text-white/[0.1] transition-[opacity,transform] duration-700 ease-out-soft ${
                      on ? "scale-100 opacity-100" : "scale-90 opacity-0"
                    }`}
                  />

                  {/* closed: one centred column — number, icon, guide line, label */}
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={on ? -1 : 0}
                    aria-label={`Show ${it.title}`}
                    className={`absolute inset-0 flex flex-col items-center px-4 py-6 transition-opacity duration-300 ${
                      on ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
                    }`}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/70 t-small text-ink">
                      {it.num}
                    </span>
                    <span className="mt-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary ring-1 ring-inset ring-blue-100">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="my-5 w-px flex-1 bg-[linear-gradient(to_bottom,var(--color-line)_55%,transparent_55%)] bg-[length:1px_9px]"
                    />
                    <span className="rotate-180 whitespace-nowrap text-[22px] leading-none tracking-[-0.04em] text-ink [writing-mode:vertical-rl]">
                      {it.short}
                    </span>
                  </button>

                  {/* open: the hub, its summary and three key topics */}
                  <div
                    inert={!on}
                    className={`absolute inset-0 flex flex-col p-8 text-white transition-opacity duration-500 ${
                      on ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <TopRow it={it} timerKey={on && autoplay ? `${active}` : undefined} />
                    <div className="relative mt-auto w-[400px] min-[1400px]:w-[460px]">
                      <Detail it={it} titleClass="text-[clamp(26px,2.2vw,34px)] leading-[1.1] tracking-[-0.05em]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Phones and tablets: swipe row of open panels + page dots */}
        <div className="xl:hidden">
          <div
            ref={rowRef}
            onScroll={onRowScroll}
            className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:mt-8 sm:scroll-px-8 sm:px-8 lg:-mx-[60px] lg:scroll-px-[60px] lg:px-[60px]"
          >
            {ITEMS.map((it) => {
              const Icon = it.icon;
              return (
                <article
                  key={it.slug}
                  className="relative flex w-[84%] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] p-6 text-white sm:w-[56%] md:w-[44%] lg:w-[34%]"
                  style={{ backgroundImage: PANEL_BG }}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={0.6}
                    className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-white/[0.1]"
                  />
                  <TopRow it={it} />
                  <div className="relative mt-10">
                    <Detail it={it} titleClass="text-[26px] leading-[1.1] tracking-[-0.05em]" />
                  </div>
                </article>
              );
            })}
          </div>
          <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5">
            {ITEMS.map((it, i) => (
              <span
                key={it.slug}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "w-6 bg-primary" : "w-1.5 bg-ink/15"}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
