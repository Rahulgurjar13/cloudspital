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
import { Container, SectionHeader } from "@/components/ui/Section";
import { HubSteps } from "@/components/hub/HubKit";
import { Reveal } from "@/components/motion";
import { Check } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "price-in-india";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM Price in India: Cost and What Drives It (2026)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Health ATM prices in India range widely by configuration. Understand the cost drivers, parameters, certification, telemedicine, before you buy. Get a quote.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How much does a Health ATM cost in India?",
    a:"It varies with configuration — the number of parameters, device certifications, telemedicine and AI features, and software/support all shape the price. Share your requirements and we'll send a tailored quote.",
  },
  {
    q:"Are there ongoing costs?",
    a:"Often software/cloud, AMC, and consumables for invasive tests.",
  },
  {
    q:"Can government bodies buy on GeM?",
    a:"Yes, most public procurement runs through GeM.",
  },
];

const COST_DRIVERS = [
  { factor:"Number of parameters", effect:"More tests / POCT modules → higher cost" },
  { factor:"Certifications", effect:"CDSCO/ISO/CE grade devices cost more but are essential" },
  { factor:"Telemedicine and AI", effect:"Integrated consults and AI reporting add value and cost" },
  { factor:"Form factor", effect:"Floor standing vs portable vs wall mounted" },
  { factor:"Software and support", effect:"Cloud, EMR, ABHA integration, AMC" },
  { factor:"Consumables", effect:"Test strips for invasive POCT tests" },
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
        title="Health ATM Price in India"
        description="Understand the parameters, certifications, and support agreements that drive the pricing of diagnostic kiosks in India."
        definitionLabel="How Pricing Works"
        definition="Health ATM pricing in India varies widely with configuration — driven by the number of parameters, device certifications, telemedicine and AI features, and software/support. Most are sold as a one time purchase plus optional service or consumables. Share your requirements and we'll prepare a tailored quote."
      />

      {/* Cost drivers table */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What Drives the Price"
              description="Key factors determining the investment required for your kiosk."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-mist">
                    <th scope="col" className="w-1/3 px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Factor
                    </th>
                    <th scope="col" className="px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                      Effect on cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COST_DRIVERS.map((driver) => (
                    <tr key={driver.factor} className="border-t border-line">
                      <th scope="row" className="px-5 py-4 align-top t-body font-normal text-ink sm:px-6">
                        {driver.factor}
                      </th>
                      <td className="px-5 py-4 align-top t-body text-muted sm:px-6">{driver.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex gap-3 border-t border-line bg-canvas px-5 py-4 t-small text-muted sm:px-6">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                <strong className="font-normal text-ink">Tailored to your needs:</strong> Final pricing depends on the parameters, certifications, and POCT modules you choose. Share your configuration and our team will prepare an exact quote.
              </span>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Buying models */}
      <HubSteps
        label="Models"
        title="Buying Models"
        steps={[
          { title:"One time purchase", desc:"Purchase of the kiosk hardware directly, acquiring full ownership." },
          { title:"Plus optional plans", desc:"Software/cloud subscription, AMC (Annual Maintenance Contract), and consumables." },
          { title:"Government buyers", desc:"Available via GeM (Government e Marketplace) procurement frameworks." },
        ]}
      />

      {/* How to compare quotes fairly */}
      <section className="pt-20 lg:pt-[120px]">
        <Container>
          <Reveal className="grid gap-6 rounded-[20px] bg-white p-6 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-[52px]">
            <h3 className="t-h4 text-ink lg:col-span-5">How to compare quotes fairly</h3>
            <p className="t-h5 text-muted lg:col-span-6 lg:col-start-7">
              Match on parameter coverage, certification, telemedicine, warranty, and total cost of ownership, not headline price alone.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Tailored Quote"
        description="Consult with our engineering team for exact quotes on customized device integrations and GeM availability."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
