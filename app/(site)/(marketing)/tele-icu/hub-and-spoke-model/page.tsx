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
import { Reveal, Stagger, Item } from "@/components/motion";
import { Network, Server, GraduationCap } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "hub-and-spoke-model";
const PATH = "/tele-icu/hub-and-spoke-model/";
const TITLE="The Hub and Spoke Tele ICU Model Explained";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how the hub and spoke tele ICU model centralizes critical care specialists to support multiple remote hospitals simultaneously.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How many hospitals can one hub support?",
    a:"It depends on clinical staffing ratios and patient acuity. The hub and spoke model is built to scale across many spokes. Typically, one hub intensivist supported by critical care nurses can supervise 30 to 50 beds across multiple locations.",
  },
  {
    q:"Is hub and spoke better than on site intensivists?",
    a:"Where on site intensivists are not available, it is often the only viable way to provide 24/7 specialist critical care. It acts as an enhancement rather than a replacement, upskilling and supporting local bedside clinicians.",
  },
];

const TABLE_HEADERS = ["Model", "Structure", "Key Strength"];
const TABLE_ROWS = [
  [
    "Centralised Command Centre (Hub and Spoke)",
    "Specialists located in one central hub monitor many remote spoke hospitals simultaneously.",
    "Maximum scale, standardisation of clinical protocols, and robust 24/7 specialist cover.",
  ],
  [
    "Clinical Mesh",
    "Specialists monitor patient telemetry from dispersed, individual remote locations.",
    "Higher staffing flexibility and distributed scheduling options.",
  ],
];

const PILLARS = [
  {
    title: "1. Define the Hub",
    desc: "Establish clinical staffing ratios, shift handovers, and emergency escalation guidelines for remote specialists in the central command center.",
    icon: Server,
  },
  {
    title: "2. Standardise Spokes",
    desc: "Equip all remote spoke bedsides with standardized telemetry hardware, camera systems, and redundant internet lines to guarantee fidelity.",
    icon: Network,
  },
  {
    title: "3. Clinical Governance",
    desc: "Agree on shared documentation formats, medical charts, and audit protocols between remote intensivists and on-site bedside doctors.",
    icon: GraduationCap,
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
          { name: "Tele-ICU and Tele-PICU", path: "/tele-icu/" },
          { name: "Hub and Spoke Model", path: PATH },
        ]}
      />

      <SpokeHero
        title="Hub and Spoke ICU Model"
        description="Discover how centralizing clinical expertise enables high quality, standardized critical care at scale."
        definitionLabel="Model Overview"
        definition={`In a hub-and-spoke tele-ICU, a central clinical "hub" of intensivists and critical care nurses remotely supports multiple peripheral "spoke" hospitals. This model consolidates scarce clinical expertise in one place, allowing a single team to cover dozens of beds across a region.`}
      />

      {/* Hub-and-Spoke vs Clinical Mesh */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Hub-and-Spoke vs. Other Models"
              description="Comparing structural architectures in telemedicine deployment."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Comparison of centralization models in critical care telemedicine."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why it Fits India */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Demographic Solution</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why It Fits India&apos;s Healthcare Needs</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  India faces an acute shortage of critical-care specialists, with most intensivists operating out of Tier-1 and Tier-2 metropolitan facilities. This leaves district, rural, and community health centers dangerously short of expertise.
                </p>
                <p>
                  A centralized hub-and-spoke program bridges this geographic divide. This mirrors successful national initiatives like the Ministry of Health&apos;s <strong className="font-normal text-ink">eSanjeevani</strong>, which has enabled over 318 million remote consultations. It turns a geographic shortage into a connected network solution.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Network className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h3 text-ink">30–50 Beds</h3>
                  <p className="mt-2 t-body text-ink">Monitored Per Intensivist</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Achieved by combining software telemetry and clinical staffing.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Designing a Hub-and-Spoke Programme */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Designing a Program"
              description="Core structural pillars required to deploy a hub and spoke critical care network."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <Item key={p.title} className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="t-h5 text-ink">{p.title}</h3>
                    <p className="mt-2 t-body text-muted">{p.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital Role */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-10 lg:grid-cols-12 lg:p-[60px]">
            <h3 className="t-h3 lg:col-span-5">Cloudspital&apos;s Implementation</h3>
            <div className="space-y-5 t-lead text-white/70 lg:col-span-6 lg:col-start-7">
              <p>
                Cloudspital acts as an end-to-end enablement partner. We manufacture and supply the complete spoke bedside packages, featuring our <strong className="font-normal text-white">Medsync III Tele ICU Kiosk</strong>, and configure the secure cloud-telemetry platform to link seamlessly with your chosen command center.
              </p>
              <p>
                Whether you are looking to build a new regional command center from scratch or connect rural spoke hospitals to an existing hub, our engineering team manages the complete deployment.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Plan a Hub-and-Spoke Deployment"
        description="Consult with our infrastructure team to design a customized hub-and-spoke critical care map."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
