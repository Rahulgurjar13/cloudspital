import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getAuthor } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PersonSchema } from "@/components/schema/PersonSchema";
import { Container, SectionLabel } from "@/components/ui/Section";

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  return pageMetadata({
    title: author?.name ?? slug,
    description: author?.bio ?? "",
    path: `/author/${slug}/`,
  });
}

// Author bio page — Person schema for E-E-A-T (SOP Part A).
export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  return (
    <section className="pb-20 pt-6 lg:pb-[120px] lg:pt-10">
      <PersonSchema author={author} />
      <Container>
        <div className="max-w-[760px]">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: author.name, path: `/author/${slug}/` },
            ]}
          />
          <SectionLabel className="mt-8">Author</SectionLabel>
          <h1 className="mt-6 t-h1 text-ink">{author.name}</h1>
          <p className="mt-4 t-h6 text-muted">{author.role}</p>
          <div className="mt-8 border-t border-line pt-8">
            <p className="t-lead text-muted">{author.bio}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
