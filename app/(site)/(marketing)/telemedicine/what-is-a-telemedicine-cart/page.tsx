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
import { Activity, Award, Check, Info, Monitor, Heart, ShieldCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "what-is-a-telemedicine-cart";
const PATH = "/telemedicine/what-is-a-telemedicine-cart/";
const TITLE="What Is a Telemedicine Cart? Uses and Components";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn what a telemedicine cart is, its typical clinical components (vital monitors, cameras, stethoscopes), and how hospitals utilize it.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is a telemedicine cart used for?",
    a:"It lets a remote specialist doctor examine, monitor, and treat a patient in real time using high definition video and connected clinical diagnostic devices.",
  },
  {
    q:"What is the difference between a telemedicine cart and a health kiosk?",
    a:"A telemedicine cart is clinician operated and highly mobile (wheeled between wards or carried to camps). A health kiosk is a fixed, self service station where patients screen themselves.",
  },
  {
    q:"Does it need a stable internet connection?",
    a:"Yes. Stable connectivity (broadband or cellular router failover) is essential to transmit video feeds and continuous vital streams without interruption.",
  },
];

const COMPONENTS = [
  {
    icon: Monitor,
    title: "Video and Audio Systems",
    desc: "High-definition display screen, tiltable examination camera, and sensitive omni-directional microphones for seamless teleconsultation.",
  },
  {
    icon: Heart,
    title: "Connected Examination Devices",
    desc: "Digital stethoscopes to transmit heart/lung sounds, multi-lead ECG modules, BP cuffs, SpO₂ sensors, and digital otoscopes.",
  },
  {
    icon: ShieldCheck,
    title: "Diagnostic Software and EHR",
    desc: "Secure software gateways that sync vital signs, logs, and notes directly to the hospital EMR system and national ABHA records.",
  },
  {
    icon: Info,
    title: "Mobility and Power Pack",
    desc: "Locking medical wheels for easy transport across hospital wards, combined with on-board battery backups for uninterrupted runtime.",
  },
];

const SETTINGS = [
  { label: "Hospital Wards:", text: "Connecting patients with off site consultants across departments." },
  { label: "Primary Health Centres (PHCs):", text: "Extending specialist reach directly to rural communities." },
  { label: "Outreach and Camps:", text: "Providing portable clinical testing terminals in disaster or field settings." },
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
          { name: "What is a Telemedicine Cart", path: PATH },
        ]}
      />

      <SpokeHero
        title="What is a Telemedicine Cart?"
        description="A mobile, device integrated clinical terminal bringing remote specialist expertise directly to the patient's bedside."
        definitionLabel="Cart Overview"
        definition="A telemedicine cart is a mobile, wheeled station that combines a video consultation screen with integrated medical devices, like a digital stethoscope, ECG, BP monitor, and examination camera. It allows a remote doctor to examine and treat patients at the bedside or in remote clinics."
      />

      {/* What is Typically Inside */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What's Typically Inside?"
              description="Core modular components integrated within a professional cart."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {COMPONENTS.map((c, i) => (
              <Item key={c.title} className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h6 text-ink">{c.title}</h3>
                  <p className="mt-2 t-body text-muted">{c.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Where Telemedicine Carts are Used */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Clinical Settings</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Where Telemedicine Carts Fit</h2>
              <p className="mt-8 t-lead text-muted">
                Telemedicine carts are deployed across diverse clinical environments:
              </p>
              <ul className="mt-8 border-t border-line">
                {SETTINGS.map((s) => (
                  <li key={s.label} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-muted">
                      <strong className="font-normal text-ink">{s.label}</strong> {s.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-canvas p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Medsync Cart Series</h3>
                  <p className="mt-2 t-body text-muted">
                    Cloudspital&apos;s Medsync series (Models I to VI) provides pre-configured, medical-grade mobile carts certified to international standards.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it Differs from a Plain Video Call */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Advanced Capabilities</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">More than a Video Call</h2>
              <p className="mt-8 t-lead text-muted">
                A standard video call only shares audio and video. A telemedicine cart transmits <strong className="font-normal text-ink">real-time clinical diagnostics</strong>, including heartbeat sounds, oxygen levels, and multi-lead ECG waveforms. This allows the remote doctor to make an informed, data-driven diagnostic decision, just like an in-person exam.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Real Time Streams</h3>
                  <p className="mt-2 t-body text-white/70">
                    Clinicians off-site receive diagnostic-quality signals for immediate physiological assessments.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Custom Cart Proposal"
        description="Consult with our telemedicine experts to customize a wheeled clinical terminal for your wards."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
