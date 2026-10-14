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
import { Container, NumberPill, SectionLabel } from "@/components/ui/Section";
import { Reveal, Stagger, Item } from "@/components/motion";
import { TrendingUp } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "benefits";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Benefits of a Health ATM Kiosk";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Faster screening, early detection, lower cost, and wider access, the key benefits of Health ATM kiosks for communities, employers and health systems.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Who benefits most from Health ATMs?",
    a:"Rural and underserved communities, busy employers, and overstretched public health facilities.",
  },
  {
    q:"Do Health ATMs improve outcomes?",
    a:"By enabling early detection and timely referral, they support better preventive outcomes.",
  },
];

const BENEFITS_LIST = [
  { title:"Early detection", desc:"Of hypertension, diabetes and other risks before symptoms emerge." },
  { title:"Speed and convenience", desc:"Complete clinical screenings in minutes, with zero queuing." },
  { title:"Access", desc:"Delivers healthcare straight to where people already are, including remote areas." },
  { title:"Lower cost", desc:"Substantially cheaper per diagnostic screening than a traditional clinic visit." },
  { title:"Reduced clinic load", desc:"Automates first line diagnostic screening and patient triaging." },
  { title:"Digital continuity", desc:"Integrates directly with ABHA to build longitudinal digital health records." },
  { title:"Data insight", desc:"Aggregates population level health trends to support public health planning." },
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
        title="Benefits of a Health ATM Kiosk"
        description="Discover how automated diagnostic terminals enhance clinical workflows, lower patient costs, and close healthcare access gaps."
        definitionLabel="Core Benefits"
        definition="Health ATMs make preventive care faster, cheaper and more accessible: they screen multiple parameters in minutes, catch health risks early, reach people in workplaces and rural areas, ease pressure on clinics, and feed data into digital health records, all without an appointment."
      />

      {/* Key benefits — heading on the left, numbered rows on the right */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
              <h2 className="t-h2 text-ink">Key Benefits</h2>
              <p className="max-w-[440px] t-lead text-muted">
                Major advantages for health systems, employers, and patients.
              </p>
            </Reveal>

            <Stagger className="border-t border-line lg:col-span-6 lg:col-start-7">
              {BENEFITS_LIST.map((b, i) => (
                <Item key={b.title} className="flex gap-6 border-b border-line py-8">
                  <NumberPill n={i + 1} />
                  <div className="flex-1">
                    <h3 className="t-h5 text-ink">{b.title}</h3>
                    <p className="mt-2 t-body text-muted">{b.desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Clinical validation */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Research and Evidence</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Clinical Validation</h2>
              <p className="mt-8 t-lead text-muted">
                A 2025 systematic review found health kiosks have strong potential to ease the healthcare burden and expand access, particularly in rural and community settings.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h3 text-ink">500,000+</h3>
                  <p className="mt-2 t-small uppercase text-muted">Screenings Conducted</p>
                  <p className="mt-6 border-t border-line pt-5 t-body text-muted">
                    Active deployments across 15 states in India.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Bring These Benefits to Your Community"
        description="Consult with our clinical experts to see how a Health ATM fits into your system."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
