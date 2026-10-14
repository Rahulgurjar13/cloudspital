import Link from "next/link";
import type { ComponentType } from "react";
import {
  ShieldCheck,
  Activity,
  Check,
  Layers,
  Info,
  Cpu,
  ShieldAlert,
  Video,
  LayoutGrid,
  Shield,
  Camera,
} from "lucide-react";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { Container, NumberPill, Panel, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { Reveal, Stagger, Item } from "@/components/motion";
import { SITE } from "@/lib/constants";
import { PRODUCT_REGISTRY } from "@/lib/products-data";
import { ProductMedia } from "../ProductMedia";

// Feature-specific Lucide icons, keyed by the registry's icon name
const FEATURE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Cpu,
  ShieldAlert,
  Activity,
  Video,
  LayoutGrid,
  Shield,
  Pocket: Layers,
  Camera,
};

function FeatureIcon({ name }: { name: string }) {
  const Icon = FEATURE_ICONS[name] ?? Info;
  return <Icon className="h-5 w-5" />;
}

interface ProductRegistryDetails {
  slug: string;
  tagline: string;
  category:"Health Kiosks" | "Telemedicine Carts" | "Portable Kits" | "Mobile Units";
  vitals: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: Record<string, Record<string, string>>;
  certifications: string[];
  applications: string[];
  abdmCompliant: boolean;
}

interface ProductDetailsViewProps {
  product: {
    slug: string;
    name: string;
    description: string;
    body?: string;
    image?: string;
  };
  registryDetails?: ProductRegistryDetails;
  siblingProducts: { slug: string; name: string; image?: string }[];
}

export function ProductDetailsView({
  product,
  registryDetails,
  siblingProducts,
}: ProductDetailsViewProps) {
  const features = registryDetails?.features ?? [];
  const hasOverview = features.length > 0 || Boolean(product.body);
  const hasVitals = Boolean(registryDetails && registryDetails.vitals && registryDetails.vitals.length > 0);
  const hasSpecs = Boolean(registryDetails && registryDetails.specifications && Object.keys(registryDetails.specifications).length > 0);
  const hasDeploy = Boolean(registryDetails && registryDetails.applications && registryDetails.applications.length > 0);
  const hasSiblings = Boolean(siblingProducts && siblingProducts.length > 0);

  // Bands alternate white / canvas in the order they actually render.
  const order = [
    hasOverview && "overview",
    hasVitals && "vitals",
    hasSpecs && "specs",
    hasDeploy && "deploy",
    hasSiblings && "compare",
  ].filter(Boolean) as string[];
  const isWhite = (key: string) => order.indexOf(key) % 2 === 0;
  const band = (key: string) => `${isWhite(key) ? "bg-white" : ""} py-14 sm:py-20 lg:py-[120px] scroll-mt-24 lg:scroll-mt-28`;
  const card = (key: string) => (isWhite(key) ? "bg-canvas" : "bg-white");

  const onThisPage = [
    hasOverview && { id: "overview", label: "Overview and Features" },
    hasVitals && { id: "vitals", label: "Screenings Supported" },
    hasSpecs && { id: "specs", label: "Technical Specifications" },
    hasDeploy && { id: "deploy", label: "Clinical Deployments" },
  ].filter(Boolean) as { id: string; label: string }[];

  const tagline = registryDetails?.tagline;
  const showDescription = Boolean(product.description) && product.description !== tagline;

  return (
    <>
      {/* 1. Hero — product card left, details right */}
      <section className="pb-20 pt-10 lg:pb-[120px] lg:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ProductMedia
                image={product.image}
                slug={product.slug}
                name={product.name}
                category={registryDetails?.category}
                sizes="(min-width: 1024px) 540px, 100vw"
                priority
                large
                className="h-[460px] sm:h-[560px] lg:h-full lg:min-h-[620px]"
              >
                <div className="absolute inset-x-4 top-4 flex flex-wrap justify-between gap-2">
                  <span className="rounded-full bg-mist px-3 py-1 t-small text-ink">ABDM Sandbox Live</span>
                  <span className="rounded-full bg-ink px-3 py-1 t-small text-white">CE and CDSCO Approved</span>
                </div>
              </ProductMedia>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col items-start gap-6 lg:col-span-6 lg:col-start-7 lg:py-4">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <SectionLabel>{registryDetails?.category || "Medical Device"}</SectionLabel>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 t-small text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Clinical Grade Equipment
                </span>
              </div>

              <h1 className="t-h2 text-ink">{product.name}</h1>

              {tagline && <p className="t-h5 text-primary">{tagline}</p>}

              {showDescription && <p className="t-lead text-muted">{product.description}</p>}

              {/* Certifications */}
              {registryDetails?.certifications && (
                <ul className="grid w-full border-t border-line sm:grid-cols-2 sm:gap-x-8">
                  {registryDetails.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-3 border-b border-line py-3 t-body text-ink">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {cert}
                    </li>
                  ))}
                </ul>
              )}

              {/* ABDM note */}
              {registryDetails?.abdmCompliant && (
                <div className="flex w-full items-start gap-4 rounded-[20px] bg-mist p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="t-h6 text-ink">ABDM Level 1 and 2 Integrated</p>
                    <p className="mt-1 t-small text-muted">Fully compliant with Ayushman Bharat Digital Mission for ABHA ID.</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <BookDemoDialog>
                  <ArrowButton href="/contact/">Request Demonstration</ArrowButton>
                </BookDemoDialog>
              </div>
            </Reveal>
          </div>

          {/* On this page */}
          {onThisPage.length > 1 && (
            <div className="mt-12 border-t border-line pt-6 lg:mt-16">
              <nav
                aria-label="On this page"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
              >
                {onThisPage.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="shrink-0 rounded-full border border-line bg-white px-4 py-2 t-small text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </Container>
      </section>

      {/* 2. Overview and features */}
      {hasOverview && (
        <section id="overview" className={band("overview")}>
          <Container>
            <Reveal>
              <SectionHeader label="Overview" title="Overview and Features" />
            </Reveal>

            {features.length > 0 && (
              <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                {features.map((feature, i) => (
                  <Item
                    key={i}
                    className={`flex flex-col justify-between gap-10 rounded-[20px] p-6 sm:min-h-[280px] sm:p-8 ${card("overview")}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-primary ${isWhite("overview") ? "bg-white" : "bg-mist"}`}>
                        <FeatureIcon name={feature.icon} />
                      </span>
                      <span className="t-small text-faint">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h3 className="t-h5 text-ink">{feature.title}</h3>
                      <p className="mt-2 t-body text-muted">{feature.description}</p>
                    </div>
                  </Item>
                ))}
              </Stagger>
            )}

            {product.body && (
              <Reveal className="mt-12 grid gap-6 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-10">
                <h3 className="t-h5 text-ink lg:col-span-4">Detailed Description</h3>
                <div className="whitespace-pre-line t-lead text-muted lg:col-span-7 lg:col-start-6">
                  {product.body}
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {/* 3. Screenings supported */}
      {hasVitals && (
        <section id="vitals" className={band("vitals")}>
          <Container>
            <Reveal>
              <SectionHeader label="Screenings Supported" title="Parameters Tested and Vitals Supported" />
            </Reveal>
            <Stagger className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:mt-16">
              {registryDetails?.vitals.map((vital, i) => (
                <Item key={i} className="flex items-center gap-4 border-b border-line py-5">
                  <Check className="h-5 w-5 shrink-0 text-primary" />
                  <span className="t-h6 text-ink">{vital}</span>
                </Item>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* 4. Technical specifications */}
      {hasSpecs && (
        <section id="specs" className={band("specs")}>
          <Container>
            <Reveal>
              <SectionHeader label="Specifications" title="Technical Specifications" />
            </Reveal>
            <div className="mt-12 flex flex-col gap-5 lg:mt-16">
              {Object.entries(registryDetails?.specifications || {}).map(([category, items], idx) => (
                <Reveal key={idx} className="overflow-hidden rounded-[20px] border border-line bg-white">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-mist">
                        <th colSpan={2} scope="colgroup" className="px-5 py-4 t-small font-normal uppercase text-muted sm:px-6">
                          {category}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(items).map(([name, value], i) => (
                        <tr key={i} className="block border-t border-line sm:table-row">
                          <th
                            scope="row"
                            className="block px-5 pb-1 pt-4 align-top t-body font-normal text-ink sm:table-cell sm:w-1/3 sm:px-6 sm:pb-4"
                          >
                            {name}
                          </th>
                          <td className="block px-5 pb-4 align-top t-body text-muted sm:table-cell sm:px-6 sm:pt-4">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 5. Clinical deployments */}
      {hasDeploy && (
        <section id="deploy" className={band("deploy")}>
          <Container>
            <Reveal>
              <SectionHeader label="Clinical Deployments" title="Target Clinical Deployments and Use Cases" />
            </Reveal>
            <Stagger className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-2 lg:gap-x-10">
              {registryDetails?.applications.map((app, i) => (
                <Item key={i} className="flex gap-6 border-b border-line py-8">
                  <NumberPill n={i + 1} />
                  <div>
                    <h3 className="t-h5 text-ink">{app}</h3>
                    <p className="mt-2 t-body text-muted">
                      Optimized configurations specifically tailored for high performance in {app.toLowerCase()} environments.
                    </p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* 6. Similar products */}
      {hasSiblings && (
        <section className={band("compare")}>
          <Container>
            <Reveal>
              <SectionHeader
                title="Compare Similar Solutions"
                description="Review alternative models to select the configuration that matches your clinical and budget requirements."
              />
            </Reveal>

            <Stagger className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {siblingProducts.slice(0, 3).map((item) => (
                <Item key={item.slug}>
                  <Link href={`/products/${item.slug}/`} className="group flex h-full flex-col">
                    <ProductMedia
                      image={item.image}
                      slug={item.slug}
                      name={item.name}
                      category={PRODUCT_REGISTRY[item.slug]?.category}
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                      surface={isWhite("compare") ? "canvas" : "white"}
                      className="aspect-[4/3]"
                    />
                    <h3 className="mt-5 t-h5 text-ink">{item.name}</h3>
                    <p className="mt-2 t-small text-muted">
                      Clinical grade medical equipment certified for Indian healthcare.
                    </p>
                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                        <span className="t-small text-muted">ABDM Compliant</span>
                        <span className="flex items-center gap-3 t-small text-ink">
                          Details
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Item>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* 7. Call to action */}
      <section className="py-10 lg:py-16">
        <Panel className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 right-40 h-[360px] w-[360px] rounded-full bg-white/5"
          />
          <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <SectionLabel onDark>Get started</SectionLabel>
              <h2 className="t-h2 text-white">Ready to Upgrade Your Clinical Infrastructure?</h2>
            </div>
            <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                Partner with Cloudspital. Book a private screening demonstration, discuss technical integrations, or get an official corporate pricing quote for your hospital network.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <BookDemoDialog>
                  <ArrowButton href="/contact/" variant="light">
                    Book Live Showcase
                  </ArrowButton>
                </BookDemoDialog>
                <a
                  href={`tel:${SITE.phone}`}
                  className="t-lead text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  Call {SITE.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
