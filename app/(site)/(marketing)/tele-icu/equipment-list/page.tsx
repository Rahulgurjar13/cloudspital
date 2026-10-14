import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, NumberPill, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Laptop, Activity } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "equipment-list";
const PATH = "/tele-icu/equipment-list/";
const TITLE="Tele ICU Equipment List: Hardware and Software Checklist";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Check the complete equipment list needed to set up a Tele ICU, including bedside monitors, PTZ cameras, EMR software, and command center hubs.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is the minimum equipment to start a tele ICU?",
    a:"At the spoke bedside, the bare minimum includes a multi para patient monitor, a high definition PTZ camera, a high fidelity two way speakerphone, a secure IoT transmission gateway, and a stable internet connection.",
  },
  {
    q:"Does the patient hospital need a command centre?",
    a:"No. The command center sits at the central 'hub' location. The local 'spoke' hospital only needs bedside monitoring and communication hardware.",
  },
  {
    q:"Can existing ICU monitors be integrated?",
    a:"Often yes. Cloudspital's Medsync III kiosk includes a clinical IoT gateway that supports standard HL7 protocol or serial output from major monitor brands, enabling integration of existing hospital hardware.",
  },
];

const CHECKLIST_HEADERS = ["Category", "Key Components"];
const CHECKLIST_ROWS = [
  ["Bedside Data", "Multi-para patient monitors, ventilators, and infusion pump telemetry outputs."],
  ["Audio-Video", "High-definition PTZ (Pan-Tilt-Zoom) cameras, medical-grade microphones, and speakers."],
  ["Software", "Tele-ICU streaming platform, vital aggregation engines, early-warning AI alerts, and EHR/EMR syncing."],
  ["Connectivity", "Secure, high-bandwidth routers, firewall appliances, and redundant cellular failover lines."],
  ["Command Centre", "Dual- or quad-screen intensivist workstations, communication headsets, and command dashboards."],
];

const TOPOLOGY = [
  {
    key: "S",
    title: "Spoke (The Patient Hospital):",
    desc: "Focused on capturing and transmitting clinical data. Includes bedside monitors, interactive PTZ video cameras, audio peripherals, and the cellular IoT gateway terminal.",
  },
  {
    key: "H",
    title: "Hub (The Remote Specialists):",
    desc: "Focused on visualizing and analyzing incoming telemetry. Includes multi-display command center workstations, clinical review consoles, and communication tools.",
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
          { name: "Equipment List", path: PATH },
        ]}
      />

      <SpokeHero
        title="Tele ICU Equipment List"
        description="A complete hardware checklist and deployment guide for spoke bedsides and hub command centers."
        definitionLabel="Equipment Summary"
        definition="A functional tele ICU setup requires five core elements: bedside multi para physiological monitors, interactive high definition audio video hardware, a secure clinical telemetry platform, stable redundant network connectivity, and a multi display remote command center workstation."
      />

      {/* Full Equipment Checklist */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="The Full Checklist"
              description="Core architectural hardware and software categories."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Essential hardware and software checklist for Tele ICU installations."
              headers={CHECKLIST_HEADERS}
              rows={CHECKLIST_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Spoke-side vs. Hub-side */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel>Site Topology</SectionLabel>
                <h2 className="mt-6 t-h2 text-ink">Spoke-Side vs. Hub-Side</h2>
              </Reveal>
              <Stagger className="mt-10 border-t border-line lg:mt-12">
                {TOPOLOGY.map((t) => (
                  <Item key={t.key} className="flex gap-6 border-b border-line py-8">
                    <NumberPill n={t.key} />
                    <p className="flex-1 t-lead text-muted">
                      <strong className="font-normal text-ink">{t.title}</strong> {t.desc}
                    </p>
                  </Item>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Laptop className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Pre Configured Hub</h3>
                  <p className="mt-2 t-body text-white/70">
                    Cloudspital sets up customized hub dashboards, providing your clinical team with clean visual arrays of up to 40 patient beds simultaneously.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How Cloudspital Packages This */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-10 rounded-[20px] bg-white p-6 sm:p-10 lg:grid-cols-12 lg:p-[60px]">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                <Activity className="h-5 w-5" />
              </span>
              <h3 className="t-h3 text-ink">How Cloudspital Packages the Spoke</h3>
            </div>
            <div className="space-y-5 t-lead text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
              <p>
                To simplify deployment, we package all spoke requirements into our <strong className="font-normal text-ink">Medsync III Tele ICU Kiosk</strong>. This medical-grade cart integrates high-definition motorized PTZ cameras, specialized omni-directional speakerphones, dual-network cellular fallback routers, and our clinical IoT gateway.
              </p>
              <p>
                The Medsync-III interface connects directly with existing ward monitors via serial or USB, automatically decoding vitals feeds for secure cloud streaming.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request the Hardware Specifications"
        description="Connect with our product team to download the complete datasheet for the Medsync-III Tele-ICU Kiosk."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
