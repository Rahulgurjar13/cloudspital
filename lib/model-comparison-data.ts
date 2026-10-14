// CPL Health Kiosk Range 2026–27 — model comparison matrix.
// Source: "Cloudspital Model Comparison 2026-27" (technical comparison, specs
// only — no commercial terms). Availability is encoded as a 5-character string,
// one character per model in MODELS order:
//   y = available   o = optional accessory   n = not available

export type Availability = "y" | "o" | "n";

export type KioskModel = {
  key: string;
  name: string;
  code: string;
  tests: number;
  positioning: string;
  /** Tailwind gradient stops for the card accent. */
  gradient: string;
  /** Tailwind text colour for counts/labels. */
  text: string;
  /** Tailwind ring/border tint. */
  ring: string;
  chip: string;
};

export const MODELS: KioskModel[] = [
  {
    key: "arc-one",
    name: "Arc One",
    code: "CPL-HA-100",
    tests: 50,
    positioning:
      "Entry screening kiosk for high-volume primary camps, panchayat and workplace screening.",
    gradient: "from-sky-500 to-cyan-400",
    text: "text-sky-600",
    ring: "ring-sky-200",
    chip: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  {
    key: "arc-plus",
    name: "Arc Plus",
    code: "CPL-HA-200",
    tests: 61,
    positioning:
      "Adds HbA1c, full lipid profile, ENT otoscopy and dermatology inspection.",
    gradient: "from-blue-500 to-sky-400",
    text: "text-blue-600",
    ring: "ring-blue-200",
    chip: "bg-blue-50 text-blue-700 ring-blue-100",
  },
  {
    key: "arc-pro",
    name: "Arc Pro",
    code: "CPL-HA-300",
    tests: 107,
    positioning:
      "Adds thyroid and hormone panel, cardiac markers, spirometry and foetal doppler.",
    gradient: "from-indigo-500 to-blue-500",
    text: "text-indigo-600",
    ring: "ring-indigo-200",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  {
    key: "arc-max",
    name: "Arc Max",
    code: "CPL-HA-400",
    tests: 170,
    positioning:
      "Full diagnostic kiosk — CBC, LFT, KFT plus complimentary rPPG contactless AI face-scan.",
    gradient: "from-violet-500 to-fuchsia-500",
    text: "text-violet-600",
    ring: "ring-violet-200",
    chip: "bg-violet-50 text-violet-700 ring-violet-100",
  },
  {
    key: "arc-respond",
    name: "Arc Respond",
    code: "CPL-EC-500",
    tests: 160,
    positioning:
      "Portable emergency trolley — Arc Max lab menu plus 18-parameter blood gas and electrolytes.",
    gradient: "from-rose-500 to-orange-500",
    text: "text-rose-600",
    ring: "ring-rose-200",
    chip: "bg-rose-50 text-rose-700 ring-rose-100",
  },
];

export type TestRow = {
  /** Row number as printed in the comparison document. */
  n: number;
  name: string;
  /** 5 chars, one per model in MODELS order. */
  av: string;
};

export type TestGroup = {
  key: string;
  label: string;
  rows: TestRow[];
};

const ALL = "yyyyy";
const MAX_ONLY = "nnnyn";
const PLUS_UP = "nyyyy";
const PRO_UP = "nnyyy";
const LAB = "nnnyy";
const RESPOND_ONLY = "nnnny";
const OPTIONAL = "ooooo";

/** Helper — builds sequential rows sharing one availability pattern. */
function seq(start: number, av: string, names: string[]): TestRow[] {
  return names.map((name, i) => ({ n: start + i, name, av }));
}

export const TEST_GROUPS: TestGroup[] = [
  {
    key: "vitals",
    label: "Vital Signs & Non-Invasive",
    rows: seq(1, ALL, [
      "Vision Test (through app)",
      "Body Temperature",
      "NI BP (Blood Pressure)",
      "SpO2",
      "Pulse",
      "Height",
      "Body Weight",
      "Lean Body Weight",
      "Weight without Fat",
      "Metabolism",
      "BMI (Body Mass Index)",
      "Body Fat",
      "Muscle Mass",
      "Bone Mass",
      "Body Age",
      "Body Water",
      "Obesity Degree",
      "Visceral Fat",
      "Protein",
      "12 Lead ECG",
    ]),
  },
  {
    key: "rppg",
    label: "rPPG Contactless Face-Scan",
    rows: seq(21, MAX_ONLY, [
      "Heart Rate / Pulse Rate (contactless)",
      "Blood Pressure — Systolic (estimated)",
      "Blood Pressure — Diastolic (estimated)",
      "Pulse Pressure",
      "Mean Arterial Pressure (MAP)",
      "Cardiac Output (estimated)",
      "Cardiac Workload",
      "Perfusion Index",
      "SDNN — HRV time domain",
      "RMSSD — HRV time domain",
      "pNN50 — HRV time domain",
      "Mean RR Interval",
      "LF Power (low frequency HRV)",
      "HF Power (high frequency HRV)",
      "LF / HF Ratio",
      "Baevsky Stress Index",
      "Respiration Rate (contactless)",
      "Oxygen Saturation — SpO2 (estimated)",
      "Sympathetic Activity",
      "Parasympathetic Activity",
      "Autonomic Nervous System Balance",
      "Stress Level",
      "Recovery Ability",
      "Wellness / Vitality Score",
      "Facial Skin Age",
      "BMI (contactless, estimated)",
      "Cardiovascular Risk Score",
      "Hypertension Risk Score",
    ]),
  },
  {
    key: "glycaemic",
    label: "Diabetes & Glycaemic",
    rows: [
      { n: 49, name: "Sugar (Blood Glucose)", av: ALL },
      { n: 50, name: "HbA1c", av: PLUS_UP },
    ],
  },
  {
    key: "lipid",
    label: "Lipid Profile",
    rows: [
      { n: 51, name: "Total Cholesterol (TC)", av: ALL },
      ...seq(52, PLUS_UP, [
        "High Density Lipoprotein Cholesterol (HDL)",
        "Low Density Lipoprotein Cholesterol (LDL)",
        "Triglycerides (TG)",
        "Non-HDL",
        "TC / HDL Ratio",
      ]),
    ],
  },
  {
    key: "metabolic",
    label: "Metabolic",
    rows: [{ n: 57, name: "Uric Acid", av: ALL }],
  },
  {
    key: "cbc",
    label: "Complete Blood Count — 22 parameters, 3-part differential",
    rows: [
      { n: 58, name: "RBC Count", av: LAB },
      { n: 59, name: "Haemoglobin (Hb)", av: ALL },
      ...seq(60, LAB, [
        "HCT (Haematocrit)",
        "MCV",
        "MCH",
        "MCHC",
        "RDW-CV",
        "RDW-SD",
        "TLC (Total Leucocyte Count)",
        "GRA# (Granulocytes, absolute)",
        "GRA% (Granulocytes)",
        "LYM# (Lymphocytes, absolute)",
        "LYM% (Lymphocytes)",
        "MID# (Mid-cells, absolute)",
        "MID% (Mid-cells)",
        "PLT (Platelet Count)",
        "MPV",
        "PDW",
        "PCT (Plateletcrit)",
        "PLCC",
        "PLCR",
        "PLR",
      ]),
    ],
  },
  {
    key: "lft",
    label: "Liver Function Test (LFT)",
    rows: seq(80, LAB, [
      "LFT — Total Bilirubin",
      "LFT — Total Protein",
      "LFT — Albumin",
      "LFT — Globulin",
      "LFT — A/G Ratio",
      "LFT — AST (SGOT)",
      "LFT — ALT (SGPT)",
      "LFT — AST / ALT",
    ]),
  },
  {
    key: "kft",
    label: "Kidney Function Test (KFT)",
    rows: seq(88, LAB, [
      "KFT — Creatinine",
      "KFT — Uric Acid",
      "KFT — Urea",
      "KFT — BUN",
      "KFT — BUN / Creatinine",
      "KFT — eGFR",
    ]),
  },
  {
    key: "thyroid",
    label: "Thyroid, Vitamin & Hormone",
    rows: seq(94, PRO_UP, [
      "25-OH-VD (Vitamin D)",
      "TSH (Thyroid)",
      "T3",
      "T4",
      "fT3",
      "fT4",
      "AMH",
    ]),
  },
  {
    key: "cardiac",
    label: "Cardiac & Inflammatory Markers",
    rows: seq(101, PRO_UP, [
      "cTnT",
      "cTnI",
      "cTnT / CK-MB / Myo",
      "NT-proBNP",
      "D-Dimer",
      "Procalcitonin (PCT)",
      "CRP",
      "SAA",
      "IL-6",
    ]),
  },
  {
    key: "immunoassay",
    label: "Infectious Disease Immunoassay",
    rows: seq(110, PRO_UP, ["SARS-CoV-2 NA", "SARS-CoV-2 Antibody"]),
  },
  {
    key: "urine",
    label: "Urine Check-Up Parameters",
    rows: seq(112, ALL, [
      "Ketones (URS-K)",
      "Glucose",
      "Protein",
      "pH (URI3 plus)",
      "Leukocytes",
      "Nitrites",
      "Ketones",
      "Bilirubin",
      "Blood",
      "Urobilinogen",
      "Specific Gravity (URI10)",
    ]),
  },
  {
    key: "ent",
    label: "ENT Check-Up (Otoscopy)",
    rows: seq(123, PLUS_UP, [
      "Tympanic Membrane Inspection and Cleaning",
      "Nose Inspection",
      "Throat Check-Up",
    ]),
  },
  {
    key: "derma",
    label: "Dermatology Inspections",
    rows: seq(126, PLUS_UP, [
      "Skin Dermatological Inspection",
      "Nailfold Inspection",
    ]),
  },
  {
    key: "mothercare",
    label: "Mothercare",
    rows: [{ n: 128, name: "Foetal Doppler", av: PRO_UP }],
  },
  {
    key: "rdt",
    label: "RDT Tests (AI-based automated reader)",
    rows: seq(129, ALL, [
      "Pregnancy Test",
      "Syphilis",
      "HIV",
      "Dengue",
      "Chikungunya",
      "Leptospira",
      "COVID-19",
      "CRP",
      "Typhoid",
      "Malaria",
      "Hepatitis B",
      "Hepatitis C",
      "Troponin-I",
      "D-Dimer",
      "Procalcitonin",
    ]),
  },
  {
    key: "pft",
    label: "Pulmonary Function Test (PFT) — Spirometer",
    rows: seq(144, PRO_UP, [
      "FVC",
      "PEF",
      "FEV1 / FVC",
      "FEV1",
      "FEV0.25",
      "FEV0.5",
      "FEV0.75",
      "FEV6",
      "FEV0.25 / FVC",
      "FEV2 / FVC",
      "FEV3 / FVC",
      "PEFT",
      "FET",
      "FEV1 / FEV6",
      "EOTV",
      "Lung Age",
      "Exhale Duration",
      "BEV",
      "FEV2",
      "FEV3",
      "FEV0.5 / FVC",
      "FEV0.75 / FVC",
      "FEV6 / FVC",
      "Flow Volume Graph",
      "Volume-Time Graph",
      "Interpretation of Spirometer Test",
      "Asthma",
    ]),
  },
  {
    key: "abg",
    label: "Blood Gas & Electrolytes",
    rows: seq(171, RESPOND_ONLY, [
      "Sodium (Na)",
      "Potassium (K)",
      "Chloride (Cl)",
      "Ionised Calcium (iCa)",
      "Total CO2 (TCO2)",
      "Bicarbonate (HCO3)",
      "pH",
      "pCO2",
      "pO2",
      "Base Excess (BE)",
      "Oxygen Saturation (sO2)",
      "Lactate",
      "Glucose (ABG panel)",
      "BUN / Urea (ABG panel)",
      "Creatinine (ABG panel)",
      "Haematocrit (ABG panel)",
      "Haemoglobin (ABG panel)",
      "Anion Gap",
    ]),
  },
  {
    key: "cancer",
    label: "Cancer Screening Accessories — optional on any model",
    rows: seq(189, OPTIONAL, [
      "Breast Cancer Screening",
      "Cervical Cancer Screening",
      "Oral Cancer Screening",
    ]),
  },
];

/** Highlight cards printed alongside the range table. */
export const HIGHLIGHTS = [
  {
    tag: "All models",
    title: "Height & Weight",
    body: "Ultrasonic stadiometer and body-composition weighing platform fitted on every model, including the crash cart.",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    tag: "Arc Max only",
    title: "rPPG Face-Scan",
    body: "28 contactless AI parameters supplied complimentary with Arc Max. Wellness estimates, not diagnostic values.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    tag: "Crash cart only",
    title: "Blood Gas Panel",
    body: "18-parameter ABG and electrolyte panel is exclusive to Arc Respond via the on-board ABG analyser.",
    gradient: "from-rose-500 to-orange-500",
  },
];

/** Footnotes reproduced from the comparison document. */
export const NOTES = [
  {
    title: "Complete Blood Count",
    body: "22 parameters with a 3-part differential (granulocytes, lymphocytes, mid-cells). Available on Arc Max and Arc Respond only.",
  },
  {
    title: "Uric acid & total cholesterol",
    body: "Single-parameter strip tests present on every model. The full lipid profile and HbA1c begin at Arc Plus.",
  },
  {
    title: "Cancer screening accessories",
    body: "Breast, cervical and oral screening tools are optional on any model and quoted with the host configuration. Findings are screening adjuncts and are not counted in any model's test total.",
  },
  {
    title: "Configuration",
    body: "Test menus are indicative of the standard build. Custom configurations are available on request.",
  },
];
