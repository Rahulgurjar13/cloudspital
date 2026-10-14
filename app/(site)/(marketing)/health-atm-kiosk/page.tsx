import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { FaqSection } from "@/components/ui/FaqSection";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { HealthAtmHub } from "@/components/hub/HealthAtmHub";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/health-atm-kiosk/";
const TITLE="Health ATM Kiosk: India's Smart Health Checkup Machine";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "A Health ATM screens 30+ vital parameters in minutes and connects users to a doctor. Learn how it works, what it costs, and where it's deployed across India.",
  path: PATH,
});

// FAQ items — visible Q&A paired with FaqSchema (SOP B.9).
const faqs: Faq[] = [
  {
    q:"What does a Health ATM test?",
    a:"Core vitals and metabolic markers, BP, BMI, blood sugar, ECG, SpO₂, temperature and more, with results in minutes.",
  },
  {
    q:"Is a Health ATM accurate?",
    a:"It uses certified medical grade devices; accuracy depends on the components and calibration. Cloudspital specifies CDSCO/ISO compliant medical devices.",
  },
  {
    q:"Can it replace a doctor?",
    a:"No, it screens and triages, then connects users to a doctor via telemedicine.",
  },
];

// HUB (pillar) page — links down to every spoke via the in-page topic grid (SOP B.8).
export default function Page() {
  return (
    <article>
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-15"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Health ATM / Health Kiosk", path: PATH },
        ]}
      />
      <ServiceSchema
        name="Health ATM Kiosk"
        description="Self-service Health ATM kiosks that screen 30+ vital and metabolic parameters in minutes with integrated telemedicine, deployed across India."
        path={PATH}
        serviceType="Preventive health screening kiosk"
      />

      <HealthAtmHub />

      <FaqSection faqs={faqs} />

    </article>
  );
}
