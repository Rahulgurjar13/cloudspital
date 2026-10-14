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
import { Layers } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "cart-vs-health-kiosk";
const PATH = "/telemedicine/cart-vs-health-kiosk/";
const TITLE="Telemedicine Cart vs. Health Kiosk: Comparison";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Compare clinician led mobile telemedicine carts with self service fixed health kiosks. Review mobility, staffing, reach, and cost.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Is a telemedicine cart better than a health kiosk?",
    a:"Neither is 'better' as they serve different purposes. A cart is ideal for mobile, clinician operated bedside exams. A kiosk is best for fixed, high footfall public self service screening.",
  },
  {
    q:"Can one device perform both functions?",
    a:"Some hybrid configurations exist, but the key differentiator is the operating model: clinician assisted (cart) vs. patient self service (kiosk).",
  },
  {
    q:"Which option is more cost effective?",
    a:"It depends on your deployment environment and staffing resources. Self service kiosks reduce staff overhead, while mobile carts maximize flexibility across multiple hospital wards.",
  },
];

const TABLE_HEADERS = ["Dimension", "Telemedicine Cart", "Health Kiosk (ATM)"];
const TABLE_ROWS = [
  ["Operated By", "Clinician or Health Worker", "Patient (Self-Service)"],
  ["Mobility", "Mobile, wheeled to patient bedsides", "Fixed, permanent installation"],
  ["Primary Use Case", "Assisted clinical exam + Teleconsult", "Self-guided screening + Triage"],
  ["Best Settings", "Wards, PHCs, home visits, camps", "OPDs, corporate wellness, public spaces"],
  ["Interaction Style", "Guided clinician examination", "Self-guided touch prompts"],
];

const CHOICES = [
  {
    title: "Choose a Telemedicine Cart If:",
    desc: "You need a mobile terminal to conduct doctor-guided examinations across different hospital wards, or need a compact kit that outreach teams can carry to remote villages.",
    tag: "Clinician-Led and Wheeled",
  },
  {
    title: "Choose a Health Kiosk If:",
    desc: "You want an always-on, self-service screening terminal placed in a high-footfall public space, like a government hospital OPD lobby, school, or corporate office.",
    tag: "Self-Service and Fixed",
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
          { name: "Telemedicine Hub", path: "/telemedicine/" },
          { name: "Cart vs Health Kiosk", path: PATH },
        ]}
      />

      <SpokeHero
        title="Telemedicine Cart vs. Health Kiosk"
        description="Comparing operational models, mobility, staffing, and clinical settings to pick the right terminal."
        definitionLabel="Comparison Summary"
        definition="The primary differences between a telemedicine cart and a health kiosk are mobility and staffing. A cart is clinician operated and mobile, wheeled directly to patient bedsides. A health kiosk is a fixed, self service station where patients walk up to screen themselves."
      />

      {/* Side-by-Side Comparison Table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Side-by-Side Comparison"
              description="Comparing technical layouts across both systems."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-8 sm:mt-12 lg:mt-16 [&>div]:my-0">
            <ComparisonTable
              caption="Operational comparison of Telemedicine Carts vs. Health ATMs."
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

      {/* Cloudspital Range */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Product Range</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Cloudspital&apos;s Product Range</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Cloudspital manufactures a comprehensive range of both telemedicine carts (Medsync series) and self-service Health ATMs.
                </p>
                <p>
                  Many large-scale public health programs deploy both systems: placing kiosks at fixed hubs for entry screening and using carts for mobile bedside consultations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <Layers className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Hybrid Deployments</h3>
                  <p className="mt-2 t-body text-muted">
                    Combine fixed self-service ATMs with wheeled bedside carts to cover both outpatient triage and inpatient ward needs.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Pick Your Telemedicine Platform"
        description="Consult with our clinical hardware designers to evaluate which configuration meets your needs."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
