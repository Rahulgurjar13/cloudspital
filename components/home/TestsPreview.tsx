import Link from "next/link";
import { Reveal, Stagger, Item } from "@/components/motion";
import { SWIPE_ROW, SWIPE_ITEM } from "@/components/ui/swipe";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { CATEGORIES, TESTS } from "@/components/tests/tests-data";

// Home-page teaser for the full /tests/ catalog. Server-rendered; no prices —
// this section sells the breadth of screening, then routes to the catalog.

const EXAMPLES: Record<string, string[]> = {
  biochemistry: ["Lipid Profile", "LFT", "KFT", "Glucose"],
  immunoassay: ["HbA1c", "TSH", "Troponin I", "Vitamin D"],
  rapid: ["Dengue NS1", "Malaria", "Typhoid", "HIV 1 & 2"],
  strip: ["Haemoglobin", "Blood Glucose", "Urine 10-Param", "Uric Acid"],
};

// Card tones cycle through the palette: ink, graphite, primary, white.
const TONES = [
  { card: "bg-ink text-white", sub: "text-white/70", chip: "bg-white/10 text-white" },
  { card: "bg-muted text-white", sub: "text-white/75", chip: "bg-white/15 text-white" },
  { card: "bg-primary text-white", sub: "text-white/80", chip: "bg-white/15 text-white" },
  { card: "bg-white text-ink", sub: "text-muted", chip: "bg-mist text-ink" },
];

export function TestsPreview() {
  const total = TESTS.length;

  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="Diagnostic Test Catalog"
            title={`${total}+ lab-grade tests, in a single walk-up kiosk`}
            description="From biochemistry and immunoassays to rapid infection panels and bedside strip tests — screened on-site, with doctor-ready results in minutes."
            action={<ArrowButton href="/tests/">Explore the full test catalog</ArrowButton>}
          />
        </Reveal>

        <Stagger className={`mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 ${SWIPE_ROW}`}>
          {CATEGORIES.map((c, i) => {
            const count = TESTS.filter((t) => t.category === c.key).length;
            const tone = TONES[i % TONES.length];
            return (
              <Item key={c.key} className={SWIPE_ITEM}>
                <Link
                  href="/tests/"
                  className={`group flex h-full min-h-[320px] flex-col justify-between rounded-[20px] p-6 transition-transform duration-500 ease-out-soft hover:-translate-y-1 active:scale-[0.98] sm:min-h-[380px] sm:p-7 ${tone.card}`}
                >
                  <div className="flex items-start justify-between">
                    <p className="t-h1 leading-none">{count}</p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/30 opacity-70 transition-opacity group-hover:opacity-100">
                      <ArrowIcon className="h-4 w-4 -rotate-45" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5">{c.label}</h3>
                    <p className={`mt-2 t-small ${tone.sub}`}>{c.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {EXAMPLES[c.key].map((ex) => (
                        <span key={ex} className={`rounded-full px-3 py-1 text-[12px] ${tone.chip}`}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
