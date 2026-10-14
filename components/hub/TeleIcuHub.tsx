import {
  HeartPulse,
  Activity,
  Cpu,
  MapPin,
  Stethoscope,
  FileText,
  Baby,
  Shield,
  TrendingUp,
  Laptop2,
  AlertCircle,
  Layers,
} from "lucide-react";
import { HubHero, HubIndex, HubWhy, HubSteps, HubCompare, HubTopics, HubAllTopics } from "@/components/hub/HubKit";
import { CtaBand } from "@/components/ui/CtaBand";

const HUB = "tele-icu" as const;

const HUB_MAP = [
  {
    category: "Start here",
    links: [
      { name: "What is tele-ICU?", href: "/tele-icu/what-is-tele-icu/" },
      { name: "How tele-ICU works", href: "/tele-icu/how-tele-icu-works/" },
    ],
  },
  {
    category: "Compare",
    links: [{ name: "Tele-ICU vs tele-PICU", href: "/tele-icu/tele-icu-vs-tele-picu/" }],
  },
  {
    category: "Paediatric",
    links: [{ name: "Tele-PICU explained", href: "/tele-icu/tele-picu-pediatric/" }],
  },
  {
    category: "Models and infrastructure",
    links: [
      { name: "Hub-and-spoke model", href: "/tele-icu/hub-and-spoke-model/" },
      { name: "Equipment list", href: "/tele-icu/equipment-list/" },
      { name: "Remote patient monitoring", href: "/tele-icu/remote-patient-monitoring/" },
    ],
  },
  {
    category: "Plan a deployment",
    links: [
      { name: "Tele-ICU for rural hospitals", href: "/tele-icu/for-rural-hospitals/" },
      { name: "Setup cost in India", href: "/tele-icu/setup-cost-india/" },
    ],
  },
  {
    category: "Proof",
    links: [{ name: "AIIMS-Patna tele-PICU case study", href: "/tele-icu/aiims-patna-tele-picu/" }],
  },
];

const FEATURES = [
  {
    icon: Stethoscope,
    title: "Medsync Series Bedside Carts",
    desc: "Certified, cart integrated tele ICU units (Medsync III, V, and VI) bundling clinical IoT gateways, PTZ camera telemetry, and vitals streaming.",
  },
  {
    icon: HeartPulse,
    title: "AIIMS Patna Protocol Design",
    desc: "Pediatric and adult Tele ICU protocols co developed with leading intensivists, ensuring standardized, highly precise remote oversight.",
  },
  {
    icon: Shield,
    title: "CDSCO and ISO 13485 Compliant",
    desc: "Rigorous quality management systems and CDSCO compliant manufacturing for absolute clinical reliability in ICU wards.",
  },
  {
    icon: MapPin,
    title: "Multi State Deployments",
    desc: "Active clinical integrations across multiple states, enabling rural district spokes to feed real time telemetry feeds back to central hubs.",
  },
];

const STATS = [
  { value: "24/7/365", label: "Continuous Oversight" },
  { value: "~80%", label: "Specialist Shortfall Solved" },
  { value: "15+", label: "Vitals parameters streamed" },
  { value: "AIIMS", label: "Validated clinical protocols" },
];

const STEPS = [
  { icon: Laptop2, title: "Capture", desc: "Bedside monitors, ventilators, and infusion pumps record live clinical vitals." },
  { icon: Activity, title: "Transmit", desc: "Live vital feeds and HD camera feeds travel over a secure, high bandwidth link." },
  { icon: Cpu, title: "Analyse", desc: "Software aggregates parameters and runs early warning algorithms to detect risks." },
  { icon: AlertCircle, title: "Alert", desc: "When thresholds trip, the remote specialist command center is alerted instantly." },
  { icon: Stethoscope, title: "Intervene", desc: "Remote specialists review feeds, consult on site staff via video, and guide care." },
  { icon: FileText, title: "Document", desc: "Actions and treatment plans sync directly to the patient's record for audit." },
];

const COMPARE_DATA = [
  { label: "Patient Group", icu: "Adults", picu: "Infants, children, adolescents" },
  { label: "Required Specialist", icu: "Adult intensivist", picu: "Paediatric intensivist" },
  { label: "Vital Sign Norms", icu: "Standard adult ranges", picu: "Age- and weight dependent ranges" },
  { label: "Drug Dosing", icu: "Largely fixed", picu: "Weight based, narrow safety margins" },
  { label: "Deterioration Pattern", icu: "Often gradual", picu: "Can be rapid; patient compensates then crashes" },
  { label: "Ward Equipment", icu: "Standard adult cuffs, probes", picu: "Paediatric and neonatal sized sensors" },
  { label: "Scope Overlaps", icu: "Standard adult ICUs", picu: "Covers neonatal units (tele NICU newborns)" },
];

const KEY_TOPICS = [
  {
    slug: "what-is-tele-icu",
    title: "What is Tele ICU?",
    desc: "Understand the core definition, clinical benefits, and how remote ICU networks operate.",
    icon: Stethoscope,
  },
  {
    slug: "how-tele-icu-works",
    title: "How Tele ICU Works",
    desc: "A detailed breakdown of capture, transmission, software analytics, alerts, and intervention workflows.",
    icon: Activity,
  },
  {
    slug: "hub-and-spoke-model",
    title: "Hub and Spoke ICU Model",
    desc: "Explore how a central command hub links with regional spoke hospitals to scale expertise.",
    icon: Layers,
  },
  {
    slug: "for-rural-hospitals",
    title: "Tele ICU for Rural Hospitals",
    desc: "Bridging the specialist deficit in rural and district communities to improve critical care access.",
    icon: MapPin,
  },
  {
    slug: "tele-picu-pediatric",
    title: "Pediatric Tele PICU",
    desc: "Specialized systems engineered for young children, toddlers, and infant intensive care units.",
    icon: Baby,
  },
  {
    slug: "setup-cost-india",
    title: "Tele ICU Setup Cost in India",
    desc: "Check budget models, pricing tiers, hardware packages, and ongoing telemetry cost drivers.",
    icon: TrendingUp,
  },
];

export function TeleIcuHub() {
  return (
    <>
      <HubHero
        label="AIIMS Protocols · CDSCO Compliant"
        title="Tele-ICU and Tele-PICU: Remote Critical Care"
        intro={
          <>
            Tele-ICU brings intensive-care expertise to hospitals that lack it, letting specialist doctors monitor
            critically ill patients remotely through live vitals, video, and analytics, around the clock. Cloudspital
            builds tele-ICU and tele-PICU (paediatric) systems designed for India&apos;s district, rural, and tertiary
            hospitals.
          </>
        }
        trust={["24/7 Vitals Streaming", "AIIMS co developed", "CDSCO and ISO compliant", "Made in India"]}
        stats={STATS}
      />

      <HubIndex groups={HUB_MAP} />

      <HubWhy
        title="Tier-1 Intensivist Care, extended to any ICU bed"
        body="Cloudspital delivers end-to-end Tele-ICU/Tele-PICU systems. We manufacture spoke hardware, deploy clinical IoT software, and interface with command centers."
        tags={["AIIMS co-developed", "CDSCO compliant", "ISO 13485", "GeM listed", "HL7 compatible"]}
        link={{ href: "/tele-icu/equipment-list/", label: "See equipment checklist" }}
        features={FEATURES}
      />

      <HubSteps
        title="Continuous remote critical care in six workflow steps"
        steps={STEPS}
        link={{ href: "/tele-icu/how-tele-icu-works/", label: "See the detailed workflow" }}
      />

      <HubCompare
        label="Tele ICU vs Tele PICU"
        title="Clinically tailored care: What's the difference?"
        description="Children are not small adults. Pediatric patients require child-specific dosing algorithms, vital-sign baselines, and quick escalation protocols."
        columns={["Dimension", "Tele ICU (Adult)", "Tele PICU (Paediatric)"]}
        rows={COMPARE_DATA.map((r) => ({ label: r.label, values: [r.icu, r.picu] }))}
        footnote="Cloudspital provides specialized modules for both protocols"
        link={{ href: "/tele-icu/tele-icu-vs-tele-picu/", label: "Read the clinical distinction guide" }}
      />

      <HubTopics
        label="Plan and Deploy"
        title="Critical care resources, mapped step by step"
        topics={KEY_TOPICS.map((t) => ({ ...t, href: `/${HUB}/${t.slug}/` }))}
      />

      <HubAllTopics hub={HUB} title="Everything about Tele-ICU and Tele-PICU" />

      <CtaBand
        title="Bring Tele-ICU Capability to Your Hospital"
        description="Talk to our clinical engineering team about Medsync hardware configurations, pricing, and integration with your command center."
      />
    </>
  );
}
