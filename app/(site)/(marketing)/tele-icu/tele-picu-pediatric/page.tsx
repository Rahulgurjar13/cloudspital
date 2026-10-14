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
import { HeartPulse, UserPlus, ShieldAlert, Award, Baby, Building2 } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "tele-picu-pediatric";
const PATH = "/tele-icu/tele-picu-pediatric/";
const TITLE="Tele PICU: Remote Paediatric Intensive Care Explained";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Tele PICU extends paediatric critical care expertise to regional hospitals using remote monitoring, video, and child specific protocols.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is tele PICU?",
    a:"Tele PICU is remote paediatric intensive care, where licensed paediatric intensivists and paediatric critical care nurses monitor and guide the treatment of critically ill children at distant bedside locations.",
  },
  {
    q:"How is it different from general tele ICU?",
    a:"Children have entirely different vital sign thresholds, weight based drug dosing formulas, and clinical deterioration speeds than adults. Tele PICU utilizes pediatric specific alarms and specialized paediatric intensivists.",
  },
  {
    q:"Does tele PICU include newborns?",
    a:"Newborn critical care monitoring is generally classified under tele NICU (neonatal intensive care), which is a closely related model with even finer monitoring protocols.",
  },
];

const DELIVERABLES = [
  {
    title:"Continuous Pediatric Monitoring",
    desc:"Continuous telemetry monitoring tuned specifically to paediatric physiological norms and age ranges.",
    icon: HeartPulse,
  },
  {
    title:"Specialist Intensivist Access",
    desc:"Immediate clinical support from licensed paediatric intensivists for remote hospitals that have none.",
    icon: UserPlus,
  },
  {
    title:"Neonatal and Paediatric Support",
    desc:"Dual support structures covering neonatal units (overlapping with tele NICU) and paediatric wards.",
    icon: Award,
  },
  {
    title:"Golden Hour Intervention",
    desc:"Real time remote guidance during the critical 'golden hours' of paediatric respiratory and cardiac emergencies.",
    icon: ShieldAlert,
  },
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
          { name: "Tele-ICU and Tele-PICU", path: "/tele-icu/" },
          { name: "Tele-PICU Pediatric Care", path: PATH },
        ]}
      />

      <SpokeHero
        title="Tele PICU Pediatric Intensive Care"
        description="Specialized remote telemetry and expert intensivist guidance designed specifically for critically ill children."
        definitionLabel="Pediatric Care Focus"
        definition="Tele PICU is the remote paediatric equivalent of tele ICU. It connects bedside clinical teams with central paediatric intensivists to monitor and treat critically ill children. It uses child specific vitals ranges, weight based dosing calculators, and paediatric sized sensors to prevent sudden clinical crashes."
      />

      {/* Why Children Need a Dedicated Model */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Why Children Need a Dedicated Model</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Children are developmentally and physiologically distinct from adults. Their heart rates, respiratory rates, and blood pressures vary dynamically based on age and body weight. They also have narrow fluid and drug tolerance limits.
                </p>
                <p>
                  A child compensating for respiratory distress might look clinically stable for hours, only to deteriorate rapidly in a matter of minutes. Remote monitoring for paediatric bedsides therefore requires pediatric-trained specialists, appropriately sized hardware, and specialized early-warning logic. General adult tele-ICU systems cannot simply be repurposed for children.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[300px] flex-col justify-between gap-8 rounded-[20px] bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="t-h5 text-ink">Pediatric Safeguards</p>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                    <Baby className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="t-body text-muted">
                    Adult tele-ICU threshold alarms will fail to trigger on subtle, early pediatric distress signs.
                  </p>
                  <p className="mt-5 rounded-2xl bg-mist p-5 t-small text-muted">
                    <strong className="font-normal text-ink">Standard Protocol:</strong> Cloudspital&apos;s Medsync-III Tele-PICU configuration loads clinical modules mapped to age-specific vital categories.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What Tele-PICU Delivers */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What Tele PICU Delivers"
              description="Expanding clinical capacity to protect vulnerable pediatric patients."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {DELIVERABLES.map((del, i) => {
              const Icon = del.icon;
              return (
                <Item key={del.title} className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{del.title}</h3>
                    <p className="mt-2 t-body text-muted">{del.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Tele-PICU in India */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Regional Impact</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Extending Specialized Expertise in India</h2>
              <p className="mt-8 t-lead text-muted">
                With pediatric intensive care resources concentrated heavily in Tier-1 metropolitan cities, most rural and district hospitals lack a dedicated pediatric intensivist. Tele-PICU extends this highly specialized, scarce expertise directly to district hospitals, bringing critical care to where the children actually reside.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">AIIMS Patna Program</h3>
                  <p className="mt-2 t-body text-white/80">
                    Cloudspital is collaborating with leading institutions like AIIMS-Patna to deploy pediatric-specific telemedicine networks, helping improve outcomes in regional clinics.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Integrate Tele-PICU in Your Hospital"
        description="Consult with our pediatric medtech experts to customize a telemetry network."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
