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
import { ShieldAlert, FileSpreadsheet } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "cdsco-poct-licensing";
const PATH = "/government-health-kiosk/cdsco-poct-licensing/";
const TITLE="CDSCO Licensing for Health Kiosks and POCT Devices";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Understand CDSCO Medical Device Rules 2017 risk classifications (A D), ISO 13485 certifications, and licensing requirements for health kiosks in India.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Do health kiosks need CDSCO approval?",
    a:"The embedded medical diagnostic components inside the kiosk (such as blood pressure monitors, ECG sensors, and blood glucose meters) are classified as medical devices and require CDSCO registration and compliance under MDR 2017.",
  },
  {
    q:"What is POCT?",
    a:"POCT stands for Point of Care Testing. It refers to diagnostic medical testing performed at or near the site of patient care (e.g. inside a kiosk terminal) rather than sending samples to a centralized clinical laboratory.",
  },
  {
    q:"Is ISO 13485 mandatory?",
    a:"ISO 13485 is the international quality management system (QMS) standard for medical devices. Having this certification is highly recommended for manufacturers and is typically a mandatory criteria for GeM listing and government tenders.",
  },
];

const TABLE_HEADERS = ["Device Class", "Risk Profile", "Licensing Authority"];
const TABLE_ROWS = [
  ["Class A", "Low Risk (e.g. thermometers, weighing scales)", "State Licensing Authority"],
  ["Class B", "Low to Moderate Risk (e.g. blood pressure monitors)", "State Licensing Authority"],
  ["Class C", "Moderate to High Risk (e.g. blood glucose meters, ECG)", "Central Licensing Authority (CDSCO)"],
  ["Class D", "High Risk (e.g. advanced implantables, high-hazard monitors)", "Central Licensing Authority (CDSCO)"],
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
          { name: "Government Kiosk Hub", path: "/government-health-kiosk/" },
          { name: "CDSCO and POCT Licensing", path: PATH },
        ]}
      />

      <SpokeHero
        title="CDSCO and POCT Licensing"
        description="Understanding medical device classifications, CDSCO licences, and ISO QMS standards."
        definitionLabel="Regulatory Direct Answer"
        definition="Health kiosks package several medical modules (ECG, BP, blood glucose), falling under India's Medical Device Rules (MDR) 2017 administered by CDSCO. Devices are risk classified from Class A to D. Kiosk manufacturers must hold valid CDSCO manufacturing licences and ISO 13485 certifications."
      />

      {/* Compliance Warning Banner */}
      <section className="py-10 lg:py-16">
        <Container>
          <Reveal className="flex gap-4 rounded-[20px] border border-line bg-white p-5 sm:p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
              <ShieldAlert className="h-5 w-5" />
            </span>
            <p className="t-body text-muted sm:pt-2.5">
              <strong className="font-normal text-ink">Regulatory Disclaimer:</strong> This licensing guide is provided for general informational purposes only and does not constitute formal legal or regulatory advice. Medical device rules are subject to update. All buyers and sellers are directed to verify current registration guidelines directly with the <a href="https://cdsco.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">Central Drugs Standard Control Organisation (cdsco.gov.in)</a> or a certified regulatory consultant.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Device Classifications Table */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="CDSCO Device Classifications"
              description="Understanding risk categories and licensing authorities."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Risk classifications under India's Medical Device Rules (MDR) 2017."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why it Matters */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Standards Compliance</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why Licensing Matters for Kiosks</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Because a health kiosk integrates multiple diagnostic modules, each module carries its own classification and license. For instance, the embedded blood pressure monitor might be Class B, while the ECG is Class C.
                </p>
                <p>
                  Indian manufacturers need a valid manufacturing licence (issued by the State for Class A/B, or the Central authority for Class C/D). A fully compliant, accurately licensed catalog is a fundamental prerequisite for GeM listing, ensuring legal validity and clinical safety.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <FileSpreadsheet className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Quality Standards</h3>
                  <p className="mt-2 t-body text-muted">
                    ISO 13485 (medical devices quality management system) is the benchmark standard for all compliant health kiosk manufacturers.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cloudspital's Status */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital Regulatory Status</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital&apos;s manufacturing plants and devices operate under strict ISO 13485 guidelines. We ensure all embedded medical diagnostic modules are registered with CDSCO under the appropriate classes, providing complete regulatory safety and compliance verification for all government tenders.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Verify Regulatory Licenses"
        description="Consult with our regulatory compliance division to obtain license numbers, ISO certifications, or device declarations."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
