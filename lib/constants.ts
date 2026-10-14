// Site-wide constants. Single source of truth for NAP, contact, and the
// hub/spoke taxonomy (SOP Part A + B.9).

export const SITE = {
  name: "Cloudspital",
  legalName:"Cloudspital Private Limited",
  url: "https://cloudspital.ai",
  tagline:"Health ATM Kiosks, Tele ICU and Telemedicine",
  description:
    "Indian medtech manufacturer. AIIMS co developed, DPIIT recognised, GeM listed, CDSCO approved health kiosks, Tele ICU and telemedicine systems.",
  phone:"+917542011187",
  phone2:"+916207376706",
  whatsapp:"917542011187",
  email:"subham@cloudspital.ai",
  foundingDate:"2021",
  // Price band shown to search/answer engines for the product range (GEO/AEO).
  priceRange:"₹₹",
  // Topical entities Cloudspital is an authority on (AEO — knowsAbout).
  knowsAbout: [
    "Health ATM kiosk",
    "Tele ICU",
    "Tele PICU",
    "Telemedicine cart",
    "Point of care testing",
    "Mobile medical unit",
    "ABDM / ABHA integration",
    "Preventive health screening",
    "Remote patient monitoring",
    "CDSCO compliant medical devices",
  ],
  // Geographic markets served (GEO — areaServed on Organization/Service).
  areaServed: ["India"],
  // Canonical NAP (SOP B.9 / B.13). geo lat/lng are approximate for the
  // building; refine with the exact rooftop coordinates before launch.
  address: {
    office: {
      street:"UG-04, Tower 4, NX One, Noida Extension",
      locality:"Greater Noida West",
      region:"Uttar Pradesh",
      postalCode:"201318",
      country:"IN",
      geo: { lat: 28.5921, lng: 77.4436 },
    },
    factory: {
      street:"Plot No. K-138, Kasna Industrial Area, Surajpur Site V",
      locality:"Greater Noida",
      region:"Uttar Pradesh",
      postalCode:"201312",
      country:"IN",
      geo: { lat: 28.4601, lng: 77.5089 },
    },
  },
  // Mon–Sat 09:30–18:30 (SOP B.9). Used for openingHoursSpecification.
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens:"09:30",
    closes:"18:30",
  },
  cin:"TODO CIN",
  gst:"TODO GSTIN",
  social: {
    linkedin: "https://www.linkedin.com/company/cloudspital",
    instagram: "https://www.instagram.com/cloudspital",
    youtube:"",
    x: "",
  },
} as const;

// The six hubs (SOP Part A). `slug` is the first URL segment.
export type HubKey =
  | "health-atm-kiosk"
  | "tele-icu"
  | "telemedicine"
  | "government-health-kiosk"
  | "mobile-medical-unit"
  | "resources";

export interface Hub {
  slug: HubKey;
  title: string;
  primaryKeyword: string;
  priority: "P0" | "P1" | "P2";
}

export const HUBS: Hub[] = [
  {
    slug: "health-atm-kiosk",
    title:"Health ATM / Health Kiosk",
    primaryKeyword:"health ATM kiosk",
    priority: "P0",
  },
  {
    slug: "tele-icu",
    title:"Tele ICU and Tele PICU",
    primaryKeyword:"tele ICU",
    priority: "P0",
  },
  {
    slug: "telemedicine",
    title:"Telemedicine and Point of Care",
    primaryKeyword:"telemedicine solutions India",
    priority: "P1",
  },
  {
    slug: "government-health-kiosk",
    title:"Government and Public Health Deployment",
    primaryKeyword:"government health kiosk India",
    priority: "P0",
  },
  {
    slug: "mobile-medical-unit",
    title:"Mobile Medical Units",
    primaryKeyword:"mobile medical unit India",
    priority: "P2",
  },
  {
    slug: "resources",
    title:"Resources and Original Data",
    primaryKeyword:"preventive health screening India data",
    priority: "P1",
  },
];

export const NAV_LINKS = [
  { href: "/health-atm-kiosk/", label:"Health ATM" },
  { href: "/tele-icu/", label:"Tele ICU" },
  { href: "/telemedicine/", label:"Telemedicine" },
  { href: "/government-health-kiosk/", label:"Government" },
  { href: "/products/", label:"Products" },
  { href: "/about-us/", label:"About" },
  { href: "/contact/", label:"Contact" },
];
