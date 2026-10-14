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
import { Container, NumberPill, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { Reveal, Stagger, Item } from "@/components/motion";
import { UserCheck, Settings, Activity, FileText, Stethoscope, Cloud, Check } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "how-does-a-health-atm-work";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="How Does a Health ATM Work? Step by Step";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"A Health ATM works in three simple steps: log in, take your tests, get an instant report and doctor consult. Here's the full process explained.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How long does a Health ATM checkup take?",
    a:"Usually about 10–15 minutes for a multi parameter screening.",
  },
  {
    q:"Do you need staff to operate it?",
    a:"It's self service, with assisted modes available where needed.",
  },
  {
    q:"How do users get their results?",
    a:"Instantly via print, WhatsApp, SMS, or email, and saved to a digital record.",
  },
];

const STEPS = [
  {
    title:"Log in / register",
    desc:"Identify via phone number, Aadhaar, or ABHA so results attach securely to your permanent medical record.",
    icon: UserCheck,
  },
  {
    title:"Select tests",
    desc:"Choose a pre configured screening package or customize individual metabolic and vital parameters.",
    icon: Settings,
  },
  {
    title:"Take measurements",
    desc:"Follow the intuitive on screen prompts; the kiosk's certified devices capture vitals and metabolic readings.",
    icon: Activity,
  },
  {
    title:"Get the report",
    desc:"Results are generated instantly, often colour coded for easy reading, via print, WhatsApp, SMS, or email.",
    icon: FileText,
  },
  {
    title:"Consult a doctor",
    desc:"Connect to a qualified general physician or specialist via integrated telemedicine modules on the spot.",
    icon: Stethoscope,
  },
  {
    title:"Store and share",
    desc:"The diagnostic data saves automatically to the cloud EMR platform and can link directly to your ABHA account.",
    icon: Cloud,
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
          { name: getHubTitle(HUB), path: `/${HUB}/` },
          { name: getSpokeTitle(HUB, SLUG), path: PATH },
        ]}
      />

      <SpokeHero
        title="How Does a Health ATM Work?"
        description="Learn the step by step process of how our kiosks guide patients from initial login to final diagnostic report and doctor consultation."
        definitionLabel="Process Summary"
        definition="A Health ATM works in three steps: the user logs in (via phone, Aadhaar, or ABHA), completes a set of self guided tests using the kiosk's medical devices, and instantly receives a report, with the option to consult a doctor by video. The whole process usually takes 10–15 minutes."
      />

      {/* Step by step — numbered rows, read down each column */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="The Process, Step by Step"
              description="A self guided journey designed for simplicity and accuracy."
            />
          </Reveal>

          <Stagger className="mt-12 grid border-t border-line md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-12 lg:mt-16">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Item key={s.title} className="flex gap-6 border-b border-line py-8">
                  <NumberPill n={i + 1} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="t-h5 text-ink">{s.title}</h3>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-2 t-body text-muted">{s.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Behind the scenes */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <SectionLabel>The Technology</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">What happens behind the scenes</h2>
              <p className="mt-8 t-lead text-muted">
                Integrated medical IoT devices feed data to the kiosk&apos;s software, which compiles the report, flags abnormal values, and (in AI-enabled models) summarises findings for the consulting doctor.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <div className="rounded-[20px] bg-canvas p-6 sm:p-8 lg:p-10">
                <h3 className="t-h5 text-ink">Cloudspital Workflow and AI Features</h3>
                <ul className="mt-6 border-t border-line">
                  {[
                    "Real time secure cloud synchronization of measurements.",
                    "Automatic visual anomaly flagging on the patient report.",
                    "Instant telemedicine queue routing connecting you to specialists in under 60 seconds.",
                  ].map((item) => (
                    <li key={item} className="flex gap-4 border-b border-line py-5 t-body text-ink">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
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
        title="See the Full Workflow Live"
        description="Connect with our team on WhatsApp or phone to set up a live walkthrough of Cloudspital's health kiosk."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
