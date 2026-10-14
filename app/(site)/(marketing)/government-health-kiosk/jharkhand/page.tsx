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
import { MapPin, CheckCircle, ShieldCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "jharkhand";
const PATH = "/government-health-kiosk/jharkhand/";
const TITLE="Health Kiosks and Tele ICU in Jharkhand";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital's ABDM compliant health kiosks and Tele ICU solutions bridge district hospital critical care gaps in Jharkhand.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does Cloudspital deploy in Jharkhand?",
    a:"Yes. Cloudspital provides full delivery, installation, training, and customer support services across all districts in Jharkhand, including Ranchi, Jamshedpur, and Dhanbad.",
  },
  {
    q:"How do Jharkhand government departments procure kiosks?",
    a:"State health departments and municipal hospitals procure Cloudspital terminals directly through the Government e Marketplace (GeM) portal via direct purchase or e bidding.",
  },
  {
    q:"Are kiosks ABHA ready for Jharkhand's ABDM rollout?",
    a:"Yes. They natively support 14 digit ABHA ID generation, verification, and consent based health data integration in alignment with Jharkhand's ABDM framework.",
  },
];

const LOCATIONS = [
  {
    icon: MapPin,
    title: "Government Hospitals",
    desc: "Placed at OPD entrances to screen patient vitals and automate digital intake queues.",
  },
  {
    icon: CheckCircle,
    title: "Primary Health Centres",
    desc: "Provides rural blocks with metabolic and vital parameters checkups on the spot.",
  },
  {
    icon: ShieldCheck,
    title: "Ayushman Arogya Mandirs",
    desc: "Enables community-level preventive screening and links diagnostics directly to ABHA.",
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
          { name: "Government Kiosk Hub", path: "/government-health-kiosk/" },
          { name: "Jharkhand", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks and Tele ICU in Jharkhand"
        description="Bridging critical care gaps in district hospitals, vital screening, and primary diagnostics."
        definitionLabel="State Spotlight: Jharkhand"
        definition="Cloudspital delivers CDSCO compliant, ABDM integrated Health ATM kiosks and Tele ICU networks across Jharkhand. Supporting state public health goals, our systems directly target district hospital critical care gaps, providing 24/7 remote intensivist monitoring and community NCD screening."
      />

      {/* Jharkhand's Public-Health Context */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Addressing District Hospital Gaps</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Jharkhand&apos;s public health network faces critical-care gaps in secondary district and sub-district hospitals, where advanced intensivists and critical care infrastructure are severely limited.
                </p>
                <p>
                  Deploying Tele ICU nodes directly at district bedsides enables real-time vitals streaming to central expert hubs. This provides round-the-clock clinical oversight and guided interventions, stabilizing critical cases without high-risk transfers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <SectionLabel onDark>Clinical Need</SectionLabel>
                <div>
                  <h3 className="t-h5">Tele ICU Relevance</h3>
                  <p className="mt-2 t-body text-white/70">
                    Continuous physiological telemetry helps Jharkhand&apos;s district clinics offer high-fidelity ICU oversight, bridging critical care shortages.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Where Kiosks/Tele-ICU Fit */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Deployment Locations in Jharkhand"
              description="Expanding medical access across all tiers of state healthcare."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {LOCATIONS.map((l, i) => (
              <Item key={l.title} className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <l.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h5 text-ink">{l.title}</h3>
                  <p className="mt-2 t-body text-muted">{l.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital in Jharkhand */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital&apos;s Presence in Jharkhand</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital offers complete deployment capabilities across Jharkhand. We configure and supply certified Health ATM kiosks, Tele ICU hardware, and cloud-based telemetry platforms to meet the specific requirements of the state&apos;s public healthcare infrastructure.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy in Jharkhand"
        description="Connect with our regional projects division to schedule a site review or request tender specifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
