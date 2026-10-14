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
import { Container, SectionLabel } from "@/components/ui/Section";
import { Reveal } from "@/components/motion";
import { Check, HardDrive } from "lucide-react";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "health-atm-kiosk" as const;
const SLUG = "for-rural-healthcare";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Rural Healthcare and PHCs";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Health ATMs bring multi parameter screening and teleconsults to rural India, PHCs, sub centres and Ayushman Arogya Mandirs. See how they expand access.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Do Health ATMs work without reliable power/internet?",
    a:"Rural grade models offer battery backup and offline modes. Cloudspital features dual SIM 4G/5G and local database sync.",
  },
  {
    q:"Can rural users operate them alone?",
    a:"They're designed for self service, often with an assisted mode and local operator.",
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
        title="Health ATM for Rural Healthcare"
        description="Deploy resilient, clinical grade diagnostic stations in Primary Health Centres (PHCs) and rural communities to bring healthcare directly to citizens."
        definitionLabel="Rural Access"
        definition="In rural India, where doctors and labs are scarce, a Health ATM brings multi parameter screening and doctor teleconsults directly to PHCs, sub centres and Ayushman Arogya Mandirs. It enables early detection of disease in communities that would otherwise travel hours for a basic checkup."
      />

      {/* The rural access gap it closes */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <h2 className="t-h2 text-ink">The Rural Access Gap It Closes</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-3">
              <p className="t-h5 text-ink">
                Most specialists and diagnostics are concentrated in cities, leaving rural populations underserved. Health ATMs put first-line screening in the village or PHC, linking results to ABHA and connecting users to remote doctors via eSanjeevani-style telemedicine.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Built for rural conditions */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="flex flex-col lg:col-span-5">
              <SectionLabel>Resilience Specs</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Built for Rural Conditions</h2>
              <p className="mt-8 t-lead text-muted">
                Look for resilience features, battery backup, offline capability, and simple operation.
              </p>
              <p className="mt-8 rounded-[20px] bg-mist p-5 t-body text-ink sm:p-6">
                A 2025 systematic review specifically highlights kiosks&apos; value for rural diagnosis and access.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-canvas p-6 sm:p-8 lg:p-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                  <HardDrive className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h4 text-ink">Cloudspital Rural Specs</h3>
                  <p className="mt-4 t-body text-muted">
                    Cloudspital&apos;s rural-ready health kiosk includes robust dust protection, 8-hour battery backup, and offline screening capabilities with local data storage. It is deployed in PHCs across Bihar, UP, and Odisha.
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
                    {["8hr Battery Backup", "Offline Mode", "Dust Proof", "Local Language Audio"].map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 t-small text-ink"
                      >
                        <Check className="h-4 w-4 text-primary" />
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
        title="Request a Rural Deployment Proposal"
        description="Speak with our public health partnership coordinators to configure kiosks for PHCs or CSR projects."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
