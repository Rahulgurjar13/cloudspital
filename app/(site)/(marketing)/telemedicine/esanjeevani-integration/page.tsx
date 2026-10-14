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
import { MonitorPlay, Link2, Users, Workflow } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "esanjeevani-integration";
const PATH = "/telemedicine/esanjeevani-integration/";
const TITLE="eSanjeevani Integration for Telemedicine Devices";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how eSanjeevani integration works for telemedicine kiosks and carts, linking local screenings with India's national teleconsultation workflow.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is eSanjeevani?",
    a:"eSanjeevani is the national teleconsultation service created by the Ministry of Health and Family Welfare (MoHFW), Government of India, to provide patients with online access to certified doctors and specialists.",
  },
  {
    q:"Does a health kiosk or cart need to integrate with eSanjeevani?",
    a:"For government and public health deployments, it is a significant advantage. Integrating with eSanjeevani ensures local screenings and diagnostic feeds align directly with national teleconsultation workflows.",
  },
  {
    q:"Who provides medical consults on eSanjeevani?",
    a:"Only registered medical practitioners who have been vetted, approved, and onboarded by State Nodal Officers can provide consultations through the platform.",
  },
];

const STEPS = [
  {
    icon: MonitorPlay,
    title: "1. Workflow Alignment",
    desc: "Structuring the local device software to match eSanjeevani's patient-to-doctor call flows and queues.",
  },
  {
    icon: Link2,
    title: "2. ABHA Data Linkage",
    desc: "Linking patient diagnostics with their 14-digit ABHA IDs to ensure summaries automatically update national records.",
  },
  {
    icon: Users,
    title: "3. Practitioner Onboarding",
    desc: "Ensuring consulting doctors are verified and active within the state Nodal Officer registry.",
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
          { name: "eSanjeevani Integration", path: PATH },
        ]}
      />

      <SpokeHero
        title="eSanjeevani Integration"
        description="Aligning smart diagnostic terminals with India's flagship national teleconsultation service."
        definitionLabel="eSanjeevani Overview"
        definition="eSanjeevani is the Government of India's flagship national teleconsultation service, connecting patients, often at Ayushman Arogya Mandirs, with doctors and specialists. For a health kiosk or telemedicine cart, eSanjeevani ready means it can work within this national workflow, so screenings at the edge link to government teleconsultations and records."
      />

      {/* Why eSanjeevani Matters */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Why eSanjeevani is Vital for Public Health</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  eSanjeevani has delivered over <strong className="font-normal text-ink">31.8 crore consultations</strong>, establishing itself as one of the largest national telemedicine systems globally.
                </p>
                <p>
                  The service runs primarily on a provider-assisted model at primary health sub-centres and Ayushman Arogya Mandirs. Local health workers assist patients in consulting off-site doctors, a workflow that is optimized when paired with telemedicine carts or diagnostic kiosks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[200px] flex-col justify-between rounded-[20px] bg-mist p-6 sm:p-8 lg:min-h-[280px]">
                <span className="t-label text-muted">National Scale</span>
                <div>
                  <h3 className="t-h3 text-ink">31.8 Cr+</h3>
                  <p className="mt-2 t-small text-muted">Teleconsultations Completed</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What Integration Involves */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What Integration Involves"
              description="Core development requirements to align devices with the national system."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {STEPS.map((s) => (
              <Item key={s.title} className="flex flex-col justify-between gap-10 sm:min-h-[260px] rounded-[20px] bg-canvas p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">{s.title}</h3>
                  <p className="mt-2 t-body text-muted">{s.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital Capability */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Compatibility</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Cloudspital and eSanjeevani</h2>
              <p className="mt-8 t-lead text-muted">
                Cloudspital&apos;s telemedicine platforms are built to align with national digital workflows. We provide custom software configurations to support eSanjeevani compatibility, helping state and municipal clinics connect their edge diagnostic terminals directly with national consultation registries.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Workflow className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Seamless Linkage</h3>
                  <p className="mt-2 t-body text-white/70">
                    Edge diagnostics automatically flow into the consulting doctor&apos;s active panel, reducing manual entry.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy eSanjeevani Ready Hardware"
        description="Consult with our software integration engineers to align your diagnostic terminals with the national teleconsultation system."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
