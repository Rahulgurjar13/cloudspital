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
const SLUG = "uttarakhand";
const PATH = "/government-health-kiosk/uttarakhand/";
const TITLE="Health Kiosks and Tele ICU in Uttarakhand";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital's ABDM compliant health kiosks and Tele ICU networks overcome hill and rural access challenges in Uttarakhand's remote districts.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does Cloudspital deploy in Uttarakhand?",
    a:"Yes. Cloudspital provides full delivery, installation, training, and custom support services across all districts in Uttarakhand, including Dehradun, Haridwar, and remote hill districts.",
  },
  {
    q:"How do Uttarakhand government departments procure kiosks?",
    a:"State health departments and municipal hospitals procure Cloudspital terminals directly through the Government e Marketplace (GeM) portal via direct purchase or e bidding.",
  },
  {
    q:"Are kiosks ABHA ready for Uttarakhand's ABDM rollout?",
    a:"Yes. They natively support 14 digit ABHA ID generation, verification, and consent based health data integration in alignment with Uttarakhand's ABDM framework.",
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
          { name: "Uttarakhand", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks and Tele ICU in Uttarakhand"
        description="Overcoming rugged terrain and hill access challenges with portable telemedicine and remote critical care."
        definitionLabel="State Spotlight: Uttarakhand"
        definition="Cloudspital delivers CDSCO compliant, ABDM integrated Health ATM kiosks and Tele ICU networks across Uttarakhand. Designed to overcome hill and rural access challenges, our rugged kiosks and continuous telemetry platforms connect remote mountain district clinics to urban critical care hubs."
      />

      {/* Uttarakhand's Public-Health Context */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Overcoming Mountain Terrain Access Challenges</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Uttarakhand&apos;s rugged mountain terrain presents unique healthcare delivery challenges. Remote hill districts often face road connectivity cuts, and patient transport to tertiary hospitals in Dehradun is long and risky.
                </p>
                <p>
                  Deploying Tele ICU networks and portable health kiosks directly inside remote sub-centres and district hospitals bridges this physical gap. Our systems are optimized for low-bandwidth cellular environments, ensuring clinical telemetry continues even in remote valleys.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <SectionLabel onDark>Terrain Optimized</SectionLabel>
                <div>
                  <h3 className="t-h5">Hill Telemedicine</h3>
                  <p className="mt-2 t-body text-white/70">
                    Ruggedized casing, dust filters, and cellular dual-SIM failovers make Cloudspital hardware ideal for high-altitude Himalayan clinic setups.
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
              title="Deployment Locations in Uttarakhand"
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

      {/* Cloudspital in Uttarakhand */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital&apos;s Presence in Uttarakhand</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital offers deployment capability across Uttarakhand. We configure specialized, lightweight telemedicine bags and robust, low-maintenance kiosk terminals to meet the specific access needs of mountain communities.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy in Uttarakhand"
        description="Connect with our state projects division to schedule a site review or request tender specifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
