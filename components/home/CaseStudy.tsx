import { Reveal, Stagger, Item } from "@/components/motion";
import { Panel, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";

const STATS = [
  { v: "24/7", l: "Specialist coverage" },
  { v: "Real time", l: "Vitals and video" },
  { v: "Fewer", l: "Avoidable transfers" },
  { v: "Hub and spoke", l: "Scalable model" },
];

// AIIMS-Patna Tele-PICU — the headline proof point, set in an inset panel.
export function CaseStudy() {
  return (
    <section className="py-10 lg:py-16">
      <Panel className="px-5 py-12 sm:px-10 lg:p-[60px]">
        <Reveal>
          <SectionLabel onDark>Case study</SectionLabel>
          <h2 className="mt-6 max-w-[860px] t-h2 text-white">
            Pediatric intensive care, delivered remotely at AIIMS-Patna
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-8 rounded-[20px] bg-canvas p-6 text-ink sm:p-10 lg:mt-14 lg:grid-cols-12 lg:p-[52px]">
          <div className="flex flex-col items-start justify-between gap-8 lg:col-span-6">
            <p className="t-h4 text-ink">
              “Our Tele-PICU links specialist intensivists to bedside teams in
              real time, extending expert critical care to children who would
              otherwise need transfer to a metro hospital.”
            </p>
            <ArrowButton href="/tele-icu/aiims-patna-tele-picu/">Read the case study</ArrowButton>
          </div>
          <Stagger className="grid grid-cols-2 gap-3 lg:col-span-5 lg:col-start-8">
            {STATS.map((s) => (
              <Item key={s.l} className="flex min-h-[124px] flex-col justify-between rounded-2xl bg-white p-5">
                <p className="t-small text-muted">{s.l}</p>
                <p className="t-h5 text-ink">{s.v}</p>
              </Item>
            ))}
          </Stagger>
        </Reveal>
      </Panel>
    </section>
  );
}
