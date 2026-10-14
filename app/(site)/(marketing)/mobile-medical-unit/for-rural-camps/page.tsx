import type { Metadata } from "next";
import Image from "next/image";
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
import { BarChart3, Stethoscope, MapPin, ShieldCheck, HeartPulse } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "mobile-medical-unit" as const;
const SLUG = "for-rural-camps";
const PATH = "/mobile-medical-unit/for-rural-camps/";
const TITLE="Mobile Medical Units for Rural and CSR Health Camps";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Mobile Medical Units (MMUs) power rural health camps and corporate CSR campaigns, delivering on site diagnostics and teleconsults.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can an MMU run a health camp alone?",
    a:"Yes. An MMU provides the complete infrastructure, carrying clinical staff, diagnostics, and consult equipment on board to establish a fully functional mobile clinic anywhere.",
  },
  {
    q:"How many people can an MMU screen per day?",
    a:"It depends on staffing and parameters. Standard configurations can comfortably screen and consult between 100 to 150 patients daily.",
  },
  {
    q:"Can screening results link to digital records?",
    a:"Yes. Vitals and parameters captured by the MMU's devices automatically sync to national electronic health records and link directly to patients' ABHA IDs.",
  },
];

const CAMP_ADVANTAGES = [
  {
    title:"High Volume Screening",
    desc:"Equipped to screen dozens of patients quickly using automated, on board point of care diagnostics.",
    icon: HeartPulse,
  },
  {
    title:"Last Mile Accessibility",
    desc:"Reaches isolated tribal hamlets and remote villages that lack permanent public clinics.",
    icon: MapPin,
  },
  {
    title:"One Stop Primary Care",
    desc:"Runs diagnostic screenings, doctor consults, and basic medicine dispensing all in a single visit.",
    icon: Stethoscope,
  },
  {
    title:"Data and CSR Reporting",
    desc:"Captures screening data (linked to ABHA IDs) to provide audit ready reporting for CSR programs.",
    icon: ShieldCheck,
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
          { name: "For Rural Camps", path: PATH },
        ]}
      />

      <SpokeHero
        title="Mobile Medical Units for Rural Camps"
        description="Powering rural health camps and corporate CSR outreach with complete, vehicle integrated mobile clinics."
        definitionLabel="Camp Outreach Summary"
        definition="For rural health camps and CSR outreach, a Mobile Medical Unit is the most effective tool. It arrives equipped to screen large numbers of patients, run point of care diagnostics, connect to remote doctors via telemedicine, and dispense essential medicines, all in a single one stop visit."
      />

      {/* Why MMUs Suit Camps */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Why MMUs Suit Health Camps"
              description="Key advantages of using vehicle integrated clinics for field outreach."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {CAMP_ADVANTAGES.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <Item key={adv.title} className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h6 text-ink">{adv.title}</h3>
                    <p className="mt-2 t-body text-muted">{adv.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Programme Fit & CSR Outreach */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Programme Fit</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Supporting NHM and Corporate CSR Goals</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Mobile Medical Units align directly with the outreach strategies of the <strong className="font-normal text-ink">National Health Mission (NHM)</strong>, focusing on anemia checkups, tuberculosis screening, and non-communicable disease (NCD) tracking.
                </p>
                <p>
                  They are also highly valued in corporate CSR health campaigns, providing companies with objective, digital diagnostics data. By linking screening results directly to ABHA accounts, programs can track population-level health trends and verify camp impact.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-canvas p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">Impact Analytics</h3>
                  <p className="mt-2 t-body text-muted">
                    Cloudspital&apos;s cloud platforms aggregate screening statistics, providing audit-ready logs to verify camp outreach results.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[30px] sm:aspect-[16/9] lg:mt-16 lg:aspect-[2/1]">
            <Image
              src="/images/mmu-field.webp"
              alt="Cloudspital Mobile Medical Unit parked on site with its side door and awning open"
              fill
              sizes="(min-width: 1440px) 1320px, 100vw"
              className="object-cover object-[center_35%]"
            />
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="FAQ" label="Questions" />

      <CtaBand
        title="Plan a CSR Outreach Camp"
        description="Consult with our outreach coordinators to deploy fully equipped MMU vehicles for your community programs."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
