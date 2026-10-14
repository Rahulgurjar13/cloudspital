import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { getBlogBySlug, listBlogs, type Blog } from "@/lib/db/blogs";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Prose } from "@/components/ui/Prose";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { CtaBand } from "@/components/ui/CtaBand";

export const dynamic="force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${slug}/`,
    ogImage: post.coverImage,
    type: "article",
  });
}

function formatDate(date: Blog["publishedAt"]) {
  return new Date(date).toLocaleDateString("en-IN", {
    year:"numeric",
    month:"short",
    day:"numeric",
  });
}

/** Up to three other published posts, preferring ones that share a tag. */
async function getRelatedPosts(post: Blog): Promise<Blog[]> {
  const others = (await listBlogs()).filter((p) => p.slug !== post.slug);
  const shared = (p: Blog) => p.tags.filter((t) => post.tags.includes(t)).length;
  return others
    .map((p, i) => ({ p, i, score: shared(p) }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, 3)
    .map(({ p }) => p);
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post || !post.published) notFound();

  const path = `/blog/${slug}/`;
  const related = await getRelatedPosts(post);

  return (
    <article>
      {/* Article Schema for SEO */}
      <ArticleSchema
        headline={post.title}
        url={SITE.url + path}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        author={{
          slug: "cloudspital-editorial",
          name: post.author,
          role: "Cloudspital",
          bio:"",
        }}
        image={post.coverImage}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: post.title, path },
        ]}
      />

      {/* Post Meta & Header */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal className="mx-auto max-w-[760px]">
            <Link
              href="/blog/"
              className="t-label text-muted transition-colors hover:text-primary"
            >
              [&nbsp;Blog&nbsp;]
            </Link>
            {post.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line bg-white px-3 py-1 text-[12px] text-ink">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 className="mt-6 t-h1 text-ink">{post.title}</h1>

            <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist t-small text-primary">
                {post.author.charAt(0)}
              </span>
              <div>
                <p className="t-small text-ink">{post.author}</p>
                <p className="t-small text-faint">
                  Published on {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="pt-10 lg:pt-14">
          <Container>
            <Reveal delay={0.1} className="relative mx-auto aspect-video w-full max-w-[1040px] overflow-hidden rounded-[30px] bg-mist">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1100px) 100vw, 1040px"
              />
            </Reveal>
          </Container>
        </section>
      )}

      {/* Body Content */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-[760px]">
            <Prose text={post.body} />
          </div>
        </Container>
      </section>

      {/* Related posts */}
      <section className="py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
            {related.length > 0 ? (
              <h2 className="t-h3 text-ink">Related posts</h2>
            ) : null}
            <ArrowButton href="/blog/" variant="outline" size="sm">
              More Articles
            </ArrowButton>
          </Reveal>

          {related.length > 0 ? (
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-4">
              {related.map((p) => (
                <Item key={p.id} className="h-full">
                  <PostCard post={p} />
                </Item>
              ))}
            </Stagger>
          ) : null}
        </Container>
      </section>

      {/* Article End Lead Gen CTA */}
      <CtaBand
        title="Want to see the tech in action?"
        description="Book a live online demo or request a site consultation for our health ATM kiosks, Tele-ICU equipment, and telemedicine systems."
        className="pb-14 sm:pb-20 lg:pb-[120px]"
      />
    </article>
  );
}

function PostCard({ post }: { post: Blog }) {
  const category = post.tags[0];
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col rounded-[20px] bg-white p-3 transition-colors duration-500 ease-out-soft hover:bg-primary sm:p-4"
    >
      {post.coverImage ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-mist">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        </div>
      ) : null}

      <div className={`flex flex-1 flex-col items-start px-3 pb-3 sm:px-4 sm:pb-4 ${post.coverImage ? "pt-6" : "pt-3 sm:pt-4"}`}>
        {category ? (
          <span className="rounded-full border border-line px-3 py-1 text-[12px] text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
            {category}
          </span>
        ) : null}
        <h3 className="mt-5 line-clamp-3 t-h5 text-ink transition-colors duration-500 group-hover:text-white">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 t-small text-muted transition-colors duration-500 group-hover:text-white/80">
          {post.excerpt}
        </p>
        <div className="mt-auto flex w-full items-center justify-between gap-4 pt-8">
          <p className="t-small text-faint transition-colors duration-500 group-hover:text-white/70">
            {post.author} · {formatDate(post.publishedAt)}
          </p>
          <span className="flex items-center gap-2 t-small text-ink transition-colors duration-500 group-hover:text-white">
            Read
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
