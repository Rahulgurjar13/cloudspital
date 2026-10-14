import {
  Activity,
  MapPin,
  Stethoscope,
  Building,
  Database,
  FileText,
  Shield,
  Layers,
  ClipboardCheck,
  Scale,
  Award,
} from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { HubHero, HubIndex, HubWhy, HubTopics, HubAllTopics } from "@/components/hub/HubKit";
import { Container, SectionHeader, NumberPill, IndexChip } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";

const HUB = "government-health-kiosk" as const;

const HUB_MAP = [
  {
    category: "Procurement",
    links: [
      { name: "GeM procurement guide", href: "/government-health-kiosk/gem-procurement-guide/" },
      { name: "Health kiosk tenders in India", href: "/government-health-kiosk/health-kiosk-tender-india/" },
    ],
  },
  {
    category: "Digital health integration",
    links: [
      { name: "Ayushman Bharat / ABHA integration", href: "/government-health-kiosk/ayushman-bharat-abha-integration/" },
      { name: "ABDM-compliant kiosks", href: "/government-health-kiosk/abdm-ndhm-compliant/" },
    ],
  },
  {
    category: "Regulatory",
    links: [{ name: "CDSCO and POCT licensing", href: "/government-health-kiosk/cdsco-poct-licensing/" }],
  },
  {
    category: "Settings",
    links: [
      { name: "For government hospitals", href: "/government-health-kiosk/for-government-hospitals/" },
      { name: "For Ayushman Arogya Mandirs", href: "/government-health-kiosk/ayushman-arogya-mandir/" },
    ],
  },
  {
    category: "By state",
    links: [
      { name: "Bihar deployments", href: "/government-health-kiosk/bihar/" },
      { name: "Uttar Pradesh", href: "/government-health-kiosk/uttar-pradesh/" },
      { name: "Uttarakhand / Jharkhand / West Bengal", href: "/government-health-kiosk/uttarakhand/" },
    ],
  },
];

const STATS = [
  { value: "90 Cr+", label: "ABHA Accounts crossed" },
  { value: "~95%", label: "GeM procurement purchases" },
  { value: "1.5 Lakh+", label: "Ayushman Arogya Mandirs" },
  { value: "31.8 Cr+", label: "eSanjeevani consults" },
];

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Official GeM Portal Listing",
    desc: "Cloudspital Health ATMs and telemedicine carts are fully listed on the Government e Marketplace (GeM) portal for direct purchase or tender bidding.",
  },
  {
    icon: Award,
    title: "CDSCO and ISO 13485 Compliant",
    desc: "Regulatory compliant manufacturing with ISO 13485 quality standard systems, ensuring CDSCO clearance for all integrated medical parameters.",
  },
  {
    icon: Activity,
    title: "ABHA and ABDM Integration",
    desc: "Native support for 14 digit ABHA creation, verification, and consent based health record sharing (ABDM compliant).",
  },
  {
    icon: MapPin,
    title: "Proven Public Deployments",
    desc: "Active public deployments with the Bihar Government health system, Indian Railways zonal divisions, and AIIMS Patna collaborative networks.",
  },
];

const STATE_DEPLOYS = [
  {
    name: "Bihar",
    slug: "bihar",
    h1: "Health Kiosk Bihar",
    context:
      "Bihar pioneered ABDM Scan and Share digital OPD registration. Strong local hook with tie to AIIMS Patna proximity.",
    proof:
      "Cloudspital Health ATMs and Tele PICU carts deployed pilot programs in coordination with regional community health centers.",
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    h1: "Health Kiosk Uttar Pradesh",
    context: "UP leads India in ABHA registrations (~14.3 crore), kiosks feeding that digital health momentum.",
    proof: "Active Cloudspital kiosk configurations deployed in key public OPD areas, including Greater Noida sites.",
  },
  {
    name: "Uttarakhand",
    slug: "uttarakhand",
    h1: "Health Kiosk Uttarakhand",
    context: "Hill and rural geographic access challenges. Setting requires rugged, remote connectivity.",
    proof:
      "Cloudspital tele ICU systems and POCT carts configured for remote district and sub district health centres.",
  },
  {
    name: "Jharkhand",
    slug: "jharkhand",
    h1: "Health Kiosk Jharkhand",
    context: "District hospital critical care gaps. Highly constrained specialist staffing ratios.",
    proof:
      "Tele ICU systems and telemetry integration deployed to bridge critical care requirements across state wards.",
  },
  {
    name: "West Bengal",
    slug: "west-bengal",
    h1: "Health Kiosk West Bengal",
    context: "Dense rural populations and heavy tertiary referral load on metropolitan medical centres.",
    proof: "Integrated diagnostic screening kiosks helping triage patient volume at grassroots sub centres.",
  },
];

const ABDM_BLOCKS = [
  { block: "ABHA", role: "The patient's 14-digit digital health ID", icon: Database },
  { block: "Health Facility Registry (HFR)", role: "Registers the physical facility/kiosk location", icon: Building },
  {
    block: "Healthcare Professionals Registry (HPR)",
    role: "Verifies the credentials of general clinicians and specialists involved",
    icon: ClipboardCheck,
  },
  {
    block: "Unified Health Interface (UHI)",
    role: "Enables national services like telemedicine consultations",
    icon: Activity,
  },
  { block: "Consent Framework", role: "Ensures secure, patient-controlled digital health data sharing", icon: Shield },
];

const KEY_TOPICS = [
  {
    slug: "gem-procurement-guide",
    title: "GeM Procurement Guide",
    desc: "How government buyers procure kiosks on GeM, listing steps, CDSCO guidelines, and ISO 13485 QMS rules.",
    icon: FileText,
  },
  {
    slug: "ayushman-bharat-abha-integration",
    title: "ABHA ID Integration",
    desc: "Learn how ABHA enabled kiosks link edge screenings to patients' consent based digital health history.",
    icon: Database,
  },
  {
    slug: "abdm-ndhm-compliant",
    title: "ABDM Compliant Kiosks",
    desc: "Understanding NDHM/ABDM building blocks and why compliance future proofs public sector deployments.",
    icon: Layers,
  },
  {
    slug: "cdsco-poct-licensing",
    title: "CDSCO and POCT Licensing",
    desc: "Understanding MDR 2017 risk classifications (Class A D) and CDSCO licensing for diagnostic medical devices.",
    icon: Scale,
  },
  {
    slug: "for-government-hospitals",
    title: "For Government Hospitals",
    desc: "Managing heavy OPD queues and staffing gaps in public hospitals through automated self service screening.",
    icon: Building,
  },
  {
    slug: "health-kiosk-tender-india",
    title: "Health Kiosk Tenders in India",
    desc: "Understanding eligibility, bidding, technical compliance criteria, and after sales support expectations.",
    icon: ClipboardCheck,
  },
];

/* ------------------------------------------------------------------ */
/* State by state context — one ruled row per state                    */
/* ------------------------------------------------------------------ */

function StateDeployments() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="State by State Context"
            title="Addressing regional public health needs: State Deployments"
            description="Each state in India has a unique public health landscape. Cloudspital matches localized digital initiatives, whether it is UP's record-setting ABHA registration or Bihar's pioneering Scan and Share OPD registry."
          />
        </Reveal>

        <Stagger className="mt-12 border-t border-line lg:mt-16">
          {STATE_DEPLOYS.map((s, i) => (
            <Item key={s.slug} className="grid gap-6 border-b border-line py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
              <div className="flex gap-6 lg:col-span-4">
                <NumberPill n={i + 1} />
                <div>
                  <p className="t-small uppercase text-muted">{s.h1}</p>
                  <h3 className="mt-2 t-h5 text-ink">{s.name} Public Health Profile</h3>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="t-body text-muted">{s.context}</p>
                <p className="mt-4 rounded-[20px] bg-mist p-5 t-body text-muted">
                  <strong className="font-normal text-ink">Cloudspital Alignment:</strong> {s.proof}
                </p>
              </div>
              <div className="flex items-start lg:col-span-3 lg:justify-end">
                <ArrowButton
                  href={`/government-health-kiosk/${s.slug}/`}
                  variant="outline"
                  size="sm"
                  aria-label={`View state-specific page: ${s.name}`}
                >
                  View state-specific page
                </ArrowButton>
              </div>
            </Item>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ABDM building blocks a kiosk touches — ruled cells on primary       */
/* ------------------------------------------------------------------ */

function AbdmBlocks() {
  return (
    <section className="bg-primary py-20 text-white lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            onDark
            label="ABDM Integration"
            title="Interoperable digital care: ABDM Building Blocks"
            description="ABDM is built on interoperability and consent. An ABDM-compliant health kiosk touches multiple core registries to ensure data captures feed the national health ecosystem."
          />
        </Reveal>

        <Stagger className="mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {ABDM_BLOCKS.map((b, i) => {
            const BIcon = b.icon;
            return (
              <Item
                key={b.block}
                className={`flex flex-col gap-6 border-b border-r border-white/25 p-6 sm:p-8 lg:min-h-[240px] ${
                  i === ABDM_BLOCKS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <IndexChip n={i + 1} />
                  <BIcon className="h-5 w-5 text-white/70" />
                </div>
                <div className="mt-auto">
                  <h3 className="t-h6 text-white">{b.block}</h3>
                  <p className="mt-2 t-body text-white/75">{b.role}</p>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

export function GovernmentHub() {
  return (
    <>
      <HubHero
        label="GeM listed · CDSCO compliant · ABDM/ABHA Ready"
        title={
          <>
            Health Kiosks for
            <br />
            Government and Public Health
          </>
        }
        intro={
          <>
            Cloudspital supplies health ATM kiosks, telemedicine, and tele-ICU systems to India&apos;s public health
            system, government hospitals, primary health centres (PHCs), and Ayushman Arogya Mandirs. Public-sector
            deployment runs through GeM procurement, requires CDSCO compliance, and increasingly expects ABHA/ABDM
            integration.
          </>
        }
        trust={["GeM listed configurations", "CDSCO and ISO compliant", "ABHA / ABDM integrated", "National health rail ready"]}
        secondary={{ href: "/government-health-kiosk/gem-procurement-guide/", label: "GeM Procurement Guide" }}
        image={{
          src: "/images/products/cloudspital-health-atm-kiosk.webp",
          alt: "Cloudspital self-service health station for public health deployments",
          width: 1024,
          height: 1536,
        }}
      />

      <HubIndex groups={HUB_MAP} />

      <HubWhy
        label="Why Public Buyers Choose Us"
        title="Compliant digital health, scaled for national rails"
        body="Cloudspital manufactures CDSCO-compliant, GeM-listed kiosks and carts designed to plug directly into ABDM and eSanjeevani."
        stats={STATS}
        tags={["GeM-listed", "ABDM compliant", "CDSCO certified", "ISO 13485", "eSanjeevani ready"]}
        link={{ href: "/government-health-kiosk/gem-procurement-guide/", label: "See GeM listing details" }}
        features={FEATURES}
      />

      <StateDeployments />

      <AbdmBlocks />

      <HubTopics
        label="Plan and Procure"
        title="Procurement and integration, mapped step by step"
        topics={KEY_TOPICS.map((t) => ({ ...t, href: `/${HUB}/${t.slug}/` }))}
      />

      <HubAllTopics hub={HUB} title="Everything about Government and Public Health Deployments" />

      <CtaBand
        title="Bring Compliant Digital Screening to Your Facility"
        description="Talk to our team about GeM listings, custom tender specifications, ABDM sandboxing, and CDSCO compliance documents."
      />
    </>
  );
}
