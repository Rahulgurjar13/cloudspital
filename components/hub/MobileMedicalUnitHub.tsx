import Image from "next/image";
import Link from "next/link";
import { Activity, MapPin, Stethoscope, Building, FileText, Shield, ArrowLeftRight, Bus } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { HubHero, HubIndex, HubWhy, HubCompare, HubAllTopics } from "@/components/hub/HubKit";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";

const HUB = "mobile-medical-unit" as const;

const HUB_MAP = [
  {
    category: "Learn",
    links: [{ name: "What is a Mobile Medical Unit?", href: "/mobile-medical-unit/what-is-an-mmu/" }],
  },
  {
    category: "Compare",
    links: [{ name: "MMU vs health kiosk", href: "/mobile-medical-unit/vs-health-kiosk/" }],
  },
  {
    category: "Deploy",
    links: [{ name: "MMU for rural health camps", href: "/mobile-medical-unit/for-rural-camps/" }],
  },
  {
    category: "Specify",
    links: [{ name: "MMU specifications", href: "/mobile-medical-unit/specifications/" }],
  },
];

const STATS = [
  { value: "~1,424", label: "MMUs operational in India" },
  { value: "NHM", label: "Strategy aligned" },
  { value: "15+ States", label: "Active field presence" },
  { value: "100%", label: "Doorstep primary care" },
];

const FEATURES = [
  {
    icon: Bus,
    title: "Telemedicine and Tele ICU Equipped",
    desc: "Custom vehicle fabrication incorporating dual network routers, high definition PTZ video systems, and digital stethoscopes to connect mobile teams with distant urban specialists.",
  },
  {
    icon: Stethoscope,
    title: "On Board POCT Diagnostics",
    desc: "Integrated rapid laboratory testing for metabolic parameters (glucose, lipids, HbA1c), hematology (hemoglobin) alongside 12 lead ECG and vital sign monitors.",
  },
  {
    icon: Activity,
    title: "eSanjeevani and ABHA Ready",
    desc: "Custom client software enabling frontline workers to generate ABHA IDs and stream patient records to government registries on site.",
  },
  {
    icon: Shield,
    title: "Outreach Tested Build",
    desc: "Fully customized medical grade vehicle fabrication (from compact utility vans to heavy duty coaches) certified to international QMS standards.",
  },
];

const MMU_DUTIES = [
  {
    title: "Screening and Diagnostics",
    desc: "Vitals checkups, point of care laboratory tests (glucose, lipids, HbA1c), sometimes ECG and diagnostic ultrasound.",
  },
  {
    title: "Doctor Consultations",
    desc: "Frontline Medical Officers consult on site, backed by specialists via integrated telemedicine video feeds.",
  },
  {
    title: "Treatment and Medicines",
    desc: "On board pharmacy fit outs for secure storage and dispensing of essential medical prescriptions directly to patients.",
  },
  {
    title: "Targeted Programmes",
    desc: "Targeted public health drives including anemia checkups, tuberculosis screening, maternal health, and basic eye exams.",
  },
];

const COMPARE_DATA = [
  { label: "Mobility", mmu: "Travels to many sites", kiosk: "Fixed at one location" },
  { label: "Staffing", mmu: "Clinical team on board", kiosk: "Self service (assisted optional)" },
  { label: "Reach", mmu: "Many villages on a route", kiosk: "One footfall point" },
  { label: "Care depth", mmu: "Consults + diagnostics + treatment", kiosk: "Screening + teleconsult" },
  { label: "Best for", mmu: "Remote outreach, camps", kiosk: "Continuous on site screening" },
];

const CHOOSE = [
  {
    icon: Bus,
    title: "Choose an MMU",
    desc: "If your health campaign needs to travel to cover multiple remote or tribal villages each week, bringing an active clinical team on board.",
  },
  {
    icon: Building,
    title: "Choose a Kiosk",
    desc: "If you require a stationary, always-on self-service screening counter at a high-footfall location like an OPD hall or corporate lobby.",
  },
];

const KEY_TOPICS = [
  {
    slug: "what-is-an-mmu",
    title: "What is a Mobile Medical Unit?",
    desc: "Understand NHM vehicle mandates, clinical staffing, and how mobile clinics travel to unreached areas.",
    icon: Bus,
  },
  {
    slug: "vs-health-kiosk",
    title: "MMU vs. Health Kiosk",
    desc: "Compare active traveling outreach vehicles against fixed self service screening stations.",
    icon: ArrowLeftRight,
  },
  {
    slug: "for-rural-camps",
    title: "MMU for Rural Health Camps",
    desc: "How MMUs deliver on site screening, diagnostics, and teleconsults for CSR campaigns.",
    icon: MapPin,
  },
  {
    slug: "specifications",
    title: "Mobile Medical Unit Specifications",
    desc: "A comprehensive checklist covering fit out, POCT diagnostic equipment, telemedicine, power, and EHR software.",
    icon: FileText,
  },
];

/* ------------------------------------------------------------------ */
/* What an MMU does — field photo beside the four services on board    */
/* ------------------------------------------------------------------ */

function MmuDuties() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="Services On Board"
            title="Grassroots healthcare: What an MMU does"
            description="A standard National Health Mission MMU functions as a fully operational primary care clinic on wheels, taking critical screening, clinical consults, and pharmacy distributions to unreached communities."
          />
        </Reveal>

        <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-12 lg:gap-4">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <Image
                src="/images/mmu-field.webp"
                alt="Cloudspital mobile medical unit on a field deployment, with its on-board clinic visible through the side windows"
                fill
                sizes="(min-width: 1440px) 650px, (min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Stagger className="grid gap-3 sm:grid-cols-2 lg:col-span-6 lg:gap-4">
            {MMU_DUTIES.map((d, i) => (
              <Item
                key={d.title}
                className="flex flex-col justify-between gap-8 rounded-[20px] bg-canvas p-6 sm:min-h-[240px] sm:p-8"
              >
                <span className="t-h4 text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h6 text-ink">{d.title}</h3>
                  <p className="mt-2 t-small text-muted">{d.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How to choose — follows the comparison table                        */
/* ------------------------------------------------------------------ */

function ChooseGuide() {
  return (
    <section className="-mt-8 pb-20 lg:-mt-14 lg:pb-[120px]">
      <Container>
        <Stagger className="grid gap-3 md:grid-cols-2 lg:gap-4">
          {CHOOSE.map((c) => {
            const CIcon = c.icon;
            return (
              <Item key={c.title} className="flex gap-5 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary">
                  <CIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5 text-ink">{c.title}</h3>
                  <p className="mt-2 t-body text-muted">{c.desc}</p>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Key topics — HubTopics card style, four across for the four spokes  */
/* ------------------------------------------------------------------ */

function PlanTopics() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader label="Plan and Configure" title="Mobile clinic outreach, mapped step by step" />
        </Reveal>
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {KEY_TOPICS.map((t) => {
            const TIcon = t.icon;
            return (
              <Item key={t.slug}>
                <Link
                  href={`/${HUB}/${t.slug}/`}
                  className="group flex h-full min-h-[260px] flex-col rounded-[20px] bg-white p-6 transition-colors duration-500 ease-out-soft hover:bg-primary sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                      <TIcon className="h-5 w-5" />
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-auto pt-10 t-h5 text-ink transition-colors duration-500 group-hover:text-white">{t.title}</h3>
                  <p className="mt-2 t-small text-muted transition-colors duration-500 group-hover:text-white/80">{t.desc}</p>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

export function MobileMedicalUnitHub() {
  return (
    <>
      <HubHero
        label="National Health Mission Aligned · CDSCO and ABDM Ready"
        title={
          <>
            Mobile Medical Units
            <br />
            Healthcare at Your Doorstep
          </>
        }
        intro={
          <>
            A Mobile Medical Unit (MMU) is a vehicle equipped to deliver healthcare, screening, diagnostics,
            consultations and basic treatment, directly to remote and under-served communities. Under India&apos;s
            National Health Mission, MMUs take care to the doorstep rather than asking patients to travel. Cloudspital
            equips MMUs with diagnostics and telemedicine for genuine point-of-care reach.
          </>
        }
        trust={[
          "NHM strategy aligned",
          "Telemedicine and tele ICU equipped",
          "Integrated POCT labs",
          "ABHA / eSanjeevani compatible",
        ]}
        secondary={{ href: "/mobile-medical-unit/specifications/", label: "See specifications" }}
        image={{
          src: "/images/products/cloudspital-mobile-medical-unit.webp",
          alt: "Cloudspital mobile medical unit",
          width: 1502,
          height: 927,
          onPanel: true,
        }}
      />

      <HubIndex groups={HUB_MAP} />

      <HubWhy
        label="Why Cloudspital MMUs"
        title="Equipping mobile clinics, for genuine point-of-care reach"
        body="Cloudspital customizes and equips Mobile Medical Units with lab-grade point-of-care diagnostics and video consultation channels."
        stats={STATS}
        tags={["NHM norms aligned", "CDSCO compliant", "ABDM ready", "ISO 13485", "eSanjeevani compatible"]}
        link={{ href: "/mobile-medical-unit/specifications/", label: "See vehicle specifications" }}
        features={FEATURES}
      />

      <MmuDuties />

      <HubCompare
        label="MMU vs Health Kiosk"
        title="Mobile Medical Unit vs Health Kiosk: Which to choose?"
        description="The core difference is mobility and staffing. Mobile Medical Units maximise reach; kiosks maximise availability at a single site. Large outreach programmes often combine both."
        columns={["Dimension", "Mobile Medical Unit", "Health Kiosk (ATM)"]}
        rows={COMPARE_DATA.map((r) => ({ label: r.label, values: [r.mmu, r.kiosk] }))}
        footnote="Active clinician led traveling outreach vs. Self service fixed hubs"
        link={{ href: "/mobile-medical-unit/vs-health-kiosk/", label: "Read the detailed MMU vs kiosk guide" }}
      />

      <ChooseGuide />

      <PlanTopics />

      <HubAllTopics hub={HUB} title="Everything about Mobile Medical Units" />

      <CtaBand
        title="Bring a Mobile Medical Unit to Your Region"
        description="Talk to our team about vehicle options, medical fit-outs, point-of-care setups, and custom pricing models."
      />
    </>
  );
}
