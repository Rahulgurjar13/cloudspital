import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "mobile-medical-unit" as const;
const SLUG = "vs-health-kiosk";
const PATH = "/mobile-medical-unit/vs-health-kiosk/";
const TITLE="Mobile Medical Unit vs. Health Kiosk: Comparison";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Compare Mobile Medical Units (MMUs) and self service Health ATMs. Evaluate mobility, staffing, outreach coverage, and cost to pick the right platform.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is an MMU better than a health kiosk?",
    a:"They solve entirely different challenges. MMUs are mobile, clinician staffed vehicles designed to visit multiple remote areas. Kiosks are fixed, self service stations built for continuous screening in high traffic settings.",
  },
  {
    q:"Can they work together in the same program?",
    a:"Yes. Many health initiatives use MMUs to conduct mobile outreach camps in distant villages while installing kiosks at central primary health centers to handle walk in patients.",
  },
  {
    q:"Which option provides deeper clinical care?",
    a:"MMUs offer deeper care because they carry a live clinical team (doctor, nurse, pharmacist) who can diagnose and dispense medicines on site. Kiosks focus on screening, vitals, and remote video consultations.",
  },
];

const TABLE_HEADERS = ["Dimension", "Mobile Medical Unit", "Health Kiosk (ATM)"];
const TABLE_ROWS = [
  ["Mobility", "Travels to multiple sites daily", "Fixed installation at one location"],
  ["Staffing", "Clinical team on board (doctor, nurse, tech)", "Self-service (optional local helper)"],
  ["Reach", "Covers many villages on a route", "Handles high footfall at a single point"],
  ["Care Depth", "Consults, diagnostics, and treatment dispensing", "Metabolic screening and teleconsultation"],
  ["Best For", "Remote outreach and field camps", "Continuous on-site screening in lobbies"],
];

const CHOICES = [
  {
    title: "Choose an MMU If:",
    desc: "You need to deliver clinician-led care directly to multiple remote villages without local medical centres, providing diagnostic tests, doctor consults, and medicines in one stop.",
    tag: "Multi-Village Mobility",
  },
  {
    title: "Choose a Health Kiosk If:",
    desc: "You need an always-on vital screening and registration terminal at a busy, fixed location, like a government hospital lobby, corporate campus, or municipal clinic.",
    tag: "Always-On Fixed Site",
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
          { name: "Mobile Medical Unit Hub", path: "/mobile-medical-unit/" },
          { name: "MMU vs Health Kiosk", path: PATH },
        ]}
      />

      <SpokeHero
        title="Mobile Medical Unit vs. Health Kiosk"
        description="Comparing operational setups, mobility, and clinical staffing to select the right platform."
        definitionLabel="Comparison Summary"
        definition="The core difference between a Mobile Medical Unit (MMU) and a health kiosk is mobility and staffing. An MMU is a staffed vehicle that travels to different communities each day, delivering clinician led care. A health kiosk is a fixed, self service station installed in one location for ongoing screening."
      />

      {/* Side-by-Side Table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Side-by-Side Comparison"
              description="Evaluating structural differences across both outreach platforms."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Comparison table of Mobile Medical Units vs. self service Health Kiosks."
              headers={TABLE_HEADERS}
              rows={TABLE_ROWS}
            />
          </Reveal>
        </Container>
      </section>

      {/* How to Choose */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader title="How to Choose the Right Setup" />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:gap-4">
            {CHOICES.map((c, i) => (
              <Item
                key={c.title}
                className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-canvas p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full border border-line bg-white px-3 py-1.5 t-small text-ink">
                    {c.tag}
                  </span>
                </div>
                <div>
                  <h3 className="t-h5 text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-[560px] t-body text-muted">{c.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital Product Range */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Cloudspital's Product Range"
              description="Cloudspital manufactures and equips both Mobile Medical Units and self-service Health ATMs. Large public-health deployments often combine both systems: placing kiosks at central health hubs and utilizing MMU vans for mobile outreach camps."
            />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="FAQ" label="Questions" />

      <CtaBand
        title="Optimize Your Outreach Map"
        description="Consult with our medical project division to design a custom mix of MMU fleets and fixed kiosks."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
