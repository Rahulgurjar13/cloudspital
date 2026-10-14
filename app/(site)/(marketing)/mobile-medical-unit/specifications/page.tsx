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
import { Award, Check } from "lucide-react";

const MMU_IMAGE =
  "https://res.cloudinary.com/dnhau4zv2/image/upload/f_auto,q_auto,w_1600/cloudspital/gallery/gallery15.webp";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "mobile-medical-unit" as const;
const SLUG = "specifications";
const PATH = "/mobile-medical-unit/specifications/";
const TITLE="Mobile Medical Unit Specifications: Equipment List";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"A complete guide to Mobile Medical Unit (MMU) specifications, vehicle fit out, diagnostic equipment, power backups, and telemedicine systems.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What equipment is in a Mobile Medical Unit?",
    a:"A standard MMU contains vital sign monitors, POCT lab diagnostic equipment, basic clinical treatment materials, and power generator units. Advanced models also feature telemedicine video setups, digital stethoscopes, and cellular routers.",
  },
  {
    q:"Can an MMU include telemedicine systems?",
    a:"Yes. Telemedicine equipped MMUs extend specialist reach, enabling the on board Medical Officer or community health worker to consult with urban specialists in real time.",
  },
  {
    q:"Are MMU vehicle configurations customizable?",
    a:"Yes. Vehicle size (e.g. customized vans vs. heavy duty buses), diagnostic devices, layout fit outs, and software parameters are customized to meet specific state and corporate health program budgets.",
  },
];

const SPEC_HEADERS = ["Specification Area", "What It Covers"];
const SPEC_ROWS = [
  ["Vehicle and Fit-out", "Customized clinical interior partitions, examination bed space, medical cabinetry, and hygiene sinks."],
  ["Diagnostics", "BP monitors, thermometers, ECG sensors, blood glucose meters, haemoglobin POCT, and optional portable ultrasound/X-ray."],
  ["Telemedicine", "HD video conferencing displays, omni-directional mics, digital stethoscopes, and dental/examination cameras."],
  ["Power and Connectivity", "On-board auxiliary power generators, UPS backup batteries, and multi-SIM 4G/5G cellular routers."],
  ["Software", "Electronic Health Records (EHR) interface, ABHA database integration, and analytics dashboard engines."],
  ["Staff Roster", "Dedicated seats for Medical Officer, nurse, pharmacist, lab technician, and driver."],
];

const PROGRAM_FITS = [
  { label: "NCD Screening:", text: "Focuses heavily on ECG, blood pressure, and blood glucose testing." },
  { label: "Maternal Child Health:", text: "Integrates portable ultrasound units and pediatric scales." },
  { label: "Ophthalmic Care:", text: "Fitted with refraction equipment and visual screening tools." },
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
          { name: "Mobile Medical Unit Hub", path: "/mobile-medical-unit/" },
          { name: "Specifications", path: PATH },
        ]}
      />

      <SpokeHero
        title="Mobile Medical Unit Specifications"
        description="A complete guide to vehicle dimensions, fit outs, diagnostic tools, power requirements, and telemedicine integrations."
        definitionLabel="Specification Summary"
        definition="A Mobile Medical Unit (MMU) specification sheet outlines five primary areas: vehicle layout and medical fit out, diagnostic and POCT equipment, telemedicine connectivity, auxiliary power generators, and EHR software systems. Configurations are customized based on program scopes."
        image={{
          src: MMU_IMAGE,
          alt: "Cloudspital Mobile Medical Unit — fully fitted MMU bus with side awning extended",
        }}
      />

      {/* Specifications Table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Standard MMU Specifications"
              description="Core requirements and modules integrated within medical vehicles."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Typical vehicle and medical hardware configurations for MMUs."
              headers={SPEC_HEADERS}
              rows={SPEC_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Customization & Fabrication */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Fabrication Standards</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Tailored to Local Public Health Programs</h2>
              <p className="mt-8 t-lead text-muted">
                MMU vehicle configurations vary dynamically to match program requirements. For example:
              </p>
              <ul className="mt-8 border-t border-line">
                {PROGRAM_FITS.map((f) => (
                  <li key={f.label} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-muted">
                      <strong className="font-normal text-ink">{f.label}</strong> {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-canvas p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Quality Compliance</h3>
                  <p className="mt-2 t-body text-muted">
                    Cloudspital integrates only certified, medical-grade diagnostic components to guarantee diagnostic validity in the field.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cloudspital MMU Specifications */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Cloudspital MMU Fabrication"
              description="Cloudspital manages the complete vehicle interior design, fabrication, and medical equipment outfitting. We custom-configure the diagnostic sensors, telemedicine consultation dashboards, and dual-SIM cellular gateways on board to align with your program's specific budget and staffing limits."
            />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="FAQ" label="Questions" />

      <CtaBand
        title="Download Specification Sheets"
        description="Connect with our fabrication team to request custom layout drafts and diagnostic specifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
