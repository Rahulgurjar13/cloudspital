import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { Reveal, Stagger, Item } from "@/components/motion";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { JsonLd } from "@/components/schema/JsonLd";
import { Container, Panel, SectionLabel, SectionHeader } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Shield, HeartPulse, Check } from "@/components/icons";
import { Layers } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title:"About Cloudspital: India's Medtech for Accessible Care",
  description:"Cloudspital builds Health ATM kiosks and tele ICU systems to make quality healthcare accessible across India. Meet our mission, leadership and recognitions.",
  path: "/about-us/",
});

const values = [
  {
    name: "Clinically Grounded",
    description:
      "Our screening and critical care workflows are co developed and validated in collaboration with AIIMS clinicians.",
    icon: HeartPulse,
  },
  {
    name: "Public-Sector Ready",
    description:
      "We ensure complete CDSCO compliance, GeM listing availability, and native ABDM/ABHA digital record integration.",
    icon: Shield,
  },
  {
    name: "End-to-End Range",
    description:
      "We deliver a full continuum of care, from walk up Health ATM screening kiosks to ICU grade remote telemetry.",
    icon: Layers,
  },
];

const leaders = [
  {
    name: "Shubham Shashank",
    role: "Founder and CEO",
    bio:"Tech entrepreneur and medtech innovator. Shubham founded Cloudspital to bridge India's critical healthcare access gap, pioneering AIIMS co developed Health ATM configurations and Tele ICU telemetry networks.",
    initials:"SS",
    slug: "shubham-shashank",
    photo: "/1.webp"
  },
  {
    name: "Kriti Mishra",
    role: "Co-Founder and CMO",
    bio:"Healthcare strategist and growth leader. Kriti directs marketing, public relations, and public sector deployment partnerships for Cloudspital, expanding operations across 15 states.",
    initials:"KM",
    slug: "kriti-mishra",
    photo: "/2.webp"
  },
  {
    name: "Prof. (Dr) Ipseeta Nanda",
    role: "Member, Board of Directors",
    bio:"A distinguished healthcare administrator and academician guiding clinical validation, safety compliance, and regulatory alignments for all Cloudspital platforms.",
    initials:"IN",
    slug: "ipseeta-nanda",
    photo: "/3.webp"
  },
  {
    name: "Avinash Singh",
    role: "Chief Strategist and Mentor",
    bio:"A seasoned business strategist and mentor, Avinash guides Cloudspital's long term vision, go to market strategy, and partnership growth across public and private healthcare ecosystems.",
    initials:"AS",
    slug: "avinash-singh",
    photo: "/4a.webp"
  }
];

const certifications = [
  "DPIIT/Startup India (DIPP67722)",
  "GeM listed OEM Vendor",
  "ISO 13485 and 9001 QMS",
  "CE Certified Products",
  "CDSCO POCT Compliant",
  "AIIMS Patna Technology MoU",
  "NITI Aayog / AIM Supported",
  "Atal Innovation Mission Awardee",
];

const partners = [
  "Bihar Government Health Society",
  "Indian Railways Zonal Divisions",
  "AIIMS Patna Spoke Hospitals",
  "Municipal smart city health centers",
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Cloudspital: India's Medtech for Accessible Care",
  "description":"Cloudspital builds Health ATM kiosks and tele ICU systems to make quality healthcare accessible across India. Meet our mission, leadership and recognitions.",
  "url": "https://cloudspital.ai/about-us/",
  "mainEntity": {
    "@type": "Organization",
    "name": "Cloudspital Private Limited",
    "alternateName":"Cloudspital",
    "url": "https://cloudspital.ai",
    "logo": "https://cloudspital.ai/images/logo.png",
    "telephone":"+917542011187",
    "sameAs": [
      "https://www.linkedin.com/company/cloudspital",
      "https://www.instagram.com/cloudspital"
    ]
  }
};

const linkCls =
  "t-lead text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white";

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us/" },
        ]}
      />
      <JsonLd data={aboutPageSchema} />

      {/* Hero: title on the canvas, company statement on the inset panel */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionLabel>Our Story and Mission</SectionLabel>
            <h1 className="mt-6 max-w-[1100px] t-h1 text-ink">
              About <span className="text-primary">Cloudspital</span>
            </h1>
          </Reveal>
        </Container>

        <Reveal delay={0.1} className="mt-10 lg:mt-14">
          <Panel className="bg-hero-gradient relative overflow-hidden">
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/15" />
            <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-16">
              <p className="t-h5 text-white lg:col-span-9">
                Cloudspital Private Limited is an Indian medtech company founded in <strong className="font-normal">2020</strong>, headquartered in <strong className="font-normal">Patna, Bihar</strong>. We design and manufacture Health ATM kiosks, Tele-ICU/tele-PICU systems, telemedicine carts and Mobile Medical Units to bring screening, diagnostics and specialist care to every corner of India.
              </p>
              <div className="border-t border-white/25 pt-8 lg:col-span-12">
                <TrustStrip />
              </div>
            </div>
          </Panel>
        </Reveal>
      </section>

      {/* Mission and story */}
      <section className="mt-20 bg-white py-20 lg:mt-[120px] lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-10">
                <div>
                  <SectionLabel onDark>Core Target</SectionLabel>
                  <h2 className="mt-6 t-h3 text-white">Our Mission</h2>
                </div>
                <p className="t-h5 text-white">
                  To make quality, preventive and critical healthcare accessible regardless of location, closing India&apos;s urban-rural care gap with affordable, connected medtech.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
              <SectionLabel>Our Origin</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Our Story</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  Cloudspital was founded with a clear vision: to resolve the massive urban-rural healthcare divide in India. Witnessing the lack of diagnostic tools in rural primary health centres and the extreme scarcity of critical-care specialists (with only 2.3 ICU beds per 100,000 people), we set out to build smart point-of-care kiosks.
                </p>
                <p>
                  In collaboration with clinical experts from AIIMS Patna, we developed and validated our clinical protocols. Today, Cloudspital&apos;s Health ATMs and Tele-ICU systems are deployed across multiple states, serving thousands of patients daily and saving lives through early screening and remote critical care.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Our Core Values"
              description="The principles that drive our mission to make healthcare accessible, preventive, and scalable."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Item
                  key={value.name}
                  className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{value.name}</h3>
                    <p className="mt-3 t-body text-muted">{value.description}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Leadership */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Our Leadership Team"
              description="Meet the innovators and clinical advisors leading Cloudspital's mission to democratise healthcare."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {leaders.map((leader) => (
              <Item key={leader.name} className="flex h-full flex-col rounded-[20px] bg-canvas p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-mist sm:aspect-[4/5]">
                  {leader.photo ? (
                    <Image
                      src={leader.photo}
                      alt={leader.name}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center t-h3 text-ink">
                      {leader.initials}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <h3 className="t-h5 text-ink">{leader.name}</h3>
                  <p className="mt-1 t-small text-muted">{leader.role}</p>
                  <p className="mt-5 t-small text-muted">{leader.bio}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/author/${leader.slug}/`}
                      className="group flex items-center gap-2 border-t border-line pt-4 t-body text-primary"
                    >
                      View Bio Page
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Recognitions, compliance and clients */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader label="Recognised for Excellence" title="Recognitions, Compliance and Clients" />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <Reveal className="space-y-12 lg:col-span-6">
              <div>
                <h3 className="t-h5 text-ink">Compliance and Certifications</h3>
                <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                  {certifications.map((item) => (
                    <li key={item} className="flex items-center gap-3 border-b border-line py-4 t-body text-ink">
                      <Check className="h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="t-h5 text-ink">Key Partners and Clients</h3>
                <p className="mt-3 t-body text-muted">
                  Our systems are deployed and trusted by prominent public health agencies and transit networks:
                </p>
                <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                  {partners.map((p) => (
                    <li key={p} className="flex items-center gap-3 border-b border-line py-4 t-body text-ink">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] bg-mist">
                <Image
                  src="/images/mmu-field.webp"
                  alt="Cloudspital mobile medical unit deployed in the field"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DPIIT Startup India certificate of recognition */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              label="Government of India Recognition"
              title="DPIIT · Startup India Certified"
              description="Cloudspital Private Limited is officially recognised as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce & Industry, working in the Healthcare & Lifesciences sector."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <div className="rounded-[20px] bg-canvas p-3 sm:p-4">
                <Image
                  src="/startup-india-certificate.webp"
                  alt="Certificate of Recognition — Cloudspital Private Limited recognised as a startup by DPIIT, Government of India (Certificate No. DIPP67722)"
                  width={2270}
                  height={1600}
                  sizes="(min-width: 1024px) 860px, 100vw"
                  className="h-auto w-full rounded-[12px]"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
              <div className="relative min-h-[180px] overflow-hidden rounded-[20px] bg-canvas">
                <Image
                  src="/certificate.webp"
                  alt="ISO 13485, CE and ISO 9001 certification marks"
                  fill
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="scale-[1.3] object-contain p-4"
                />
              </div>
              <div className="relative min-h-[180px] rounded-[20px] bg-canvas">
                <Image
                  src="/made-in-india.webp"
                  alt="Make in India and Startup India logos"
                  fill
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="object-contain p-8"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="py-10 lg:py-16">
        <Panel className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10" />
          <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <SectionLabel onDark>Get started</SectionLabel>
              <h2 className="t-h2 text-white">Join Us in Shaping the Future of Healthcare</h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                Whether you are a healthcare provider seeking to scale your clinic, a corporate aiming for wellness solutions, or a government officer deploying public health kiosks, we are here to assist.
              </p>
              <BookDemoDialog>
                <ArrowButton href="/contact/" variant="light">
                  Enquire now
                </ArrowButton>
              </BookDemoDialog>
              <nav aria-label="More about Cloudspital" className="flex w-full flex-wrap gap-x-6 gap-y-2 border-t border-white/25 pt-6">
                <Link href="/products/" className={linkCls}>Explore Products</Link>
                <Link href="/press/" className={linkCls}>Press and Media</Link>
                <Link href="/contact/" className={linkCls}>Contact Us</Link>
              </nav>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
