import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CollectionPageSchema } from "@/components/schema/CollectionPageSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, Panel, SectionLabel, SectionHeader } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { Building, Shield, Check } from "@/components/icons";
import { HandHeart } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

const PATH = "/use-cases/";

export const metadata: Metadata = pageMetadata({
  title:"Deployment Use Cases",
  description:
    "How Cloudspital health kiosks, Tele ICU and telemedicine are deployed across public hospitals, corporate offices, schools, and CSR initiatives.",
  path: PATH,
});

// Custom icon wrappers for specific use cases
function RuralHealthIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
      <path d="M12 7v10M7 12h10" />
    </svg>
  );
}

function TransitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  );
}

const useCases = [
  {
    title:"Rural Health Centers and PHCs",
    description:"Enabling remote villages to access 50+ medical tests and instant telemedicine consultations under Ayushman Bharat / ABDM programs, resolving primary health challenges.",
    icon: RuralHealthIcon,
    features: ["ABHA ID Integration", "Offline Testing Sync", "Multi-lingual Voice Prompts"],
  },
  {
    title:"Corporate and Employee Wellness",
    description:"On campus health ATM deployments allowing employees to perform automated vitals checks and connect with doctors in minutes, reducing workplace health risks.",
    icon: Building,
    features: ["Under 5-minute Screenings", "Corporate Dashboard", "Doctor Consultation App"],
  },
  {
    title:"Government and Public Health Tender",
    description:"CDSCO compliant and GeM listed kiosks optimized for district hospitals, primary health centers (PHC), and Ayushman Arogya Mandirs, simplifying public procurement.",
    icon: Shield,
    features: ["GeM Listed and Approved", "CDSCO Licensed POCT", "Robust Steel Enclosure"],
  },
  {
    title:"CSR and NGO Foundations",
    description:"Sponsoring portable telemedicine diagnostic bags and smart kiosks to reach unserved geographies, bringing healthcare directly to patient doorsteps.",
    icon: HandHeart,
    features: ["Impact Data Dashboards", "Rugged Mobile Design", "100% Tax Benefit Eligible"],
  },
  {
    title:"Smart Transit and Transit Hubs",
    description:"Rapid testing and preventive health screenings at railway stations, airports, and smart city center kiosks for travelers on the move.",
    icon: TransitIcon,
    features: ["Instant Thermal Printouts", "High Patient Throughput", "UPI Payment Terminal"],
  },
  {
    title:"School and University Campus Health",
    description:"Automated student screening rooms tracking growth parameters, vitals, and providing digital health cards to parents, ensuring health first education.",
    icon: Building,
    features: ["Growth Monitoring Tracking", "Parent Dashboard Cards", "Basic First-Aid Integration"],
  }
];

export default function UseCasesPage() {
  return (
    <>
      <CollectionPageSchema
        name="Deployment Use Cases"
        description="How Cloudspital health kiosks, Tele ICU and telemedicine are deployed across public hospitals, corporate offices, schools, and CSR initiatives."
        path={PATH}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Use Cases", path: PATH },
        ]}
      />

      {/* Header */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Sectors and Deployments"
              title={
                <>
                  Empowering Healthcare <span className="text-primary">Across Sectors</span>
                </>
              }
              description="Discover how Cloudspital's co-developed technology, public tender listings, and robust engineering adapt to diverse healthcare environments across India."
            />
          </Reveal>
        </Container>
      </section>

      {/* Use cases grid */}
      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          <Stagger className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {useCases.map((uc, idx) => {
              const Icon = uc.icon;
              return (
                <Item key={idx} className="flex h-full flex-col rounded-[20px] bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="t-h3 text-faint">{String(idx + 1).padStart(2, "0")}</span>
                  </div>

                  <h2 className="mt-10 t-h5 text-ink">{uc.title}</h2>
                  <p className="mt-3 t-body text-muted">{uc.description}</p>

                  {/* Key features */}
                  <ul className="mt-6 border-t border-line">
                    {uc.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 border-b border-line py-3 t-small text-ink">
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact/"
                      className="group inline-flex items-center gap-2 t-body text-primary"
                    >
                      Inquire For Sector Quote
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="py-10 lg:py-16">
        <Panel className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10" />
          <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <SectionLabel onDark>Get started</SectionLabel>
              <h2 className="t-h2 text-white">Request a Custom Sector Proposal</h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                Our team handles customizations, site surveys, and GeM procurement guidelines to ensure a frictionless deployment.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <ArrowButton href="/contact/" variant="light">
                  Contact and Request Demo
                </ArrowButton>
                <ArrowButton href="/products/" variant="dark" size="sm">
                  View Our Medical Products
                </ArrowButton>
              </div>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
