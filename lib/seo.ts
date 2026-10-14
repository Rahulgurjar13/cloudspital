// Metadata helpers (SOP B.4 / Appendix C.1).
import type { Metadata } from "next";
import { SITE } from "./constants";

// Build a per-page Metadata object with a consistent canonical + Open Graph.
// `path` must start and end with "/" to match `trailingSlash: true`.
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: opts.type ?? "website",
      siteName: SITE.name,
      images: opts.ogImage ? [opts.ogImage] : undefined,
    },
    twitter: {
      card:"summary_large_image",
      title: opts.title,
      description: opts.description,
      images: opts.ogImage ? [opts.ogImage] : undefined,
    },
  };
}
