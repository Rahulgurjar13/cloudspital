// Content layer (SOP B.1 / B.8).
//
// This is the single seam between the app and the headless CMS. The SOP
// recommends Sanity. Until that is wired up, these functions return typed
// placeholder data so every page renders and the templates can be proven.
//
// To go live: replace the bodies below with GROQ queries (Sanity) — the
// signatures and types should stay the same so no page code changes.

import type { HubKey } from "./constants";

export interface Faq {
  q: string;
  a: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
}

export interface MedicalReviewer {
  name: string; // e.g. "Dr. ..."
  credentials: string;
}

// A spoke (cluster) page — one focused intent under a single hub.
export interface SpokePage {
  slug: string;
  hub: HubKey; // parent hub reference (used for breadcrumbs + linking)
  h1: string;
  seoTitle: string; // <= 60 chars
  metaDescription: string; // <= 155 chars
  // The mandatory 40-60 word answer block at the top of every hub/spoke.
  directAnswer: string;
  body?: string;
  faqs: Faq[];
  author: Author;
  reviewer?: MedicalReviewer;
  ogImage?: string;
  publishedAt: string; // ISO
  updatedAt: string; // ISO
  relatedSpokes?: string[]; // sibling slugs (2-3)
}

export interface HubPage {
  slug: HubKey;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  directAnswer: string;
  faqs: Faq[];
  updatedAt: string;
}

export interface ProductPage {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  priceFrom?: number;
  currency?: string;
  image?: string;
  updatedAt: string;
}

// Used by sitemap.ts — every published path with its lastModified.
export interface PublishedPage {
  path: string;
  updatedAt: string;
  isHub: boolean;
}

const PLACEHOLDER_AUTHOR: Author = {
  slug: "cloudspital-editorial",
  name: "Cloudspital Editorial",
  role: "Clinical and Engineering Team",
  bio:"The Cloudspital clinical and engineering team.",
};

// ---------------------------------------------------------------------------
// Stubbed reads — swap for CMS queries.
// ---------------------------------------------------------------------------

export async function getHub(slug: HubKey): Promise<HubPage | null> {
  return {
    slug,
    h1: `${slug} overview`,
    seoTitle: `${slug} | Cloudspital`,
    metaDescription: `Authoritative overview of ${slug} from Cloudspital.`,
    directAnswer:
      "Placeholder 40–60 word direct answer. Replace from the CMS: define the term, state the core fact, and lead with the primary keyword so Google and LLMs can quote it verbatim at the top of the page.",
    faqs: [],
    updatedAt: new Date().toISOString(),
  };
}

export async function getSpokesForHub(hub: HubKey): Promise<SpokePage[]> {
  // Returns all spokes whose `hub` reference matches.
  void hub;
  return [];
}

export async function getSpoke(slug: string): Promise<SpokePage | null> {
  return {
    slug,
    hub: "tele-icu",
    h1: `${slug.replace(/-/g, " ")}`,
    seoTitle: `${slug} | Cloudspital`,
    metaDescription: `Cloudspital on ${slug.replace(/-/g, " ")}.`,
    directAnswer:
      "Placeholder 40–60 word direct answer. Replace from the CMS with a precise, citable definition that leads with the keyword.",
    faqs: [],
    author: PLACEHOLDER_AUTHOR,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    relatedSpokes: [],
  };
}

export async function getProduct(slug: string): Promise<ProductPage | null> {
  return {
    slug,
    name: slug.replace(/-/g, " "),
    seoTitle: `${slug} | Cloudspital`,
    metaDescription: `Cloudspital ${slug.replace(/-/g, " ")}.`,
    description:"Product description, replace from CMS.",
    currency:"INR",
    updatedAt: new Date().toISOString(),
  };
}

export async function getAllProducts(): Promise<ProductPage[]> {
  return [];
}

export async function getAuthor(slug: string): Promise<Author | null> {
  return { ...PLACEHOLDER_AUTHOR, slug };
}

// Used by app/sitemap.ts to enumerate every indexable URL.
export async function getAllPublishedPages(): Promise<PublishedPage[]> {
  const now = new Date().toISOString();
  // Until the CMS is connected, advertise the known static routes.
  return [
    { path: "/", updatedAt: now, isHub: false },
    { path: "/health-atm-kiosk/", updatedAt: now, isHub: true },
    { path: "/tele-icu/", updatedAt: now, isHub: true },
    { path: "/telemedicine/", updatedAt: now, isHub: true },
    { path: "/government-health-kiosk/", updatedAt: now, isHub: true },
    { path: "/mobile-medical-unit/", updatedAt: now, isHub: true },
    { path: "/resources/", updatedAt: now, isHub: true },
    { path: "/products/", updatedAt: now, isHub: false },
    { path: "/about-us/", updatedAt: now, isHub: false },
    { path: "/press/", updatedAt: now, isHub: false },
    { path: "/contact/", updatedAt: now, isHub: false },
    { path: "/testimonials/", updatedAt: now, isHub: false },
    { path: "/case-studies/", updatedAt: now, isHub: false },
    { path: "/blog/", updatedAt: now, isHub: false },
  ];
}
