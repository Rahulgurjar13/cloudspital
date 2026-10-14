import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, NumberPill, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { AlertTriangle, ShieldCheck, HeartHandshake, Eye, GraduationCap, Check, Signal } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "for-rural-hospitals";
const PATH = "/tele-icu/for-rural-hospitals/";
const TITLE="Tele ICU for Rural and District Hospitals in India";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Tele ICU supports rural and district hospitals, addressing the intensivist shortage, reducing transfers, and upskilling local staff.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a small rural hospital really run a tele ICU?",
    a:"Yes. The model is specifically designed for resource constrained settings. Since the heavy clinical expertise is located remotely in a central command center, the local rural hospital only needs bedside telemedicine terminals and stable connectivity.",
  },
  {
    q:"Does tele ICU reduce patient transfers?",
    a:"Yes. By providing local clinical teams with 24/7 intensivist guidance, many critically ill patients can be safely managed locally, preventing high risk, expensive transfers over long distances.",
  },
  {
    q:"What if our internet is unreliable?",
    a:"Stable connectivity is essential, but Cloudspital's Medsync kiosks support redundant dual SIM 4G/5G failover and bandwidth optimized video codecs to ensure telemetry continues even during brief connectivity drops.",
  },
];

const ADVANTAGES = [
  {
    title:"24/7 Specialist Oversight",
    desc:"Provides continuous access to expert intensivists without requiring them to relocate to rural areas.",
    icon: Eye,
  },
  {
    title:"Real Time Emergency Guidance",
    desc:"Instant guidance on ventilation, sepsis management, hemodynamic stabilization, and cardiac emergencies.",
    icon: ShieldCheck,
  },
  {
    title:"Fewer High Risk Transfers",
    desc:"Keeps patients closer to their families by allowing safe, local critical care management.",
    icon: HeartHandshake,
  },
  {
    title:"Upskilled Bedside Staff",
    desc:"Local nurses and doctors gain clinical confidence and skills by working alongside remote specialists.",
    icon: GraduationCap,
  },
];

const REQUIREMENTS = [
  "Stable connectivity (minimum broadband or 4G LTE/5G SIM coverage)",
  "Standard bedside multi para patient monitors",
  "High definition video and speaker hardware for remote consultation",
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
          { name: "Tele-ICU for Rural Hospitals", path: PATH },
        ]}
      />

      <SpokeHero
        title="Tele ICU for Rural Hospitals"
        description="Bridging the urban rural critical care divide with real time intensivist support."
        definitionLabel="Executive Summary"
        definition="Tele ICU enables rural and district hospitals to provide specialized, round the clock critical care. By connecting bedside teams with remote intensivists, the system guides critical treatments like ventilation and sepsis management, reducing avoidable patient transfers and saving lives."
      />

      {/* The Rural Critical-Care Gap */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">The Rural Critical-Care Gap</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  India has approximately <strong className="font-normal text-ink">2.3 ICU beds per 100,000 people</strong>, and the vast majority of critical-care specialists reside in Tier-1 major cities.
                </p>
                <p>
                  Community Health Centres (CHCs) face a <strong className="font-normal text-ink">specialist shortfall approaching 80%</strong>. For a rural or district hospital, hiring a full-time, on-site intensivist is virtually impossible. As a result, critically ill patients are forced to travel long distances, losing vital time during life-threatening emergencies.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="t-small uppercase text-muted">Key Statistic</p>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h2 text-ink">~80%</h3>
                  <p className="mt-2 t-h6 text-ink">Specialist Shortfall at CHCs</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Source: Indian Journal of Critical Care Medicine.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How Tele-ICU Changes This */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="flex flex-col gap-6 lg:col-span-5 lg:self-start">
              <h2 className="t-h2 text-ink">How Tele ICU Changes the Equation</h2>
              <p className="t-lead text-muted">Transforming clinical capabilities at rural district bedsides.</p>
            </Reveal>

            <Stagger className="border-t border-line lg:col-span-6 lg:col-start-7">
              {ADVANTAGES.map((adv, i) => {
                const Icon = adv.icon;
                return (
                  <Item key={adv.title} className="flex gap-6 border-b border-line py-8">
                    <NumberPill n={i + 1} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="t-h5 text-ink">{adv.title}</h3>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                      </div>
                      <p className="mt-2 t-body text-muted">{adv.desc}</p>
                    </div>
                  </Item>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Infrastructure Requirements */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Infrastructure Checklist</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">What a Rural Hospital Needs to Start</h2>
              <p className="mt-8 t-lead text-muted">
                Deploying Tele-ICU does not require structural redesign. A rural hospital needs:
              </p>
              <ul className="mt-8 border-t border-line">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-ink">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Signal className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Cloudspital Medsync Kiosk</h3>
                  <p className="mt-2 t-body text-white/80">
                    Our <strong className="font-normal text-white">rural ready Medsync package</strong> integrates all audio-video hardware, clinical IoT gateways, and cellular dual-SIM failover modules into a plug-and-play terminal.
                  </p>
                  <span className="mt-6 inline-block rounded-full border border-white/30 px-3 py-1.5 t-small text-white">
                    Low-Bandwidth Optimized
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Upgrade Your District Facility"
        description="Talk to our medical project managers to configure a rural-ready Tele-ICU package."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
