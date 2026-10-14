import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSection } from "@/components/ui/FaqSection";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { TelemedicineHub } from "@/components/hub/TelemedicineHub";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/telemedicine/";
const TITLE="Telemedicine Solutions for India: Carts, POCT and eSanjeevani";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "Telemedicine carts and point of care devices that connect patients to doctors anywhere. Learn how telemedicine works in India, the rules, and how to deploy it. Book a demo.",
  path: PATH,
});

// FAQ items — visible Q&A paired with FaqSchema (SOP B.9).
const faqs: Faq[] = [
  {
    q:"Is telemedicine legal in India?",
    a:"Yes, the Telemedicine Practice Guidelines (2020) give Registered Medical Practitioners a clear legal framework.",
  },
  {
    q:"What is a telemedicine cart?",
    a:"A mobile unit combining video consult tools and medical devices so a remote doctor can examine and treat a patient.",
  },
  {
    q:"Does Cloudspital integrate with eSanjeevani?",
    a:"Yes. Cloudspital's telemedicine platforms and software are built to align with government workflows, offering custom configurations that support integration with national systems like eSanjeevani and ABDM/ABHA.",
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
        name="Telemedicine and Point-of-Care"
        description="Telemedicine carts, portable telemedicine bags, and point-of-care testing with eSanjeevani integration for PHCs and remote clinics across India."
        path={PATH}
        serviceType="Telemedicine service"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Telemedicine", path: PATH },
        ]}
      />

      <TelemedicineHub />

      <FaqSection faqs={faqs} />

    </article>
  );
}

