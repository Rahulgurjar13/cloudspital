import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Reveal, Stagger, Item } from "@/components/motion";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { JsonLd } from "@/components/schema/JsonLd";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { Container } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import Link from "next/link";

export const revalidate = 3600;

const HUB = "resources" as const;
const SLUG = "glossary";
const PATH = `/resources/${SLUG}/`;
const TITLE="Glossary: Health Kiosk, Tele ICU and Digital Health Terms";

export const metadata: Metadata = pageMetadata({
  title:"Glossary: Health Kiosk, Tele ICU and Digital Health Terms",
  description:"Plain English definitions of health kiosk, tele ICU, and Indian digital health terms, from ABHA and CDSCO to POCT and tele PICU.",
  path: PATH,
  type: "article",
});

const GLOSSARY_CATEGORIES = [
  {
    title:"Critical care and tele ICU",
    hubLink: "/tele-icu/",
    hubLabel:"Tele ICU Hub",
    terms: [
      {
        term:"Tele ICU (eICU)",
        definition:"Remote intensive care, where off site intensivists monitor and guide ICU patients via live data and video."
      },
      {
        term:"Tele PICU",
        definition:"Tele ICU for critically ill children, requiring paediatric intensivists and child specific protocols."
      },
      {
        term:"Tele NICU",
        definition:"Remote critical care for newborns in neonatal units."
      },
      {
        term:"Intensivist",
        definition:"A doctor specialised in critical/intensive care."
      },
      {
        term:"Hub and spoke model",
        definition:"One central specialist \"hub\" supporting many peripheral \"spoke\" hospitals."
      },
      {
        term:"Command centre",
        definition:"The central site where remote intensivists monitor multiple ICUs."
      },
      {
        term:"Remote patient monitoring (RPM)",
        definition:"Continuous real time capture and transmission of patient vitals to clinicians elsewhere."
      },
      {
        term:"Length of stay (LOS)",
        definition:"How long a patient remains admitted; a key outcome metric."
      }
    ]
  },
  {
    title:"Health kiosks and diagnostics",
    hubLink: "/health-atm-kiosk/",
    hubLabel:"Health ATM Hub",
    terms: [
      {
        term:"Health ATM / Health kiosk",
        definition:"A self service station that screens multiple health parameters and connects users to a doctor."
      },
      {
        term:"Point of care testing (POCT)",
        definition:"Diagnostic testing done at or near the patient with instant results, instead of a central lab."
      },
      {
        term:"Telemedicine cart",
        definition:"A mobile, clinician operated station with video and medical devices for remote examination."
      },
      {
        term:"Mobile Medical Unit (MMU)",
        definition:"A healthcare equipped vehicle that takes care to remote communities."
      },
      {
        term:"Vital signs",
        definition:"Core measures like blood pressure, pulse, SpO₂, temperature and respiratory rate."
      },
      {
        term:"ECG",
        definition:"Electrocardiogram, a recording of the heart's electrical activity."
      },
      {
        term:"SpO₂",
        definition:"Blood oxygen saturation, measured non invasively."
      },
      {
        term:"BMI",
        definition:"Body mass index, a weight for height ratio."
      },
      {
        term:"Lipid profile",
        definition:"A blood test measuring cholesterol and triglycerides."
      }
    ]
  },
  {
    title:"India's digital health and public health system",
    hubLink: "/government-health-kiosk/",
    hubLabel:"Government Kiosk Hub",
    terms: [
      {
        term:"ABDM (Ayushman Bharat Digital Mission)",
        definition:"India's framework for interoperable digital health (formerly NDHM)."
      },
      {
        term:"ABHA (Ayushman Bharat Health Account)",
        definition:"A 14 digit digital health ID for consent based health records."
      },
      {
        term:"eSanjeevani",
        definition:"India's flagship national teleconsultation service under MoHFW."
      },
      {
        term:"Ayushman Arogya Mandir (AAM)",
        definition:"Government primary health and wellness centre (formerly AB HWC), focused on comprehensive primary care and screening."
      },
      {
        term:"PM JAY",
        definition:"The health insurance component of Ayushman Bharat (cover up to ₹5 lakh/family/year)."
      },
      {
        term:"PHC / CHC / Sub centre",
        definition:"Primary health centre / community health centre / sub centre, tiers of public primary care."
      },
      {
        term:"NHM (NRHM / NUHM)",
        definition:"National Health Mission, India's umbrella public health programme (rural + urban)."
      },
      {
        term:"Telemedicine Practice Guidelines (2020)",
        definition:"The rules giving Registered Medical Practitioners a legal basis to practise telemedicine in India."
      },
      {
        term:"HFR / HPR / UHI",
        definition:"ABDM's Health Facility Registry, Healthcare Professionals Registry, and Unified Health Interface."
      }
    ]
  },
  {
    title:"Regulatory and quality",
    hubLink: "/telemedicine/",
    hubLabel:"Telemedicine Hub",
    terms: [
      {
        term:"CDSCO",
        definition:"Central Drugs Standard Control Organisation, India's medical device and drug regulator."
      },
      {
        term:"Medical Device Rules (MDR) 2017",
        definition:"The framework classifying and licensing medical devices in India (classes A–D)."
      },
      {
        term:"ISO 13485",
        definition:"The international quality management standard for medical devices."
      },
      {
        term:"NABH",
        definition:"National Accreditation Board for Hospitals and Healthcare Providers."
      },
      {
        term:"EHR / EMR",
        definition:"Electronic health/medical record."
      }
    ]
  }
];

// Flatten glossary items for the schema
const allTerms = GLOSSARY_CATEGORIES.flatMap(cat => cat.terms);

// Stable, linkable anchors: #<category> and #<term>.
function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/₂/g, "2")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Every term, A to Z, for the jump index.
const termIndex = [...allTerms].sort((a, b) => a.term.localeCompare(b.term, "en", { sensitivity: "base" }));

const CORE_HUBS = [
  { href: "/tele-icu/", label: "Tele ICU" },
  { href: "/health-atm-kiosk/", label: "Health ATM Kiosk" },
  { href: "/government-health-kiosk/", label: "Government Kiosk" },
  { href: "/telemedicine/", label: "Telemedicine" },
  { href: "/mobile-medical-unit/", label: "Mobile Medical Unit" },
];

const chip =
  "inline-flex items-center rounded-full border border-line bg-white px-4 py-2 t-small text-ink transition-colors hover:border-primary hover:text-primary";

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": "https://cloudspital.ai/resources/glossary/",
  "name": "Glossary of Health-Tech and Digital-Health Terms",
  "description":"A plain English reference for the terms used across health kiosks, tele ICU, telemedicine, and India's digital health programmes.",
  "hasDefinedTerm": allTerms.map(t => ({
    "@type": "DefinedTerm",
    "name": t.term,
    "description": t.definition
  }))
};

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  return (
    <article>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Glossary", path: PATH },
        ]}
      />
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <JsonLd data={definedTermSetSchema} />

      <SpokeHero
        title="Glossary of Health Tech Terms"
        description="A plain English reference for the terms used across health kiosks, tele ICU, telemedicine, and India's digital health programmes."
        eyebrow="Terminology and Reference"
      />

      {/* Jump index */}
      <section className="pt-20 lg:pt-[120px]">
        <Container>
          <Reveal className="rounded-[20px] border border-line bg-white p-6 sm:p-8 lg:p-10">
            <nav aria-label="Glossary index">
              <p className="t-small uppercase text-muted">Categories</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {GLOSSARY_CATEGORIES.map((category, i) => (
                  <li key={category.title}>
                    <a href={`#${anchor(category.title)}`} className={`${chip} gap-2`}>
                      <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-8 t-small uppercase text-muted">Terms A to Z</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {termIndex.map((g) => (
                  <li key={g.term}>
                    <a href={`#${anchor(g.term)}`} className={chip}>
                      {g.term}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </Container>
      </section>

      {/* Categorised term list */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="space-y-20 lg:space-y-[120px]">
            {GLOSSARY_CATEGORIES.map((category, i) => (
              <div
                key={category.title}
                id={anchor(category.title)}
                className="grid scroll-mt-28 gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <Reveal className="lg:col-span-4">
                  <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="t-h4 text-ink">{category.title}</h2>
                    <ArrowButton href={category.hubLink} variant="outline" size="sm">
                      {category.hubLabel}
                    </ArrowButton>
                  </div>
                </Reveal>

                <Stagger className="border-t border-line lg:col-span-7 lg:col-start-6">
                  {category.terms.map((g) => (
                    <Item key={g.term}>
                      <div
                        id={anchor(g.term)}
                        className="grid scroll-mt-28 gap-2 border-b border-line py-6 sm:grid-cols-12 sm:gap-8 lg:py-7"
                      >
                        <h3 className="t-h5 text-ink sm:col-span-5">{g.term}</h3>
                        <p className="t-body text-muted sm:col-span-7 sm:pt-1.5">{g.definition}</p>
                      </div>
                    </Item>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Have a question about any of these terms?"
        description="Connect with our clinical and engineering team to clarify compliance standards or technical integrations."
      />

      {/* Related pages + core hubs */}
      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />

          <nav aria-label="Core Hubs" className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="t-small text-muted">Core Hubs:</p>
            <ul className="flex flex-wrap gap-2">
              {CORE_HUBS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`group ${chip} gap-2`}>
                    {l.label}
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </article>
  );
}
