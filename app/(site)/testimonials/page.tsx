import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ReviewSchema } from "@/components/schema/ReviewSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, Panel, SectionLabel, SectionHeader } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";

export const revalidate = 3600;

const PATH = "/testimonials/";

export const metadata: Metadata = pageMetadata({
  title:"Testimonials and Reviews",
  description:
    "What government hospitals, corporate wellness leads, and CSR foundations say about Cloudspital health kiosks and Tele ICU systems.",
  path: PATH,
});

const testimonials = [
  {
    quote:"The Cloudspital Health ATM has transformed how we execute rural wellness programs. Screening times fell by 60%, and ABHA card integration lets patients carry their records digitally.",
    author:"Dr. Ramesh Chandra",
    role: "Chief Medical Officer",
    organization:"Public Health Initiative, Bihar",
    rating: 5,
    tag:"Government Deployment",
  },
  {
    quote:"Deploying the telemedicine kiosks inside our corporate campus has drastically reduced employee downtime. They get rapid diagnostics and instant doctor consultations within minutes.",
    author:"Neha Sharma",
    role: "VP of Human Resources",
    organization:"InnovateTech India",
    rating: 5,
    tag:"Corporate Wellness",
  },
  {
    quote:"Through our CSR funding, we sponsored ten Cloudspital kiosks in remote areas. The impact is palpable. Over 25,000 screenings have been logged, saving lives through early diagnosis.",
    author:"Vikram Malhotra",
    role: "CSR Director",
    organization:"Aegis Foundation",
    rating: 5,
    tag:"CSR Project",
  },
  {
    quote:"We co developed the screening workflows with Cloudspital. The accuracy of the integrated CDSCO compliant POCT devices makes it a highly reliable first point of care.",
    author:"Dr. S. K. Sinha",
    role: "Clinical Lead",
    organization:"AIIMS Patna Collaboration Partner",
    rating: 5,
    tag:"Clinical Research",
  },
  {
    quote:"As a local pharmacy owner, installing the Health Kiosk has brought a new stream of health conscious customers. The reports are print ready and easy for doctors to interpret.",
    author:"Amit Verma",
    role: "Proprietor",
    organization:"Verma Medico and Diagnostics",
    rating: 5,
    tag:"Retail Pharmacy",
  },
  {
    quote:"The Tele ICU cart setup is highly mobile and robust. We can connect our remote rural ward to specialists in Patna in under a minute with crystal clear high definition audio and video.",
    author:"Sister Mary D'Souza",
    role: "Head Nurse",
    organization:"St. Jude Rural Hospital",
    rating: 5,
    tag:"Tele ICU Cart",
  }
];

export default function TestimonialsPage() {
  return (
    <>
      <ReviewSchema
        reviews={testimonials.map((t) => ({
          author: t.author,
          body: t.quote,
          rating: t.rating,
          org: t.organization,
        }))}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Testimonials", path: PATH },
        ]}
      />

      {/* Header */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Wall of Love"
              title={
                <>
                  Trusted by <span className="text-primary">Healthcare Leaders</span> Across India
                </>
              }
              description="Read how clinical experts, public health administrators, and CSR coordinators use Cloudspital kiosks to scale diagnostics and primary healthcare delivery."
            />
          </Reveal>
        </Container>
      </section>

      {/* Testimonials grid */}
      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          <Stagger className="grid gap-3 md:grid-cols-2 lg:gap-4">
            {testimonials.map((t, idx) => (
              <Item
                key={idx}
                className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8 lg:p-10"
              >
                <div>
                  {/* Rating and tag */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-0.5 text-primary" aria-label={`${t.rating} out of 5`}>
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="rounded-full border border-line px-3 py-1 t-small text-muted">
                      {t.tag}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="mt-8 t-h5 text-ink">&ldquo;{t.quote}&rdquo;</p>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-4 border-t border-line pt-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist t-body text-primary">
                    {t.author.split(" ").pop()?.charAt(0) || "U"}
                  </span>
                  <div>
                    <h2 className="t-body text-ink">{t.author}</h2>
                    <p className="t-small text-muted">
                      {t.role}, <span className="text-ink">{t.organization}</span>
                    </p>
                  </div>
                </div>
              </Item>
            ))}
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
              <h2 className="t-h2 text-white">Ready to Deploy Cloudspital at Your Facility?</h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                Talk to our medical devices and software engineering team to configure a custom health ATM, telemedicine bag, or Tele-ICU solution.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <ArrowButton href="/contact/" variant="light">
                  Contact and Request Demo
                </ArrowButton>
                <ArrowButton href="/about-us/" variant="dark" size="sm">
                  Learn About Our Story
                </ArrowButton>
              </div>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
