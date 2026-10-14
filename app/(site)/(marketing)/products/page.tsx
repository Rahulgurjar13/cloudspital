import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { listProducts } from "@/lib/db/products";
import { PRODUCTS } from "@/lib/site-structure";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schema/ItemListSchema";
import { ProductsShowcase } from "./ProductsShowcase";
import { PRODUCT_REGISTRY } from "@/lib/products-data";
import { Users, Network, HeartHandshake, Stethoscope, Activity, FileText, Video, Cpu, Wifi, BarChart3 } from "lucide-react";
import Image from "next/image";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader } from "@/components/ui/Section";
import { HubWhy } from "@/components/hub/HubKit";
import { Reveal, Stagger, Item } from "@/components/motion";

const SERVICES = [
  {
    icon: Users,
    title: "Patient Load Relief",
    desc: "Relieving patient overload burden in hospitals and health centers through accessible, decentralized healthcare solutions.",
  },
  {
    icon: Network,
    title: "Rural Access Bridge",
    desc: "Bridging the rural healthcare divide by providing alternative points of care to counter skewed patient-doctor ratios.",
  },
  {
    icon: HeartHandshake,
    title: "Clinical Staff Empowerment",
    desc: "Empowering clinical staff with efficient, tech-driven point-of-care tools for enhanced service delivery.",
  },
  {
    icon: Stethoscope,
    title: "Preventative Health Access",
    desc: "Promoting preventative health and wellness by encouraging health-conscious behavior through accessibility and affordability.",
  },
];

const BENEFITS = [
  {
    icon: Activity,
    title: "Rapid Full-Body Health Screening",
    desc: "Rapid full-body health screening completed within minutes for convenient assessments.",
  },
  {
    icon: FileText,
    title: "On-the-Spot Diagnostic Reporting",
    desc: "Instantaneous diagnostic reports and health data summaries for timely insights.",
  },
  {
    icon: Video,
    title: "Seamless Virtual Health Consultations",
    desc: "Integrated telemedicine platform enabling real-time virtual consultations with medical experts.",
  },
  {
    icon: Cpu,
    title: "Extensive Health Monitoring Capabilities",
    desc: "Comprehensive health monitoring through an expansive suite of 31+ test and screening parameters.",
  },
  {
    icon: Wifi,
    title: "Connectivity-Agnostic Access",
    desc: "Seamless online/offline functionality ensuring uninterrupted healthcare access in any connectivity scenario.",
  },
  {
    icon: BarChart3,
    title: "Data-Powered Insights Platform",
    desc: "Data-driven analytics dashboard empowering decision makers with real-time health metrics and trends.",
  },
];

export const dynamic="force-dynamic";

export const metadata: Metadata = pageMetadata({
  title:"Advanced Medical Products and Kiosks",
  description:
    "Explore our range of ABDM compliant health kiosks, Tele ICU equipment, telemedicine carts, and portable diagnostic solutions.",
  path: "/products/",
});

export default async function ProductsHub() {
  const dbProducts = await listProducts();
  const rawProducts = (dbProducts.length > 0 ? dbProducts : PRODUCTS) as Array<{
    slug: string;
    name: string;
    description?: string;
    priceFrom?: number;
    currency?: string;
    image?: string;
  }>;

  const enrichedProducts = rawProducts.map((p) => {
    const registry = PRODUCT_REGISTRY[p.slug];
    return {
      slug: p.slug,
      name: p.name,
      description: p.description || registry?.tagline || "Advanced healthcare technology solutions.",
      image: p.image || undefined,
      category: registry?.category || "Health Kiosks",
      vitals: registry?.vitals || [],
      abdmCompliant: registry?.abdmCompliant || false,
    };
  });

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
        ]}
      />
      <ItemListSchema
        name="Cloudspital Medical Products and Kiosks"
        items={enrichedProducts.map((p) => ({
          name: p.name,
          path: `/products/${p.slug}/`,
        }))}
      />

      {/* Header + product range */}
      <section className="pb-20 pt-10 lg:pb-[120px] lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Cloudspital Products Portfolio"
              title={
                <>
                  Smart Diagnostics. <br className="hidden sm:inline" />
                  Connected Clinical Care.
                </>
              }
              description="Discover our collection of ABDM-compliant health kiosks, telemedicine ward carts, ICU diagnostic stations, and portable emergency kits built to power remote diagnostics across India."
              action={
                <div className="flex flex-wrap items-center gap-3">
                  <BookDemoDialog>
                    <ArrowButton href="/contact/">Schedule Live Product Demo</ArrowButton>
                  </BookDemoDialog>
                  <ArrowButton href="/products/compare/" variant="outline" size="sm">
                    Compare Arc models
                  </ArrowButton>
                </div>
              }
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-8 sm:mt-12 lg:mt-16">
            <ProductsShowcase products={enrichedProducts} />
          </Reveal>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              label="Our Services"
              title="Democratizing Healthcare with Kiosk"
              description="Empowering remote populations and communities with premium technology platforms that close the doctor-to-patient divide."
            />
          </Reveal>
          <Stagger className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const SIcon = s.icon;
              return (
                <Item key={s.title} className="flex flex-col gap-10 border-b border-r border-line p-6 sm:min-h-[280px] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="t-small text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <SIcon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="t-h5 text-ink">{s.title}</h3>
                    <p className="mt-2 t-small text-muted">{s.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Key Benefits */}
      <HubWhy
        label="Core Value"
        title="Key Benefits"
        body="Timely care with right medication made simple with cloudspital health kiosk."
        features={BENEFITS}
      />

      {/* Safety Standards, Certifications, and Warranty */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              label="Testing Parameters and Quality"
              title={
                <>
                  Testing Parameters: <br className="hidden sm:inline" />
                  <span className="text-primary">Safety Standards and Warranty</span>
                </>
              }
              description="Reliable and trusted healthcare device manufacturers bringing the next spark of innovation in healthcare accessibility and tele-medicine."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            <Item className="flex min-h-[240px] flex-col justify-between gap-8 rounded-[20px] bg-canvas p-6 sm:p-8 md:min-h-[300px]">
              <p aria-hidden="true" className="text-[96px] leading-none tracking-[-0.06em] text-primary">
                5
              </p>
              <h3 className="t-h5 text-ink">5 Years Warranty</h3>
            </Item>
            <Item className="flex min-h-[240px] flex-col justify-between gap-8 rounded-[20px] bg-canvas p-6 sm:p-8 md:min-h-[300px]">
              <div className="relative -my-6 -ml-6 h-48 w-[calc(100%+1.5rem)]">
                <Image
                  src="/certificate.webp"
                  alt="Certifications"
                  fill
                  sizes="(min-width: 768px) 360px, 90vw"
                  className="object-contain object-left"
                />
              </div>
              <h3 className="t-h5 text-ink">Certifications</h3>
            </Item>
            <Item className="flex min-h-[240px] flex-col justify-between gap-8 rounded-[20px] bg-canvas p-6 sm:p-8 md:min-h-[300px]">
              <div className="relative h-32 w-full">
                <Image
                  src="/made-in-india.webp"
                  alt="Made in India"
                  fill
                  sizes="(min-width: 768px) 240px, 60vw"
                  className="object-contain object-left"
                />
              </div>
              <h3 className="t-h5 text-ink">Made in India</h3>
            </Item>
          </Stagger>
        </Container>
      </section>

      <CtaBand
        title="Ready to Upgrade Your Clinical Infrastructure?"
        description="Partner with Cloudspital. Book a private screening demonstration, discuss technical integrations, or get an official corporate pricing quote for your hospital network."
      />
    </>
  );
}
