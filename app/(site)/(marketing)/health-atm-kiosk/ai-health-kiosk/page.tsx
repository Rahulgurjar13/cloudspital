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
import { BrainCircuit, Activity, Eye, FileText, Check } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "ai-health-kiosk";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="AI Health Kiosk: How AI Powers Smart Health ATMs";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"AI health kiosks summarise vitals, flag anomalies, and draft reports for the doctor, turning a screening machine into a decision support tool. Here's how.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Does the AI diagnose patients?",
    a:"No, it screens, flags, and summarises; a doctor diagnoses.",
  },
  {
    q:"Is AI in health kiosks safe?",
    a:"Used as decision support with a clinician in the loop, it adds a safety layer.",
  },
];

const AI_ACTIONS = [
  { title:"Anomaly detection", desc:"Flags out of range or concerning readings automatically.", icon: Activity },
  { title:"Report summarisation", desc:"Prepares a structured summary so the teleconsulting doctor starts informed.", icon: FileText },
  { title:"Personalised guidance", desc:"Provides diet and lifestyle suggestions derived from user data.", icon: BrainCircuit },
  { title:"Longitudinal insight", desc:"Analyzes and spots critical trends across repeat user visits.", icon: Eye },
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
        title="AI Health Kiosk"
        description="Discover how on device artificial intelligence turns basic health screening kiosks into powerful clinical decision support systems."
        definitionLabel="AI Capabilities"
        definition="An AI health kiosk adds a layer of artificial intelligence on top of standard screening: it analyses a user's vitals and history, flags abnormal values, generates structured summaries for the consulting doctor, and can suggest personalised guidance. The AI supports, it does not replace, the clinician."
      />

      {/* What the AI actually does */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What the AI Actually Does"
              description="Core intelligent processes that run during and after screenings."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {AI_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <Item
                  key={action.title}
                  className="flex min-h-[260px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{action.title}</h3>
                    <p className="mt-2 t-body text-muted">{action.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Why it matters */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Clinical Workflow</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Why it matters</h2>
              <p className="mt-8 t-lead text-muted">
                AI reduces the routine clinical workload and helps catch risks a quick glance might miss, valuable in high-volume, low-staff settings. Crucially, the doctor stays in control: the AI does the prep, the clinician makes the decision.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <BrainCircuit className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Cloudspital Specific AI Modules</h3>
                  <p className="mt-2 t-body text-white/70">
                    Our proprietary AI modules support real-time abnormal value flagging and automated clinical report generation, making remote triaging efficient.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {["Anomaly Alerts", "Auto-Reports"].map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 t-small text-white"
                      >
                        <Check className="h-4 w-4" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="See the AI in Action"
        description="See a live demo of our AI screening capabilities, report summary structures, and anomaly alerts."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
