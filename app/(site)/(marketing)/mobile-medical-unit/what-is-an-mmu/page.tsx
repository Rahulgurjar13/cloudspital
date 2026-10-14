import type { Metadata } from "next";
import Image from "next/image";
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
import { Check, Info, MonitorPlay, Truck, Users, Award } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "mobile-medical-unit" as const;
const SLUG = "what-is-an-mmu";
const PATH = "/mobile-medical-unit/what-is-an-mmu/";
const TITLE="What Is a Mobile Medical Unit (MMU)? NHM Norms";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn what a Mobile Medical Unit (MMU) is, what equipment it carries, its staffing under NHM guidelines, and its role in rural health camps.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is the purpose of a Mobile Medical Unit?",
    a:"The primary purpose is to bring essential primary healthcare, diagnostic screening, and consultations directly to the doorsteps of remote, underserved, and unreached populations, rather than requiring patients to travel long distances.",
  },
  {
    q:"Who provides and runs MMUs in India?",
    a:"They are funded and operated under the National Health Mission (NHM) and implemented at the district level by state health departments.",
  },
  {
    q:"What is typically inside an MMU?",
    a:"It is fitted with vital monitors, POCT diagnostic devices, basic medicine dispensers, examination tables, power generators, and (in advanced units) telemedicine and digital communication tools.",
  },
];

const MMU_FUNCTIONS = [
  {
    title:"Screening and Diagnostics",
    desc:"Equipped to measure vital parameters, perform point of care lab tests (glucose, lipid, HbA1c), and run ECG or ultrasound scans.",
    icon: Award,
  },
  {
    title:"Doctor Consultations",
    desc:"Facilitates on site checkups with a Medical Officer or connects patients with remote specialists via integrated telemedicine screens.",
    icon: Users,
  },
  {
    title:"Basic Treatment and Meds",
    desc:"Dispenses essential medicines and carries tools for basic clinical procedures, wound care, and minor treatments.",
    icon: Info,
  },
  {
    title:"Targeted Health Programs",
    desc:"Supports national programs including maternal and child health, anemia checkups, TB screening, and vision testing.",
    icon: Truck,
  },
];

const STAFF = [
  "Nursing staff / GNM",
  "Pharmacist",
  "Laboratory technician",
  "Ophthalmic technician (often included)",
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
          { name: "Mobile Medical Unit Hub", path: "/mobile-medical-unit/" },
          { name: "What is an MMU", path: PATH },
        ]}
      />

      <SpokeHero
        title="What is a Mobile Medical Unit?"
        description="A customized vehicle delivering diagnostics, consultations, and basic treatment directly to remote, underserved communities."
        definitionLabel="MMU Definition"
        definition="A Mobile Medical Unit (MMU) is a customized vehicle fitted with medical equipment, diagnostics, and telemedicine capability that travels to remote, tribal, and underserved areas. Under India's National Health Mission (NHM), its goal is to bring comprehensive primary care directly to the doorstep."
      />

      {/* What an MMU Does */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What an MMU Does"
              description="Four primary clinical services provided inside outreach vans."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {MMU_FUNCTIONS.map((fun, i) => {
              const Icon = fun.icon;
              return (
                <Item key={fun.title} className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h6 text-ink">{fun.title}</h3>
                    <p className="mt-2 t-body text-muted">{fun.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Staffing and NHM Guidelines */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>National Guidelines</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Staffing and NHM Framework</h2>
              <p className="mt-8 t-lead text-muted">
                Under the National Health Mission guidelines, a standard MMU team is led by a <strong className="font-normal text-ink">Medical Officer</strong> and supported by:
              </p>
              <ul className="mt-8 border-t border-line">
                {STAFF.map((s) => (
                  <li key={s} className="flex gap-4 border-b border-line py-5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="t-body text-ink">{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 t-lead text-muted">
                With roughly <strong className="font-normal text-ink">1,424 MMUs operational nationally</strong>, these mobile clinics are funded through NHM district grants to reach communities that lack physical sub-centres.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <MonitorPlay className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Telemedicine Upgrade</h3>
                  <p className="mt-2 t-body text-white/70">
                    By equipping MMUs with Cloudspital telemedicine carts or bags, on-board teams can consult specialists remotely, expanding clinical depth.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Cloudspital MMU Enablement */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[30px] lg:col-span-6">
              <Image
                src="/images/mmu-field.webp"
                alt="Cloudspital Mobile Medical Unit parked on site with its side door and awning open"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-center">
              <h2 className="t-h2 text-ink">Cloudspital MMU Enablement</h2>
              <p className="mt-8 t-lead text-muted">
                Cloudspital is a certified partner in fabricating and equipping Mobile Medical Units. We integrate robust IoT telemetry, video consult stations, and complete point-of-care testing (POCT) modules on board, aligning state MMU fleets with ABDM and ABHA requirements.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} title="FAQ" label="Questions" />

      <CtaBand
        title="Request MMU Configurations"
        description="Consult with our engineering division to configure medical equipment and telemedicine options for your MMU fleet."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
