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
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Radio, Shield, Settings, AlertTriangle, MonitorPlay, FileClock, Check } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "how-tele-icu-works";
const PATH = "/tele-icu/how-tele-icu-works/";
const TITLE="How Does a Tele ICU Work? Step by Step Process";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how tele ICU systems stream live patient vitals, run early warning AI analytics, alert remote intensivists, and enable 24/7 bedside support.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does tele ICU work without fast internet?",
    a:"It requires stable, secure bandwidth; connectivity is the main dependency. Cloudspital's software optimizes video compression and prioritizes critical telemetry packages, allowing high reliability even on standard broadband or dual network redundancy lines.",
  },
  {
    q:"How quickly can a remote team respond?",
    a:"Alerts are real time; response is continuous, 24/7. When a patient's vital threshold is breached, the remote intensivist team is notified immediately and can initiate a video call in under 60 seconds.",
  },
  {
    q:"Who is in the remote command centre?",
    a:"Licensed intensivists (critical care physicians) and highly trained critical care nurses who monitor multiple spoke bedsides simultaneously.",
  },
];

const STEPS = [
  {
    title:"1. Capture Vitals",
    desc:"Bedside monitors, ventilators, and infusion pumps record live vitals (heart rate, blood pressure, SpO₂, and more).",
    icon: Radio,
  },
  {
    title:"2. Secure Transmission",
    desc:"Physiological telemetry data and HD camera/audio feeds travel over a secure, high bandwidth network to a remote command centre.",
    icon: Shield,
  },
  {
    title:"3. Intelligent Analysis",
    desc:"Tele ICU software aggregates incoming vitals streams and runs early warning/AI analytics to flag clinical risks.",
    icon: Settings,
  },
  {
    title:"4. Instant Alerting",
    desc:"When physiological thresholds trip, the system immediately flags the anomaly and alerts the remote intensivist team.",
    icon: AlertTriangle,
  },
  {
    title:"5. Clinical Intervention",
    desc:"Specialists review the telemetry, speak with local bedside staff (and the patient) via HD video, and guide treatment.",
    icon: MonitorPlay,
  },
  {
    title:"6. EHR Documentation",
    desc:"All remote clinical notes, recommendations, and actions sync automatically to the patient record for continuity and audit.",
    icon: FileClock,
  },
];

const ENABLERS = [
  {
    title: "Continuous Monitoring:",
    desc: "Capturing data continuously (rather than periodically) ensures physiological deterioration is detected the moment it begins.",
  },
  {
    title: "Pan Tilt Zoom (PTZ) Cameras:",
    desc: "High-definition video control allows remote physicians to inspect pupils, examine ventilator settings, and assess the clinical environment in fine detail.",
  },
  {
    title: "Automated Analytics:",
    desc: "Intelligent algorithms filter out alarm noise and raw signals into prioritized, actionable alerts, letting command centers focus on critical patients.",
  },
];

const MEDSYNC_FEATURES = [
  "Multi para monitor integration",
  "PTZ camera controls",
  "Dual SIM failover module",
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
          { name: "How Tele-ICU Works", path: PATH },
        ]}
      />

      <SpokeHero
        title="How Does a Tele ICU Work?"
        description="A step by step breakdown of real time clinical monitoring and remote specialist collaboration."
        definitionLabel="How It Works In Short"
        definition="A tele ICU continuously streams patient vitals and video feeds from local hospital bedsides to a centralized intensivist team. Integrated software monitors the data, applies early warning AI analytics, and instantly alerts remote specialists who guide bedside clinicians in real time, 24/7/365."
      />

      {/* Step-by-Step Workflow */}
      <section className="mt-20 bg-primary py-20 text-white lg:mt-[120px] lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              onDark
              title="The Tele ICU Workflow"
              description="Connecting bedside monitoring with remote specialist intervention in six key steps."
            />
          </Reveal>

          <Stagger className="mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <Item key={s.title} className="flex min-h-[260px] flex-col gap-10 border-b border-r border-white/25 p-6 sm:p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-white text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-auto">
                    <h3 className="t-h5 text-white">{s.title}</h3>
                    <p className="mt-2 t-body text-white/75">{s.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Real-time Enablers */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel>Core Architecture</SectionLabel>
                <h2 className="mt-6 t-h2 text-ink">What Makes It Work in Real Time?</h2>
              </Reveal>
              <Stagger className="mt-10 border-t border-line lg:mt-12">
                {ENABLERS.map((e, i) => (
                  <Item key={e.title} className="flex gap-6 border-b border-line py-8">
                    <NumberPill n={i + 1} />
                    <p className="flex-1 t-lead text-muted">
                      <strong className="font-normal text-ink">{e.title}</strong> {e.desc}
                    </p>
                  </Item>
                ))}
              </Stagger>
            </div>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="rounded-[20px] bg-white p-6 sm:p-8">
                <h3 className="t-h5 text-ink">Cloudspital Medsync III</h3>
                <p className="mt-3 t-body text-muted">
                  Our Medsync-III Tele-ICU Kiosk consolidates capture, transmission, and software into a single certified clinical deployment unit:
                </p>
                <ul className="mt-6 border-t border-line">
                  {MEDSYNC_FEATURES.map((f) => (
                    <li key={f} className="flex gap-4 border-b border-line py-4">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="t-body text-ink">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Live System Demo"
        description="Connect with our team to schedule a video demonstration of Cloudspital's real-time Tele-ICU monitoring."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
