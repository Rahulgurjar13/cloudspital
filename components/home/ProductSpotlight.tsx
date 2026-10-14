import Image from "next/image";
import { Reveal } from "@/components/motion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { HeartPulse, Shield, Cpu, Clock } from "@/components/icons";
import { KioskAnatomy } from "@/components/home/KioskAnatomy";

// NOTE: placeholder marketing figures — replace with verified numbers (SOP
// values first-hand/original stats for E-E-A-T and LLM citation).
const STATS = [
  { value: "50+", label: "Health parameters screened" },
  { value: "24/7", label: "Tele ICU monitoring" },
  { value: "5 min", label: "From screening to report" },
  { value: "AIIMS", label: "Co developed protocols" },
];

// Dividers between the figures: 2×2 on phones, one row of four from sm up.
const STAT_DIVIDERS = [
  "",
  "border-l border-line pl-5 sm:pl-6",
  "sm:border-l sm:border-line sm:pl-6",
  "border-l border-line pl-5 sm:pl-6",
];

const FEATURES = [
  { icon: HeartPulse, label: "Hospital grade vitals", desc: "SpO₂, ECG, BP, glucose, BMI and 45+ more." },
  { icon: Cpu, label: "AI assisted screening", desc: "On-device intelligence flags abnormal results instantly." },
  { icon: Shield, label: "Fully compliant", desc: "ABDM / ABHA ready, CDSCO approved, CE and ISO certified." },
  { icon: Clock, label: "Report in 5 minutes", desc: "Walk up, screen, print — no technician required." },
];

// Flagship product as one showcase card: the kiosk on a soft stage, then the
// statement, a row of figures, feature pills and actions. Kept deliberately
// light on text — the full detail lives on the Health ATM hub.
export function ProductSpotlight() {
  return (
    <section className="py-10 sm:py-12 lg:py-10">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-[30px] bg-white lg:grid-cols-12">
            {/* Product stage */}
            <div className="relative h-[340px] bg-gradient-to-b from-mist to-white sm:h-[420px] lg:col-span-5 lg:h-auto lg:min-h-[540px]">
              <Image
                src="/images/products/cloudspital-health-atm-kiosk.webp"
                alt="Cloudspital Health ATM kiosk"
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-contain p-8 pb-20 mix-blend-multiply"
              />
              <p className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 t-small text-white">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                ABDM / ABHA ready · CDSCO approved
              </p>
            </div>

            {/* Story */}
            <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 lg:col-span-7 lg:px-12 lg:py-10">
              <div>
                <SectionLabel>Our Flagship Product</SectionLabel>
                <h2 className="mt-3 text-[clamp(28px,2.8vw,40px)] leading-[1.15] tracking-[-0.05em] text-ink">
                  The Cloudspital <span className="text-primary">Health ATM Kiosk</span>
                </h2>
                <p className="mt-3 t-body text-muted">
                  A walk-up, self-service kiosk that delivers 50+ clinical health
                  parameters in under 5 minutes — no nurse, no waiting room, no
                  paperwork. Reports link directly to the patient&apos;s ABHA
                  health record.
                </p>
              </div>

              {/* Figures */}
              <div className="grid grid-cols-2 gap-y-4 border-y border-line py-5 sm:grid-cols-4">
                {STATS.map((s, i) => (
                  <div key={s.label} className={STAT_DIVIDERS[i]}>
                    <p className="t-h4 text-ink">{s.value}</p>
                    <p className="mt-1 text-[13px] leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature pills */}
              <ul className="grid gap-2 sm:grid-cols-2">
                {FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.label} className="flex items-center gap-2.5 rounded-full bg-mist py-2 pl-2 pr-4 t-small text-ink">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      {f.label}
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <ArrowButton href="/health-atm-kiosk/">Explore the Health ATM</ArrowButton>
                <BookDemoDialog>
                  <ArrowButton href="/contact/" variant="outline">
                    Book a demo
                  </ArrowButton>
                </BookDemoDialog>
              </div>
            </div>
          </div>
        </Reveal>

        {/* What's inside: interactive module map of the kiosk */}
        <div className="mt-10 lg:mt-12">
          <KioskAnatomy />
        </div>
      </Container>
    </section>
  );
}
