import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { FaqSection } from "@/components/ui/FaqSection";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ServiceSchema } from "@/components/schema/ServiceSchema";
import { TeleIcuHub } from "@/components/hub/TeleIcuHub";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/tele-icu/";
const TITLE="Tele ICU and Tele PICU Solutions in India";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "Remote critical care that extends intensivist expertise to any hospital. Explore how tele ICU and tele PICU work, the evidence, costs, and India deployment. Book a demo.",
  path: PATH,
});

// FAQ items — visible Q&A paired with FaqSchema (SOP B.9).
const faqs: Faq[] = [
  {
    q:"What is the difference between tele ICU and a normal ICU?",
    a:"A normal ICU relies on on site specialists; a tele ICU adds remote intensivists who monitor patients 24/7 via live data and video, vital where on site specialists are scarce.",
  },
  {
    q:"Is tele ICU suitable for small hospitals?",
    a:"Yes, it's designed exactly for district, rural, and smaller hospitals that cannot recruit full time intensivists.",
  },
  {
    q:"Does Cloudspital provide both the hardware and the monitoring?",
    a:"Cloudspital is an end to end technology and enablement partner. We provide the complete bedside spoke hardware (such as our Medsync III Tele ICU Kiosk), the cloud telemetry software platform, and early warning analytics. The 24/7 monitoring service is delivered by the hospital's own command center or our partner network of clinical providers.",
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
        name="Tele ICU and Tele PICU"
        description="Hub-and-spoke Tele ICU and Tele PICU services connecting rural and district hospitals to intensivists for 24x7 remote critical care monitoring across India."
        path={PATH}
        serviceType="Remote intensive care (Tele ICU)"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tele-ICU", path: PATH },
        ]}
      />

      <TeleIcuHub />

      <FaqSection faqs={faqs} />

    </article>
  );
}

