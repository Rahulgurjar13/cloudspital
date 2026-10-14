import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { getCaseStudyBySlug } from "@/lib/db/case-studies";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/motion";
import { Container, Panel, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Check } from "@/components/icons";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.seoTitle ?? item.title,
    description: item.metaDescription ?? item.summary,
    path: `/case-studies/${slug}/`,
    ogImage: item.coverImage,
    type: "article",
  });
}

// Redesigned Detail Page (SOP Part A) — driven by MongoDB, styled full-width without breadcrumbs
export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item || !item.published) notFound();

  const path = `/case-studies/${slug}/`;

  return (
    <>
      <ArticleSchema
        headline={item.title}
        url={SITE.url + path}
        publishedAt={item.publishedAt}
        updatedAt={item.updatedAt}
        author={{
          slug: "cloudspital-editorial",
          name: "Cloudspital",
          role: "Cloudspital",
          bio:"",
        }}
        image={item.coverImage}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies/" },
          { name: item.title, path },
        ]}
      />

      {/* Hero */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            {item.client && <SectionLabel>{item.client}</SectionLabel>}
            <h1 className="mt-6 max-w-[1100px] t-h1 text-ink">{item.title}</h1>
            <p className="mt-6 max-w-[760px] t-lead text-muted">{item.summary}</p>
          </Reveal>

          {/* Wide Cover Image */}
          {item.coverImage && (
            <Reveal delay={0.1} className="mt-10 lg:mt-14">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[30px] bg-mist sm:aspect-[21/9]">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1440px) 1320px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Outcomes sidebar + narrative */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-5">
            <Reveal className="lg:sticky lg:top-6 lg:col-span-4">
              <div className="rounded-[20px] bg-white p-6 sm:p-8">
                <h2 className="t-h5 text-ink">Key Outcomes</h2>

                {item.results && item.results.length > 0 ? (
                  <ul className="mt-5 border-t border-line">
                    {item.results.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 border-b border-line py-4 t-body text-ink">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 t-small text-muted">Documented metrics and success criteria.</p>
                )}

                <dl className="mt-6 grid grid-cols-2 gap-6 rounded-[16px] bg-mist p-5 lg:grid-cols-1">
                  <div>
                    <dt className="t-small uppercase text-muted">Deployed For</dt>
                    <dd className="mt-1 t-body text-ink">{item.client || "Healthcare Program"}</dd>
                  </div>
                  <div>
                    <dt className="t-small uppercase text-muted">Platform Deployed</dt>
                    <dd className="mt-1 t-body text-ink">Cloudspital Point of Care</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-8">
              <div className="rounded-[20px] bg-white p-6 sm:p-10 lg:p-12">
                <Prose text={item.body} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      <section className="pb-10 lg:pb-16">
        <Panel className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10" />
          <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <SectionLabel onDark>Get started</SectionLabel>
              <h2 className="t-h2 text-white">Ready to achieve similar clinical outcomes?</h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                Talk to our medical devices and platform specialists to see how Cloudspital Health ATMs or Tele-ICU integrations can fit into your clinic, hospital, or public health initiative.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <ArrowButton href="/contact/" variant="light">
                  Contact and Request Proposal
                </ArrowButton>
                <ArrowButton href="/case-studies/" variant="dark" size="sm">
                  See Other Case Studies
                </ArrowButton>
              </div>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
