import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import SegmentSpokePage from "@/components/spoke/SegmentSpokePage";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600;

const SLUG = "for-csr-projects";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM CSR Projects";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital Health ATMs power Corporate Social Responsibility (CSR) healthcare camps and provide transparent impact reporting.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a Health ATM be deployed for CSR projects?",
    a:"Yes, it is a highly effective, transparent, and durable solution for rural outreach programs.",
  },
  {
    q:"What does it screen in CSR camps?",
    a:"Covers a broad panel of vitals, body composition, ECG, and rapid blood tests.",
  },
  {
    q:"Does it include teleconsults?",
    a:"Yes, it connects rural beneficiaries to remote doctors via integrated satellite or mobile network video consultations.",
  },
];

const benefits = [
  {
    title:"Outreach camps",
    desc:"Highly deployable in remote camps to provide direct primary healthcare to underserved areas.",
    icon: "mappin",
  },
  {
    title:"Impact reporting",
    desc:"Generates clean, aggregate health analytics and impact numbers for corporate reporting.",
    icon: "filetext",
  },
  {
    title:"Public health alignment",
    desc:"Directly links with national schemes like Ayushman Bharat and local PHC infrastructures.",
    icon: "check",
  },
];

export default function Page() {
  return (
    <SegmentSpokePage
      slug={SLUG}
      title="Health ATM for CSR Projects"
      canonicalUrl={SITE.url + PATH}
      h1="Health ATM for CSR Projects"
      introAnswer="A Health ATM deployed under Corporate Social Responsibility (CSR) initiatives brings essential diagnostic screening to underserved and remote communities. It acts as a portable or fixed digital health camp with transparent, real time impact tracking."
      benefitsTitle="Why CSR Projects Deploy Health ATMs"
      benefits={benefits}
      whatToLookFor="Look for rugged portable designs, offline data capture, battery backup, and impact analytics dashboards."
      deploymentsAndPackage="Cloudspital provides specialized CSR packages equipped with rugged portable configurations, offline capabilities, and mobile dashboards for real time impact reporting."
      faqs={faqs}
      ctaMessage="Hi Cloudspital, I'd like info on CSR health kiosk deployments and pricing."
      sources={["PMC systematic review (2025); MoHFW."]}
    />
  );
}
