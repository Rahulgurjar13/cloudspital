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
import { Activity, Database, Heart } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "tele-icu" as const;
const SLUG = "remote-patient-monitoring";
const PATH = "/tele-icu/remote-patient-monitoring/";
const TITLE="Remote Patient Monitoring (RPM) in Critical Care";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how continuous Remote Patient Monitoring (RPM) streams live patient vitals, enabling early clinical warning signals and preventing crashes.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"What does remote patient monitoring measure?",
    a:"In critical care, RPM captures core physiological vitals: heart rate, blood pressure, oxygen saturation (SpO₂), respiratory rate, body temperature, and ECG wave streams. It can also integrate ventilator outputs and infusion pump rates.",
  },
  {
    q:"Is RPM the same as tele ICU?",
    a:"RPM is the telemetry data backbone of tele ICU. While RPM refers to the capture and transmission of vitals streams, tele ICU adds remote specialist physicians (intensivists), video conferencing, and clinical decision making protocols on top of that telemetry.",
  },
  {
    q:"Does RPM need special internet?",
    a:"Stable connectivity is key. Cloudspital uses lightweight telemetry protocols that optimize bandwidth usage, prioritizing vital signs data over video feeds so monitoring is maintained even during connectivity drops.",
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
          { name: "Tele-ICU and Tele-PICU", path: "/tele-icu/" },
          { name: "Remote Patient Monitoring", path: PATH },
        ]}
      />

      <SpokeHero
        title="Remote Patient Monitoring (RPM)"
        description="Discover how continuous physiological telemetry underpins modern, data driven critical care."
        definitionLabel="Core Definition"
        definition="Remote Patient Monitoring (RPM) in critical care refers to the continuous, real time capture and transmission of a patient's vital signs to off site clinicians. It forms the data backbone of tele ICU, enabling specialists to detect early deterioration trends and intervene before a crisis."
      />

      {/* How RPM Works in the ICU */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">How RPM Works in the ICU</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  IoT gateways interface directly with bedside patient monitors and ventilators, securely packaging vital streams (heart rate, blood pressure, oxygen saturation, and respiratory rate) into encrypted telemetry packets.
                </p>
                <p>
                  These streams are visualized on remote command-center dashboards. Specialized algorithms analyze these continuous streams, looking for slow physiological shifts that signal impending failure, such as progressive hypoxia or sepsis-induced hypotension, letting clinical teams act on early warnings rather than late symptoms.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <p className="t-h5 text-ink">Continuous Stream</p>
                  <p className="mt-2 t-body text-muted">
                    Unlike manual tracking, RPM eliminates observation gaps, ensuring patients are monitored every second of the day.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* RPM vs. Periodic Checks */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="RPM vs. Periodic Ward Checks"
              description="Comparing manual chart updates with automated real time telemetry."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:gap-4">
            <Item className="flex min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-mist p-6 sm:p-8 lg:p-10">
              <span className="self-start rounded-full border border-line bg-white px-3 py-1.5 t-small text-ink">
                High-Risk Blind Spots
              </span>
              <div>
                <h3 className="t-h4 text-ink">Traditional Periodic Checks</h3>
                <p className="mt-3 t-body text-muted">
                  Ward nurses sample patient vitals manually every 2 to 4 hours. If a patient begins to deteriorate shortly after a check, the anomaly will go unnoticed until the next scheduled round, creating a dangerous 2-hour clinical blind spot.
                </p>
              </div>
            </Item>

            <Item className="flex min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-primary p-6 text-white sm:p-8 lg:p-10">
              <span className="self-start rounded-full bg-white px-3 py-1.5 t-small text-primary">
                Immediate Detection
              </span>
              <div>
                <h3 className="t-h4 text-white">Continuous Remote Monitoring</h3>
                <p className="mt-3 t-body text-white/80">
                  Telemetry streams are transmitted continuously. If a parameter breaches preset safety limits, an automated alarm immediately triggers at the remote command center, allowing clinical intervention within seconds.
                </p>
              </div>
            </Item>
          </Stagger>
        </Container>
      </section>

      {/* RPM Beyond the ICU */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Unified Digital Care</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Extending RPM Beyond the Intensive Care Unit</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  The same telemetry principles apply to chronic-disease management, post-operative home recovery, and general hospital wards. By interfacing with India&apos;s Ayushman Bharat Digital Health Mission (ABDM/ABHA), RPM builds longitudinal health history records.
                </p>
                <p>
                  Cloudspital&apos;s telemetry architecture is designed to scale down seamlessly from intensive continuous ICU feeds to low-power ward monitors and portable home-care telemetry kits.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Database className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">ABHA Integration</h3>
                  <p className="mt-2 t-body text-white/70">
                    Our platform automatically syncs patient telemetry into standard digital files, linking directly to the national ABHA medical records database.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Clinical Evidence */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                <Heart className="h-5 w-5" />
              </span>
              <h3 className="t-h4 text-ink">Clinical Evidence</h3>
            </div>
            <p className="t-h5 text-ink lg:col-span-7 lg:col-start-6">
              A large-scale meta-analysis published in <em>Critical Care Medicine</em> concluded that continuous remote patient monitoring in ICU environments is associated with a significant reduction in patient mortality rates, shorter lengths of hospital stay, and lower overall treatment costs.
            </p>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Integrate Continuous RPM"
        description="Consult with our clinical engineers to implement remote monitoring solutions in your facility."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
