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
const SLUG = "uttar-pradesh";
const PATH = "/government-health-kiosk/uttar-pradesh/";
const TITLE="Health Kiosks and Tele ICU in Uttar Pradesh";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital's ABDM compliant health kiosks support Uttar Pradesh's public health initiatives and feed the state's massive ABHA registry momentum.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does Cloudspital deploy in Uttar Pradesh?",
    a:"Yes. Cloudspital provides full delivery, installation, training, and customer support services across all districts in Uttar Pradesh, including Noida, Lucknow, and Gorakhpur.",
  },
  {
    q:"How do Uttar Pradesh government departments procure kiosks?",
    a:"State health departments and municipal hospitals procure Cloudspital terminals directly through the Government e Marketplace (GeM) portal via direct purchase or e bidding.",
  },
  {
    q:"Are kiosks ABHA ready for Uttar Pradesh's ABDM rollout?",
    a:"Yes. They natively support 14 digit ABHA ID generation, verification, and consent based health data integration in alignment with Uttar Pradesh's ABDM framework.",
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
          { name: "Uttar Pradesh", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks and Tele ICU in Uttar Pradesh"
        description="Supporting India's largest digital health registry, vital screening, and remote critical care."
        definitionLabel="State Spotlight: Uttar Pradesh"
        definition="Cloudspital delivers CDSCO compliant, ABDM integrated Health ATM kiosks and Tele ICU networks across Uttar Pradesh. Supporting local health missions, our kiosks natively generate and verify ABHA accounts, feeding UP's nation leading 14.3 crore ABHA registrations with high fidelity diagnostic data."
      />

      {/* Uttar Pradesh's Public-Health Context */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Uttar Pradesh&apos;s Digital Health Momentum</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Uttar Pradesh leads India in <strong className="font-normal text-ink">ABHA registrations with approximately 14.3 crore accounts</strong>. This massive volume drives the state&apos;s transition to a fully digital health registry under ABDM.
                </p>
                <p>
                  Health ATM kiosks act as grassroots physical nodes to feed this momentum. Placing automated screening terminals inside government hospitals and Ayushman Arogya Mandirs makes it easy for patients to verify their ABHA and attach routine vital statistics, preventing paper records from getting lost.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <SectionLabel onDark>National Leader</SectionLabel>
                <div>
                  <h3 className="t-h3">~14.3 Cr</h3>
                  <p className="mt-1 t-body text-white">ABHA registrations in UP</p>
                  <p className="mt-4 border-t border-white/20 pt-4 t-small text-white/70">
                    Building India&apos;s largest longitudinal digital electronic health registry.
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
              title="Deployment Locations in Uttar Pradesh"
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

      {/* Cloudspital in Uttar Pradesh */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital&apos;s Presence in Uttar Pradesh</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital has reference deployments in several locations in Uttar Pradesh, including Noida and Greater Noida. Our engineering teams manage complete field installations, device calibration audits, and continuous local training support across the state.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy in Uttar Pradesh"
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
