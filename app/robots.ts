import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// robots directives (SOP B.6 / Appendix C.3).
// Staging/preview is fully disallowed; production allows all web crawlers and AI bots,
// while protecting private admin, API, and login endpoints.
export default function robots(): MetadataRoute.Robots {
  const isStaging =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_STAGING === "true" ||
    process.env.DISALLOW_INDEXING === "true";

  if (isStaging) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/", "/login/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
