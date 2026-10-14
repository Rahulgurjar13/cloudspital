import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Shield, Cpu, Clock, Users, MapPin, HeartPulse } from "@/components/icons";

const FEATURES = [
  {
    icon: HeartPulse,
    title: "AIIMS grade clinical protocols",
    desc: "Screening and critical care workflows co developed with AIIMS clinicians.",
    tag: "Clinical",
  },
  {
    icon: Shield,
    title: "Compliant by design",
    desc: "ABDM/NDHM and ABHA ready, CDSCO approved devices, ISO and CE certified.",
    tag: "Compliance",
  },
  {
    icon: Cpu,
    title: "AI assisted triage",
    desc: "On device intelligence flags abnormal vitals and routes urgent cases.",
    tag: "Intelligence",
  },
  {
    icon: MapPin,
    title: "Built for the last mile",
    desc: "Rugged, low bandwidth hardware that works in PHCs and rural camps.",
    tag: "Reach",
  },
  {
    icon: Clock,
    title: "Care in minutes",
    desc: "A full screening to printed report in around five minutes.",
    tag: "Speed",
  },
  {
    icon: Users,
    title: "Made in India",
    desc: "DPIIT recognised manufacturer, GeM listed for government procurement.",
    tag: "Sovereign",
  },
];

// "Why Cloudspital": a ruled 3 × 2 grid of differentiators.
export function Features() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader label="Why Cloudspital" title="Hospital-grade, where hospitals can't reach" />
        </Reveal>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Item
                key={f.title}
                className="group flex min-h-[280px] flex-col justify-between gap-10 bg-white p-7 transition-colors duration-300 hover:bg-primary sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-primary transition-colors duration-300 group-hover:bg-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="t-small uppercase text-muted transition-colors duration-300 group-hover:text-white/80">
                    {String(i + 1).padStart(2, "0")} · {f.tag}
                  </span>
                </div>
                <div>
                  <h3 className="t-h5 text-ink transition-colors duration-300 group-hover:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 t-body text-muted transition-colors duration-300 group-hover:text-white/80">
                    {f.desc}
                  </p>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
