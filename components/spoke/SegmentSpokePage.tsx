import type { ComponentType } from "react";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SpokeHero } from "@/components/ui/SpokeHero";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { FaqSection } from "@/components/ui/FaqSection";
import { CtaBand } from "@/components/ui/CtaBand";
import { Container, SectionHeader, SectionLabel } from "@/components/ui/Section";
import { getSiblingLinks, getHubTitle } from "@/lib/site-structure";
import { Reveal, Stagger, Item } from "@/components/motion";
import {
  Train,
  MapPin,
  Activity,
  GraduationCap,
  Eye,
  Smile,
  Users,
  RefreshCw,
  Stethoscope,
  Heart,
  FileText,
  Check,
} from "lucide-react";
import type { Faq } from "@/lib/cms";

const HUB = "health-atm-kiosk" as const;

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  train: Train,
  mappin: MapPin,
  activity: Activity,
  graduationcap: GraduationCap,
  eye: Eye,
  smile: Smile,
  users: Users,
  refreshcw: RefreshCw,
  stethoscope: Stethoscope,
  heart: Heart,
  filetext: FileText,
  check: Check,
};

const SOLUTION_TAGS = ["CDSCO Compliant", "ISO 13485 Certified", "ABDM Ready", "Rugged Enclosure"];

interface BenefitItem {
  title: string;
  desc: string;
  icon: string; // key into iconMap
}

export interface SegmentSpokePageProps {
  slug: string;
  title: string;
  canonicalUrl: string;
  h1: string;
  introAnswer: string; // 40-60 word answer
  benefitsTitle: string; // e.g. "Why railway stations deploy Health ATMs"
  benefits: BenefitItem[];
  whatToLookFor: string;
  deploymentsAndPackage: string; // Cloudspital package + deployments info
  faqs: Faq[];
  ctaMessage?: string;
  sources?: string[];
}

// Short segment spoke (Health ATM for schools, pharmacies, railway stations…):
// hero → benefits → what to look for → FAQ → CTA → related spokes.
export default function SegmentSpokePage({
  slug,
  title,
  canonicalUrl,
  h1,
  introAnswer,
  benefitsTitle,
  benefits,
  whatToLookFor,
  deploymentsAndPackage,
  faqs,
}: SegmentSpokePageProps) {
  const siblings = getSiblingLinks(HUB, slug);
  const hubTitle = getHubTitle(HUB);
  const path = `/${HUB}/${slug}/`;

  return (
    <article>
      <ArticleSchema
        headline={title}
        url={canonicalUrl}
        publishedAt="2026-06-12"
        updatedAt="2026-06-16"
        author={{
          slug: "cloudspital-editorial",
          name: "Cloudspital Editorial",
          role: "Clinical and Engineering Team",
          bio: "",
        }}
      />
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: hubTitle, path: `/${HUB}/` },
          { name: h1, path },
        ]}
      />

      <SpokeHero eyebrow="Specialized Deployment Segment" title={h1} description={introAnswer} />

      {/* Benefits */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <SectionHeader
              title={benefitsTitle}
              description="Key advantages of introducing automated digital screening booths."
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-16 lg:gap-4">
            {benefits.map((b, i) => {
              const Icon = iconMap[b.icon.toLowerCase()] || Check;
              return (
                <Item
                  key={b.title}
                  className="flex flex-col justify-between gap-10 rounded-[20px] bg-white p-6 sm:p-8 md:min-h-[280px]"
                >
                  <div className="flex items-start justify-between">
                    <span className="t-h3 text-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h5 text-ink">{b.title}</h3>
                    <p className="mt-2 t-body text-muted">{b.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* What to look for + the Cloudspital package */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <Reveal className="lg:col-span-6">
              <SectionLabel>Procurement Guide</SectionLabel>
              <h2 className="mt-6 t-h2 text-ink">What to Look For</h2>
              <p className="mt-8 t-lead text-muted">{whatToLookFor}</p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-end">
              <div className="flex min-h-[320px] flex-col justify-between gap-10 rounded-[20px] bg-ink p-6 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="t-h5">Cloudspital Solution</h3>
                  <p className="mt-2 t-body text-white/70">{deploymentsAndPackage}</p>
                  <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/15 pt-6">
                    {SOLUTION_TAGS.map((tag) => (
                      <li key={tag} className="rounded-full border border-white/30 px-3 py-1.5 t-small text-white">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FaqSection faqs={faqs} />

      <CtaBand
        title="Ready to Deploy a Health ATM?"
        description="Get in touch with our medical product experts to request a customized quote, read specifications, or book a live demonstration."
      />

      <section className="pb-14 sm:pb-20 lg:pb-[120px]">
        <Container>
          <RelatedSpokes hub={HUB} hubTitle={hubTitle} spokes={siblings} />
        </Container>
      </section>
    </article>
  );
}
