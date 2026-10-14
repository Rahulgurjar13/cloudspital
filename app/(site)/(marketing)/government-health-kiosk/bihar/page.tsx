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
const SLUG = "bihar";
const PATH = "/government-health-kiosk/bihar/";
const TITLE="Health Kiosks and Tele ICU in Bihar";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital's ABDM compliant health kiosks and Tele ICU solutions support Bihar's public hospitals and pioneering Scan and Share OPD flows.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does Cloudspital deploy in Bihar?",
    a:"Yes. Cloudspital provides full delivery, installation, device calibration, and on site support across all districts in Bihar.",
  },
  {
    q:"How do Bihar government hospitals procure kiosks?",
    a:"State health departments and public hospitals procure Cloudspital terminals directly through the Government e Marketplace (GeM) portal via direct purchase or e bidding.",
  },
  {
    q:"Are kiosks ABHA ready for Bihar's ABDM rollout?",
    a:"Yes. They natively support 14 digit ABHA ID generation, verification, and consent based health data integration in alignment with Bihar's ABDM framework.",
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
          { name: "Bihar", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks and Tele ICU in Bihar"
        description="Pioneering digital health integration, Scan and Share OPD registration, and remote critical care."
        definitionLabel="State Spotlight: Bihar"
        definition="Cloudspital delivers CDSCO compliant, ABDM integrated Health ATM kiosks and Tele ICU networks across Bihar. Supporting local health missions, our kiosks align with Bihar's pioneering Scan and Share digital OPD registration, streamlining patient intake and linking diagnostics directly to ABHA records."
      />

      {/* Bihar's Public-Health Context */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Bihar&apos;s Public Health and Digital Context</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Bihar has been a pioneer in deploying the <strong className="font-normal text-ink">ABDM Scan and Share digital OPD flow</strong>, allowing patients to scan hospital QR codes to instantly share demographic data and skip long queues.
                </p>
                <p>
                  Furthermore, with the proximity of premier institutions like <strong className="font-normal text-ink">AIIMS-Patna</strong>, the state is expanding its hub-and-spoke critical care networks. Placing Tele ICU and Tele-PICU nodes at regional district clinics enables direct connection to AIIMS specialists, bridging vital medical shortages.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <SectionLabel onDark>Pioneering State</SectionLabel>
                <div>
                  <h3 className="t-h5">Scan and Share OPD</h3>
                  <p className="mt-2 t-body text-white/70">
                    Bihar&apos;s hospitals have widely adopted QR-code digital patient registration, an infrastructure that Cloudspital Health ATMs natively support.
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
              title="Deployment Locations in Bihar"
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

      {/* Cloudspital in Bihar */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital&apos;s Presence in Bihar</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                As a home-turf manufacturer, Cloudspital has active deployments across multiple districts in Bihar. Our local service and technical support headquarters in Patna guarantee rapid maintenance, device calibrations, and continuous clinical support.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy in Bihar"
        description="Connect with our Patna projects division to schedule a site review or request tender specifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
