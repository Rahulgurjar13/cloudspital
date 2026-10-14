import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { Reveal, Stagger, Item } from "@/components/motion";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { JsonLd } from "@/components/schema/JsonLd";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { Container, SectionHeader } from "@/components/ui/Section";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import Link from "next/link";

export const revalidate = 3600;

const HUB = "resources" as const;
const SLUG = "state-of-preventive-health-screening-india";
const PATH = `/resources/${SLUG}/`;
const TITLE="The State of Preventive Health Screening in India 2026";

export const metadata: Metadata = pageMetadata({
  title:"The State of Preventive Health Screening in India 2026",
  description:"Original data from 500,000+ health screenings across 15 states: what India's preventive screening reveals about undetected hypertension, diabetes and more. Free report.",
  path: PATH,
  type: "article",
});

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "State of Preventive Health Screening in India 2026",
  "description":"Anonymised, aggregated findings from 500,000+ health screenings on Cloudspital Health ATMs and Mobile Medical Units across 15 states.",
  "creator": { 
    "@type": "Organization", 
    "name": "Cloudspital Private Limited", 
    "url": "https://cloudspital.ai" 
  },
  "datePublished":"2026-06-12",
  "temporalCoverage":"2024-01-01/2026-06-01",
  "spatialCoverage":"India",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "url": "https://cloudspital.ai/resources/state-of-preventive-health-screening-india/",
  "keywords": ["preventive health screening","health ATM","India","hypertension","diabetes","rural health"]
};

// Visible FAQ (no FAQPage schema on this page — unchanged).
const faqs: Faq[] = [
  {
    q:"How many screenings does this report cover?",
    a:"The report includes 500,000+ screenings across 15 states in India, capturing body composition, cardiovascular metrics, and rapid biochemical diagnostics.",
  },
  {
    q:"Is the data representative of all India?",
    a:"No, it reflects Cloudspital's active deployment footprint and screened populations. It represents ground level screening outcomes rather than a national randomized census survey.",
  },
  {
    q:"Can I republish these statistics?",
    a:"Yes. You can freely republish these statistics and charts with clear attribution to Cloudspital and a link back to this report page.",
  },
  {
    q:"How often is it updated?",
    a:"The Cloudspital database aggregates updates in real time, and this public data report is updated annually to reflect the latest regional findings.",
  },
];

const ink = "font-normal text-ink";
const inlineLink =
  "text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  const stats = [
    { value: "500,000+", label:"Screenings Analysed" },
    { value: "15", label:"States Covered" },
    { value: "120+", label:"Districts Active" },
    { value: "64.8%", label:"First Time Screened" },
  ];

  const keyFindings = [
    { label:"Previously Undetected Hypertension", value: 34.2 },
    { label:"Elevated Blood Glucose / Diabetes Risk", value: 28.5 },
    { label:"Abnormal ECG Flagged for Referral", value: 8.7 },
    { label:"Overweight or Obese by BMI Standards", value: 41.3 },
    { label:"First Time Screenings (No Prior Diagnostics)", value: 64.8 },
    { label:"Women's Participation Rate", value: 46.5 },
  ];

  const methodology = [
    { label:"Data source", value:"Anonymised, aggregated readings from Cloudspital Health ATMs and Mobile Medical Units (MMUs)." },
    { label:"Sample size", value:"500,000+ screenings from 480,000+ unique users." },
    { label:"Geography", value:"Deployed across 15 states and 120+ districts in India." },
    { label:"Period", value:"January 2024 – June 2026." },
    { label:"Parameters analysed", value:"Blood pressure (BP), blood glucose, body mass index (BMI), 12 lead ECG, blood oxygen (SpO₂), pulse, temperature." },
    { label:"Privacy", value:"All data is strictly anonymised and aggregated; no personally identifiable information (PII) is collected or stored." },
    { label:"Limitations", value:"Self selection bias (users walk up to the kiosks voluntarily), device based parameters only, not a randomized national census survey." },
  ];

  return (
    <article>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "State of Preventive Health Screening in India 2026", path: PATH },
        ]}
      />
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
        reviewer={{ name: "Dr. R. K. Prasad", credentials:"MD, Clinical Director" }}
      />
      <JsonLd data={datasetSchema} />

      <SpokeHero
        title="The State of Preventive Health Screening in India 2026"
        description="Analysing 500,000+ health screenings conducted on Cloudspital Health ATMs across 15 states and 120+ districts between January 2024 and June 2026."
        eyebrow="Flagship Citation Report (2026)"
      />

      {/* Core stats */}
      <section className="pt-12 lg:pt-16">
        <Container>
          <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-[20px] bg-mist p-6 sm:p-8 md:grid-cols-4 lg:p-10">
            {stats.map((s) => (
              <Item key={s.label}>
                <p className="t-h4 text-ink">{s.value}</p>
                <p className="mt-1 t-small text-muted">{s.label}</p>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Why this report exists */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className="t-h2 text-ink">Why this report exists</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p className="t-lead text-muted">
                India screens too little, too late. With roughly <strong className={ink}>2.3 ICU beds per 100,000 people</strong> and a specialist shortfall near <strong className={ink}>80% at community health centres</strong>, most chronic disease is caught only once it is advanced. Preventive screening at the community level, via health kiosks, PHCs, and Ayushman Arogya Mandirs, is how that changes. This report shows what that screening is actually finding.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Key findings */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Key findings"
            />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <div className="rounded-[30px] bg-mist p-3 sm:p-4">
                <div className="rounded-[22px] bg-white p-6 sm:p-8">
                  <Stagger className="space-y-6">
                    {keyFindings.map((finding) => (
                      <Item key={finding.label}>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="t-body text-ink">{finding.label}</span>
                          <span className="shrink-0 t-small text-primary">{finding.value}%</span>
                        </div>
                        <div
                          role="img"
                          aria-label={`${finding.label}: ${finding.value}%`}
                          className="mt-3 h-10 w-full overflow-hidden rounded-xl bg-mist"
                        >
                          <div className="h-full rounded-xl bg-primary" style={{ width: `${finding.value}%` }} />
                        </div>
                      </Item>
                    ))}
                  </Stagger>
                  <div aria-hidden="true" className="mt-4 flex justify-between border-t border-line pt-3 text-[12px] text-faint">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-line">
                <p className="border-b border-line py-6 t-body text-muted">
                  <strong className={ink}>Rural vs. Urban detection rates:</strong> Detection rates in rural communities were initially 12% lower than urban zones, primarily due to lack of diagnostic facilities. However, rural detection rates escalated rapidly once screening became accessible, indicating a high volume of previously neglected conditions.
                </p>
                <p className="border-b border-line py-6 t-body text-muted">
                  <strong className={ink}>First time screenings:</strong> A substantial <strong className={ink}>64.8%</strong> of users were screened for the first time in their lives, underscoring the severe gap in prior diagnostics.
                </p>
                <p className="border-b border-line py-6 t-body text-muted">
                  <strong className={ink}>Gender participation:</strong> Women&apos;s participation rate stood at <strong className={ink}>46.5%</strong>, showing strong engagement in maternal health and family screening.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Methodology */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader title="Methodology" />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <dl>
              {methodology.map((m, i) => (
                <div
                  key={m.label}
                  className={`grid gap-1 px-5 py-4 sm:grid-cols-12 sm:gap-6 sm:px-6 ${i === 0 ? "" : "border-t border-line"} ${
                    i % 2 === 0 ? "" : "bg-canvas"
                  }`}
                >
                  <dt className="t-small uppercase text-muted sm:col-span-4 sm:pt-0.5 lg:col-span-3">{m.label}</dt>
                  <dd className="t-body text-ink sm:col-span-8 lg:col-span-9">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* What the findings mean */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className="t-h2 text-ink">What the findings mean</h2>
            </Reveal>
            <Reveal delay={0.1} className="space-y-5 t-lead text-muted lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p>
                The high rate of undetected hypertension (34.2%) and diabetes risk (28.5%) indicates that chronic diseases are widely prevalent but undiagnosed at the community level. When non-communicable diseases (NCDs) are left untreated, they progress to acute critical events, leading to high hospitalization costs and poor patient outcomes.
              </p>
              <p>
                Deploying point-of-care testing (POCT) kiosks inside primary health centres (PHCs) and community centres acts as a first line of defense. By catching risk indicators early, public health systems can initiate lifestyle interventions and drug therapy before critical complications arise.
              </p>
              <p>
                Furthermore, linking telemetry diagnostic data to patient ABHA records under the Ayushman Bharat Digital Mission (ABDM) enables longitudinal tracking. This digital shift ensures diagnostic reports are never lost and provides remote doctors with reliable clinical histories.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How the data was collected */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className="t-h2 text-ink">How the data was collected</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p className="t-lead text-muted">
                Screenings were conducted on Cloudspital&apos;s CDSCO-compliant <Link href="/health-atm-kiosk/" className={inlineLink}>Health ATMs</Link> and <Link href="/mobile-medical-unit/" className={inlineLink}>Mobile Medical Units</Link> deployed across corporate spaces, rural primary clinics, and municipal railway stations.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="Frequently Asked Questions (FAQ)" className="bg-white" />

      <CtaBand
        title="Leverage Diagnostics Data"
        description="Partner with Cloudspital to access anonymised health analytics and deploy kiosks for preventive screening in your district."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
