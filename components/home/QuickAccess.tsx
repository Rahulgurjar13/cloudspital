import Link from "next/link";
import type { ComponentType } from "react";
import { FlaskConical, Handshake } from "lucide-react";
import { Kiosk, HeartPulse, Stethoscope, Building, Ambulance } from "@/components/icons";
import { HUB_LABELS, SOLUTION_HUBS } from "@/components/layout/nav-data";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const HUB_ICONS: Record<string, Icon> = {
  "health-atm-kiosk": Kiosk,
  "tele-icu": HeartPulse,
  telemedicine: Stethoscope,
  "government-health-kiosk": Building,
  "mobile-medical-unit": Ambulance,
};

const SHORTCUTS: { href: string; label: string; icon: Icon }[] = [
  ...SOLUTION_HUBS.map((h) => ({ href: `/${h.slug}/`, label: HUB_LABELS[h.slug], icon: HUB_ICONS[h.slug] })),
  { href: "/tests/", label: "Tests", icon: FlaskConical },
  { href: "/partner/", label: "Partner", icon: Handshake },
];

// Phone/tablet home-screen shortcuts under the hero — one tap into each
// solution, like the quick actions row of a native app. Hidden on desktop,
// where the navbar already exposes everything.
export function QuickAccess() {
  return (
    <nav aria-label="Quick access" className="pt-6 lg:hidden">
      <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 sm:justify-center sm:px-8">
        {SHORTCUTS.map((s) => {
          const SIcon = s.icon;
          return (
            <li key={s.href} className="snap-start">
              <Link href={s.href} className="flex w-[72px] flex-col items-center gap-2 transition-transform active:scale-90">
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] border border-line bg-white text-primary">
                  <SIcon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="text-center text-[12px] leading-tight text-ink">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
