import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader, NumberPill } from "@/components/ui/Section";

const GOALS = [
  { title: "Wellness Hub", desc: "Ensure healthy lives and promote well being for all at all ages", tag: "EXCLUSIVE" },
  { title: "Maternal Vitals", desc: "Reduce maternal and infant mortality" },
  { title: "Pediatric Checkup", desc: "End all preventable deaths under 5 years of age" },
  { title: "Cardiac Screening", desc: "Reduce mortality rate attributed to cardiovascular disease" },
  { title: "Minimal Health Expenses", desc: "Household expenditures on health" },
  { title: "Risk Monitoring", desc: "Improve early warning systems for global health risks" },
];

// Sustainable Development Goals the platform contributes to, as numbered rows.
export function SDG({ as = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <section className={as === "h1" ? "pb-20 pt-10 lg:pb-[120px] lg:pt-16" : "py-14 sm:py-20 lg:py-[120px]"}>
      <Container>
        <Reveal>
          <SectionHeader
            as={as}
            label="Impact"
            title={
              <>
                Built for Accelerating <span className="text-primary">Sustainable Development Goals</span>
              </>
            }
          />
        </Reveal>

        <Stagger className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12 lg:mt-16">
          {GOALS.map((g, i) => (
            <Item key={g.title} className="flex gap-6 border-b border-line py-8">
              <NumberPill n={i + 1} />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="t-h4 text-ink">{g.title}</h3>
                  {g.tag && (
                    <span className="rounded-full bg-accent px-3 py-1 text-[12px] text-white">{g.tag}</span>
                  )}
                </div>
                <p className="mt-2 t-body text-muted">{g.desc}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
