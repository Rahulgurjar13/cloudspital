import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader, NumberPill, Panel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Check } from "@/components/icons";

// The doctor partnership model: ₹0 investment, 100% managed by Cloudspital,
// 30% revenue share. Data sourced from the HealthMatrix deck.

const MANAGED = [
  { title: "Health kiosk & hardware", desc: "A fully equipped diagnostic station installed at zero capital cost." },
  { title: "Staffing & operations", desc: "We provide the trained operator, payroll and day-to-day running." },
  { title: "Consumables & inventory", desc: "End-to-end supply chain for every testing kit and material." },
  { title: "Quality control & compliance", desc: "Routine calibration, strict QA/QC and secure digital payments." },
  { title: "Remote monitoring & support", desc: "24/7 system health checks, helpline and responsive field support." },
  { title: "Transparent dashboard", desc: "A live portal tracking daily tests, footfall and your revenue share." },
];

const CHIPS = ["15+ states", "100+ tests", "ABDM / ABHA ready", "100% accuracy"];

const EQUATION = [
  { value: "₹0", label: "Your investment", tone: "bg-white text-ink", sub: "text-muted" },
  { value: "100%", label: "Managed by us", tone: "bg-primary text-white", sub: "text-white/80" },
  { value: "30%", label: "Revenue share", tone: "bg-ink text-white", sub: "text-white/70", note: "Your earnings — fully passive, paid monthly." },
];

/**
 * The doctor partnership model. `teaser` (homepage) shows the headline and the
 * ₹0 + 100% = 30% equation with a link through to /partner/; `full` adds the
 * "we manage everything else" list. The closing panel is <PartnerCta />.
 */
export function PartnershipModel({
  variant = "full",
  as = "h2",
}: {
  variant?: "full" | "teaser";
  as?: "h1" | "h2";
}) {
  const teaser = variant === "teaser";
  return (
    <section className={as === "h1" ? "pb-20 pt-10 lg:pb-[120px] lg:pt-16" : "py-14 sm:py-20 lg:py-[120px]"}>
      <Container>
        <Reveal>
          <SectionHeader
            as={as}
            label="Doctor Partnership Model"
            title={
              <>
                You invest ₹0. We manage 100%. You earn <span className="text-primary">30%</span>.
              </>
            }
            description="Turn your clinic into a full diagnostic centre with zero risk. Cloudspital funds, installs and runs everything — you simply earn a transparent 30% revenue share, paid monthly."
            action={
              teaser ? (
                <ArrowButton href="/partner/" variant="outline" size="sm">
                  Explore the partnership
                </ArrowButton>
              ) : undefined
            }
          />
        </Reveal>

        {/* Partnership equation */}
        <Reveal className="mt-8 sm:mt-12 lg:mt-16">
          <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {EQUATION.map((e, i) => (
              <div key={e.label} className="contents">
                <div className={`flex min-h-[200px] flex-col justify-between rounded-[20px] p-6 sm:p-8 ${e.tone}`}>
                  <p className={`t-small uppercase ${e.sub}`}>{e.label}</p>
                  <div>
                    <p className="t-h1">{e.value}</p>
                    {"note" in e && e.note ? <p className={`mt-2 t-small ${e.sub}`}>{e.note}</p> : null}
                  </div>
                </div>
                {i < EQUATION.length - 1 && (
                  <span aria-hidden="true" className="flex items-center justify-center t-h3 text-faint">
                    {i === 0 ? "+" : "="}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* What we manage */}
        {!teaser && (
          <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="t-h3 text-ink">We manage everything else</h2>
            </Reveal>
            <Stagger className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
              {MANAGED.map((m, i) => (
                <Item key={m.title} className="flex gap-5 border-b border-line py-6">
                  <NumberPill n={i + 1} />
                  <div>
                    <h3 className="t-h6 text-ink">{m.title}</h3>
                    <p className="mt-1 t-small text-muted">{m.desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        )}
      </Container>
    </section>
  );
}

/** Closing call to action for the partnership page. */
export function PartnerCta() {
  return (
    <section className="py-10 lg:py-16">
      <Reveal>
        <Panel className="relative overflow-hidden">
          <div className="relative grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-20">
            <div className="lg:col-span-7">
              <h2 className="t-h2 text-white">Ready to elevate your clinic?</h2>
              <p className="mt-4 max-w-[540px] t-lead text-white/80">
                Zero investment, zero operational headaches — just a new, passive
                revenue stream and better care for your patients.
              </p>
            </div>
            <div className="flex flex-col items-start justify-end gap-6 lg:col-span-4 lg:col-start-9">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                {CHIPS.map((c) => (
                  <li key={c} className="flex items-center gap-2 t-small text-white/90">
                    <Check className="h-4 w-4 shrink-0 text-white" />
                    {c}
                  </li>
                ))}
              </ul>
              <BookDemoDialog>
                <ArrowButton href="/contact/" variant="light">
                  Become a partner
                </ArrowButton>
              </BookDemoDialog>
            </div>
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
