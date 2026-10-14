import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle, getSpokeTitle } from "@/lib/site-structure";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion";
import { Check } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "best-manufacturers-in-india";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM Manufacturers in India: How to Choose (2026)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Choosing a Health ATM manufacturer in India? Here are the criteria that matter, certification, parameters, telemedicine, support, and what sets vendors apart.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What should I look for in a Health ATM manufacturer?",
    a:"CDSCO/ISO compliance, proven deployments, the right parameters, telemedicine/ABHA integration, accuracy, and support.",
  },
  {
    q:"Are Indian Health ATMs CDSCO approved?",
    a:"The regulated devices within them should be; always verify a vendor's specific compliance.",
  },
  {
    q:"What makes Cloudspital different?",
    a:"Cloudspital stands out with direct Tele ICU/tele PICU links, ABDM certification, and verified government deployments (Bihar Govt, Railways).",
  },
];

const CRITERIA = [
  { criterion:"Regulatory compliance", desc:"CDSCO licensing + ISO 13485 are non negotiable for safe, procurement eligible devices" },
  { criterion:"Proven deployments", desc:"Real installations (esp. government) signal reliability" },
  { criterion:"Parameter relevance", desc:"The right tests for your use case beat raw counts" },
  { criterion:"Telemedicine + ABHA", desc:"Integration with doctors and ABDM future proofs the buy" },
  { criterion:"Accuracy and calibration", desc:"Certified devices, documented calibration" },
  { criterion:"Support and AMC", desc:"Training, uptime, consumables, service" },
  { criterion:"GeM availability", desc:"Essential for government buyers" },
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
          { name: getHubTitle(HUB), path: `/${HUB}/` },
          { name: getSpokeTitle(HUB, SLUG), path: PATH },
        ]}
      />

      <SpokeHero
        title="Choose a Health ATM Manufacturer"
        description="A neutral, evidence based guide covering certifications, hardware reliability, and software capabilities to help buyers choose well."
        definitionLabel="What Matters"
        definition="India has several established Health ATM manufacturers. The right choice depends less on headline parameter counts and more on regulatory compliance (CDSCO, ISO 13485), real world deployments, telemedicine and ABHA integration, device accuracy, and after sales support. This guide covers the criteria that matter, and where Cloudspital fits."
      />

      {/* Criteria table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="The Criteria That Actually Matter"
              description="An evenhanded, evidence based framework for evaluating vendors."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-mist">
                    <th scope="col" className="w-1/3 px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Criterion
                    </th>
                    <th scope="col" className="px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Why it matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map((item) => (
                    <tr key={item.criterion} className="border-t border-line">
                      <th scope="row" className="px-5 py-4 align-top t-body font-normal text-ink sm:px-6">
                        {item.criterion}
                      </th>
                      <td className="px-5 py-4 align-top t-body text-muted sm:px-6">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Indian market and where Cloudspital fits */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
            <Reveal className="lg:col-span-5">
              <div className="flex h-full min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-canvas p-6 sm:p-8 lg:p-10">
                <SectionLabel>Market Overview</SectionLabel>
                <div>
                  <h3 className="t-h4 text-ink">The Indian Market</h3>
                  <p className="mt-4 t-body text-muted">
                    The category includes several manufacturers (for example Clinics On Cloud, Yolo Health, Phoenix Microsystems, and Cloudspital, among others). Buyers should shortlist on the criteria above and request demos and references.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="flex h-full min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <SectionLabel onDark>Our Positioning</SectionLabel>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Check className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h4 text-white">Where Cloudspital Fits</h3>
                  <p className="mt-4 t-lead text-white/80">
                    Cloudspital offers CDSCO/ISO-compliant Health ATMs with proven large-scale government deployments (including Bihar Govt, Indian Railways, and AIIMS-Patna). We differentiate by providing true Tele ICU and tele PICU capabilities, and strong regional support for public and private procurements across India. We focus on transparent calibration, clinical accuracy, and seamless integration with the ABHA registry.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Compare Cloudspital for Yourself"
        description="Contact our clinical and engineering team to check models, licensing, and certifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
