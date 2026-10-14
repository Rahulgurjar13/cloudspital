import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Reveal, Stagger, Item } from "@/components/motion";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { Container, NumberPill, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import Link from "next/link";
import { Check } from "@/components/icons";

export const revalidate = 3600;

const HUB = "resources" as const;
const SLUG = "health-atm-buyers-guide";
const PATH = `/resources/${SLUG}/`;
const TITLE="Health ATM Buyer's Guide: How to Choose";

export const metadata: Metadata = pageMetadata({
  title:"Health ATM Buyer's Guide: How to Choose (2026)",
  description:"Buying a health kiosk? This guide covers certification, parameters, telemedicine, total cost of ownership, and the exact questions to ask before you sign.",
  path: PATH,
  type: "article",
});

const faqs = [
  {
    q:"What's the most important factor when buying a health kiosk?",
    a:"Regulatory compliance (CDSCO licensing) and clinical accuracy first, then fit to your specific use case and total cost of ownership (TCO) over 3 years."
  },
  {
    q:"Should I pick the kiosk with the most tests?",
    a:"No. Relevance and clinical accuracy matter much more than raw parameter count. Choose a diagnostic panel that matches your deployment setting."
  },
  {
    q:"How do government bodies buy?",
    a:"Indian public health departments and state hospitals procure kiosks through the Government e Marketplace (GeM) portal using registered vendor IDs."
  }
];

const MORE_CONTEXT = [
  { href: "/health-atm-kiosk/price-in-india/", label: "Price in India" },
  { href: "/health-atm-kiosk/best-manufacturers-in-india/", label: "Best Manufacturers" },
  { href: "/government-health-kiosk/gem-procurement-guide/", label: "GeM Guide" },
];

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  const steps = [
    {
      num:"01",
      title:"Compliance and CDSCO Licensing",
      desc:"Ensure the manufacturer holds active ISO 13485 certifications and CDSCO POCT licensing. Data transfer protocols must align with ABDM/NDHM sandbox integration for ABHA record mapping.",
    },
    {
      num:"02",
      title:"Evaluate Parameter Configuration",
      desc:"Match the test panels to your deployment site. Corporate wellness rooms require quick non invasive vitals and body composition analytics; rural clinics require blood panels, 12 lead ECG, and spirometry.",
    },
    {
      num:"03",
      title:"Accuracy and Calibration Schedules",
      desc:"Check if the kiosk uses certified medical grade sensors. Ask the manufacturer for documented calibration processes, standard deviation limits, and telemetry accuracy sheets.",
    },
    {
      num:"04",
      title:"Telemedicine and ABHA Integration",
      desc:"Verify if the platform has built in audio visual teleconsultation systems. The software must natively support eSanjeevani integration and generate/sync longitudinal health records via ABHA IDs.",
    },
    {
      num:"05",
      title:"Total Cost of Ownership (TCO)",
      desc:"Look past the headline hardware price. Calculate the all in cost over 3 years including software licensing, server cloud sync, annual maintenance contracts (AMC), and test strip consumables.",
    },
    {
      num:"06",
      title:"Support, Maintenance and SLA",
      desc:"Ask about on site service response times, local availability of spare parts, remote software patches, and medical device recalibration schedules.",
    },
    {
      num:"07",
      title:"GeM Portal Availability",
      desc:"For public tenders, verify if the OEM is listed on the Government e Marketplace (GeM) with standard category approval, simplifying state level hospital and municipal procurement.",
    },
  ];

  const vendorQuestions = [
    "Which CDSCO licence/class and ISO certifications do your devices hold?",
    "What is the documented accuracy and calibration process?",
    "Exactly which parameters does each model measure?",
    "Is it ABHA/eSanjeevani ready today, or planned?",
    "What's the all in cost over 3 years, including consumables?",
    "What are the support SLAs and warranty?",
    "Are you GeM listed?"
  ];

  const settingsMapping = [
    { setting:"Corporate wellness", prioritise:"Lifestyle risk parameters, user privacy, instant digital reporting" },
    { setting:"Rural / PHC", prioritise:"Power resilience (battery/offline mode), ABHA record linking, teleconsultation" },
    { setting:"Hospital OPD", prioritise:"High patient throughput, automated vitals triage, hospital EMR integration" },
    { setting:"CSR camps", prioritise:"Rugged portability, quick setup, offline capability, impact dashboard reporting" }
  ];

  const cloudspitalComparison = [
    { title:"Compliance", desc:"All Cloudspital Health ATMs use CDSCO licensed POCT modules and are manufactured in ISO 13485 facilities." },
    { title:"Parameters", desc:"Fully modular diagnostic configurations (vitals, body composition, rapid blood panels, 12 lead ECG, spirometry)." },
    { title:"Accuracy", desc:"Verified clinical grade sensors calibrated quarterly with transparent diagnostic telemetry." },
    { title:"Telemedicine and ABHA", desc:"Native eSanjeevani and ABHA integration ready from Day 1, enabling direct diagnostic uploads." },
    { title:"Total Cost of Ownership", desc:"Transparent pricing models covering SaaS software, annual maintenance contracts (AMC), and test consumables." },
    { title:"Support and Uptime", desc:"Dedicated field engineers providing 48 hour service SLAs and automated remote software upgrades." },
    { title:"GeM Listing", desc:"Cloudspital is a registered OEM on the Government e Marketplace (GeM) for simplified public hospital procurement." },
    { title:"Differentiators", desc:"True Tele ICU/tele PICU integration with AIIMS Patna collaborative workflows, allowing remote intensivist telemetry streaming." }
  ];

  return (
    <article>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Health ATM Buyer's Guide", path: PATH },
        ]}
      />
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />

      <SpokeHero
        title="Health ATM Buyer's Guide"
        description="Choosing a health kiosk comes down to seven key factors: compliance, test parameters, accuracy, software integrations, TCO, SLAs, and GeM listings."
        eyebrow="Procurement Checklist (2026)"
      />

      {/* The 7-point checklist */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <h2 className="t-h2 text-ink lg:sticky lg:top-28">The 7-point checklist</h2>
            </Reveal>

            <Stagger className="border-t border-line lg:col-span-7 lg:col-start-6">
              {steps.map((s) => (
                <Item key={s.num} className="flex gap-5 border-b border-line py-8 sm:gap-6">
                  <NumberPill n={s.num} />
                  <div className="flex-1">
                    <h3 className="t-h5 text-ink">{s.title}</h3>
                    <p className="mt-2 t-body text-muted">{s.desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Questions to ask every vendor */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-4">
              <h2 className="t-h2 text-ink">Questions to ask every vendor</h2>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-line">
                {vendorQuestions.map((q, idx) => (
                  <li key={idx} className="flex gap-5 border-b border-line py-5 sm:gap-6">
                    <span className="w-8 shrink-0 pt-0.5 t-small text-faint">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="t-h6 text-ink">{q}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Matching the kiosk to your setting */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Matching the kiosk to your setting"
              description="Select the diagnostics panel matching your deployment criteria."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-mist">
                    <th scope="col" className="w-[38%] px-5 py-4 t-small font-normal uppercase text-muted sm:w-1/3 sm:px-6">
                      Setting
                    </th>
                    <th scope="col" className="px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Prioritise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {settingsMapping.map((row) => (
                    <tr key={row.setting} className="border-t border-line">
                      <th scope="row" className="px-5 py-5 align-top t-body font-normal text-ink sm:px-6">
                        {row.setting}
                      </th>
                      <td className="px-5 py-5 align-top t-body text-muted sm:px-6">{row.prioritise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How Cloudspital measures up */}
      <section className="bg-primary py-20 text-white lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              onDark
              title="How Cloudspital measures up"
              description="Honest answers to the 7-point checklist for Cloudspital, plus the Tele-ICU/tele-PICU + government-deployment differentiators:"
            />
          </Reveal>

          <Stagger className="mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {cloudspitalComparison.map((item) => (
              <Item key={item.title} className="flex min-h-[240px] flex-col gap-8 border-b border-r border-white/25 p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Check className="h-5 w-5" />
                </span>
                <div className="mt-auto">
                  <h3 className="t-h6 text-white">{item.title}</h3>
                  <p className="mt-2 t-body text-white/75">{item.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="Frequently Asked Questions (FAQ)" />

      <CtaBand
        title="Ready to Select Your Kiosk?"
        description="Consult with our team to configure the exact diagnostics panels, certifications, and GeM codes for your project."
      />

      {/* Related pages + more context */}
      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />

          <nav aria-label="More context" className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="t-small text-muted">More context:</p>
            <ul className="flex flex-wrap gap-2">
              {MORE_CONTEXT.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 t-small text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    {l.label}
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </article>
  );
}
