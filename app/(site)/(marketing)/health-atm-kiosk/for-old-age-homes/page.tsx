import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import SegmentSpokePage from "@/components/spoke/SegmentSpokePage";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600;

const SLUG = "for-old-age-homes";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Old Age Homes";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital Health ATMs enable routine vitals monitoring and chronic disease tracking in old age homes.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a Health ATM be deployed in old age homes?",
    a:"Yes, it makes daily or weekly health tracking simple, comfortable, and stress free for seniors.",
  },
  {
    q:"What does it screen in old age homes?",
    a:"Blood pressure, oxygen levels, heart rate, temperature, ECG, and blood sugar.",
  },
  {
    q:"Does it include teleconsults?",
    a:"Yes, residents can consult specialists via the video interface for routine checkups and updates.",
  },
];

const benefits = [
  {
    title:"Routine vitals monitoring",
    desc:"Regular daily/weekly screening of blood pressure, oxygen levels, and temperature.",
    icon: "activity",
  },
  {
    title:"Chronic disease tracking",
    desc:"Monitors progress of diabetes and cardiovascular parameters over time.",
    icon: "heart",
  },
  {
    title:"Elderly friendly design",
    desc:"Voice guided prompts and big font interfaces designed for easy senior operation.",
    icon: "smile",
  },
];

export default function Page() {
  return (
    <SegmentSpokePage
      slug={SLUG}
      title="Health ATM for Old Age Homes"
      canonicalUrl={SITE.url + PATH}
      h1="Health ATM for Old Age Homes"
      introAnswer="A Health ATM in old age homes provides elderly residents with routine, non invasive vitals monitoring and chronic disease tracking without the stress of clinic visits. It ensures continuous care and peace of mind for families."
      benefitsTitle="Why Old Age Homes Deploy Health ATMs"
      benefits={benefits}
      whatToLookFor="Look for voice assisted interfaces, large text readability, non invasive testing options, and emergency alert routing."
      deploymentsAndPackage="Cloudspital's old age home packages include guardian dashboard access, simplified voice assisted UI, non invasive sensors, and real time alert routing to supervising nurses."
      faqs={faqs}
      ctaMessage="Hi Cloudspital, I'd like info on elder care health kiosk configurations."
      sources={["PMC systematic review; ABDM/MoHFW."]}
    />
  );
}
