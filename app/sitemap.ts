import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { allContentPaths } from "@/lib/site-structure";
import { listBlogs } from "@/lib/db/blogs";
import { listCaseStudies } from "@/lib/db/case-studies";
import { listProducts } from "@/lib/db/products";

export const revalidate = 3600; // Cache sitemap for 1 hour, then revalidate in background

// Static (non hub/spoke/product) routes. /login is intentionally excluded (noindex).
const STATIC_PATHS: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/products/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/compare/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partner/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/impact/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tests/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about-us/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/use-cases/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/case-studies/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/testimonials/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/press/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy/", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms/", priority: 0.3, changeFrequency: "yearly" },
];

// Dynamic sitemap (SOP B.6 / Appendix C.3). Built from the page registry + database.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seenUrls = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      entries.push(entry);
    }
  };

  // 1. Static core pages
  for (const item of STATIC_PATHS) {
    addEntry({
      url: `${SITE.url}${item.path}`,
      lastModified: new Date(),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    });
  }

  // 2. Hub and Spoke content pages
  for (const item of allContentPaths()) {
    addEntry({
      url: `${SITE.url}${item.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: item.isHub ? 0.9 : 0.8,
    });
  }

  // 3. Dynamic Products from MongoDB
  try {
    const products = await listProducts(true);
    for (const p of products) {
      addEntry({
        url: `${SITE.url}/products/${p.slug}/`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    // DB unreachable during build fallback
  }

  // 4. Dynamic Blog posts from MongoDB
  try {
    const blogs = await listBlogs(true);
    for (const b of blogs) {
      addEntry({
        url: `${SITE.url}/blog/${b.slug}/`,
        lastModified: b.updatedAt
          ? new Date(b.updatedAt)
          : b.publishedAt
            ? new Date(b.publishedAt)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch {
    // DB unreachable during build fallback
  }

  // 5. Dynamic Case Studies from MongoDB
  try {
    const caseStudies = await listCaseStudies(true);
    for (const c of caseStudies) {
      addEntry({
        url: `${SITE.url}/case-studies/${c.slug}/`,
        lastModified: c.updatedAt
          ? new Date(c.updatedAt)
          : c.publishedAt
            ? new Date(c.publishedAt)
            : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch {
    // DB unreachable during build fallback
  }

  return entries;
}
