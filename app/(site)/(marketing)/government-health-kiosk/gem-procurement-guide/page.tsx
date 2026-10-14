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
import { ShieldAlert, Award, FileText, CheckCircle2, UserCheck } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "gem-procurement-guide";
const PATH = "/government-health-kiosk/gem-procurement-guide/";
const TITLE="GeM Procurement Guide for Health Kiosks (2026)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Indian government buyers procure health kiosks on the GeM portal, and understand vendor registration, CDSCO compliance, and bidding steps.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Do I need CDSCO approval to sell a health kiosk on GeM?",
    a:"Yes. Regulated medical devices embedded in the kiosk require CDSCO registration, compliance, and typically ISO 13485 QMS certification before they can be listed in GeM's medical categories.",
  },
  {
    q:"Can startups and MSMEs get preference on GeM?",
    a:"Yes. GeM provides procurement preferences, relaxation of prior turnover/experience criteria, and exemptions from Earnest Money Deposits (EMD) for registered MSMEs, startups, and women entrepreneurs.",
  },
  {
    q:"Who is authorized to buy on GeM?",
    a:"All central and state government departments, public sector undertakings (PSUs), autonomous institutions, municipal corporations, and local panchayat bodies.",
  },
];

const STEPS = [
  {
    title:"1. Seller Registration",
    desc:"Register your company on the GeM portal, validating PAN, GST, bank accounts, and corporate credentials.",
    icon: UserCheck,
  },
  {
    title:"2. Verify Device Compliance",
    desc:"Ensure all diagnostic devices carry CDSCO registration/licences and ISO 13485 QMS certifications.",
    icon: ShieldAlert,
  },
  {
    title:"3. Catalog Product Listing",
    desc:"Upload technical sheets, images, pricing matrices, and delivery terms under the appropriate medical category.",
    icon: FileText,
  },
  {
    title:"4. Obtain GeM Approval",
    desc:"GeM category managers review specifications and documentation before publishing the listing live.",
    icon: Award,
  },
  {
    title:"5. Bid and Sell",
    desc:"Participate in direct purchases, proprietary bids, or competitive BOQ e bidding auctions.",
    icon: CheckCircle2,
  },
];

const PURCHASE_METHODS = [
  {
    title: "Direct Purchase",
    desc: "Used for lower-value purchases (below designated limits) and push-button procurement schemes, allowing buyers to select products directly from the portal catalog.",
  },
  {
    title: "E Bidding and Reverse Auctions",
    desc: "Mandatory for large-scale deployments or custom configurations, utilizing BOQ (Bill of Quantities) bidding criteria to determine technical and financial L1 winners.",
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
          { name: "GeM Procurement Guide", path: PATH },
        ]}
      />

      <SpokeHero
        title="GeM Procurement Guide"
        description="A step by step roadmap for public sector buyers and medical vendors procuring health kiosks."
        definitionLabel="Procurement Direct Answer"
        definition="The Government e Marketplace (GeM) is India's official public procurement portal. Public hospitals and departments procure health kiosks here. To list and sell, manufacturers must verify CDSCO compliance and ISO 13485 certification and list under authorized medical device categories."
      />

      {/* What GeM Is */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">What is the Government e-Marketplace (GeM)?</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Launched in 2016 under the Ministry of Commerce, GeM is the end-to-end online marketplace designed to facilitate transparent, efficient procurement of common-use goods and services by central and state government bodies.
                </p>
                <p>
                  Public hospitals and state health departments run approximately <strong className="font-normal text-ink">95% of their equipment purchases</strong> through the GeM portal, making a registered GeM product listing a fundamental requirement for health kiosk manufacturers.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <SectionLabel>Portal Fact</SectionLabel>
                <div>
                  <h3 className="t-h3 text-ink">95%</h3>
                  <p className="mt-1 t-body text-ink">Of Public Health Purchases</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Completed through GeM e-tendering and direct buying channels.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How a Vendor Lists a Kiosk */}
      <section className="bg-primary py-20 text-white lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              onDark
              title="Vendor Listing Process"
              description="Step by step checklist to list medical diagnostic terminals on GeM."
            />
          </Reveal>

          <Stagger className="mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 xl:grid-cols-5">
            {STEPS.map((s) => {
              const Icon = s.icon;
              return (
                <Item key={s.title} className="flex min-h-[260px] flex-col gap-10 border-b border-r border-white/25 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-auto">
                    <h3 className="t-h6 text-white">{s.title}</h3>
                    <p className="mt-2 t-body text-white/75">{s.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* How Buyers Purchase */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-8 rounded-[20px] bg-white p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
            <h3 className="t-h4 text-ink lg:col-span-5">How Government Departments Purchase</h3>
            <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
              {PURCHASE_METHODS.map((m) => (
                <li key={m.title} className="border-b border-line py-6">
                  <h4 className="t-h6 text-ink">{m.title}</h4>
                  <p className="mt-2 t-body text-muted">{m.desc}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Cloudspital on GeM */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital GeM Listing</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital is registered as a verified seller on GeM. Our CDSCO-compliant, ISO 13485 manufactured Health ATMs and Tele ICU Kiosks are cataloged under authorized procurement categories, supporting MSME-preferred state and national healthcare tenders.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Procure Via GeM"
        description="Consult with our tender support division to coordinate BOQ specifications or direct purchase listings."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
