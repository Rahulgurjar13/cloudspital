import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel, NumberPill } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal } from "@/components/motion";
import { Award, FileCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "point-of-care-testing";
const PATH = "/telemedicine/point-of-care-testing/";
const TITLE="What Is Point of Care Testing (POCT)?";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn what Point of Care Testing (POCT) is, see a list of common rapid tests, and understand how it integrates with telemedicine carts and kiosks.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What does point of care testing mean?",
    a:"It refers to diagnostic medical testing performed at or near the patient, such as at the bedside, in a clinic, or inside a health kiosk, providing instant results within minutes rather than sending samples to a centralized lab.",
  },
  {
    q:"Is POCT as reliable as a laboratory test?",
    a:"Yes. Certified POCT devices are clinically validated and calibrated for their specific parameters. However, complex diagnostic tests may still require confirmation in a full pathology laboratory.",
  },
  {
    q:"Why is POCT important for telemedicine?",
    a:"It gives the teleconsulting doctor immediate, objective clinical data (blood glucose, lipids, haemoglobin) during the call, allowing them to prescribe medications and guide treatment plans in a single patient visit.",
  },
];

const TABLE_HEADERS = ["Test Type", "Common Parameters / Examples"];
const TABLE_ROWS = [
  ["Metabolic", "Blood glucose, HbA1c (glycated haemoglobin), lipid profile (cholesterol, HDL, triglycerides)."],
  ["Haematology", "Haemoglobin levels, anemia screenings."],
  ["Cardiac", "Rapid cardiac injury markers (Troponin testing)."],
  ["Vitals-linked", "Blood pressure monitoring, oxygen saturation (SpO₂)."],
  ["Infectious Disease", "Rapid antigen/antibody tests (e.g., malaria, dengue, COVID-19, typhoid)."],
];

const IMPACT = [
  {
    label: "Speed:",
    text: "Patients receive diagnostic results in minutes rather than waiting days for pathology laboratory reports.",
  },
  {
    label: "Rural Access:",
    text: "Extends diagnostic services to remote or tribal clinics that lack local laboratory infrastructure.",
  },
  {
    label: "Informed Action:",
    text: "Lets remote physicians consult on hard clinical data, writing prescriptions on the spot during a single session.",
  },
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
          { name: "Telemedicine Hub", path: "/telemedicine/" },
          { name: "Point of Care Testing", path: PATH },
        ]}
      />

      <SpokeHero
        title="Point of Care Testing (POCT)"
        description="Delivering rapid, laboratory grade diagnostics directly to the patient bedside in minutes."
        definitionLabel="POCT Definition"
        definition="Point of care testing (POCT) is medical diagnostic testing performed at or near the patient, at the bedside, in a clinic, or inside a health kiosk, rather than sending samples to a central laboratory. It delivers results in minutes, enabling immediate clinical decisions."
      />

      {/* Common POCT Tests Table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Common Point-of-Care Tests"
              description="Typical diagnostic panels integrated into smart health systems."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Standard parameters tested via POCT modules."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why POCT Matters */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel>Clinical Impact</SectionLabel>
                <h2 className="mt-6 t-h2 text-ink">Why POCT is Essential for Telemedicine</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-10 border-t border-line lg:mt-12">
                  {IMPACT.map((row, i) => (
                    <li key={row.label} className="flex gap-6 border-b border-line py-6">
                      <NumberPill n={i + 1} />
                      <p className="self-center t-lead text-muted">
                        <strong className="font-normal text-ink">{row.label}</strong> {row.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-canvas p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Validated Quality</h3>
                  <p className="mt-2 t-body text-muted">
                    Cloudspital integrates only clinically validated, CDSCO-compliant POCT modules to guarantee diagnostic accuracy.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cloudspital POCT Systems */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Integrations</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">POCT in Cloudspital Systems</h2>
              <p className="mt-8 t-lead text-muted">
                Cloudspital&apos;s Health ATM kiosks, telemedicine carts, and portable bags are pre-configured to bundle primary POCT modules. We ensure all diagnostic outputs sync securely to patient records, linking directly to ABHA IDs to support longitudinal health records.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <FileCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">ABHA Integrated</h3>
                  <p className="mt-2 t-body text-white/70">
                    Every POCT result is signed digitally and synced directly to the patient&apos;s health locker.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Integrate POCT Diagnostics"
        description="Consult with our clinical engineers to review POCT parameters and hardware integrations."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
