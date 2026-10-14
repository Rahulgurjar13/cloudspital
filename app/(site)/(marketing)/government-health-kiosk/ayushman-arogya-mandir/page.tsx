import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import { HeartPulse, UserCheck, Shield, Video } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "government-health-kiosk" as const;
const SLUG = "ayushman-arogya-mandir";
const PATH = "/government-health-kiosk/ayushman-arogya-mandir/";
const TITLE="Health Kiosks for Ayushman Arogya Mandirs (AAM)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how Health ATM kiosks scale preventive screening, automate NCD checkups, and support telemedicine inside India's 1.5 lakh Ayushman Arogya Mandirs.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What is an Ayushman Arogya Mandir?",
    a:"Ayushman Arogya Mandirs (AAMs) are upgraded primary health sub centres and PHCs. They form India's grassroots network delivering comprehensive primary care, maternal/child health services, and free essential diagnostics.",
  },
  {
    q:"How do health kiosks support AAM operations?",
    a:"They automate community level health screenings and save reports directly to patients' digital health cards. This extends the reach of limited local medical staff and simplifies tracking of chronic conditions.",
  },
  {
    q:"Are Ayushman Arogya Mandirs the same as PM JAY?",
    a:"No. AAMs represent the physical clinics that deliver primary care and diagnostic screening. PM JAY is the national health insurance scheme that covers secondary and tertiary hospital care. Both sit under the Ayushman Bharat umbrella.",
  },
];

const FIT_FACTORS = [
  {
    title:"Screening at Scale",
    desc:"Automates screening for blood pressure, BMI, blood sugar, and ECG to support early detection of non communicable diseases (NCDs).",
    icon: HeartPulse,
  },
  {
    title:"Support for Thin Staffing",
    desc:"Reduces manual workloads, allowing local community health officers (CHOs) and nurses to cover larger patient volumes.",
    icon: UserCheck,
  },
  {
    title:"ABHA Digital Records",
    desc:"Links all diagnostic results directly to patient ABHA records, building longitudinal medical histories.",
    icon: Shield,
  },
  {
    title:"Telemedicine Integration",
    desc:"Connects AAM patients directly to district hospital doctors and specialists via integrated eSanjeevani services.",
    icon: Video,
  },
];

export default function Page() {
  const siblings = getSiblingLinks(HUB, SLUG);
  const hubTitle = getHubTitle(HUB);

  return (
    <article>
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical and Engineering Team", bio:"" }}
      />
      <FaqSchema faqs={faqs} />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Government Kiosk Hub", path: "/government-health-kiosk/" },
          { name: "Ayushman Arogya Mandir", path: PATH },
        ]}
      />

      <SpokeHero
        title="Health Kiosks for Ayushman Arogya Mandirs"
        description="Scaling preventive diagnostics and primary healthcare across India's health sub centres."
        definitionLabel="AAM Integration Summary"
        definition="Ayushman Arogya Mandirs (AAMs) are the primary care access points under India's Ayushman Bharat scheme. Health ATM kiosks support AAMs by automating community level physiological screening, linking data directly to national ABHA files, and enabling integrated telemedicine."
      />

      {/* What AAMs Do */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">Grassroots Healthcare and Prevention</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  With approximately <strong className="font-normal text-ink">1.5 lakh Ayushman Arogya Mandirs</strong> active across India, the network focuses on delivering free, comprehensive primary care and preventive screening right to community doorsteps.
                </p>
                <p>
                  Detecting non-communicable diseases (NCDs) like hypertension and diabetes early is key. Health ATMs help scale these preventive screenings, replacing slow manual charts with automated checkups.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8">
                <SectionLabel>National Footprint</SectionLabel>
                <div>
                  <h3 className="t-h3 text-ink">~1.5 Lakh</h3>
                  <p className="mt-1 t-body text-ink">Ayushman Arogya Mandirs</p>
                  <p className="mt-4 border-t border-line pt-4 t-small text-muted">
                    Forming the primary preventive care network across Indian villages.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why Kiosks Fit AAMs */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="Why Kiosks Fit Ayushman Arogya Mandirs"
              description="Four core ways automated terminals support primary care teams."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {FIT_FACTORS.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <Item key={fact.title} className="flex min-h-[300px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{fact.title}</h3>
                    <p className="mt-2 t-body text-muted">{fact.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital at the Community Level */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <h2 className="t-h2 text-ink">Cloudspital at the Community Level</h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-3">
              <p className="t-lead text-muted">
                Cloudspital manufactures rugged, dust-resistant Health ATM configurations tailored for grassroots environments. Supported by offline-mode backups and dual-SIM failover systems, our kiosks operate reliably inside rural sub-centres, ensuring seamless data capture and digital record linking even in remote regions.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Support Primary Care Initiatives"
        description="Consult with our rural health coordinators to deploy certified diagnostic terminals in your local health sub-centres."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
