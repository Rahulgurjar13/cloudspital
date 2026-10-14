import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import SegmentSpokePage from "@/components/spoke/SegmentSpokePage";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600;

const SLUG = "for-pharmacies";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Pharmacies";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Discover how Cloudspital Health ATMs convert pharmacy footfall and enable instant on site diagnostic testing.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a Health ATM be deployed in pharmacies?",
    a:"Yes, it is an excellent way for pharmacies to increase footfall and provide instant clinical testing.",
  },
  {
    q:"What does it screen in pharmacies?",
    a:"Vitals, blood glucose, HbA1c, cholesterol, and lipid profiles using rapid finger prick tests.",
  },
  {
    q:"Does it include teleconsults?",
    a:"Yes, customers can consult a doctor via telemedicine to review their reports immediately.",
  },
];

const benefits = [
  {
    title:"Footfall conversion",
    desc:"Attracts wellness oriented customer segments who walk in for a quick diagnostic check.",
    icon: "users",
  },
  {
    title:"Repeat screening",
    desc:"Encourages regular repeat testing for chronic management, driving store loyalty.",
    icon: "refreshcw",
  },
  {
    title:"Teleconsult add on",
    desc:"Instant video linkage to remote doctors to discuss screening reports and issue prescriptions.",
    icon: "stethoscope",
  },
];

export default function Page() {
  return (
    <SegmentSpokePage
      slug={SLUG}
      title="Health ATM for Pharmacies"
      canonicalUrl={SITE.url + PATH}
      h1="Health ATM for Pharmacies"
      introAnswer="A Health ATM in a pharmacy converts passing footfall into active customers by offering convenient, instant diagnostic screenings. It positions the pharmacy as a local wellness hub and drives repeat visits through continuous health tracking."
      benefitsTitle="Why Pharmacies Deploy Health ATMs"
      benefits={benefits}
      whatToLookFor="Look for rapid point of care testing (POCT) modules, print integrations, and CRM compatibility."
      deploymentsAndPackage="Cloudspital offers a pharmacy add on kit with print integration, loyalty tracking, and direct local doctor video linking."
      faqs={faqs}
      ctaMessage="Hi Cloudspital, I'd like info on pharmacy health kiosk packages."
      sources={["PMC systematic review; ABDM/MoHFW."]}
    />
  );
}
