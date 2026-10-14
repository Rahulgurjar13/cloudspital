import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { listCaseStudies } from "@/lib/db/case-studies";
import { CollectionPageSchema } from "@/components/schema/CollectionPageSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schema/ItemListSchema";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/ArrowButton";
import { Check } from "@/components/icons";

export const revalidate = 3600;

const PATH = "/case-studies/";

export const metadata: Metadata = pageMetadata({
  title:"Case Studies and Success Stories",
  description:"Explore real world Cloudspital deployments bringing telemedicine, Tele ICU, and smart Health ATMs across India.",
  path: PATH,
});

// Collection Page (SOP Part A) — driven by MongoDB, with CollectionPage + ItemList schema.
export default async function CaseStudiesIndex() {
  const items = await listCaseStudies();

  return (
    <>
      <CollectionPageSchema
        name="Case Studies and Success Stories"
        description="Explore real world Cloudspital deployments bringing telemedicine, Tele ICU, and smart Health ATMs across India."
        path={PATH}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: PATH },
        ]}
      />
      {items.length > 0 && (
        <ItemListSchema
          name="Cloudspital Case Studies"
          items={items.map((c) => ({ name: c.title, path: `/case-studies/${c.slug}/` }))}
        />
      )}

      {/* Header */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Impact and Deployments"
              title="Proven Results in the Field"
              description="Read how Cloudspital's co-developed technology, public health kiosks, and critical-care networks are helping healthcare organizations scale screening and intensive care."
            />
          </Reveal>
        </Container>
      </section>

      {/* Case studies grid */}
      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          {items.length === 0 ? (
            <Reveal className="rounded-[20px] bg-white px-6 py-16 sm:px-10">
              <p className="t-lead text-muted">No case studies published yet. Check back soon!</p>
            </Reveal>
          ) : (
            <Stagger className="grid gap-3 md:grid-cols-2 lg:gap-4">
              {items.map((item) => (
                <Item key={item.id} className="h-full">
                  <Link
                    href={`/case-studies/${item.slug}/`}
                    className="group flex h-full flex-col rounded-[20px] bg-white p-3 transition-colors duration-500 ease-out-soft hover:bg-primary"
                  >
                    {item.coverImage && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[14px] bg-mist">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-between p-3 pt-6 sm:p-5 sm:pt-8">
                      <div>
                        {item.client && (
                          <span className="mb-4 inline-flex rounded-full border border-line px-3 py-1 t-small text-muted transition-colors duration-500 group-hover:border-white/30 group-hover:text-white/85">
                            {item.client}
                          </span>
                        )}
                        <h2 className="t-h5 text-ink transition-colors duration-500 group-hover:text-white">
                          {item.title}
                        </h2>
                        <p className="mt-3 t-body text-muted transition-colors duration-500 group-hover:text-white/80">
                          {item.summary}
                        </p>
                      </div>

                      {/* Outcomes */}
                      <div className="mt-8 border-t border-line pt-6 transition-colors duration-500 group-hover:border-white/25">
                        {item.results && item.results.length > 0 && (
                          <div className="mb-6 flex flex-wrap gap-2">
                            {item.results.map((r, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 t-small text-ink transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white"
                              >
                                <Check className="h-3.5 w-3.5 text-primary group-hover:text-white" />
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between t-body text-ink transition-colors duration-500 group-hover:text-white">
                          <span>Read success story</span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-white/40">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Item>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
    </>
  );
}
