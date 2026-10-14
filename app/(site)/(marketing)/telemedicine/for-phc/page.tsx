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
import { Info, Users, Activity, ShieldCheck, Award } from "lucide-react";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "telemedicine" as const;
const SLUG = "for-phc";
const PATH = "/telemedicine/for-phc/";
const TITLE="Telemedicine for Primary Health Centres (PHCs)";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:"Learn how telemedicine carts, kiosks, and eSanjeevani integrations transform rural PHCs and sub centres into rich diagnostic gateways.",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [
  {
    q:"How does telemedicine help PHCs?",
    a:"It brings specialist medical consultations and advanced diagnostic screening directly on site to rural primary health centres, reducing the need for patients to travel long distances for primary care.",
  },
  {
    q:"Does it integrate with government systems?",
    a:"Yes. Cloudspital's telemedicine terminals support integration with national systems like eSanjeevani for teleconsultations and ABHA registries for patient electronic medical records.",
  },
  {
    q:"What hardware does a PHC need to start?",
    a:"A basic PHC setup requires either a mobile telemedicine cart, a self service diagnostic kiosk, or a portable telemedicine bag, combined with stable network connectivity.",
  },
];

const UPGRADES = [
  {
    icon: Users,
    title: "Doctor and Specialist Access",
    desc: "Connects rural patients directly to general physicians and pediatric, cardiac, or ophthalmic specialists via national eSanjeevani networks.",
  },
  {
    icon: Activity,
    title: "On-Site Diagnostics",
    desc: "Automates first-line blood pressure, ECG, and metabolic screenings (blood glucose, lipids) via integrated POCT devices.",
  },
  {
    icon: ShieldCheck,
    title: "Linked Digital Records",
    desc: "Saves screening results directly to citizens' digital ABHA health IDs, ensuring longitudinal medical history tracking.",
  },
  {
    icon: Info,
    title: "Fewer Referrals",
    desc: "By stabilizing and treating common chronic metabolic conditions locally, PHCs reduce unnecessary patient transport.",
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
          { name: "Telemedicine Hub", path: "/telemedicine/" },
          { name: "For PHCs", path: PATH },
        ]}
      />

      <SpokeHero
        title="Telemedicine for PHCs"
        description="Transforming primary health sub centres into advanced gateways for specialist consults and point of care testing."
        definitionLabel="PHC Integration Summary"
        definition="Telemedicine allows rural Primary Health Centres (PHCs) and sub centres to offer specialist consultations and on site diagnostics without specialists physically present. When integrated with telemedicine carts, kiosks, and eSanjeevani, a PHC becomes a gateway to wider healthcare."
      />

      {/* The PHC Challenge */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h2 text-ink">The Primary Health Care Challenge</h2>
              <div className="mt-8 space-y-5 t-lead text-muted">
                <p>
                  PHCs and rural sub-centres are the front line of India&apos;s healthcare system. However, they frequently suffer from shortages of full-time doctors and diagnostic equipment.
                </p>
                <p>
                  Because of these resource limits, patients are often referred onward to distant tertiary hospitals for basic diagnostic tests or specialist consultations, leading to delayed treatment and high family travel costs.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-white p-6 sm:p-8">
                <span className="t-label text-muted">Healthcare Access</span>
                <div>
                  <h3 className="t-h5 text-ink">Bridging the Gap</h3>
                  <p className="mt-2 t-body text-muted">
                    Telemedicine brings specialist clinical expertise directly into rural PHCs, helping resolve health issues locally.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What Telemedicine Adds to a PHC */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title="What Telemedicine Adds to a PHC"
              description="Four primary clinical upgrades for rural sub centres."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {UPGRADES.map((u, i) => (
              <Item key={u.title} className="flex flex-col justify-between gap-10 sm:min-h-[300px] rounded-[20px] bg-canvas p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary">
                    <u.icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <h3 className="t-h6 text-ink">{u.title}</h3>
                  <p className="mt-2 t-body text-muted">{u.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Cloudspital PHC Deployments */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-7">
              <SectionLabel>Deployments</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">Cloudspital PHC Deployments</h2>
              <p className="mt-8 t-lead text-muted">
                Cloudspital provides active medical equipment deployments in primary health centres and sub-centres across several states. Our engineering and integration teams customize the deployment layout, packaging carts, kiosks, or bags to align with the specific infrastructure, space, and staffing parameters of your PHC.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="flex min-h-[280px] flex-col justify-between rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Verified Impact</h3>
                  <p className="mt-2 t-body text-white/70">
                    Empowering frontline ASHA and ANM workers with tools that connect directly to state medical hubs.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Upgrade Your PHC Services"
        description="Consult with our healthcare coordinators to plan a custom telemedicine layout for your PHC clinics."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
