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
import { FileText, UserCheck, ShieldAlert, FolderCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "health-kiosk-tender-india";
const PATH = "/government-health-kiosk/health-kiosk-tender-india/";
const TITLE="Health Kiosk Tenders in India: Bidding and Evaluation";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how public health kiosk tenders work in India, including GeM bidding guidelines, CDSCO/ISO technical criteria, and evaluation rules.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Where are government health kiosk tenders published?",
    a:"Tenders are primarily published on the Government e Marketplace (GeM) portal and individual state public procurement websites (e.g. state NIC e procurement portals).",
  },
  {
    q:"What commonly disqualifies a vendor's bid?",
    a:"The most common reasons for technical disqualification include lack of valid CDSCO registration for embedded devices, failure to hold ISO 13485 QMS certification, missing parameter requirements, or non compliance with ABDM API standards.",
  },
  {
    q:"Does prior government deployment experience help?",
    a:"Yes. Technical evaluation criteria in government tenders frequently award significant scoring weight to vendors who can demonstrate successful past installations and reference deployments in public hospitals.",
  },
];

const EVAL_CRITERIA = [
  {
    title:"1. Eligibility Requirements",
    desc:"Verification of tax compliance (GST), legal registration, financial turnover, and validity of MSME or Startup India preferences.",
    icon: UserCheck,
  },
  {
    title:"2. Technical Standards",
    desc:"Rigorous check of CDSCO registrations, ISO 13485 QMS compliance, vital parameters coverage, EMR security, and ABDM API readiness.",
    icon: ShieldAlert,
  },
  {
    title:"3. Commercial Proposal",
    desc:"Financial assessment of unit costs, delivery timelines, freight, installation fees, and long term Annual Maintenance Contracts (AMC).",
    icon: FileText,
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
          { name: "Government Kiosk Hub", path: "/government-health-kiosk/" },
          { name: "Tender India Guide", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosk Tenders in India"
        description="Understanding technical specifications, eligibility rules, and evaluation criteria for public tenders."
        definitionLabel="Tender Overview"
        definition="Government health kiosk tenders are floated on GeM and state portals. Evaluators assess proposals based on technical compliance (CDSCO registrations, ISO 13485, parameters, ABDM integration), vendor eligibility (turnover, experience, MSME status), and financial bidding."
      />

      {/* What Evaluators Assess */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What Evaluators Assess"
              description="Key scoring categories in public sector medical device tenders."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {EVAL_CRITERIA.map((crit) => {
              const Icon = crit.icon;
              return (
                <Item key={crit.title} className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="t-h5 text-ink">{crit.title}</h3>
                    <p className="mt-2 t-body text-muted">{crit.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* How to Strengthen a Bid */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Bid Optimization</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">How to Strengthen Your Tender Proposal</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Bidding entities can optimize their technical scoring by ensuring regulatory compliance files are up to date. Keep CDSCO manufacturing licenses and ISO 13485 Quality Management System certificates verified and current.
                </p>
                <p>
                  Highlighting named, comparable reference deployments, such as active state hospital installations, and demonstrating functional ABHA/ABDM data integration will greatly strengthen bid evaluations.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <FolderCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Technical Bid Support</h3>
                  <p className="mt-2 t-body text-white/70">
                    Cloudspital provides documentation packages, CDSCO compliance sheets, and training modules to support bidding partners.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Partner with Cloudspital on Tenders"
        description="Connect with our government projects division to obtain technical datasheets and compliance certifications."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
