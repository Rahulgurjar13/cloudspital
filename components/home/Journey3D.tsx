import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionLabel, IndexChip } from "@/components/ui/Section";

// "How it works" process band: Screen → Connect → Care on the primary colour.
const STEPS = [
  {
    title: "Screen",
    desc: "A patient walks up to a kiosk or cart. 50+ vitals and point of care tests are captured in minutes, no specialist on site.",
    chips: ["SpO₂", "Blood pressure", "ECG", "Glucose"],
  },
  {
    title: "Connect",
    desc: "Results stream securely to our cloud and, when needed, to a doctor or the Tele ICU command centre for live review.",
    chips: ["Encrypted", "Real-time", "ABHA-linked"],
  },
  {
    title: "Care",
    desc: "The patient gets the report and e consult and a referral if required then everything is linked to their ABHA health record.",
    chips: ["e-Report", "e-Consult", "Referral"],
  },
];

export function Journey3D() {
  return (
    <section className="bg-primary py-14 text-white sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionLabel onDark>Patient journey</SectionLabel>
          <h2 className="mt-4 t-h2 text-white">The journey from walk up to care</h2>
        </Reveal>

        <Stagger className="mt-8 grid border border-white/30 md:grid-cols-3 lg:mt-12">
          {STEPS.map((s, i) => (
            <Item
              key={s.title}
              className={`flex flex-col gap-6 p-6 transition-colors duration-300 hover:bg-white/10 sm:p-8 ${
                i < STEPS.length - 1 ? "border-b border-white/30 md:border-b-0 md:border-r" : ""
              }`}
            >
              <IndexChip n={i + 1} />
              <div>
                <h3 className="t-h5 text-white">{s.title}</h3>
                <p className="mt-2 t-body text-white/80">{s.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <span key={c} className="rounded-full border border-white/30 px-3 py-1 t-small text-white">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
