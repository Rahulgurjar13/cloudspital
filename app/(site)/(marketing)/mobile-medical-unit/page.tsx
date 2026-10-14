import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSection } from "@/components/ui/FaqSection";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { MobileMedicalUnitHub } from "@/components/hub/MobileMedicalUnitHub";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/mobile-medical-unit/";
const TITLE="Mobile Medical Units (MMU) in India";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "Mobile Medical Units bring diagnostics and doctor access to remote communities. Learn how MMUs work, NHM norms, specifications, and rural camp deployment. Book a demo.",
  path: PATH,
});

// FAQ items — visible Q&A paired with FaqSchema (SOP B.9).
const faqs: Faq[] = [
  {
    q:"What is a Mobile Medical Unit?",
    a:"A healthcare equipped vehicle that brings screening, diagnostics and consultations to remote communities.",
  },
  {
    q:"Who runs MMUs in India?",
    a:"They're a National Health Mission strategy, implemented at district level by states.",
  },
  {
    q:"Does Cloudspital build MMUs?",
    a:"Yes. Cloudspital manufactures and equips customized Mobile Medical Unit vehicles. We provide full medical fit outs, point of care diagnostic equipment, secure mobile network routers, and integrated telemedicine software to connect the vehicle team to remote specialists.",
  },
];

// HUB (pillar) page — links down to every spoke (SOP A.0 / B.8).
export default function Page() {
  return (
    <article>
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-17"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />
      <ServiceSchema
        name="Mobile Medical Unit"
        description="Fully equipped Mobile Medical Units (MMUs) with diagnostics, telemedicine, and point-of-care testing for rural health camps and outreach programs across India."
        path={PATH}
        serviceType="Mobile medical unit"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Mobile Medical Unit", path: PATH },
        ]}
      />

      {/* Full-bleed marketing body (hero, sections, internal links) */}
      <MobileMedicalUnitHub />

      <FaqSection faqs={faqs} />

    </article>
  );
}

