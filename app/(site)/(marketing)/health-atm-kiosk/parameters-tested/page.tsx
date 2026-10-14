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
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Check } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "parameters-tested";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM Parameters: What Tests Does It Do?";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Health ATMs screen 30–60+ parameters, vitals, cardiac, metabolic and body composition. See the full list of tests a health kiosk can perform.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How many tests can a Health ATM do?",
    a:"Commonly 30–60+, with some models expandable to 100+ depending on configuration.",
  },
  {
    q:"Does a Health ATM do blood tests?",
    a:"Yes, point of care tests like glucose and lipid profile use a small finger prick sample.",
  },
  {
    q:"Can it do an ECG?",
    a:"Yes, many Health ATMs include 6- or 12 lead ECG.",
  },
];

const PARAMETER_GROUPS = [
  { group:"Vital signs", tests:"Blood pressure, pulse rate, SpO₂, body temperature, respiratory rate" },
  { group:"Cardiac", tests:"ECG (6- or 12 lead)" },
  { group:"Metabolic", tests:"Blood glucose, HbA1c, lipid profile" },
  { group:"Body composition", tests:"Height, weight, BMI, body fat %, BMR" },
  { group:"Other", tests:"Vision, haemoglobin, and additional POCT panels" },
];

const TEST_TYPES = [
  {
    title: "Non-invasive",
    desc: "No blood samples or needles required. Fast, touchless sensors measure core vital baselines in seconds.",
    tests: ["Blood Pressure (BP)", "BMI and Body Composition", "SpO₂ (Oxygen Levels)", "6- or 12 lead ECG", "Infrared Temperature"],
  },
  {
    title: "Invasive (POCT)",
    desc: "Uses a small finger prick sample and dry chemistry test strips. Results are evaluated by on board optoelectronic readers instantly.",
    tests: ["Blood Glucose", "Lipid Profile (Cholesterol, HDL, LDL)", "Haemoglobin"],
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
          { name: getHubTitle(HUB), path: `/${HUB}/` },
          { name: getSpokeTitle(HUB, SLUG), path: PATH },
        ]}
      />

      <SpokeHero
        title="Health ATM Parameters: The Full List of Tests"
        description="Explore the complete panel of vitals, biochemistry, and physical markers screened by automated health kiosks."
        definitionLabel="Scope of Testing"
        definition="Health ATMs typically screen 30–60+ parameters, spanning vital signs (blood pressure, pulse, SpO₂, temperature), cardiac (ECG), metabolic (blood glucose, lipid profile), and body composition (BMI, weight, fat percentage). Advanced models add more invasive point of care tests, with some configurations expandable to 100+."
      />

      {/* Parameter groups table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Common Parameter Groups"
              description="Exact parameters depend on the model and the point of care modules fitted."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-mist">
                    <th scope="col" className="w-1/3 px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Group
                    </th>
                    <th scope="col" className="px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Example tests
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PARAMETER_GROUPS.map((p) => (
                    <tr key={p.group} className="border-t border-line">
                      <th scope="row" className="px-5 py-4 align-top t-body font-normal text-ink sm:px-6">
                        {p.group}
                      </th>
                      <td className="px-5 py-4 align-top t-body text-muted sm:px-6">{p.tests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex gap-3 border-t border-line bg-canvas px-5 py-4 t-small text-muted sm:px-6">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <strong className="font-normal text-ink">Device List:</strong> Cloudspital device configurations measure exactly these common parameter groups across basic, multi-parameter, and advanced clinical-grade models.
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Invasive vs non-invasive */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader label="Methodology" title="Invasive vs Non-Invasive Tests" />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:gap-4">
            {TEST_TYPES.map((t, i) => (
              <Item key={t.title} className="flex flex-col rounded-[20px] bg-canvas p-6 sm:p-8 lg:p-10">
                <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 t-h4 text-ink">{t.title}</h3>
                <p className="mt-3 t-body text-muted">{t.desc}</p>
                <ul className="mt-8 border-t border-line">
                  {t.tests.map((test) => (
                    <li key={test} className="flex gap-4 border-b border-line py-4 t-body text-ink">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Why coverage matters */}
      <section className="pt-20 lg:pt-[120px]">
        <Container>
          <Reveal className="grid gap-6 rounded-[20px] bg-ink p-6 text-white sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-[52px]">
            <h3 className="t-h4 text-white lg:col-span-5">Why parameter coverage matters</h3>
            <p className="t-lead text-white/75 lg:col-span-6 lg:col-start-7">
              Broader screening catches more early risk (hypertension, diabetes, cardiac and metabolic issues) in a single visit, the core value of a Health ATM for preventive care.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Configure Your Parameter Panel"
        description="Consult with our medical engineers to customize the parameter panel for your specific environment."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
