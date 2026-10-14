import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, Item } from "@/components/motion";
import { SWIPE_ROW, SWIPE_ITEM } from "@/components/ui/swipe";
import { Container, SectionLabel } from "@/components/ui/Section";
import { Check } from "@/components/icons";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";

const PRODUCTS = [
  {
    href: "/products/health-kiosk/",
    name: "Health ATM Kiosk",
    tag: "Screening",
    desc: "Self-service walk-up kiosk with an integrated device tray, body-composition scale and 50+ parameters.",
    image: "/images/products/cloudspital-health-atm-kiosk.webp",
  },
  {
    href: "/products/",
    name: "Smart Health Pod",
    tag: "Walk-in booth",
    desc: "Private, climate-controlled booth for a full vitals check and remote doctor consultation in minutes.",
    image: "/images/products/cloudspital-smart-health-kiosk.png",
  },
  {
    href: "/mobile-medical-unit/",
    name: "Mobile Medical Unit",
    tag: "Last mile",
    desc: "Fully equipped medical van that takes diagnostics and consultations to villages and camps.",
    image: "/images/products/cloudspital-mobile-medical-unit.webp",
  },
  {
    href: "/products/",
    name: "Self-Service Health Station",
    tag: "Compact",
    desc: "Slim, floor-standing station with keyboard, printer and weighing platform for clinics and workplaces.",
    image: "/images/products/cloudspital-health-atm-kiosk.webp",
  },
];

// Assurances shared by the whole range (as stated across the site).
const ASSURANCES = ["ABDM / ABHA ready", "CDSCO approved", "Engineered and made in India"];

// Product line-up: a compact header, four product tiles on a soft studio
// floor, and a closing strip of range-wide assurances with the model compare.
export function ProductRange() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <SectionLabel>Our products</SectionLabel>
              <h2 className="mt-3 t-h3 text-ink lg:mt-4">Hardware built for every point of care</h2>
            </div>
            <p className="t-lead text-muted lg:col-span-4">
              From walk-up kiosks to mobile medical units — one connected platform, engineered and made in India.
            </p>
          </div>
        </Reveal>

        <Stagger className={`mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4 ${SWIPE_ROW}`}>
          {PRODUCTS.map((p, i) => (
            <Item key={p.name} className={SWIPE_ITEM}>
              <Link href={p.href} className="group flex h-full flex-col transition-transform active:scale-[0.98]">
                {/* image tile: a soft studio floor the product stands on */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_45%,#eef1f6_100%)] ring-1 ring-inset ring-ink/[0.06] transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[9%] left-1/2 h-4 w-[46%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-md transition-[width,opacity] duration-500 ease-out-soft group-hover:w-[38%] group-hover:opacity-70"
                  />
                  <Image
                    src={p.image}
                    alt={`Cloudspital ${p.name}`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-bottom px-6 pb-[10%] pt-12 mix-blend-multiply transition-transform duration-500 ease-out-soft group-hover:-translate-y-1.5"
                  />
                  <span className="absolute inset-x-4 top-4 flex items-center justify-between text-[12px] uppercase tracking-[0.08em]">
                    <span className="text-ink/70 transition-colors duration-300 group-hover:text-primary">{p.tag}</span>
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="t-h5 text-ink">{p.name}</h3>
                    <p className="mt-2 t-small text-muted">{p.desc}</p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>

        {/* closing strip: what every product shares, the model compare and the full range */}
        <Reveal className="mt-8 lg:mt-10">
          <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <ul className="hidden flex-wrap gap-x-7 gap-y-2 sm:flex">
              {ASSURANCES.map((a) => (
                <li key={a} className="flex items-center gap-2 t-small text-ink/80">
                  <Check className="h-4 w-4 text-primary" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:shrink-0">
              <Link
                href="/products/compare/"
                className="group inline-flex items-center gap-2 t-body text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                Compare Arc models
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <ArrowButton href="/products/">View all products</ArrowButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
