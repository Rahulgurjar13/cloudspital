// Diagnostic test catalog — sourced from the HealthMatrix / Insta Health Point
// catalog. Prices are deliberately NOT stored here: this page lists what each
// test is for, never what it costs.
import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Droplet,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Shield,
  AlertTriangle,
  FlaskConical,
  Dna,
  Beaker,
  Atom,
  Bone,
  Gauge,
  CircleDot,
  Heart,
  ClipboardList,
  Syringe,
  Navigation,
  Cog,
  Zap,
  Feather,
  Leaf,
  Activity,
  Waves,
  Flame,
  Bug,
  Microscope,
  Sun,
  Baby,
  Thermometer,
  Ribbon,
  TestTube,
  TestTubes,
} from "lucide-react";

export type CategoryKey =
  | "biochemistry"
  | "immunoassay"
  | "rapid"
  | "strip";

export interface TestCategory {
  key: CategoryKey;
  label: string;
  tagline: string;
}

export const CATEGORIES: TestCategory[] = [
  {
    key: "biochemistry",
    label: "Biochemistry",
    tagline: "Liver, kidney, lipids, glucose & bundled panels",
  },
  {
    key: "immunoassay",
    label: "Immunoassay",
    tagline: "Diabetes, thyroid, cardiac & inflammatory markers",
  },
  {
    key: "rapid",
    label: "Rapid Tests",
    tagline: "Fast antigen & antibody screening for infections",
  },
  {
    key: "strip",
    label: "Strip-Based",
    tagline: "Quick bedside point-of-care diagnostics",
  },
];

export interface Test {
  name: string;
  desc: string;
  category: CategoryKey;
  group: string;
  icon: LucideIcon;
  panel?: boolean; // bundled panel — highlighted differently
}

export const TESTS: Test[] = [
  /* ---------------- BIOCHEMISTRY — individual ---------------- */
  {
    name: "Cholesterol",
    desc: "Measures total blood cholesterol; a key indicator of cardiovascular risk and metabolic health.",
    category: "biochemistry",
    group: "Lipid Profile",
    icon: HeartPulse,
  },
  {
    name: "Triglycerides",
    desc: "Measures fat in the blood; elevated levels signal heart disease and pancreatitis risk.",
    category: "biochemistry",
    group: "Lipid Profile",
    icon: Droplet,
  },
  {
    name: "HDL Cholesterol",
    desc: "The 'good' cholesterol that protects the heart by removing excess cholesterol.",
    category: "biochemistry",
    group: "Lipid Profile",
    icon: ShieldCheck,
  },
  {
    name: "LDL Cholesterol",
    desc: "The 'bad' cholesterol; high levels lead to plaque build-up and atherosclerosis.",
    category: "biochemistry",
    group: "Lipid Profile",
    icon: AlertTriangle,
  },
  {
    name: "Bilirubin Total",
    desc: "Indicates liver function and red blood cell breakdown; high levels cause jaundice.",
    category: "biochemistry",
    group: "Liver",
    icon: FlaskConical,
  },
  {
    name: "Bilirubin Direct",
    desc: "Conjugated bilirubin; specifically diagnoses liver disease and bile duct obstruction.",
    category: "biochemistry",
    group: "Liver",
    icon: Droplets,
  },
  {
    name: "Total Protein",
    desc: "Measures all proteins in blood; assesses nutrition, kidney, and liver health.",
    category: "biochemistry",
    group: "Proteins",
    icon: Dna,
  },
  {
    name: "Albumin",
    desc: "Major plasma protein; low levels indicate liver disease, kidney disease, or malnutrition.",
    category: "biochemistry",
    group: "Proteins",
    icon: Beaker,
  },
  {
    name: "SGOT (AST)",
    desc: "Liver enzyme; elevated levels signal liver damage, hepatitis, or muscle injury.",
    category: "biochemistry",
    group: "Liver Enzymes",
    icon: Atom,
  },
  {
    name: "SGPT (ALT)",
    desc: "The most specific liver enzyme; the gold-standard marker for liver cell injury.",
    category: "biochemistry",
    group: "Liver Enzymes",
    icon: Atom,
  },
  {
    name: "Alkaline Phosphatase",
    desc: "Enzyme from liver and bone; elevated in liver disease and bone disorders.",
    category: "biochemistry",
    group: "Liver Enzymes",
    icon: Bone,
  },
  {
    name: "Enzymatic Creatinine",
    desc: "Key kidney function marker; assesses how well kidneys filter waste from blood.",
    category: "biochemistry",
    group: "Kidney",
    icon: Gauge,
  },
  {
    name: "Uric Acid",
    desc: "Indicates kidney function and gout risk; high levels cause joint pain and stones.",
    category: "biochemistry",
    group: "Kidney",
    icon: Bone,
  },
  {
    name: "Urea (BUN)",
    desc: "Waste product filtered by kidneys; a key marker for kidney function and hydration.",
    category: "biochemistry",
    group: "Kidney",
    icon: Droplet,
  },
  {
    name: "Glucose (Fasting/PP)",
    desc: "Blood sugar measurement; the primary test for diabetes screening and management.",
    category: "biochemistry",
    group: "Glucose",
    icon: CircleDot,
  },
  {
    name: "Calcium",
    desc: "Essential mineral; assesses bone health, parathyroid function, and muscle activity.",
    category: "biochemistry",
    group: "Minerals",
    icon: Bone,
  },

  /* ---------------- BIOCHEMISTRY — bundled panels ---------------- */
  {
    name: "Lipid Profile (Full)",
    desc: "Complete cardiac-risk panel: total cholesterol, HDL, LDL and triglycerides in one test.",
    category: "biochemistry",
    group: "Bundled Panel",
    icon: Heart,
    panel: true,
  },
  {
    name: "Liver Function Test (LFT)",
    desc: "Comprehensive liver panel covering enzymes, proteins and bilirubin in a single test.",
    category: "biochemistry",
    group: "Bundled Panel",
    icon: ClipboardList,
    panel: true,
  },
  {
    name: "Kidney Function Test (KFT)",
    desc: "Bundled kidney panel covering urea, creatinine, uric acid and electrolytes.",
    category: "biochemistry",
    group: "Bundled Panel",
    icon: ClipboardList,
    panel: true,
  },
  {
    name: "CBC — 5-Part Differential",
    desc: "Complete Blood Count with 5-part WBC differential; screens for infection, anemia and leukemia.",
    category: "biochemistry",
    group: "Hematology",
    icon: Droplets,
    panel: true,
  },

  /* ---------------- IMMUNOASSAY — diabetes & thyroid ---------------- */
  {
    name: "HbA1c",
    desc: "Glycated hemoglobin; measures 3-month average blood sugar — the gold standard for diabetes.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Syringe,
  },
  {
    name: "TSH",
    desc: "Thyroid Stimulating Hormone; the primary screening test for hypo- and hyperthyroidism.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Navigation,
  },
  {
    name: "T3 (Total Triiodothyronine)",
    desc: "Active thyroid hormone; helps diagnose hyperthyroidism and confirm TSH abnormalities.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Cog,
  },
  {
    name: "T4 (Total Thyroxine)",
    desc: "Main thyroid hormone; assesses thyroid gland function alongside TSH and T3.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Zap,
  },
  {
    name: "FT3 (Free T3)",
    desc: "Bioactive form of T3; for precise diagnosis when total T3/T4 results are inconclusive.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Feather,
  },
  {
    name: "FT4 (Free T4)",
    desc: "Free thyroxine; the most accurate marker of true thyroid function status.",
    category: "immunoassay",
    group: "Diabetes & Thyroid",
    icon: Leaf,
  },

  /* ---------------- IMMUNOASSAY — cardiac markers ---------------- */
  {
    name: "Troponin I",
    desc: "The most specific cardiac marker; gold standard for diagnosing acute myocardial infarction.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: HeartPulse,
  },
  {
    name: "Troponin T",
    desc: "Highly sensitive cardiac biomarker; detects heart muscle damage within hours of an attack.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: HeartPulse,
  },
  {
    name: "CK-MB",
    desc: "Creatine Kinase-MB isoenzyme; a classic marker for diagnosing recent heart attacks.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: Heart,
  },
  {
    name: "NT-ProBNP",
    desc: "Detects and grades heart failure; an essential ER triage marker for cardiac dyspnea.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: Activity,
  },
  {
    name: "3-in-1 Cardiac Combo",
    desc: "Triple cardiac marker panel — comprehensive single-shot AMI diagnosis in emergencies.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: Shield,
    panel: true,
  },
  {
    name: "D-Dimer (Quantitative)",
    desc: "Detects blood clot disorders including DVT, pulmonary embolism and stroke risk.",
    category: "immunoassay",
    group: "Cardiac Markers",
    icon: Waves,
  },

  /* ---------------- IMMUNOASSAY — inflammatory & specialty ---------------- */
  {
    name: "CRP (Quantitative)",
    desc: "C-Reactive Protein; the primary marker for systemic inflammation, infection and chronic disease.",
    category: "immunoassay",
    group: "Inflammatory & Specialty",
    icon: Flame,
  },
  {
    name: "PCT (Quantitative)",
    desc: "Procalcitonin; differentiates bacterial sepsis from viral infection to guide antibiotic use.",
    category: "immunoassay",
    group: "Inflammatory & Specialty",
    icon: Bug,
  },
  {
    name: "SAA",
    desc: "Serum Amyloid A; an ultra-sensitive acute-phase marker for early inflammation and infection.",
    category: "immunoassay",
    group: "Inflammatory & Specialty",
    icon: Microscope,
  },
  {
    name: "IL-6 (Interleukin-6)",
    desc: "Pro-inflammatory cytokine; a key prognostic marker in sepsis, COVID-19 and autoimmune disease.",
    category: "immunoassay",
    group: "Inflammatory & Specialty",
    icon: Dna,
  },
  {
    name: "Vitamin D (25-OH)",
    desc: "Bone-health and immunity marker; deficiency affects 70%+ of Indian adults.",
    category: "immunoassay",
    group: "Inflammatory & Specialty",
    icon: Sun,
  },

  /* ---------------- RAPID DIAGNOSTIC TESTS ---------------- */
  {
    name: "Pregnancy RDT",
    desc: "Detects hCG hormone in urine; reliable home/clinic pregnancy confirmation in 5 minutes.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Baby,
  },
  {
    name: "Malaria RDT",
    desc: "Detects Pf/Pv malaria parasites in 15 minutes; critical for monsoon-season screening.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Bug,
  },
  {
    name: "Dengue NS1 RDT",
    desc: "Early dengue antigen test; positive within 1–9 days of symptom onset.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Bug,
  },
  {
    name: "Typhoid RDT",
    desc: "Detects Salmonella typhi antibodies; a rapid alternative to the traditional Widal test.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Thermometer,
  },
  {
    name: "Chikungunya RDT",
    desc: "Detects chikungunya antibodies; differentiates from dengue in joint-pain cases.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Bug,
  },
  {
    name: "Leptospira RDT",
    desc: "Detects leptospirosis antibodies; critical post-flood and waterlogged-area screening.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Waves,
  },
  {
    name: "HIV 1 & 2 RDT",
    desc: "Detects HIV-1 and HIV-2 antibodies; confidential pre-marital and routine screening.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Ribbon,
  },
  {
    name: "HCV RDT",
    desc: "Hepatitis C antibody screening; early detection prevents chronic liver disease.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: ShieldAlert,
  },
  {
    name: "Hepatitis B RDT",
    desc: "HBsAg surface antigen detection; essential pre-surgery, antenatal and donor screening.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Shield,
  },
  {
    name: "Syphilis RDT",
    desc: "Detects Treponema pallidum antibodies; routine STI and antenatal screening.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: ShieldCheck,
  },
  {
    name: "Troponin RDT (Qual.)",
    desc: "Rapid qualitative cardiac marker; first-line ER triage for chest-pain patients.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: HeartPulse,
  },
  {
    name: "CRP Rapid (Qual.)",
    desc: "Quick inflammation indicator; a bedside infection screen in under 5 minutes.",
    category: "rapid",
    group: "Rapid Diagnostics",
    icon: Flame,
  },

  /* ---------------- STRIP-BASED — quick bedside ---------------- */
  {
    name: "Haemoglobin (Hb)",
    desc: "Detects anemia in 30 seconds; essential for women, children and antenatal care.",
    category: "strip",
    group: "Quick Bedside",
    icon: Droplet,
  },
  {
    name: "Blood Glucose (RBS/FBS)",
    desc: "Instant blood sugar reading; daily monitoring for diabetics and the highest-volume strip test.",
    category: "strip",
    group: "Quick Bedside",
    icon: CircleDot,
  },
  {
    name: "Uric Acid (Strip)",
    desc: "Quick gout and kidney-function check; bedside-friendly with 30-second results.",
    category: "strip",
    group: "Quick Bedside",
    icon: Bone,
  },
  {
    name: "Urine 2-Param Strip",
    desc: "Glucose & protein in urine; a quick, essential routine OPD screen.",
    category: "strip",
    group: "Quick Bedside",
    icon: TestTube,
  },
  {
    name: "Urine 10-Param Strip",
    desc: "10-parameter urine analysis (pH, ketones, blood, leukocytes and more) — a comprehensive routine.",
    category: "strip",
    group: "Quick Bedside",
    icon: TestTubes,
  },
  {
    name: "SD Lipid Profile (Strip)",
    desc: "Single-strip lipid profile (Total/HDL/LDL/TG); the fastest cardiac-risk assessment available.",
    category: "strip",
    group: "Quick Bedside",
    icon: Heart,
  },
];
