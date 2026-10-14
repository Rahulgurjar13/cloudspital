import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import SegmentSpokePage from "@/components/spoke/SegmentSpokePage";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600;

const SLUG = "for-schools";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Schools";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital Health ATMs support child health screening, growth tracking, and vision monitoring in schools.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a Health ATM be deployed in schools?",
    a:"Yes, it is perfect for regular student health checkups and fits easily in school infirmaries.",
  },
  {
    q:"What does it screen in schools?",
    a:"Height, weight, BMI, basic vitals, and vision screening adapted for children.",
  },
  {
    q:"Does it include teleconsults?",
    a:"Yes, school doctors or parents can consult paediatric specialists remotely when anomalies are detected.",
  },
];

const benefits = [
  {
    title:"Child health screening",
    desc:"Tracks student development milestones with non invasive, child safe sensors.",
    icon: "graduationcap",
  },
  {
    title:"Growth and vision",
    desc:"Catches early eyesight changes and developmental fluctuations during growing stages.",
    icon: "eye",
  },
  {
    title:"Project Parvarish",
    desc:"Aligns with government initiatives focused on early child growth tracking and malnutrition audits.",
    icon: "smile",
  },
];

export default function Page() {
  return (
    <SegmentSpokePage
      slug={SLUG}
      title="Health ATM for Schools (Parvarish)"
      canonicalUrl={SITE.url + PATH}
      h1="Health ATM for Schools"
      introAnswer="A Health ATM installed in schools enables proactive paediatric health screening, monitoring student growth, vision, and vitals regularly. It simplifies school health audits and fosters early health awareness among children."
      benefitsTitle="Why Schools Deploy Health ATMs"
      benefits={benefits}
      whatToLookFor="Look for paediatric adapted screening profiles, non invasive child safe sensors, and intuitive kid friendly interfaces."
      deploymentsAndPackage="Cloudspital provides specialized school health packages, aligning with child growth initiatives like Project Parvarish for nutritional monitoring and pediatric health mapping."
      faqs={faqs}
      ctaMessage="Hi Cloudspital, I'd like info on school health kiosk deployments and Project Parvarish."
      sources={["PMC systematic review; ABDM/MoHFW."]}
    />
  );
}
