import {
  HeartPulse,
  Activity,
  Cpu,
  MapPin,
  Stethoscope,
  Building,
  Database,
  Fingerprint,
  FileText,
  Briefcase,
  Baby,
  Smile,
  Video,
  PersonStanding,
  Droplet,
} from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { HubHero, HubWhy, HubSteps, HubCompare, HubTopics, HubAllTopics } from "@/components/hub/HubKit";

const HUB = "health-atm-kiosk" as const;

const FEATURES = [
  {
    icon: HeartPulse,
    title: "AIIMS grade clinical protocols",
    desc: "Screening workflows co developed with AIIMS clinicians for reliable, comparable results every time.",
  },
  {
    icon: Cpu,
    title: "AI assisted triage",
    desc: "On device intelligence flags abnormal vitals and routes urgent cases straight to a doctor.",
  },
  {
    icon: Database,
    title: "Paperless, ABHA linked records",
    desc: "Every test links to the patient's ABHA ID, turning a one off screening into a longitudinal history.",
  },
  {
    icon: MapPin,
    title: "Built for the last mile",
    desc: "Rugged, low bandwidth hardware that runs in PHCs, panchayats and rural health camps.",
  },
  {
    icon: Video,
    title: "True Tele ICU Integration",
    desc: "True Tele ICU and tele PICU capabilities that allow remote specialists to inspect cases immediately.",
  },
];

const STATS = [
  { value: "50+", label: "Parameters screened" },
  { value: "~5 min", label: "Full report" },
  { value: "100%", label: "Staff free operation" },
  { value: "ABHA", label: "Health ID linked" },
];

const STEPS = [
  {
    icon: Fingerprint,
    title: "Identify",
    desc: "Walk up and verify with an ABHA ID, mobile number or face, no staff needed.",
  },
  {
    icon: Activity,
    title: "Measure",
    desc: "Integrated sensors capture vitals, body composition and ECG automatically.",
  },
  {
    icon: Stethoscope,
    title: "Test",
    desc: "Rapid point of care strips run blood sugar, lipids, haemoglobin and more.",
  },
  {
    icon: FileText,
    title: "Report",
    desc: "A doctor ready report prints and syncs to the cloud, with teleconsult on tap.",
  },
];

const PARAM_GROUPS = [
  {
    icon: HeartPulse,
    title: "Vitals",
    items: ["Blood pressure", "Pulse rate", "SpO₂", "Temperature", "Respiration"],
  },
  {
    icon: PersonStanding,
    title: "Body composition",
    items: ["Height and weight", "BMI", "Body fat %", "Muscle and water", "Visceral fat"],
  },
  {
    icon: Activity,
    title: "Cardiac and lung",
    items: ["12-lead ECG", "Heart rate variability", "Spirometry"],
  },
  {
    icon: Droplet,
    title: "Rapid blood tests",
    items: ["Blood glucose", "Lipid profile", "Haemoglobin", "HbA1c", "Uric acid"],
  },
];

const USE_CASES = [
  {
    slug: "for-rural-healthcare",
    title: "Rural healthcare and PHCs",
    desc: "Bring screening to villages and primary health centres with low bandwidth kiosks.",
    icon: MapPin,
  },
  {
    slug: "for-corporate-wellness",
    title: "Corporate wellness",
    desc: "On site annual health checks and wellness drives for employees.",
    icon: Briefcase,
  },
  {
    slug: "for-railway-stations",
    title: "Railway stations",
    desc: "High footfall public screening for commuters and travellers.",
    icon: Building,
  },
  {
    slug: "for-schools",
    title: "Schools (Parvarish)",
    desc: "Routine paediatric growth and vitals monitoring for students.",
    icon: Baby,
  },
  {
    slug: "for-pharmacies",
    title: "Pharmacies",
    desc: "Turn any pharmacy into a mini health check point and add footfall.",
    icon: Activity,
  },
  {
    slug: "for-old-age-homes",
    title: "Old age homes",
    desc: "Frequent, gentle monitoring of vitals for elderly residents.",
    icon: Smile,
  },
];

const COMPARE = [
  { label: "Time to report", atm: "~5 minutes", trad: "1–3 days" },
  { label: "Appointment", atm: "Walk up, 24×7", trad: "Pre booked, queues" },
  { label: "Travel", atm: "At your doorstep", trad: "Trip to the lab" },
  { label: "Cost", atm: "Fraction of a panel", trad: "Multiple test fees" },
  { label: "Records", atm: "Digital, ABHA linked", trad: "Paper, scattered" },
];

/* What it measures — four screening panels (no HubKit equivalent). */
function Parameters() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="What it measures"
            title="50+ parameters across four screening panels"
            action={
              <ArrowButton href="/health-atm-kiosk/parameters-tested/" variant="outline" size="sm">
                View the full parameter list
              </ArrowButton>
            }
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {PARAM_GROUPS.map((g) => {
            const Icon = g.icon;
            return (
              <Item key={g.title} className="flex h-full flex-col rounded-[20px] bg-canvas p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-line bg-white px-3 py-1 t-small text-muted">
                    {g.items.length} tests
                  </span>
                </div>
                <h3 className="mt-10 t-h5 text-ink">{g.title}</h3>
                <ul className="mt-5 border-t border-line">
                  {g.items.map((it) => (
                    <li key={it} className="border-b border-line py-3 t-body text-muted">
                      {it}
                    </li>
                  ))}
                </ul>
              </Item>
            );
          })}
        </Stagger>

        <Reveal className="mt-3 flex flex-col items-start gap-6 rounded-[20px] bg-mist p-6 sm:p-8 lg:mt-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="flex items-baseline gap-3">
              <span className="t-h4 text-ink">50+</span>
              <span className="t-small uppercase text-muted">parameters</span>
            </p>
            <p className="t-body text-muted sm:border-l sm:border-line sm:pl-8">
              Results in <span className="text-ink">~5 minutes</span> · Doctor-ready report
            </p>
          </div>
          <ArrowButton href="/health-atm-kiosk/price-in-india/" variant="outline" size="sm">
            See pricing
          </ArrowButton>
        </Reveal>
      </Container>
    </section>
  );
}

export function HealthAtmHub() {
  return (
    <>
      <HubHero
        label="AIIMS Protocols · CDSCO Compliant"
        title="Health ATM Kiosk: Healthcare in Minutes"
        intro="A Health ATM (also called a health kiosk) is a self-service medical station that screens a range of vital and metabolic parameters blood pressure, BMI, blood sugar, ECG, SpO₂ and more, in minutes, then links the user to a doctor via telemedicine. Cloudspital builds CDSCO-compliant Health ATMs for hospitals, PHCs, corporates and rural communities."
        trust={["ABDM / ABHA ready", "GeM listed", "ISO and CE certified", "Made in India"]}
        image={{
          src: "/images/products/cloudspital-health-atm-kiosk.webp",
          alt: "Cloudspital Health ATM kiosk",
          width: 1024,
          height: 1536,
        }}
      />

      <HubWhy
        title="Hospital-grade screening, where hospitals can't reach"
        body={
          <>
            The kiosk packs a clinic&apos;s worth of diagnostics into a walk-up station, accurate, compliant and built
            to run far from a hospital.
            <span className="mt-6 block border-t border-line pt-5 t-body">
              <strong className="font-normal text-ink">Proven Deployments:</strong> Bihar Govt public health systems,
              Indian Railways zonal divisions, and AIIMS-Patna.
            </span>
          </>
        }
        stats={STATS}
        tags={["AIIMS co-developed", "CDSCO approved", "ABDM ready", "GeM listed", "ISO 13485"]}
        link={{ href: "/health-atm-kiosk/benefits/", label: "See all benefits" }}
        features={FEATURES}
      />

      <HubSteps
        title="A full check-up in four simple steps"
        steps={STEPS}
        link={{ href: "/health-atm-kiosk/how-does-a-health-atm-work/", label: "See the full workflow" }}
      />

      <Parameters />

      <HubTopics
        label="Where it's deployed"
        title="One kiosk, many places that need care"
        topics={USE_CASES.map((u) => ({ ...u, href: `/${HUB}/${u.slug}/` }))}
      />

      <HubCompare
        label="Health ATM vs traditional check up"
        title="Faster, closer and cheaper"
        columns={["", "Traditional lab", "Health ATM"]}
        rows={COMPARE.map((r) => ({ label: r.label, values: [r.trad, r.atm] }))}
        footnote="Health ATM wins on every metric"
        link={{ href: "/health-atm-kiosk/vs-traditional-health-checkup/", label: "Read the full comparison" }}
      />

      <HubAllTopics hub={HUB} title="Everything about Health ATM kiosks" />

      <CtaBand
        title="Bring a Health ATM to Your Community"
        description="Talk to our team about kiosks for clinics, corporates, panchayats and government health programs, pricing, specs and a live demo."
      />
    </>
  );
}
