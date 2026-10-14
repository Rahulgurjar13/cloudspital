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
import { Container, Panel, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "vs-traditional-health-checkup";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM vs Traditional Health Checkup: Compared";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"How does a Health ATM compare to a traditional lab/hospital checkup on speed, cost, access and depth? A clear, honest comparison.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is a Health ATM as accurate as a lab?",
    a:"For its screening tests it uses certified devices, but labs cover a far wider, deeper range. Kiosks screen; labs diagnose.",
  },
  {
    q:"Should a Health ATM replace my annual checkup?",
    a:"No, it complements it by enabling frequent, convenient screening between full checkups.",
  },
];

const COMPARISON_ROWS = [
  { label:"Speed", atm:"~10–15 min, instant report", trad:"Appointment + lab wait" },
  { label:"Access", atm:"Anywhere it's installed", trad:"Hospital/lab visit" },
  { label:"Cost", atm:"Low per screening", trad:"Higher" },
  { label:"Scope", atm:"Core vitals + common POCT", trad:"Full lab/imaging range" },
  { label:"Clinical depth", atm:"Screening + teleconsult", trad:"In person diagnosis" },
  { label:"Best for", atm:"Early detection, screening at scale", trad:"Diagnosis, complex cases" },
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
        title="Health ATM vs Traditional Health Checkup"
        description="Compare the diagnostic depth, access speed, and cost parameters of automated health kiosks against standard pathology labs."
        definitionLabel="At a Glance"
        definition="A Health ATM offers fast, low cost, self service screening of core parameters in minutes, ideal for early detection and high volume settings. A traditional hospital or lab checkup is slower and costlier but offers deeper diagnostics and in person clinical judgment. They're complementary: kiosks screen and triage; labs and clinicians diagnose and treat."
      />

      {/* Comparison table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Side by Side Comparison"
              description="Detailed evaluation of workflows, accessibility, and diagnostic scopes."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="bg-mist">
                    <th scope="col" className="w-1/4 px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Feature
                    </th>
                    <th scope="col" className="px-5 py-4 t-body font-normal text-primary sm:px-6">
                      Health ATM
                    </th>
                    <th scope="col" className="px-5 py-4 t-body font-normal text-ink sm:px-6">
                      Traditional checkup
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-line">
                      <th scope="row" className="px-5 py-4 align-top t-small font-normal uppercase text-muted sm:px-6">
                        {row.label}
                      </th>
                      <td className="px-5 py-4 align-top t-body text-ink sm:px-6">{row.atm}</td>
                      <td className="px-5 py-4 align-top t-body text-muted sm:px-6">{row.trad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* The honest takeaway */}
      <section className="py-10 lg:py-16">
        <Panel tone="ink" className="px-6 py-12 sm:px-10 lg:px-[60px] lg:py-24">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionLabel onDark>Takeaway</SectionLabel>
              <h3 className="mt-6 t-h3 text-white">The honest takeaway</h3>
            </div>
            <p className="t-h5 text-white/80 lg:col-span-6 lg:col-start-7 lg:pt-3">
              A Health ATM is a screening and triage tool, not a replacement for a doctor or a full diagnostic lab. Its strength is catching risk early and routing people to care, especially where clinics are far or crowded.
            </p>
          </Reveal>
        </Panel>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="See It Side by Side"
        description="Connect with our medical product experts to see the Health ATM interface in real-time."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
