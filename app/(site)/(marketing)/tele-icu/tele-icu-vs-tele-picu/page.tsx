import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal } from "@/components/motion";
import { Heart, Activity, Check } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "tele-icu-vs-tele-picu";
const PATH = "/tele-icu/tele-icu-vs-tele-picu/";
const TITLE="Tele ICU vs Tele PICU: Key Differences Explained";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Explore the clinical differences between Tele ICU (adult) and Tele PICU (paediatric), including vital thresholds, weight based dosing, and equipment.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is tele PICU just tele ICU for children?",
    a:"No. While they share the same remote telemetry model, tele PICU is a distinct clinical specialty. It requires paediatric intensivists, child specific vital sign thresholds, and weight based drug dosing models, not just repurposed adult equipment.",
  },
  {
    q:"What is tele NICU?",
    a:"Tele NICU applies remote critical care monitoring specifically to newborns in neonatal units, who have even finer monitoring and developmental needs than paediatric patients.",
  },
  {
    q:"Can one provider deliver both tele ICU and tele PICU?",
    a:"Yes. Cloudspital's platform is designed to support both adult and paediatric telemetry streams, connecting bedside teams to the appropriate adult or paediatric intensivists depending on patient triage.",
  },
];

const TABLE_HEADERS = ["Dimension", "Tele-ICU (Adult)", "Tele-PICU (Paediatric)"];
const TABLE_ROWS = [
  ["Patient Profile", "Adults (18+ years)", "Infants, children, and adolescents"],
  ["Specialist Team", "Adult intensivists / Critical care nurses", "Paediatric intensivists / Paediatric ICU nurses"],
  ["Vital-Sign Norms", "Standard adult ranges (fixed alerts)", "Age- and weight-dependent physiological ranges"],
  ["Drug Dosing", "Largely fixed protocols", "Weight-based calculations with extremely narrow margins"],
  ["Deterioration", "Often gradual and progressive", "Can be rapid and sudden; child compensates then crashes"],
  ["Equipment Needs", "Standard adult cuffs, sensors, and probes", "Paediatric- and neonatal-sized sensors and cuffs"],
  ["Clinical Overlaps", "General critical care", "Overlaps with tele-NICU for newborn critical care"],
];

const SHARED = [
  "Real time physiological telemetry",
  "24/7/365 Command center link",
  "Early warning risk analytics",
];

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  return (
    <article>
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tele-ICU and Tele-PICU", path: "/tele-icu/" },
          { name: "Tele-ICU vs Tele-PICU", path: PATH },
        ]}
      />

      <SpokeHero
        title="Tele ICU vs Tele PICU"
        description="Understand how remote intensive care scales across adult and paediatric critical care environments."
        definitionLabel="Clinical Summary"
        definition="Tele ICU and tele PICU share the same delivery model, intensivists supporting bedside teams via real time vitals and video streams, but tele PICU is specialized for critically ill children. Paediatric care requires pediatric trained clinicians, age specific vital norms, weight based drug calculations, and pediatric sized hardware."
      />

      {/* The Core Similarity */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">The Core Similarity</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Both models connect a remote critical care specialist team to a local hospital bedside. They utilize continuous live vitals streams, enable interactive two-way high-definition video communication, and apply clinical analytics for early warning triggers.
                </p>
                <p>
                  Ultimately, both exist to solve the exact same challenge: a severe shortage of critical-care specialists, making it difficult for regional and district hospitals to provide 24/7 intensivist cover.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="t-h5 text-ink">Live Telemetry Feed</h3>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                    <Activity className="h-5 w-5" />
                  </span>
                </div>
                <ul className="mt-8 border-t border-line">
                  {SHARED.map((f) => (
                    <li key={f} className="flex gap-4 border-b border-line py-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="t-body text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The Key Differences Table */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Key Differences At a Glance"
              description="Comparing clinical structures across adult and pediatric environments."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Clinical comparison of Adult Tele ICU vs. Paediatric Tele PICU setups."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why the Distinction Matters */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Critical Care Warning</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why Children Are Not Small Adults</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Physiological metrics vary widely depending on a child&apos;s age and weight. A heart rate or respiratory rate that is perfectly normal for a newborn represents a clinical emergency for an adolescent.
                </p>
                <p>
                  Furthermore, paediatric patients have very small blood volumes and narrow weight-based drug margins. They can compensate for critical illness for a long time, showing stable readings, before suddenly crashing. repurposing adult ICU protocols for children presents serious clinical safety risks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Heart className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Dedicated PICU Care</h3>
                  <p className="mt-2 t-body text-white/70">
                    Cloudspital&apos;s programs connect district bedsides with paediatric-trained intensivists, using child-specific vital monitoring logic.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Where Cloudspital Fits */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <h2 className="t-h2 text-ink lg:col-span-5">Where Cloudspital Fits</h2>
            <p className="t-h5 text-muted lg:col-span-6 lg:col-start-7 lg:pt-3">
              Cloudspital delivers end-to-end Tele-ICU and Tele-PICU integrations. Through our Medsync-III Tele-ICU hardware and partner networks, we enable local clinical teams to stream data directly to premier hubs like AIIMS-Patna, helping save young lives in underserved communities.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy Tele-ICU / Tele-PICU"
        description="Consult with our medtech and clinical specialists to customize a telemetry network for your hospital."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
