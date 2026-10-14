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
import { TrendingDown, PiggyBank } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "setup-cost-india";
const PATH = "/tele-icu/setup-cost-india/";
const TITLE="Tele ICU Setup Cost in India: Price Drivers and Models";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Understand the setup costs, licensing fees, equipment requirements, and operating costs of deploying a Tele ICU network in India.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How much does a tele ICU cost in India?",
    a:"Setup costs vary widely depending on the hardware components, EMR integration depth, and staffing model. Typically, hospitals pay a one time capital setup fee plus an ongoing monthly subscription fee. Share your bed count and requirements and Cloudspital will prepare a custom package for your facility.",
  },
  {
    q:"Is tele ICU cheaper than a full on site ICU team?",
    a:"Yes. By sharing scarce specialist intensivists across multiple bedsides and sites remotely, the hospital avoids the massive overhead of hiring a full time, 24/7/365 in house clinical critical care team.",
  },
  {
    q:"Are there government procurement options?",
    a:"Yes. Cloudspital's Medsync III Tele ICU hardware and related services are listed on the Government e Marketplace (GeM) portal, allowing simplified procurement and tender processes for public and government hospitals.",
  },
];

const TABLE_HEADERS = ["Cost Component", "What it Covers"];
const TABLE_ROWS = [
  ["Hardware", "Patient monitors, PTZ cameras, two-way audio devices, and the bedside kiosk unit."],
  ["Software", "The core tele-ICU platform, data aggregation, real-time analytics, and EHR integration."],
  ["Connectivity", "Secure, high-bandwidth network links, routers, and redundant cellular failover setups."],
  ["Service", "Continuous monitoring and clinical second opinions provided by the remote intensivist team (if bundled)."],
  ["Training and Support", "Onboarding of bedside nurses, training local clinicians, system maintenance, and device calibrations."],
];

const QUOTE_CHECKS = [
  {
    title: "1. Scope of Inclusion",
    desc: "Confirm whether the quote covers only telemetry software licensing or includes bedside PTZ cameras, speakers, and IoT gateways.",
  },
  {
    title: "2. Pricing Structure",
    desc: "Verify if the fees are charged per-bed (better for small clinics) or flat per-site (better for large multi-bed wards).",
  },
  {
    title: "3. Connectivity Redundancy",
    desc: "Check if dual-cellular router setups, failover management, and software support packages are bundled into the agreement.",
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
          { name: "Setup Cost in India", path: PATH },
        ]}
      />

      <SpokeHero
        title="Tele ICU Setup Cost in India"
        description="A comprehensive overview of setup fees, subscription licensing, and equipment investments."
        definitionLabel="Pricing Summary"
        definition="The cost of a tele ICU deployment in India is driven by four primary components: bedside hardware, EMR software, network connectivity, and the monitoring team. Most hospitals pay a one time setup cost plus a recurring monthly subscription, rather than a single fixed capital expense."
      />

      {/* Cost Breakdown Table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What You Are Paying For"
              description="Breaking down capital and operational critical care investments."
            />
          </Reveal>
          <Reveal className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Main drivers of Tele ICU setup and operational expenses."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* Why it is a Subscription */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Financing Model</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why It&apos;s Structured as a Subscription</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  The clinical value of a tele-ICU lies in the continuous, 24/7/365 availability of remote specialists. Pricing is therefore structured as a hardware setup fee combined with an ongoing software-as-a-service (SaaS) and monitoring fee.
                </p>
                <p>
                  This model converts large capital expenditures (CapEx) into manageable operational expenditures (OpEx), making advanced critical care affordable for smaller regional and district clinics.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <PiggyBank className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h3 text-ink">OpEx Friendly</h3>
                  <p className="mt-2 t-body text-ink">Lower Initial Capital</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Allows district clinics to offer Tier 1 ICU care immediately.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How to Compare Quotes */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="How to Compare Quotes"
              description="Key parameters to evaluate when choosing a tele ICU partner."
            />
          </Reveal>

          <Stagger className="mt-12 border-t border-line lg:mt-16">
            {QUOTE_CHECKS.map((q) => (
              <Item key={q.title} className="grid gap-3 border-b border-line py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                <h3 className="t-h5 text-ink lg:col-span-5">{q.title}</h3>
                <p className="t-lead text-muted lg:col-span-6 lg:col-start-7">{q.desc}</p>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital Pricing Model */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-10 lg:grid-cols-12 lg:p-[60px]">
            <div className="flex flex-col gap-8 lg:col-span-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                <TrendingDown className="h-5 w-5" />
              </span>
              <h3 className="t-h3">Cloudspital&apos;s Medsync Configurations</h3>
            </div>
            <p className="t-lead text-white/80 lg:col-span-6 lg:col-start-7 lg:self-end">
              Cloudspital offers flexible, modular packages tailored to the size and needs of your medical facility — from standalone hardware to integrated command center telemetry systems. Share your bed count and we&apos;ll prepare a proposal built around your requirements.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Custom Quote"
        description="Provide your hospital's bed count and EMR requirements, and we will prepare a detailed pricing proposal."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
