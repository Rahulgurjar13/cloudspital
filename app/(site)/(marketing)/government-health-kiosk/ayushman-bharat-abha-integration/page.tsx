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
import { UserPlus, Link2, Share2, QrCode, ShieldCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "ayushman-bharat-abha-integration";
const PATH = "/government-health-kiosk/ayushman-bharat-abha-integration/";
const TITLE="ABHA Integration for Health Kiosks (Ayushman Bharat)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how ABHA integrated health kiosks link diagnostic screenings with India's Ayushman Bharat Digital Mission (ABDM) electronic health records.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is ABHA?",
    a:"ABHA (Ayushman Bharat Health Account) is a unique 14 digit digital health ID. It allows citizens to securely store, organize, and share their medical diagnostic reports and history with authorized healthcare providers, based on explicit consent.",
  },
  {
    q:"Does a government health kiosk need ABHA integration?",
    a:"Yes. As ABDM becomes the national framework for medical record exchange, public sector tenders increasingly mandate ABHA integration to ensure screening data is saved directly to citizens' digital health profiles.",
  },
  {
    q:"Is ABHA the same as Ayushman Bharat insurance (PM JAY)?",
    a:"No. ABHA is a longitudinal digital health identification card and EMR link, whereas PM JAY is the government funded health insurance scheme offering cashless tertiary care. Both sit under the Ayushman Bharat umbrella.",
  },
];

const FEATURES = [
  {
    title:"1. Create and Verify ABHA",
    desc:"Generate a new 14 digit ABHA ID or verify an existing account directly at the kiosk interface via Aadhaar OTP or mobile matching.",
    icon: UserPlus,
  },
  {
    title:"2. Consent Based Linking",
    desc:"Diagnostic vitals and parameters captured by the kiosk's medical devices attach automatically to the patient's ABHA record with consent.",
    icon: Link2,
  },
  {
    title:"3. Interoperable Records",
    desc:"Kiosk reports enter India's wider ABDM registry, making them instantly accessible to any authorized doctor or hospital nationwide.",
    icon: Share2,
  },
  {
    title:"4. Scan and Share OPD Flow",
    desc:"Allows patients to scan the hospital's QR code via their ABHA app, sharing demographic data to skip long OPD registration queues.",
    icon: QrCode,
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
          { name: "ABHA Integration", path: PATH },
        ]}
      />

      <SpokeHero
        title="ABHA Integration for Health Kiosks"
        description="Linking grassroots diagnostic screening terminals to India's national digital health infrastructure."
        definitionLabel="ABHA Integration Summary"
        definition="An ABHA integrated health kiosk links diagnostic screening results directly to India's Ayushman Bharat Digital Mission (ABDM). It allows patients to create or verify their 14 digit ABHA ID via Aadhaar or mobile, pushing vital measurements instantly into a secure, consent based digital health history."
      />

      {/* Why ABHA Matters */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Why ABHA Matters for Public Health</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  With ABDM crossing <strong className="font-normal text-ink">90 crore ABHA accounts</strong>, the digital health ID card has become the central pillar of India&apos;s modernized healthcare system.
                </p>
                <p>
                  Government buyers expect primary health equipment to be ABDM-ready. By feeding screenings at PHCs and Ayushman Arogya Mandirs directly into national health records, ABHA integration prevents diagnostic data from disappearing on paper, accelerates OPD registration, and reduces patient duplication.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <SectionLabel>ABDM Momentum</SectionLabel>
                <div>
                  <h3 className="t-h3 text-ink">90 Crore+</h3>
                  <p className="mt-1 t-body text-ink">ABHA Accounts Created</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Building an interoperable, unified national digital health record system.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ABHA in Practice */}
      <section className="bg-primary py-20 text-white lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              onDark
              title="How It Works in Practice"
              description="Seamless interaction steps built into Cloudspital terminals."
            />
          </Reveal>

          <Stagger className="mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Item key={f.title} className="flex min-h-[280px] flex-col gap-10 border-b border-r border-white/25 p-6 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-auto">
                    <h3 className="t-h5 text-white">{f.title}</h3>
                    <p className="mt-2 t-body text-white/75">{f.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital Capability */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Product Integration</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Cloudspital&apos;s Native ABHA Capabilities</h2>
              <p className="mt-8 t-lead text-muted">
                Cloudspital&apos;s Health ATMs are built with native integration protocols. We configure our software to interface directly with NHA-certified ABDM APIs, supporting sandboxed testing and live production registries depending on regional deployment parameters.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">ABDM Sandbox Certified</h3>
                  <p className="mt-2 t-body text-white/70">
                    Designed to comply with NHA security standards, encrypting all vital data transfers under consent-manager blocks.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Integrate ABHA at Your Facility"
        description="Consult with our digital health engineers to configure ABDM-compliant Health ATMs for your public wards."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
