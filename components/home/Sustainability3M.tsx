import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Shield, Cpu, Users } from "@/components/icons";

const STEPS = [
  { title: "MAN", desc: "Training Telemedicine Operator", icon: Users },
  { title: "MACHINE", desc: "Cloudspital's Telemedicine Kiosk", icon: Cpu },
  { title: "MECHANISM", desc: "Root to Canopy Management System", icon: Shield },
];

// The 3M operating model — three pillars joined by a single rule.
export function Sustainability3M() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader label="How it Works" title="Sustainability and scalability with 3M" />
        </Reveal>

        <Stagger className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Item key={s.title} className="flex min-h-[220px] flex-col justify-between rounded-[20px] bg-white p-6 sm:min-h-[300px] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h1 leading-none text-line">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h4 text-ink">{s.title}</h3>
                  <p className="mt-2 t-body text-muted">{s.desc}</p>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
