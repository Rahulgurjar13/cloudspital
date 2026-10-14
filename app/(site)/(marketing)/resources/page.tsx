import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { FileText, Stethoscope, Laptop } from "@/components/icons";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { JsonLd } from "@/components/schema/JsonLd";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title:"Resources: Health Tech Data, Guides and Glossary",
  description:"Original research, buyer's guides, and a complete glossary on health kiosks, tele ICU and digital health in India, from Cloudspital.",
  path: "/resources/",
});

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Resources: Health-Tech Data, Guides and Glossary | Cloudspital",
  "description":"Original research, buyer's guides, and a complete glossary on health kiosks, tele ICU and digital health in India, from Cloudspital.",
  "url": "https://cloudspital.ai/resources/"
};

const QUICK_LINKS = [
  { href: "/health-atm-kiosk/", label: "Health ATM Kiosk" },
  { href: "/tele-icu/", label: "Tele ICU" },
  { href: "/government-health-kiosk/", label: "Government Kiosks" },
];

export default function ResourcesPage() {
  const resourceItems = [
    {
      title:"The State of Preventive Health Screening in India",
      desc:"Our annual data report analyzing rural, semi urban, and corporate health screening trends, early diagnostics metrics, and public health impact in India.",
      href: "/resources/state-of-preventive-health-screening-india/",
      icon: FileText,
      tag:"Research Report",
    },
    {
      title:"Health ATM Buyer's Guide",
      desc:"How to choose the right kiosk. A 7 point checklist covering certifications, CDSCO licensing, telemedicine integration, total cost of ownership, and support SLAs.",
      href: "/resources/health-atm-buyers-guide/",
      icon: Laptop,
      tag:"Buyer's Guide",
    },
    {
      title:"Glossary and Reference",
      desc:"A plain English glossary of terms defined. Clear, linkable definitions for critical care, tele ICU, health kiosks, diagnostics, and regulatory frameworks.",
      href: "/resources/glossary/",
      icon: Stethoscope,
      tag:"Glossary and Reference",
    },
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
        ]}
      />
      <JsonLd data={collectionPageSchema} />

      {/* Hero */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Information and Guides"
              title="Resources and Original Data Hub"
              description="Cloudspital's resource hub: original research on preventive health screening in India, practical buyer's guides for health kiosks and tele-ICU, and a plain-English glossary of the terms that matter. Built to inform decisions, and to be the reference others cite."
            />
          </Reveal>
        </Container>
      </section>

      {/* Resources */}
      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          <Stagger className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {resourceItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Item key={item.title} className="h-full">
                  <Link
                    href={item.href}
                    className="group flex h-full min-h-[420px] flex-col rounded-[20px] bg-white p-6 transition-colors duration-500 ease-out-soft hover:bg-primary sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-line px-3 py-1.5 t-small text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                        {item.tag}
                      </span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <span className="mt-10 t-h3 text-faint transition-colors duration-500 group-hover:text-white/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="mt-auto pt-10">
                      <h2 className="t-h5 text-ink transition-colors duration-500 group-hover:text-white">
                        {item.title}
                      </h2>
                      <p className="mt-3 t-body text-muted transition-colors duration-500 group-hover:text-white/80">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-line pt-5 t-body text-ink transition-colors duration-500 group-hover:border-white/25 group-hover:text-white">
                      <span>Access Resource</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-white/40">
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <CtaBand
        title="Need custom research or configuration?"
        description="We work closely with healthcare providers, departments of health, and corporate teams to customize configurations, panels, and software integrations."
      />

      {/* Quick links */}
      <section className="pb-20 pt-10 lg:pb-[120px] lg:pt-16">
        <Container>
          <nav aria-label="Quick Links" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <p className="t-small text-muted">Quick Links:</p>
            <ul className="flex flex-wrap gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 t-small text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    {l.label}
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}
