import {
  Activity,
  Cpu,
  MapPin,
  Stethoscope,
  Building,
  Check,
  Laptop2,
  ShoppingBag,
  ArrowLeftRight,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { HubHero, HubIndex, HubWhy, HubCompare, HubTopics, HubAllTopics } from "@/components/hub/HubKit";

const HUB = "telemedicine" as const;

const HUB_MAP = [
  {
    category: "Learn",
    links: [
      { name: "What is a telemedicine cart?", href: "/telemedicine/what-is-a-telemedicine-cart/" },
      { name: "Point-of-care testing (POCT)", href: "/telemedicine/point-of-care-testing/" },
      { name: "Portable telemedicine bag", href: "/telemedicine/portable-telemedicine-bag/" },
    ],
  },
  {
    category: "Integrate and deploy",
    links: [
      { name: "eSanjeevani integration", href: "/telemedicine/esanjeevani-integration/" },
      { name: "Telemedicine for PHCs", href: "/telemedicine/for-phc/" },
    ],
  },
  {
    category: "Compare",
    links: [{ name: "Telemedicine cart vs health kiosk", href: "/telemedicine/cart-vs-health-kiosk/" }],
  },
];

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Medsync Telemedicine Carts",
    desc: "A comprehensive range of mobile carts and portable bags (Models I VI) that pack clinical screens, camera feeds, and diagnostics into a single deployable kit.",
  },
  {
    icon: Activity,
    title: "eSanjeevani and ABHA Ready",
    desc: "On device software aligning patient workflows with government systems, supporting eSanjeevani teleconsultation and ABDM/ABHA electronic records.",
  },
  {
    icon: Cpu,
    title: "Point of Care Testing (POCT)",
    desc: "Seamless integration of medical devices and blood strips to stream vital diagnostics like blood sugar, hemoglobin, lipids, and ECG.",
  },
  {
    icon: MapPin,
    title: "PHC and MMU Deployment",
    desc: "Active public health deployments, enabling remote sub centres and mobile medical units to operate as data rich health hubs.",
  },
];

const STATS = [
  { value: "31.8 Cr+", label: "eSanjeevani consults" },
  { value: "2020 Rules", label: "Compliant guidelines" },
  { value: "ISO and CDSCO", label: "Certified quality" },
  { value: "15+ States", label: "Active field presence" },
];

const POCT_GROUPS = [
  { type: "Metabolic", examples: "Blood glucose, HbA1c, lipid profile" },
  { type: "Haematology", examples: "Haemoglobin" },
  { type: "Cardiac", examples: "Some cardiac markers" },
  { type: "Vitals-linked", examples: "SpO₂, BP (device based)" },
  { type: "Infectious disease", examples: "Rapid antigen/antibody tests" },
];

const POCT_BENEFITS = [
  { title: "Speed", desc: "Results in minutes, not days, enabling immediate clinical decisions." },
  { title: "Access", desc: "Brings diagnostics directly to rural and remote settings without a lab." },
  { title: "Action", desc: "Lets a teleconsulting doctor decide and prescribe during a single visit." },
  { title: "Continuity", desc: "All diagnostic results are digitally linked to the patient's ABHA/EHR." },
];

const COMPARE_DATA = [
  { label: "Operated by", cart: "Clinician / health worker", kiosk: "The patient (self service)" },
  { label: "Mobility", cart: "Mobile, taken to patient", kiosk: "Usually fixed installation" },
  { label: "Primary use", cart: "Assisted exam + teleconsult", kiosk: "Self screening + triage" },
  { label: "Best settings", cart: "Wards, PHCs, camps, home visits", kiosk: "OPDs, corporates, public spaces" },
  { label: "Interaction", cart: "Guided clinical examination", kiosk: "Self guided screening" },
];

const CHOOSE = [
  {
    icon: ShoppingBag,
    title: "Choose a Cart",
    desc: "If you need a remote doctor to actively examine patients with local nursing assistance at the bedside, in wards, PHCs, or during home outreach visits.",
  },
  {
    icon: Building,
    title: "Choose a Kiosk",
    desc: "If you require high-volume self-screening and triage in high-footfall public places, corporate lobbies, pharmacy stores, or hospital OPD waiting rooms.",
  },
];

const KEY_TOPICS = [
  {
    slug: "what-is-a-telemedicine-cart",
    title: "What is a Telemedicine Cart?",
    desc: "Explore the typical components, medical devices, and clinic settings for mobile telemedicine carts.",
    icon: Laptop2,
  },
  {
    slug: "point-of-care-testing",
    title: "Point of Care Testing (POCT)",
    desc: "Learn how instant diagnostic test strips bring metabolic and hematology labs to the patient's bedside.",
    icon: Activity,
  },
  {
    slug: "portable-telemedicine-bag",
    title: "Portable Telemedicine Bag",
    desc: "Compact, carry anywhere kits containing tablets, vitals monitors, and diagnostic tools for field outreach.",
    icon: ShoppingBag,
  },
  {
    slug: "esanjeevani-integration",
    title: "eSanjeevani Integration",
    desc: "Aligning edge screening devices with national government teleconsultation portals and ABHA identity.",
    icon: Link2,
  },
  {
    slug: "for-phc",
    title: "Telemedicine for PHCs",
    desc: "How primary health centres deploy digital networks to offer specialist consults and bypass unnecessary referrals.",
    icon: MapPin,
  },
  {
    slug: "cart-vs-health-kiosk",
    title: "Cart vs. Health Kiosk",
    desc: "Compare guided clinical examination carts against self guided self service screening kiosks side by side.",
    icon: ArrowLeftRight,
  },
];

/* Point-of-care diagnostics — test groups + why it matters (no HubKit equivalent). */
function PoctDiagnostics() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="Point of Care Testing (POCT)"
            title="Lab diagnostics performed at the bedside, in minutes"
            description="Point-of-care testing is diagnostic testing performed at or near the patient, at the bedside, in a clinic, or inside a health kiosk, instead of sending samples to a central lab. It delivers results in minutes, enabling immediate decisions, and is central to making telemedicine and health kiosks genuinely useful."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
          <Stagger className="border-t border-line lg:col-span-7">
            {POCT_GROUPS.map((g, i) => (
              <Item
                key={g.type}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.3fr)] sm:items-baseline sm:gap-6"
              >
                <span className="t-small text-faint">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h5 text-ink">{g.type}</h3>
                <p className="t-body text-muted">{g.examples}</p>
              </Item>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="rounded-[20px] bg-ink p-6 text-white sm:p-8 lg:col-span-4 lg:col-start-9">
            <h3 className="t-h5 text-white">Why POCT matters</h3>
            <ul className="mt-6 border-t border-white/15">
              {POCT_BENEFITS.map((b) => (
                <li key={b.title} className="flex gap-4 border-b border-white/15 py-5 last:border-b-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </span>
                  <div>
                    <h4 className="t-h6 text-white">{b.title}</h4>
                    <p className="mt-1 t-small text-white/70">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* "How to choose" + the guide link — sits directly under the cart vs kiosk table. */
function HowToChoose() {
  return (
    <section className="-mt-14 pb-20 lg:-mt-24 lg:pb-[120px]">
      <Container>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {CHOOSE.map((c) => {
            const Icon = c.icon;
            return (
              <Item key={c.title} className="flex h-full flex-col rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 t-h5 text-ink">{c.title}</h3>
                <p className="mt-2 t-body text-muted">{c.desc}</p>
              </Item>
            );
          })}
          <Item className="sm:col-span-2">
            <Link
              href="/telemedicine/cart-vs-health-kiosk/"
              className="group flex items-center justify-between gap-6 rounded-[20px] bg-white p-6 transition-colors duration-500 ease-out-soft hover:bg-primary sm:px-8"
            >
              <span className="t-h6 text-ink transition-colors duration-500 group-hover:text-white">
                Read the detailed cart vs kiosk guide
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </Link>
          </Item>
        </Stagger>
      </Container>
    </section>
  );
}

export function TelemedicineHub() {
  return (
    <>
      <HubHero
        label="eSanjeevani Ready · ABDM and ABHA Compliant"
        title="Telemedicine Solutions Built for India"
        intro="Telemedicine is the delivery of healthcare at a distance using digital communication, letting a patient consult a doctor by video, share live vitals, and receive a prescription without travelling. Cloudspital builds telemedicine carts, portable units, and point-of-care systems that bring doctor access to PHCs, rural camps, and hospitals across India."
        trust={["Medsync series carts", "eSanjeevani integrated", "ABHA / ABDM compliant", "Point of care ready"]}
        secondary={{ href: "/telemedicine/cart-vs-health-kiosk/", label: "Compare Carts vs Kiosks" }}
        image={{
          src: "/images/products/cloudspital-smart-health-kiosk.png",
          alt: "Cloudspital Smart Health Pod for remote doctor consultation",
          width: 1067,
          height: 1474,
        }}
      />

      <HubIndex groups={HUB_MAP} />

      <HubWhy
        title="Certified telemedicine hardware, engineered for any location"
        body="Cloudspital manufactures certified telemedicine carts, portable bags, and POCT systems to enable remote doctor consultations and instant lab-grade testing."
        stats={STATS}
        tags={["eSanjeevani aligned", "ABDM compliant", "CDSCO certified", "ISO 13485", "GeM listed"]}
        link={{ href: "/telemedicine/point-of-care-testing/", label: "Learn about POCT integration" }}
        features={FEATURES}
      />

      <PoctDiagnostics />

      <HubCompare
        label="Cart vs Health Kiosk"
        title="Telemedicine Cart vs Health Kiosk: Which do you need?"
        description="The difference is who operates it and where it fits. Carts suit wards, PHCs and outreach; kiosks suit high-footfall public screening. Cloudspital provides both options, so buyers can mix per setting."
        columns={["Dimension", "Telemedicine Cart", "Health Kiosk (ATM)"]}
        rows={COMPARE_DATA.map((r) => ({ label: r.label, values: [r.cart, r.kiosk] }))}
        footnote="Guided clinician examinations vs. Patient self guided screenings"
      />
      <HowToChoose />

      <HubTopics
        label="Plan and Deploy"
        title="Telemedicine resources, mapped step by step"
        topics={KEY_TOPICS.map((t) => ({ ...t, href: `/${HUB}/${t.slug}/` }))}
      />

      <HubAllTopics hub={HUB} title="Everything about Telemedicine and Point-of-Care" />

      <CtaBand
        title="Bring Telemedicine to Your Community"
        description="Talk to our team about telemedicine carts, portable bags, and eSanjeevani setups for clinics, corporates, panchayats, and public health programs."
      />
    </>
  );
}
