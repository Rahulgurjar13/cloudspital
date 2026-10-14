"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Package, Menu, CalendarCheck, FlaskConical, Handshake, Scale, Mail } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getSpokeLinks } from "@/lib/site-structure";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Kiosk, HeartPulse, Stethoscope, Building, Ambulance } from "@/components/icons";
import { BottomSheet } from "./BottomSheet";
import {
  HUB_LABELS,
  COMPANY_LINKS,
  SOLUTION_HUBS,
  resourceLinks,
  productLinks,
  CALL_URL,
  WHATSAPP_URL,
} from "./nav-data";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;
type SheetKey = "solutions" | "more" | null;

const HUB_ICONS: Record<string, Icon> = {
  "health-atm-kiosk": Kiosk,
  "tele-icu": HeartPulse,
  telemedicine: Stethoscope,
  "government-health-kiosk": Building,
  "mobile-medical-unit": Ambulance,
};

// App-style bottom navigation for phones and tablets (hidden from lg up, where
// the desktop navbar takes over). Solutions and More open bottom sheets.
export function MobileTabBar({ products }: { products: { slug: string; name: string }[] }) {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<SheetKey>(null);
  const close = () => setSheet(null);

  // Any navigation closes an open sheet (state adjusted during render, per
  // React's "storing information from previous renders" pattern).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSheet(null);
  }

  const onHub = SOLUTION_HUBS.some((h) => pathname.startsWith(`/${h.slug}`));

  return (
    <>
      {/* Floating "liquid glass" bar: a capsule of tabs, with the demo action
          as its own glass button beside it (iOS 26 style). */}
      <nav
        aria-label="App navigation"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] lg:hidden"
      >
        <div className="pointer-events-auto mx-auto flex max-w-[520px] items-center gap-2.5">
          <ul className="liquid-glass relative grid h-[62px] flex-1 grid-cols-4 rounded-full p-[5px]">
            <li>
              <Tab href="/" icon={Home} label="Home" active={pathname === "/" && !sheet} />
            </li>
            <li>
              <Tab
                icon={LayoutGrid}
                label="Solutions"
                active={sheet === "solutions" || (onHub && !sheet)}
                onClick={() => setSheet((s) => (s === "solutions" ? null : "solutions"))}
              />
            </li>
            <li>
              <Tab href="/products/" icon={Package} label="Products" active={pathname.startsWith("/products") && !sheet} />
            </li>
            <li>
              <Tab
                icon={Menu}
                label="More"
                active={sheet === "more"}
                onClick={() => setSheet((s) => (s === "more" ? null : "more"))}
              />
            </li>
          </ul>
          <BookDemoDialog className="block shrink-0">
            <button
              type="button"
              aria-label="Book a demo"
              className="liquid-glass-primary flex h-[62px] w-[62px] items-center justify-center rounded-full text-white transition-transform duration-200 active:scale-90"
            >
              <CalendarCheck className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </BookDemoDialog>
        </div>
      </nav>

      {/* Solutions sheet: hub tiles, then each hub's guides */}
      <BottomSheet open={sheet === "solutions"} onClose={close} title="Solutions">
        <div className="grid grid-cols-2 gap-2.5">
          {SOLUTION_HUBS.map((hub) => {
            const HubIcon = HUB_ICONS[hub.slug] ?? LayoutGrid;
            const active = pathname.startsWith(`/${hub.slug}`);
            return (
              <Link
                key={hub.slug}
                href={`/${hub.slug}/`}
                onClick={close}
                className={`flex min-h-[112px] flex-col justify-between rounded-[20px] p-4 transition-transform active:scale-[0.97] ${
                  active ? "bg-primary text-white" : "bg-white text-ink"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active ? "bg-white/15 text-white" : "bg-mist text-primary"
                  }`}
                >
                  <HubIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block t-h6">{HUB_LABELS[hub.slug]}</span>
                  <span className={`block text-[12px] ${active ? "text-white/75" : "text-muted"}`}>
                    {hub.spokes.length} guides
                  </span>
                </span>
              </Link>
            );
          })}
          <Link
            href="/tests/"
            onClick={close}
            className="flex min-h-[112px] flex-col justify-between rounded-[20px] bg-ink p-4 text-white transition-transform active:scale-[0.97]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <FlaskConical className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span>
              <span className="block t-h6">Tests</span>
              <span className="block text-[12px] text-white/70">Full catalog</span>
            </span>
          </Link>
        </div>

        <div className="mt-6 space-y-5">
          {SOLUTION_HUBS.map((hub) => (
            <Group key={hub.slug} label={HUB_LABELS[hub.slug]}>
              {getSpokeLinks(hub.slug).map((s) => (
                <Row key={s.slug} href={`/${s.hub}/${s.slug}/`} label={s.h1} active={pathname === `/${s.hub}/${s.slug}/`} onClick={close} />
              ))}
            </Group>
          ))}
        </div>
      </BottomSheet>

      {/* More sheet: quick contact, then everything else */}
      <BottomSheet open={sheet === "more"} onClose={close} title="More">
        <div className="grid grid-cols-3 gap-2.5">
          <QuickAction href={CALL_URL} label="Call" tone="bg-primary text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" />
            </svg>
          </QuickAction>
          <QuickAction href={WHATSAPP_URL} label="WhatsApp" tone="bg-[#25D366] text-white" external>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.96.51 3.78 1.4 5.36L2 22l4.9-1.5a9.9 9.9 0 0 0 5.14 1.43h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.69-1.42 1.32-1.95 1.36-.5.05-1.13.21-3.7-.79-3.12-1.23-5.1-4.4-5.26-4.6-.15-.21-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.59.28-.31.62-.39.82-.39h.59c.19 0 .44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.07.13.07.74-.17 1.43z" />
            </svg>
          </QuickAction>
          <QuickAction href={`mailto:${SITE.email}`} label="Email" tone="bg-white text-ink">
            <Mail className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
        </div>

        <div className="mt-6 space-y-5">
          <Group label="Explore">
            <Row href="/tests/" label="Test catalog" icon={FlaskConical} active={pathname.startsWith("/tests")} onClick={close} />
            <Row href="/partner/" label="Partner with us" icon={Handshake} active={pathname.startsWith("/partner")} onClick={close} />
            <Row href="/products/compare/" label="Compare Arc models" icon={Scale} active={pathname === "/products/compare/"} onClick={close} />
          </Group>
          <Group label="Products">
            {productLinks(products)
              .filter((l) => l.href !== "/products/compare/")
              .map((l) => (
                <Row key={l.href} href={l.href} label={l.label} active={pathname === l.href} onClick={close} />
              ))}
          </Group>
          <Group label="Resources">
            {resourceLinks().map((l) => (
              <Row key={l.href} href={l.href} label={l.label} active={pathname === l.href} onClick={close} />
            ))}
          </Group>
          <Group label="Company">
            {COMPANY_LINKS.filter((l) => l.href !== "/partner/").map((l) => (
              <Row key={l.href} href={l.href} label={l.label} active={pathname === l.href} onClick={close} />
            ))}
          </Group>
        </div>
      </BottomSheet>
    </>
  );
}

function Tab({
  icon: TabIcon,
  label,
  active,
  href,
  onClick,
}: {
  icon: Icon;
  label: string;
  active: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {active ? (
        <motion.span
          layoutId="tab-lens"
          aria-hidden="true"
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.9 }}
          className="liquid-lens absolute inset-0 rounded-full"
        />
      ) : null}
      <TabIcon
        className={`relative h-[22px] w-[22px] transition-colors duration-300 ${active ? "text-primary" : "text-ink/70"}`}
        strokeWidth={active ? 2 : 1.7}
      />
      <span className={`relative text-[10.5px] leading-none tracking-[-0.01em] transition-colors duration-300 ${active ? "text-primary" : "text-ink/70"}`}>
        {label}
      </span>
    </>
  );
  const cls =
    "relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-[3px] rounded-full transition-transform duration-200 active:scale-[0.92]";
  return href ? (
    <Link href={href} aria-current={active ? "page" : undefined} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} aria-expanded={active} className={cls}>
      {inner}
    </button>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-2 px-1 text-[12px] uppercase tracking-normal text-muted">{label}</p>
      <ul className="overflow-hidden rounded-[20px] bg-white">{children}</ul>
    </section>
  );
}

function Row({
  href,
  label,
  icon: RowIcon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon?: Icon;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li className="border-b border-line last:border-b-0">
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3.5 t-body transition-colors active:bg-mist ${active ? "text-primary" : "text-ink"}`}
      >
        {RowIcon ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist text-primary">
            <RowIcon className="h-4 w-4" strokeWidth={1.8} />
          </span>
        ) : null}
        <span className="flex-1">{label}</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-faint" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </Link>
    </li>
  );
}

function QuickAction({
  href,
  label,
  tone,
  external,
  children,
}: {
  href: string;
  label: string;
  tone: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`flex flex-col items-center justify-center gap-2 rounded-[20px] py-4 transition-transform active:scale-[0.96] ${tone}`}
    >
      {children}
      <span className="text-[13px]">{label}</span>
    </a>
  );
}
