import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Backpack, Briefcase, Check, ShieldCheck, HeartPulse, MapPin } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "portable-telemedicine-bag";
const PATH = "/telemedicine/portable-telemedicine-bag/";
const TITLE="Portable Telemedicine Bag: Doctor in a Bag Guide";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how a portable telemedicine bag packs essential video consult and diagnostic tools into a compact carry kit for rural outreach.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is a portable telemedicine bag?",
    a:"It is a compact, mobile carry kit (backpack or briefcase) containing the essential diagnostics and video conferencing tools of a telemedicine cart, designed for home visits and field camps.",
  },
  {
    q:"Who typically uses a telemedicine bag?",
    a:"Outreach clinical teams, disaster response medical officers, and frontline community health workers (like ASHA/ANM workers) who need to bring specialist diagnostics to remote areas.",
  },
  {
    q:"Does it work off grid?",
    a:"Yes. Cloudspital's Medsync I bag is equipped with long life rechargeable battery packs and integrated cellular routers, enabling off grid operation within network coverage areas.",
  },
];

const ENABLES = [
  {
    icon: MapPin,
    title: "Last-Mile Reach",
    desc: "Brings essential primary diagnostics directly to isolated or tribal communities where physical clinics or larger carts cannot travel.",
  },
  {
    icon: Briefcase,
    title: "Field Camps and Outreach",
    desc: "Acts as a portable point-of-care clinic during community screening camps, home care visits, and corporate CSR outreach programs.",
  },
  {
    icon: ShieldCheck,
    title: "Disaster and Emergency Response",
    desc: "Provides a rapid-deployment medical terminal during emergency situations, floods, or relief camps, coordinating treatment with remote centers.",
  },
  {
    icon: HeartPulse,
    title: "ASHA / ANM Support",
    desc: "Equips frontline health workers with professional, connected medical devices backed by remote specialist advice.",
  },
];

const CONTENTS = [
  "A tablet or compact touchscreen display for video consults.",
  "BP monitor, SpO₂ oximeter, and infrared thermometer.",
  "Digital stethoscope, multi lead ECG sensors, and glucose POCT strip reader.",
  "Rechargeable battery backups and a secure cellular router.",
];

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  return (
    <article>
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Telemedicine Hub", path: "/telemedicine/" },
          { name: "Portable Telemedicine Bag", path: PATH },
        ]}
      />

      <SpokeHero
        title="Portable Telemedicine Bag"
        description="A complete 'Doctor in a Bag' diagnostic carry kit built for remote field clinics and home visits."
        definitionLabel="Bag Overview"
        definition="A portable telemedicine bag is a compact, carry anywhere kit that packs the essentials of a telemedicine cart, video consult tools, vital sign devices, and point of care tests, into a backpack or case. It lets health workers reach remote villages and connect patients to doctors."
      />

      {/* What It Enables */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What It Enables"
              description="Expanding outreach capabilities for medical and CSR initiatives."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {ENABLES.map((e, i) => (
              <Item key={e.title} className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <e.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h6 text-ink">{e.title}</h3>
                  <p className="mt-2 t-body text-muted">{e.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Typical Contents */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Kit Components</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">What Goes into the Bag?</h2>
              <p className="mt-8 t-lead text-muted">
                A typical portable telemedicine bag consolidates the following diagnostic tools into a lightweight carry kit:
              </p>
              <ul className="mt-8 border-t border-line">
                {CONTENTS.map((c) => (
                  <li key={c} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-ink">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Backpack className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Medsync I Portable Bag</h3>
                  <p className="mt-2 t-body text-white/70">
                    Cloudspital&apos;s Medsync-I provides a pre-configured backpack kit, certified for rugged, low-bandwidth, and remote field deployments.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Request a Medsync I Proposal"
        description="Consult with our project managers to configure a portable telemedicine bag for your outreach teams."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
