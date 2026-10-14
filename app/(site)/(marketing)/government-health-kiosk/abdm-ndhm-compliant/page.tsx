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
import { Layers } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "abdm-ndhm-compliant";
const PATH = "/government-health-kiosk/abdm-ndhm-compliant/";
const TITLE="ABDM Compliant Health Kiosks: What It Means";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn what makes a health kiosk ABDM compliant under India's national digital health framework, including HFR, HPR, and UHI integrations.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is NDHM the same as ABDM?",
    a:"Yes. NDHM (National Digital Health Mission) was officially renamed the Ayushman Bharat Digital Mission (ABDM) by the Indian government to align with the broader Ayushman Bharat initiatives.",
  },
  {
    q:"What makes a health kiosk ABDM compliant?",
    a:"A kiosk is compliant if its software integrates with ABDM building blocks (such as ABHA verification, the Health Facility Registry, and consent based health record push) using NHA approved encryption and secure APIs.",
  },
  {
    q:"Who governs ABDM standards?",
    a:"The National Health Authority (NHA) under the Ministry of Health and Family Welfare (MoHFW), Government of India.",
  },
];

const TABLE_HEADERS = ["ABDM Building Block", "Role and Function for Kiosks"];
const TABLE_ROWS = [
  ["ABHA (Ayushman Bharat Health Account)", "Validates the patient's unique 14-digit national health identity."],
  ["Health Facility Registry (HFR)", "Registers and maps the physical kiosk location to an authorized medical facility."],
  ["Healthcare Professionals Registry (HPR)", "Verifies the credentials of remote doctors conducting video consultations."],
  ["Unified Health Interface (UHI)", "Enables interoperable teleconsultations and appointment scheduling across portals."],
  ["Consent Framework", "Guarantees patient-controlled, encrypted sharing of screening and diagnostic data."],
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
          { name: "ABDM Compliance", path: PATH },
        ]}
      />

      <SpokeHero
        title="ABDM Compliant Health Kiosks"
        description="Understanding NHA compliance requirements and digital building blocks for public sector kiosks."
        definitionLabel="ABDM Compliance Summary"
        definition="An ABDM compliant health kiosk conforms to India's interoperable digital health framework. By integrating with core building blocks, including ABHA, the Health Facility Registry, and NHA consent gateways, it ensures that captured diagnostics flow securely into the national health ecosystem."
      />

      {/* ABDM Building Blocks Table */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="ABDM Building Blocks in Kiosks"
              description="Core components defining digital health compliance."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Overview of NHA building blocks integrated within compliant kiosks."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why Compliance Matters */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Standards and Future-Proofing</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why ABDM Compliance Matters</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  ABDM is designed around the core principles of semantic interoperability and patient consent. Future-proofing public deployments requires compliance, ensuring that local screening data feeds directly into national longitudinal medical records.
                </p>
                <p>
                  Furthermore, standard public-sector health tenders increasingly establish ABDM compliance as a mandatory technical qualification, aligning kiosk networks with other state services like eSanjeevani.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Unified Infrastructure</h3>
                  <p className="mt-2 t-body text-muted">
                    Compliant kiosks align municipal clinics, primary centers (PHCs), and district hospitals with the national digital health registry.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cloudspital and ABDM */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital and ABDM Integration</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital is dedicated to maintaining full compliance with the National Health Authority guidelines. Our software architectures are designed to support sandbox testing environments and secure API transfers, ensuring all patient demographics and diagnostic values are transmitted under NHA-compliant encryption.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Ensure ABDM Compliance"
        description="Consult with our engineering team to review software integrations and NHA API requirements."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
