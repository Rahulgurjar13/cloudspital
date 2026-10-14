"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, BookOpen, FileText, Newspaper } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getSpokeLinks } from "@/lib/site-structure";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Kiosk, HeartPulse, Stethoscope, Building, Ambulance, Phone } from "@/components/icons";
import { HUB_LABELS, COMPANY_LINKS, SOLUTION_HUBS, CALL_URL, resourceLinks, productLinks } from "./nav-data";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const HUB_META: Record<string, { icon: Icon; desc: string }> = {
  "health-atm-kiosk": { icon: Kiosk, desc: "Walk up kiosks that screen 50+ health parameters in minutes." },
  "tele-icu": { icon: HeartPulse, desc: "Remote intensivists monitor critical patients 24/7." },
  telemedicine: { icon: Stethoscope, desc: "Carts and point of care devices for any consultation room." },
  "government-health-kiosk": { icon: Building, desc: "ABDM/ABHA ready kiosks for PHCs, GeM and state programs." },
  "mobile-medical-unit": { icon: Ambulance, desc: "Fully equipped vans that take care to the last mile." },
};

const RANK = { P0: 0, P1: 1, P2: 2 } as const;
const EASE = [0.22, 1, 0.36, 1] as const;
const phoneLabel = SITE.phone.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2");

type MenuProps = { pathname: string; onNavigate: () => void };

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.1em] text-primary">{children}</p>;
}

// Left column of the smaller menus: an eyebrow, one statement, a few links.
function Intro({ eyebrow, statement, children }: { eyebrow: string; statement: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 pr-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <p className="mt-3 text-[22px] leading-[1.25] tracking-[-0.04em] text-ink">{statement}</p>
      </div>
      <div className="flex flex-col items-start gap-2">{children}</div>
    </div>
  );
}

function TextLink({ href, onNavigate, children }: { href: string; onNavigate: () => void; children: ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group inline-flex items-center gap-1.5 text-[15px] text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
    >
      {children}
      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

function ItemLink({
  href,
  label,
  caption,
  icon: ItemIcon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  caption?: string;
  icon?: Icon;
  active?: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group -mx-3 flex items-start gap-3 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-mist"
    >
      {ItemIcon ? (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
          <ItemIcon className="h-4 w-4" strokeWidth={1.8} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className={`block text-[15px] leading-snug transition-colors ${active ? "text-primary" : "text-ink group-hover:text-primary"}`}>{label}</span>
        {caption ? <span className="mt-0.5 block text-[13px] text-muted">{caption}</span> : null}
      </span>
      <ArrowIcon className="mt-1 h-3.5 w-3.5 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
    </Link>
  );
}

function GroupTitle({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-muted">{children}</p>;
}

/** Strip along the bottom of every menu: a nudge to talk to the team. */
export function MenuFooter() {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-line bg-canvas px-8 py-4">
      <p className="text-[14px] text-muted">
        Not sure which fits? <span className="text-ink">Our team will walk you through it.</span>
      </p>
      <div className="flex items-center gap-6">
        <a href={CALL_URL} className="inline-flex items-center gap-2 text-[14px] text-ink transition-colors hover:text-primary">
          <Phone className="h-4 w-4 text-primary" />
          {phoneLabel}
        </a>
        <BookDemoDialog>
          <span className="group inline-flex items-center gap-1.5 text-[14px] text-primary">
            Book a demo
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </BookDemoDialog>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Solutions: hub list on the left, live preview of its guides         */
/* ------------------------------------------------------------------ */

export function SolutionsMenu({ pathname, onNavigate }: MenuProps) {
  const initial = Math.max(0, SOLUTION_HUBS.findIndex((h) => pathname.startsWith(`/${h.slug}`)));
  const [hovered, setHovered] = useState(initial);
  const hub = SOLUTION_HUBS[hovered];
  const HubIcon = HUB_META[hub.slug]?.icon ?? Kiosk;
  const topics = [...hub.spokes].sort((a, b) => RANK[a.priority] - RANK[b.priority]).slice(0, 8);
  const links = getSpokeLinks(hub.slug);
  const titleOf = (slug: string) => links.find((l) => l.slug === slug)?.h1 ?? slug;

  return (
    <div className="grid min-h-[372px] grid-cols-12">
      <div className="col-span-5 border-r border-line pr-5">
        <Eyebrow>Solutions</Eyebrow>
        <ul className="mt-3 space-y-0.5">
          {SOLUTION_HUBS.map((h, i) => {
            const meta = HUB_META[h.slug];
            const RowIcon = meta?.icon ?? Kiosk;
            const on = i === hovered;
            return (
              <li key={h.slug} className="relative">
                {on ? (
                  <motion.span
                    layoutId="menu-hub-highlight"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-xl bg-mist"
                  />
                ) : null}
                <Link
                  href={`/${h.slug}/`}
                  onClick={onNavigate}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  className="relative flex items-center gap-3.5 rounded-xl px-3 py-2.5"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                      on ? "bg-primary text-white" : "bg-blue-50 text-primary"
                    }`}
                  >
                    <RowIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] leading-snug tracking-[-0.02em] text-ink">{h.title}</span>
                    <span className="block truncate text-[13px] text-muted">{meta?.desc}</span>
                  </span>
                  <ArrowIcon className={`h-3.5 w-3.5 shrink-0 text-primary transition-all duration-300 ${on ? "opacity-100" : "-translate-x-1 opacity-0"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative col-span-7 overflow-hidden pl-8">
        {/* faint icon of the hovered hub, for depth */}
        <HubIcon className="pointer-events-none absolute -bottom-10 -right-6 h-56 w-56 text-primary/[0.05]" strokeWidth={0.8} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={hub.slug}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="relative flex h-full flex-col"
          >
            <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
              <div>
                <Eyebrow>{HUB_LABELS[hub.slug]} · {hub.spokes.length} guides</Eyebrow>
                <p className="mt-2 text-[22px] leading-tight tracking-[-0.04em] text-ink">{hub.title}</p>
              </div>
              <TextLink href={`/${hub.slug}/`} onNavigate={onNavigate}>
                Explore
              </TextLink>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-x-8">
              {topics.map((t) => {
                const href = `/${hub.slug}/${t.slug}/`;
                return (
                  <li key={t.slug}>
                    <ItemLink href={href} label={titleOf(t.slug)} active={pathname === href} onNavigate={onNavigate} />
                  </li>
                );
              })}
            </ul>
            {hub.spokes.length > topics.length ? (
              <div className="mt-auto pt-4">
                <TextLink href={`/${hub.slug}/`} onNavigate={onNavigate}>
                  All {hub.spokes.length} {HUB_LABELS[hub.slug]} guides
                </TextLink>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Products: grouped by type, with the flagship pictured               */
/* ------------------------------------------------------------------ */

export function ProductsMenu({ pathname, onNavigate, products }: MenuProps & { products: { slug: string; name: string }[] }) {
  const items = productLinks(products).filter((l) => l.href !== "/products/" && l.href !== "/products/compare/");
  const groups = [
    { title: "Health kiosks", items: items.filter((l) => /kiosk/i.test(l.label)) },
    { title: "Telemedicine carts", items: items.filter((l) => /cart/i.test(l.label)) },
    { title: "Portable and mobile", items: items.filter((l) => !/kiosk|cart/i.test(l.label)) },
  ].filter((g) => g.items.length);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 border-r border-line">
        <Intro eyebrow="Products" statement="Health kiosks, Medsync telemedicine carts and mobile medical units, built in India.">
          <TextLink href="/products/" onNavigate={onNavigate}>All products</TextLink>
          <TextLink href="/products/compare/" onNavigate={onNavigate}>Compare Arc models</TextLink>
        </Intro>
      </div>
      {/* two roomy columns: kiosks + portable on the left, the cart range on the right */}
      <div className="col-span-6 grid grid-cols-2 gap-8 px-8">
        {[groups.filter((g) => g.title !== "Telemedicine carts"), groups.filter((g) => g.title === "Telemedicine carts")].map((col, ci) => (
          <div key={ci} className="space-y-6">
            {col.map((g) => (
              <div key={g.title}>
                <GroupTitle>{g.title}</GroupTitle>
                <ul>
                  {g.items.map((l) => (
                    <li key={l.href}>
                      <ItemLink href={l.href} label={l.label} active={pathname === l.href} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* flagship, pictured */}
      <Link
        href="/products/health-kiosk/"
        onClick={onNavigate}
        className="group col-span-3 flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-inset ring-line transition-shadow duration-300 hover:shadow-[0_16px_36px_-20px_rgba(15,23,42,0.35)]"
      >
        <span className="px-4 pt-4 text-[11px] uppercase tracking-[0.1em] text-primary">Flagship</span>
        {/* the photo has a white background, so it sits on plain white */}
        <span className="relative mx-4 mt-2 block min-h-[170px] flex-1">
          <Image
            src="/images/products/cloudspital-health-atm-kiosk.webp"
            alt="Cloudspital Health ATM kiosk"
            fill
            sizes="240px"
            className="object-contain transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
          />
        </span>
        <span className="mt-3 flex items-center justify-between border-t border-line bg-canvas px-4 py-3 text-[15px] text-ink transition-colors group-hover:text-primary">
          Health ATM Kiosk
          <ArrowIcon className="h-3.5 w-3.5" />
        </span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Resources: each resource with what it is                             */
/* ------------------------------------------------------------------ */

function resourceKind(label: string): { caption: string; icon: Icon } {
  if (/^state of/i.test(label)) return { caption: "Original data report", icon: BarChart3 };
  if (/buyer/i.test(label)) return { caption: "Buyer's guide", icon: FileText };
  if (/glossary/i.test(label)) return { caption: "Plain-English glossary", icon: BookOpen };
  return { caption: "Articles and insights", icon: Newspaper };
}

export function ResourcesMenu({ pathname, onNavigate }: MenuProps) {
  const items = resourceLinks().filter((l) => l.href !== "/resources/");
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 border-r border-line">
        <Intro eyebrow="Resources" statement="Original data, buyer guides and a plain-English glossary for decision makers.">
          <TextLink href="/resources/" onNavigate={onNavigate}>Resources overview</TextLink>
        </Intro>
      </div>
      <ul className="col-span-8 grid grid-cols-2 content-start gap-x-10 gap-y-2 pl-10">
        {items.map((l) => {
          const k = resourceKind(l.label);
          return (
            <li key={l.href}>
              <ItemLink href={l.href} label={l.label} caption={k.caption} icon={k.icon} active={pathname === l.href} onNavigate={onNavigate} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Company: grouped links plus direct contact                           */
/* ------------------------------------------------------------------ */

const COMPANY_GROUPS = [
  { title: "About", hrefs: ["/about-us/", "/impact/", "/partner/"] },
  { title: "Customers", hrefs: ["/use-cases/", "/case-studies/", "/testimonials/"] },
  { title: "News and contact", hrefs: ["/press/", "/blog/", "/contact/"] },
];

export function CompanyMenu({ pathname, onNavigate }: MenuProps) {
  const byHref = Object.fromEntries(COMPANY_LINKS.map((l) => [l.href, l]));
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 border-r border-line">
        <Intro eyebrow="Company" statement="AIIMS co-developed, DPIIT recognised and GeM listed medtech for India.">
          <a href={`mailto:${SITE.email}`} className="text-[15px] text-ink transition-colors hover:text-primary">
            {SITE.email}
          </a>
        </Intro>
      </div>
      <div className="col-span-8 grid grid-cols-3 gap-8 pl-10">
        {COMPANY_GROUPS.map((g) => (
          <div key={g.title}>
            <GroupTitle>{g.title}</GroupTitle>
            <ul>
              {g.hrefs
                .filter((h) => byHref[h])
                .map((h) => (
                  <li key={h}>
                    <ItemLink href={h} label={byHref[h].label} active={pathname === h} onNavigate={onNavigate} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
