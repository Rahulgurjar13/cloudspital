import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { listBlogs, type Blog } from "@/lib/db/blogs";
import { CollectionPageSchema } from "@/components/schema/CollectionPageSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schema/ItemListSchema";
import { Reveal, Stagger, Item } from "@/components/motion";
import { FileText } from "@/components/icons";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";

export const dynamic="force-dynamic";

const PATH = "/blog/";

export const metadata: Metadata = pageMetadata({
  title:"Blog and Insights",
  description:
    "Insights on health kiosks, Tele ICU systems, preventive health screening, and digital health technology in India.",
  path: PATH,
});

function formatDate(date: Blog["publishedAt"]) {
  return new Date(date).toLocaleDateString("en-IN", {
    year:"numeric",
    month:"short",
    day:"numeric",
  });
}

export default async function BlogIndex() {
  const posts = await listBlogs();

  // Separate the latest post to show as featured
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <CollectionPageSchema
        name="Blog and Insights"
        description="Insights on health kiosks, Tele ICU systems, preventive health screening, and digital health technology in India."
        path={PATH}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: PATH },
        ]}
      />
      {posts.length > 0 && (
        <ItemListSchema
          name="Cloudspital Blog Posts"
          items={posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}/` }))}
        />
      )}

      {/* Hero */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Insights and Articles"
              title={
                <>
                  Healthcare <span className="text-primary">Technology Insights</span>
                </>
              }
              description="Explore opinions, guides, and engineering updates on smart health ATMs, Tele-ICU deployment, and digital health infrastructure in India."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          {posts.length === 0 ? (
            <Reveal delay={0.1}>
              <div className="flex min-h-[360px] flex-col items-start justify-between gap-12 rounded-[20px] bg-white p-6 sm:p-10 lg:flex-row lg:items-end lg:p-12">
                <div className="flex flex-col items-start gap-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="t-h4 text-ink">No Posts Published Yet</h2>
                    <p className="mt-3 max-w-[460px] t-body text-muted">
                      We are actively preparing clinical case studies and MedTech analysis. Check back shortly!
                    </p>
                  </div>
                </div>
                <ArrowButton href="/" variant="outline" size="sm">
                  Return Home
                </ArrowButton>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-20 lg:space-y-[120px]">
              {/* Featured Post Card */}
              {featuredPost && (
                <Reveal delay={0.1}>
                  <Link
                    href={`/blog/${featuredPost.slug}/`}
                    className="group grid gap-8 rounded-[20px] bg-white p-3 transition-colors duration-500 ease-out-soft hover:bg-primary sm:p-4 lg:grid-cols-12 lg:gap-10"
                  >
                    {featuredPost.coverImage ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] bg-mist lg:col-span-7">
                        <Image
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 760px"
                        />
                      </div>
                    ) : null}

                    <div
                      className={`flex flex-col justify-between gap-10 px-3 pb-3 sm:px-4 sm:pb-4 lg:py-6 ${
                        featuredPost.coverImage ? "lg:col-span-5 lg:pl-0 lg:pr-6" : "lg:col-span-12 lg:px-6"
                      }`}
                    >
                      <div className="flex flex-col items-start gap-5">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-primary px-3 py-1 text-[12px] text-white transition-colors duration-500 group-hover:bg-white group-hover:text-primary">
                            Featured Article
                          </span>
                          {featuredPost.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-line px-3 py-1 text-[12px] text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="t-h4 text-ink transition-colors duration-500 group-hover:text-white">
                          {featuredPost.title}
                        </h2>
                        <p className="t-body text-muted transition-colors duration-500 group-hover:text-white/80">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 border-t border-line pt-5 transition-colors duration-500 group-hover:border-white/25">
                        <p className="t-small text-muted transition-colors duration-500 group-hover:text-white/80">
                          <span className="text-ink transition-colors duration-500 group-hover:text-white">{featuredPost.author}</span>
                          <span className="mx-2 text-faint">·</span>
                          {formatDate(featuredPost.publishedAt)}
                        </p>
                        <span className="flex shrink-0 items-center gap-3 t-body text-ink transition-colors duration-500 group-hover:text-white">
                          Read Post
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-white/40">
                            <ArrowIcon className="h-4 w-4" />
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Recent Posts Grid */}
              {recentPosts.length > 0 && (
                <div>
                  <Reveal>
                    <h2 className="t-h3 text-ink">Recent Publications</h2>
                  </Reveal>

                  <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-4">
                    {recentPosts.map((post) => (
                      <Item key={post.id} className="h-full">
                        <PostCard post={post} />
                      </Item>
                    ))}
                  </Stagger>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>
    </>
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
