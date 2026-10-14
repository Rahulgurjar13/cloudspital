import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSection } from "@/components/ui/FaqSection";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { GovernmentHub } from "@/components/hub/GovernmentHub";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/government-health-kiosk/";
const TITLE="Health Kiosks for Government and Public Health in India";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "Health ATM kiosks and tele ICU for government hospitals, PHCs and Ayushman Arogya Mandirs, GeM listed, CDSCO compliant, ABHA ready. See how public sector deployment works.",
  path: PATH,
});

// FAQ items — visible Q&A paired with FaqSchema (SOP B.9).
const faqs: Faq[] = [
  {
    q:"How do government hospitals buy health kiosks?",
    a:"Mostly through GeM, the national procurement portal, after the product is listed and CDSCO compliant.",
  },
  {
    q:"Do government health kiosks need ABHA integration?",
    a:"It's increasingly expected, as ABDM becomes the backbone of public digital health.",
  },
  {
    q:"Is Cloudspital GeM listed?",
    a:"Yes. Cloudspital's Health ATMs and Tele ICU hardware are listed on the Government e Marketplace (GeM) portal, allowing simplified procurement and tender processes for public and government hospitals.",
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
        name="Government and Public Health Kiosk Deployment"
        description="ABDM/ABHA-integrated, CDSCO-compliant health kiosks and Tele ICU networks for government hospitals, PHCs, and Ayushman Arogya Mandirs, procurable on GeM across Indian states."
        path={PATH}
        serviceType="Public health kiosk deployment"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Government Health Kiosk", path: PATH },
        ]}
      />

      {/* Full-bleed marketing body (hero, sections, internal links) */}
      <GovernmentHub />

      <FaqSection faqs={faqs} />

    </article>
  );
}

