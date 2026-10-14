import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/cms";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { WebPageSchema } from "@/components/schema/WebPageSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { ItemListSchema } from "@/components/schema/ItemListSchema";
import { FaqSection } from "@/components/ui/FaqSection";
import { Hero } from "@/components/home/Hero";
import { QuickAccess } from "@/components/home/QuickAccess";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { Solutions } from "@/components/home/Solutions";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ProductRange } from "@/components/home/ProductRange";
import { CaseStudy } from "@/components/home/CaseStudy";
import { Journey3D } from "@/components/home/Journey3D";
import { MediaCoverage } from "@/components/home/MediaCoverage";
import { TestsPreview } from "@/components/home/TestsPreview";
import { PartnershipModel } from "@/components/home/PartnershipModel";

export const metadata: Metadata = pageMetadata({
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
  absoluteTitle: true,
});

// Homepage FAQs — answer-engine (AEO) targets, paired with schema.
const faqs: Faq[] = [
  {
    q:"What does Cloudspital manufacture?",
    a:"Cloudspital is an Indian medtech manufacturer of Health ATM kiosks, Tele ICU and Tele PICU systems, telemedicine carts, point-of-care testing devices, and mobile medical units, co-developed with AIIMS and compliant with CDSCO and ABDM.",
  },
  {
    q:"Where is Cloudspital based and where does it deploy?",
    a:"Cloudspital is headquartered in Greater Noida, Uttar Pradesh, with manufacturing in Kasna Industrial Area, and deploys health kiosks, Tele ICU and telemedicine systems across India, including Bihar, Uttar Pradesh, Jharkhand, Uttarakhand and West Bengal.",
  },
  {
    q:"Are Cloudspital products approved for government procurement?",
    a:"Yes. Cloudspital is DPIIT recognised and GeM listed, its devices are CDSCO approved, and its kiosks are ABDM/ABHA integrated, so they can be procured directly by government hospitals and public health programs.",
  },
  {
    q:"How can I request a demo or quote?",
    a:`Contact Cloudspital at ${SITE.phone} or ${SITE.email}, or use the demo request form at ${SITE.url}/contact/.`,
  },
];

// Homepage (SOP Part A). Organization + WebSite schema is site-wide in the
// root layout; this page adds LocalBusiness (GEO), a speakable WebPage (AEO),
// FAQ, and an ItemList of the core solution hubs.
export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <WebPageSchema
        name={`${SITE.name} | ${SITE.tagline}`}
        description={SITE.description}
        path="/"
        primaryImage={`${SITE.url}/cloudspital-new.webp`}
      />
      <FaqSchema faqs={faqs} />
      <ItemListSchema
        name="Cloudspital Solutions"
        items={[
          { name:"Health ATM Kiosk", path:"/health-atm-kiosk/" },
          { name:"Tele ICU and Tele PICU", path:"/tele-icu/" },
          { name:"Telemedicine and Point of Care", path:"/telemedicine/" },
          { name:"Government Health Kiosk", path:"/government-health-kiosk/" },
          { name:"Mobile Medical Unit", path:"/mobile-medical-unit/" },
        ]}
      />
      {/* Homepage = the essentials only. Deep dives live on their own pages:
          /partner/ (partnership, smart lounge, affordability),
          /products/compare/ (Arc model matrix), /impact/ (SDGs, access, 3M,
          why Cloudspital, field gallery), /about-us/ (team). */}
      <Hero />
      <QuickAccess />
      <TrustedBy />
      <Solutions />
      <ProductSpotlight />
      <ProductRange />
      <Journey3D />
      <TestsPreview />
      <PartnershipModel variant="teaser" />
      <CaseStudy />
      <MediaCoverage />

      {/* FAQ — visible Q&A paired with the FAQPage schema above (AEO). */}
      <FaqSection faqs={faqs} />
    </>
  );
}
