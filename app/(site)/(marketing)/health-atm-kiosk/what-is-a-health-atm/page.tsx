import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle, getSpokeTitle } from "@/lib/site-structure";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { Reveal, Stagger, Item } from "@/components/motion";
import { HeartPulse, Check, Cpu, Stethoscope, MonitorSmartphone, FileText, Video, Cloud } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "what-is-a-health-atm";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="What Is a Health ATM? Meaning, Tests and How It Works";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"A Health ATM is a self service kiosk that screens 30+ health parameters in minutes and connects you to a doctor online. Here's exactly what it is and how it helps.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is a Health ATM in simple words?",
    a:"A self service machine that checks your basic health in minutes and connects you to a doctor online.",
  },
  {
    q:"What tests does a Health ATM do?",
    a:"Commonly BP, BMI, blood sugar, ECG, SpO₂, temperature and more, often 30–60+ parameters depending on the model.",
  },
  {
    q:"Is using a Health ATM safe and private?",
    a:"Yes, reputable kiosks use certified devices and secure, consent based data handling.",
  },
  {
    q:"Does a Health ATM give instant results?",
    a:"Yes, typically within minutes, delivered digitally or in print.",
  },
];

const INCLUDES = [
  { title:"Medical Devices", desc:"For vitals and metabolic tests (BP, ECG, SpO₂, glucose, BMI and more).", icon: Stethoscope },
  { title:"Touchscreen Interface", desc:"With login via phone, Aadhaar, or ABHA for secure access.", icon: MonitorSmartphone },
  { title:"Instant Reporting", desc:"Results generated via print, WhatsApp, SMS, or email instantly.", icon: FileText },
  { title:"Telemedicine", desc:"Integrated high definition video panels to connect with a doctor.", icon: Video },
  { title:"Cloud/EMR Storage", desc:"Encrypted server syncing so results are saved and shareable.", icon: Cloud },
];

// Bento spans: two wide cards on the first row, three on the second.
const INCLUDE_SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-2",
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
          { name: getHubTitle(HUB), path: `/${HUB}/` },
          { name: getSpokeTitle(HUB, SLUG), path: PATH },
        ]}
      />

      <SpokeHero
        title="What Is a Health ATM?"
        description="Learn about the self service digital kiosks revolutionizing preventive healthcare across India with instant diagnostics and telemedicine."
        definitionLabel="Definition"
        definition="A Health ATM is a self service digital health kiosk that lets a person check multiple health parameters, like blood pressure, BMI, blood sugar, ECG and oxygen levels, on their own in a few minutes, then receive an instant report and consult a doctor via built in telemedicine. Just as a bank ATM gives cash on demand, a Health ATM gives a health checkup on demand."
      />

      {/* Why it's called an ATM */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>The Concept</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why it&apos;s called an &quot;ATM&quot;</h2>
              <p className="mt-8 t-lead text-muted">
                The name captures the idea: quick, self-service, available where people already are. A user walks up, completes a screening in minutes, and walks away with a report, no appointment, no queue.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <Cpu className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Checkup on Demand</h3>
                  <p className="mt-2 t-body text-muted">
                    Walk up, select screening, run automated sensors, print results, done.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What it typically includes */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What a Health ATM Typically Includes"
              description="An all in one clinical screening environment integrated in a single hub."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-4">
            {INCLUDES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Item
                  key={item.title}
                  className={`flex min-h-[200px] flex-col justify-between gap-10 rounded-[20px] bg-canvas p-6 sm:min-h-[240px] sm:p-8 ${INCLUDE_SPANS[i]}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{item.title}</h3>
                    <p className="mt-2 max-w-[440px] t-body text-muted">{item.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Who uses */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <SectionLabel>Deployments</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Who Uses Health ATMs</h2>
              <p className="mt-8 t-lead text-muted">
                Health ATMs are versatile medical hubs deployed where quick screening and immediate doctor connectivity are needed most.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                {[
                  "Hospitals and OPDs (to ease crowding)",
                  "PHCs and Ayushman Arogya Mandirs",
                  "Corporates (employee wellness)",
                  "Pharmacies",
                  "Schools",
                  "Rural health camps",
                ].map((item) => (
                  <li key={item} className="flex gap-4 border-b border-line py-5 t-body text-ink">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it fits India's digital health push */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h3 className="t-h3 text-ink">How it fits India&apos;s digital health push</h3>
              <p className="mt-8 t-lead text-muted">
                With ABDM now central to Indian healthcare, modern Health ATMs link results to a patient&apos;s ABHA, turning a one-time screening into part of a lifelong digital record. Cloudspital builds fully ABDM-compliant Health ATMs deployed across multiple PHCs and state health programs.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <HeartPulse className="h-5 w-5" />
                </span>
                <p className="t-body text-white/70">
                  <strong className="font-normal text-white">Deployment Proof Point:</strong> Successfully deployed in primary health centres (PHCs) and sub-centres across Bihar and Indian Railways hubs to screen patients under ABDM standards.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Want to see a Health ATM in action?"
        description="Connect with our medical product experts to request a quote, book a demo, or ask questions."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
