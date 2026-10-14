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
import { Reveal, Stagger, Item } from "@/components/motion";
import { Check, Briefcase } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "for-corporate-wellness";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Corporate Wellness Programs";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Give employees on site health screening in minutes. Health ATMs power corporate wellness with instant checkups, teleconsults and aggregate health insights.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is employee health data private?",
    a:"Reputable kiosks use consented, secure handling; employers see aggregate, not individual, data.",
  },
  {
    q:"What does a corporate Health ATM screen?",
    a:"Typically BP, BMI, blood sugar, ECG, SpO₂ and more.",
  },
];

const BENEFITS = [
  { title:"High participation", desc:"On site, self service screening removes friction." },
  { title:"Early detection", desc:"Catches lifestyle disease risk (BP, sugar, BMI) early." },
  { title:"Productivity", desc:"Healthier staff, fewer sick days." },
  { title:"Insights", desc:"Aggregate, privacy respecting trends to target wellness spend." },
  { title:"Teleconsults", desc:"Connect employees to doctors on the spot." },
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
        title="Health ATM for Corporate Wellness"
        description="Deploy clinically certified kiosks in the workplace to provide quick employee health screenings and on demand teleconsultations."
        definitionLabel="Corporate Benefits"
        definition="A Health ATM installed at the workplace lets employees screen their vitals in minutes, no clinic visit, no appointment. For employers, it drives wellness participation, enables early detection, and provides anonymised, aggregate health insights to shape wellness programs."
      />

      {/* Why employers deploy */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Why Employers Deploy Health ATMs"
              description="Driving corporate health and workplace efficiency."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5 lg:gap-4">
            {BENEFITS.map((b, i) => (
              <Item
                key={b.title}
                className={`flex min-h-[200px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:min-h-[240px] sm:p-8 ${
                  i === BENEFITS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="t-h6 text-ink">{b.title}</h3>
                  <p className="mt-2 t-body text-muted">{b.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* What to look for */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <SectionLabel>Procurement Guide</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">What to Look For</h2>
              <p className="mt-8 t-lead text-muted">
                Parameter coverage relevant to lifestyle risk, certified devices, secure/consented data, and easy reporting.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8 lg:p-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Briefcase className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Cloudspital Corporate Solution</h3>
                  <p className="mt-2 t-body text-muted">
                    Cloudspital offers corporate health kiosk packages with customized corporate dashboards and HR integration, deployed in top IT parks and corporate headquarters.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Corporate Proposal"
        description="Contact our corporate sales division on WhatsApp or call to receive pricing and specs for office installations."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
