import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import SegmentSpokePage from "@/components/spoke/SegmentSpokePage";
import type { Faq } from "@/lib/cms";

export const revalidate = 3600;

const SLUG = "for-railway-stations";
const PATH = "/health-atm-kiosk/" + SLUG + "/";
const TITLE="Health ATM for Railway Stations";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Cloudspital Health ATMs serve high traffic railway stations, providing commuters with rapid, convenient clinical checks.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"Can a Health ATM be deployed in railway stations?",
    a:"Yes, it is optimized for high throughput public locations with rugged casing and rapid screening modes.",
  },
  {
    q:"What does it screen in this setting?",
    a:"Typically focuses on core vitals (BP, SpO₂, heart rate, temperature) for quick transit checks.",
  },
  {
    q:"Does it include teleconsults?",
    a:"Yes, commuters can connect to a doctor via the video consult panel on the kiosk or by scanning a QR code on their phone.",
  },
];

const benefits = [
  {
    title:"High footfall screening",
    desc:"Captures massive commuter traffic to enable regular checkups during daily transits.",
    icon: "train",
  },
  {
    title:"Proven infrastructure",
    desc:"Aligns with existing rail projects under major zonal railway divisions.",
    icon: "mappin",
  },
  {
    title:"Rapid vital checks",
    desc:"Quick vitals panel tailored for passengers on tight travel schedules.",
    icon: "activity",
  },
];

export default function Page() {
  return (
    <SegmentSpokePage
      slug={SLUG}
      title="Health ATM for Railway Stations"
      canonicalUrl={SITE.url + PATH}
      h1="Health ATM for Railway Stations"
      introAnswer="A Health ATM deployed at railway stations provides rapid, self service health screenings for high footfall public transit areas. Commuters can check their core vitals in under 3 minutes, making health checks convenient during their journey."
      benefitsTitle="Why Railway Stations Deploy Health ATMs"
      benefits={benefits}
      whatToLookFor="Look for high durability metallic casing, dust proof enclosures, and high speed receipt printing."
      deploymentsAndPackage="Cloudspital's railway station deployment packages have a proven track record, with active kiosks installed across multiple high traffic Indian Railways divisions. Project details include strong proof assets from East Central and Northern zones."
      faqs={faqs}
      ctaMessage="Hi Cloudspital, I'd like details on railway station health kiosk deployments."
      sources={["PMC systematic review (2025); MoHFW."]}
    />
  );
}
