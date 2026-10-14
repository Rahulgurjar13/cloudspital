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
import { Activity, Check, Heart } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "for-government-hospitals";
const PATH = "/government-health-kiosk/for-government-hospitals/";
const TITLE="Health Kiosks for Government Hospitals in India";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Health ATM kiosks help government hospitals manage crowded OPDs, automate vital screening, and speed up patient registration.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How do kiosks reduce OPD crowding?",
    a:"By automating routine vital measurements (blood pressure, temperature, weight, BMI) and registration tasks, the kiosk handles first line triaging. This allows hospital nurses and doctors to focus their time exclusively on diagnosing and treating patients who require immediate attention.",
  },
  {
    q:"Can patients use them without assistance?",
    a:"Yes. Kiosks feature highly intuitive, multi lingual touchscreens and voice guided prompts designed for self service. For rural or district hospitals, state programs often place hospital volunteers next to the terminals to assist elderly or non literate patients.",
  },
  {
    q:"Do they integrate with hospital HMIS and ABDM registries?",
    a:"Yes. Cloudspital's Health ATMs support standard HL7 APIs, enabling seamless integration with hospital management information systems (HMIS) and national ABDM registries.",
  },
];

const FIT_LOCATIONS = [
  {
    title:"OPD Entrances and Waiting Lobbies",
    desc:"Placed at main lobbies to handle first line physiological screening, vital measurements, and ABHA registrations, triaging patients before they reach consultation desks.",
  },
  {
    title:"District and Sub District Hospitals",
    desc:"Extends clinical diagnostic access to rural district blocks, providing primary metabolic tests without requiring separate laboratory visits.",
  },
  {
    title:"Telemedicine and Tele ICU Integration",
    desc:"Acts as a primary endpoint terminal, connecting local bedside clinics with remote Tier 1 academic specialists via live audio video links.",
  },
];

const ESSENTIALS = [
  { label: "GeM Procurement:", text: "Sourcing via official marketplace specifications to ensure compliance." },
  { label: "CDSCO Registration:", text: "Verifying all diagnostic devices carry active national registrations." },
  { label: "ABDM Integration:", text: "Ensuring patient records link seamlessly with ABHA databases." },
  { label: "On Site Training:", text: "Onboarding nursing staff, hospital helpers, and IT engineers." },
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
          { name: "For Government Hospitals", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks for Government Hospitals"
        description="Streamlining outpatient departments, vital screening, and digital registration."
        definitionLabel="Hospital Deployment Summary"
        definition="Health ATM kiosks assist government hospitals in managing high volume Outpatient Departments (OPDs). They allow patients to self screen key vitals in minutes, link reports to national ABHA accounts, and consult remote doctors via telemedicine, reducing hospital queues and easing staff loads."
      />

      {/* The Problem They Solve */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">The Problem Public Hospitals Face</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Government hospitals and community clinics in India handle massive patient loads, often with severe staff and nurse shortages. OPD counters are chronically congested, and manual patient charting consumes valuable clinical hours.
                </p>
                <p>
                  Kiosks address these capacity bottlenecks. By automating basic, routine measurements (such as blood pressure, BMI, blood oxygen, and blood sugar) and providing rapid digital patient intake registration via ABHA Scan and Share, they ensure doctors can focus their attention on critical diagnoses.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Automated Vital Triage</h3>
                  <p className="mt-2 t-body text-muted">
                    Screening BP, BMI, SpO₂, and blood glucose in under 10 minutes per patient, instantly feeding data to the consulting room.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Where They Fit */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Where They Fit"
              description="Key deployment points inside municipal and state hospital layouts."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {FIT_LOCATIONS.map((loc, i) => (
              <Item key={loc.title} className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h5 text-ink">{loc.title}</h3>
                  <p className="mt-2 t-body text-muted">{loc.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Deployment Essentials */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Deployment Guidelines</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Hospital Deployment Essentials</h2>
              <p className="mt-8 t-lead text-muted">
                Successful implementation inside public hospital environments requires coordinating four key elements:
              </p>
              <ul className="mt-8 border-t border-line">
                {ESSENTIALS.map((e) => (
                  <li key={e.label} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-muted">
                      <strong className="font-normal text-ink">{e.label}</strong> {e.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Heart className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">On Site Support</h3>
                  <p className="mt-2 t-body text-white/70">
                    Cloudspital manages the complete installation, calibration, and on-site staff training, ensuring smooth day-one deployment.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Upgrade Your Hospital OPD"
        description="Consult with our hospital solutions team to map out a Health ATM deployment plan for your clinics."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
