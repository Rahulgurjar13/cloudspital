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
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { HeartPulse, Shield, BarChart3 } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "what-is-tele-icu";
const PATH = "/tele-icu/what-is-tele-icu/";
const TITLE="What is Tele ICU? Definition, Benefits and Overview";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn what a tele ICU is, how it works, and how it extends 24/7 intensivist expertise to any ICU bed using live telemetry and video consultation.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is the main purpose of a tele ICU?",
    a:"The main purpose is to extend specialized intensivist care and 24/7 clinical oversight to hospitals that lack full time, on site critical care specialists.",
  },
  {
    q:"Can tele ICU doctors prescribe medicine?",
    a:"Yes. Tele ICU doctors work collaboratively with the on site bedside team, writing recommendations and guiding clinical prescriptions through integrated EMR platforms.",
  },
  {
    q:"Is tele ICU safe for critical patients?",
    a:"Yes. Multiple clinical studies and meta analyses show that tele ICUs are associated with significantly reduced ICU mortality rates, shorter hospital stays, and overall lower cost of care.",
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
          { name: "Tele ICU and Tele PICU", path: "/tele-icu/" },
          { name: "What is Tele ICU", path: PATH },
        ]}
      />

      <SpokeHero
        title="What is Tele ICU?"
        description="Learn how remote intensive care networks extend specialist clinical expertise to save lives."
        definitionLabel="Core Definition"
        definition="A tele ICU (tele intensive care unit) is a clinical network that connects a central team of critical care specialists (intensivists and ICU nurses) to patients in distant hospital ICU beds. Using real time streaming telemetry, high definition video, and smart alarm alerts, it provides 24/7 clinical support."
      />

      {/* The Core Concept */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">The Tele ICU Concept</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Tele ICU systems act as a clinical force multiplier. They combine advanced medical IoT hardware at the patient&apos;s bedside with centralized software dashboards, allowing remote specialists to monitor multiple patients simultaneously.
                </p>
                <p>
                  Rather than replacing local bedside clinicians, the remote team supports them, serving as a second set of expert eyes. They assist in reviewing lab reports, identifying physiological trends, and recommending timely critical-care interventions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <HeartPulse className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Remote Oversight</h3>
                  <p className="mt-2 t-body text-muted">
                    Real time clinical telemetry connects rural district ICU beds directly to Tier-1 intensivist command centers.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why it is Crucial for India */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>The Demographics</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why Tele ICU is Crucial for India</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  India faces a critical shortage of intensive care facilities and certified intensivists, particularly outside metropolitan regions. The country has roughly <strong className="font-normal text-ink">2.3 ICU beds per 100,000 people</strong>, and the vast majority of critical care doctors are concentrated in urban areas.
                </p>
                <p>
                  By networking local hospitals with urban clinical hubs, Tele-ICU addresses this specialist deficit. This aligns with national efforts like the Ministry of Health&apos;s <strong className="font-normal text-ink">eSanjeevani</strong> program, which has delivered over 318 million telemedicine consultations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Shield className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Geographic Access</h3>
                  <p className="mt-2 t-body text-white/70">
                    Closes the healthcare gap by delivering Tier-1 clinical expertise directly to rural and district hospitals.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Clinical Benefits */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              label="Impact"
              title="Clinical Benefits and Impact"
              description="Key improvements supported by scientific evidence and clinical data."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {[
              {
                icon: HeartPulse,
                title: "Reduced Mortality",
                desc: "Large-scale meta-analyses show that Tele-ICU deployment is associated with significant reductions in hospital and ICU mortality rates.",
              },
              {
                icon: BarChart3,
                title: "Shorter ICU Stays",
                desc: "Continuous vitals monitoring and early intervention result in shorter ICU lengths of stay, freeing up critical beds.",
              },
              {
                icon: Shield,
                title: "Cost Savings",
                desc: "Preventing complications, shortening recovery times, and reducing transfer costs lowers the overall expense of critical care.",
              },
            ].map((b, i) => (
              <Item key={b.title} className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <b.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h5 text-ink">{b.title}</h3>
                  <p className="mt-2 t-body text-muted">{b.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Learn More About Tele ICU"
        description="Request a consultation with our medical specialists to see how Tele-ICU fits your clinical workflow."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
