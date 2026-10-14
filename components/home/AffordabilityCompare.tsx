import { Reveal } from "@/components/motion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";

// Positions in-clinic point-of-care testing as up to 80% cheaper than an
// external market lab. Expressed as relative savings (no rupee figures) to
// stay consistent with the no-price policy.

const PROOF = [
  { value: "Up to 80%", label: "lower than market rates" },
  { value: "Minutes", label: "not days, for results" },
  { value: "100%", label: "lab-accurate*" },
];

export function AffordabilityCompare() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col items-start gap-6 lg:col-span-6">
          <SectionLabel>Affordable by design</SectionLabel>
          <h2 className="t-h2 text-ink">
            Up to <span className="text-primary">80% cheaper</span> than market lab rates
          </h2>
          <p className="max-w-[520px] t-lead text-muted">
            Testing inside the clinic cuts out lab markups, logistics and
            middlemen — so patients pay a fraction of standard rates, with
            lab-accurate results in minutes.
          </p>
          <dl className="mt-2 grid w-full max-w-[560px] grid-cols-3 border-t border-line pt-6">
            {PROOF.map((p) => (
              <div key={p.label}>
                <dt className="t-h5 text-ink">{p.value}</dt>
                <dd className="mt-1 t-small text-muted">{p.label}</dd>
              </div>
            ))}
          </dl>
          <ArrowButton href="/tests/" className="mt-2">
            See the full test catalog
          </ArrowButton>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="border-t border-ink pt-6">
            <p className="text-[12px] uppercase tracking-[0.08em] text-muted">Cost per test, indexed</p>

            <div className="mt-8">
              <div className="flex items-center justify-between t-body">
                <span className="text-muted">Market / lab rate</span>
                <span className="text-ink">100%</span>
              </div>
              <div className="mt-3 h-3 w-full rounded-full bg-[repeating-linear-gradient(135deg,#d9dce3_0_6px,#e8eaef_6px_12px)]" />
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between t-body">
                <span className="text-ink">At your HealthMatrix clinic</span>
                <span className="text-primary">as low as 20%</span>
              </div>
              <div className="mt-3 h-3 w-full rounded-full bg-line">
                <div className="animate-grow-x h-full w-1/5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="mt-10 flex items-baseline justify-between border-t border-line pt-6">
              <span className="t-body text-ink">Saved on every test</span>
              <span className="t-h2 text-primary">≈ 80%</span>
            </div>

            <p className="mt-5 text-[12px] leading-relaxed text-muted">
              *Validated against the Telangana Diagnostics Centre. Savings are
              indicative and vary by test and location.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
