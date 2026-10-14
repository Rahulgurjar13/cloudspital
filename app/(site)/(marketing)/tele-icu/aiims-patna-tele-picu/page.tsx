import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, Panel, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Check } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "aiims-patna-tele-picu";
const PATH = "/tele-icu/aiims-patna-tele-picu/";
const TITLE="AIIMS Patna Tele PICU Case Study";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how the AIIMS Patna Tele PICU network extends pediatric critical care expertise to remote district hospitals, saving young lives.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is the AIIMS Patna Tele PICU initiative?",
    a:"It is a collaborative pediatric telemedicine program where senior pediatric intensivists based at AIIMS Patna provide 24/7/365 telemetry monitoring and real time guidance to remote district and rural bedsides.",
  },
  {
    q:"How does it improve local capacity?",
    a:"By working hand in hand with AIIMS specialists during critical pediatric emergencies, local doctors and nursing staff at the spoke hospitals receive active, on the job training and build clinical confidence.",
  },
];

const CASE_ROWS = [
  {
    n: "1.",
    title: "The Challenge",
    body: "Rural districts in Bihar suffer from an acute shortage of specialized Pediatric Intensive Care Units (PICUs). When infants and children present with critical respiratory distress or severe infections, local hospitals lack the specialist intensivists required to stabilize them, necessitating dangerous transfers to Patna.",
  },
  {
    n: "2.",
    title: "The Solution",
    body: "AIIMS-Patna, in coordination with medtech partners, established a hub-and-spoke pediatric Tele-PICU network. Remote spoke bedsides are equipped with clinical IoT gateways and video communication systems, feeding live telemetry back to the expert command console at AIIMS.",
  },
  {
    n: "3.",
    title: "Implementation",
    body: "The setup included establishing a central monitoring hub at the AIIMS-Patna pediatric department, equipping pilot district hospital bedsides, training nursing staff on pediatric telemetry hardware, and defining escalation paths for rapid intervention.",
  },
];

const OUTCOMES = [
  "Reduced avoidable patient transfers to metro cities.",
  "Accelerated response times during pediatric crashes.",
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
          { name: "AIIMS-Patna Case Study", path: PATH },
        ]}
      />

      <SpokeHero
        title="AIIMS Patna Tele PICU Case Study"
        description="A pioneering pediatric telemedicine network extending critical care across regional district hospitals."
        definitionLabel="About This Case Study"
        definition="This page serves as a clinical case study skeleton. Out of respect for institutional approval protocols, detailed patient outcome statistics and formal medical citations are gated pending final confirmation and co branding clearance from AIIMS Patna."
      />

      {/* Case Study Sections */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionLabel>Case study</SectionLabel>
          </Reveal>

          <Stagger className="mt-8 border-t border-line lg:mt-12">
            {CASE_ROWS.map((row) => (
              <Item key={row.title} className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
                <h2 className="t-h4 text-ink lg:col-span-5">
                  <span className="text-faint">{row.n}</span> {row.title}
                </h2>
                <p className="t-lead text-muted lg:col-span-6 lg:col-start-7">{row.body}</p>
              </Item>
            ))}

            {/* Outcomes */}
            <Item className="grid gap-4 border-b border-line py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <h2 className="t-h4 text-ink lg:col-span-5">
                <span className="text-faint">4.</span> Outcomes and Clinical Impact
              </h2>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="t-lead text-muted">
                  Initial clinical pilot assessments indicate highly positive impacts on patient safety and emergency stabilization. Gated verified metrics are currently being analyzed:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {OUTCOMES.map((o) => (
                    <li key={o} className="flex items-center gap-4 rounded-[20px] bg-white p-5 sm:flex-col sm:items-start sm:gap-6 sm:p-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                        <Check className="h-5 w-5" />
                      </span>
                      <span className="t-body text-ink">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Item>
          </Stagger>
        </Container>
      </section>

      {/* Named Clinician Quote */}
      <section className="py-10 lg:py-16">
        <Panel className="px-5 py-12 sm:px-10 lg:p-[60px]">
          <Reveal>
            <SectionLabel onDark>Clinician quote</SectionLabel>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-[20px] bg-canvas p-6 text-ink sm:p-10 lg:mt-14 lg:p-[52px]">
            <blockquote>
              <p className="max-w-[980px] t-h4 text-ink">
                &ldquo;Establishing a continuous channel of communication between academic medical hubs and primary district bedsides is critical to closing the pediatric specialist gap.&rdquo;
              </p>
              <footer className="mt-10 border-t border-line pt-6">
                <span className="block t-body text-ink">AIIMS Patna Pediatric Critical Care Team</span>
                <span className="mt-1 block t-small text-muted">(Formal individual consent and quote pending publication clearance)</span>
              </footer>
            </blockquote>
          </Reveal>
        </Panel>
      </section>

      {/* Next Steps */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What's Next / Scale"
              description="Following successful pilot reviews, plans are underway to scale the spoke deployments, integrating additional community health centers and expanding the telemetry feed to include neonatal ICU (Tele-NICU) modules."
            />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Explore Tele-PICU Case Studies"
        description="Connect with our clinical integration team to discuss pilot data, hardware setups, and network layouts."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
