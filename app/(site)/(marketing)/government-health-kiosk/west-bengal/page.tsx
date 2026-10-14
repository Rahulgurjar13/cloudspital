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
const SLUG = "west-bengal";
const PATH = "/government-health-kiosk/west-bengal/";
const TITLE="Health Kiosks and Tele ICU in West Bengal";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital's ABDM compliant health kiosks and Tele ICU networks support West Bengal's dense rural clinics and ease tertiary hospital loads.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does Cloudspital deploy in West Bengal?",
    a:"Yes. Cloudspital provides full delivery, installation, training, and custom support services across all districts in West Bengal, including Kolkata, Siliguri, and rural block clinics.",
  },
  {
    q:"How do West Bengal government departments procure kiosks?",
    a:"State health departments and municipal hospitals procure Cloudspital terminals directly through the Government e Marketplace (GeM) portal via direct purchase or e bidding.",
  },
  {
    q:"Are kiosks ABHA ready for West Bengal's ABDM rollout?",
    a:"Yes. They natively support 14 digit ABHA ID generation, verification, and consent based health data integration in alignment with West Bengal's ABDM framework.",
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
          { name: "West Bengal", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks and Tele ICU in West Bengal"
        description="Easing tertiary referral bottlenecks and expanding primary diagnostic access across rural blocks."
        definitionLabel="State Spotlight: West Bengal"
        definition="Cloudspital delivers CDSCO compliant, ABDM integrated Health ATM kiosks and Tele ICU networks across West Bengal. By placing automated screening nodes in local clinics, our systems help manage West Bengal's dense rural population, easing the patient load on overburdened tertiary hospitals in Kolkata."
      />

      {/* West Bengal's Public-Health Context */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Managing Dense Rural Populations</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  West Bengal features a high rural population density, which creates substantial referral loads at metropolitan tertiary healthcare centres. Patient lobbies in city hospitals are routinely overburdened by cases that could be resolved locally.
                </p>
                <p>
                  By equipping rural Primary Health Centres (PHCs) and community clinics with Health ATM terminals, patients can self-screen vitals locally. This enables quick remote physician triaging, keeping mild conditions managed locally and easing city hospital crowding.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <SectionLabel onDark>Referral Management</SectionLabel>
                <div>
                  <h3 className="t-h5">Easing Hospital Loads</h3>
                  <p className="mt-2 t-body text-white/70">
                    Screening at the block level triage patients, preventing unnecessary travel and clinical overhead at tertiary centres.
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
              title="Deployment Locations in West Bengal"
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

      {/* Cloudspital in West Bengal */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital&apos;s Presence in West Bengal</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital supports medical integrations across West Bengal. Our software platforms support custom HMIS APIs, allowing kiosk reports to sync automatically with local state hospital databases.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Deploy in West Bengal"
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
