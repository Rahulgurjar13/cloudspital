// Typed JSON-LD builders (SOP B.5 / Appendix C.2).
// Each returns a plain object that <JsonLd> serialises into a
// <script type="application/ld+json"> tag. Validate each in Google's
// Rich Results Test before merging a template.

import { SITE } from "./constants";
import type { Author, Faq, MedicalReviewer } from "./cms";

type Json = Record<string, unknown>;

// PostalAddress for the registered office (reused by Organization + LocalBusiness).
function officePostalAddress(): Json {
  const a = SITE.address.office;
  return {
    "@type": "PostalAddress",
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}

// Stable @id for the Organization node so other schema blocks can reference it
// (publisher / provider / parentOrganization) and search engines dedupe to one entity.
export const ORG_ID = `${SITE.url}/#organization`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MedicalBusiness"],
    "@id": ORG_ID,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/cloudspital-new.webp`,
    image: `${SITE.url}/cloudspital-new.webp`,
    description: SITE.description,
    slogan: SITE.tagline,
    foundingDate: SITE.foundingDate,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: officePostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.office.geo.lat,
      longitude: SITE.address.office.geo.lng,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        email: SITE.email,
        areaServed: SITE.areaServed,
        availableLanguage: ["en", "hi"],
      },
    ],
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
    knowsAbout: SITE.knowsAbout,
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

// MedicalBusiness / LocalBusiness node for map + "near me" / local pack (GEO).
export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/cloudspital-new.webp`,
    image: `${SITE.url}/cloudspital-new.webp`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: SITE.priceRange,
    address: officePostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.office.geo.lat,
      longitude: SITE.address.office.geo.lng,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SITE.openingHours.days,
        opens: SITE.openingHours.opens,
        closes: SITE.openingHours.closes,
      },
    ],
    parentOrganization: { "@id": ORG_ID },
  };
}

export function webSiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    alternateName: SITE.legalName,
    url: SITE.url,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

// Generic WebPage node with a speakable spec (AEO — lets voice/answer engines
// read the H1 + the direct-answer block). `speakableSelectors` are CSS selectors.
export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  primaryImage?: string;
  speakableSelectors?: string[];
}): Json {
  const url = `${SITE.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": ORG_ID },
    ...(opts.primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: opts.primaryImage } }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: opts.speakableSelectors ?? ["h1", "[data-direct-answer]"],
    },
  };
}

// Service node for hub pages — what Cloudspital offers + where (GEO).
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${SITE.url}${opts.path}`,
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Country", name })),
  };
}

// ItemList for listing/collection pages (products, tests, blog, case studies).
// `path` is optional — omit it for catalogs whose entries have no own page.
export function itemListSchema(opts: {
  name: string;
  items: { name: string; path?: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { url: `${SITE.url}${it.path}` } : {}),
    })),
  };
}

// CollectionPage wrapper for index pages (press, use-cases, blog, case studies).
export function collectionPageSchema(opts: {
  name: string;
  description: string;
  path: string;
}): Json {
  const url = `${SITE.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE.url}/#website` },
  };
}

// ContactPage + reachable contact points for the /contact page.
export function contactPageSchema(opts: { path: string }): Json {
  const url = `${SITE.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: `Contact ${SITE.name}`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@id": ORG_ID,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE.phone,
          contactType: "sales",
          email: SITE.email,
          areaServed: SITE.areaServed,
          availableLanguage: ["en", "hi"],
        },
      ],
    },
  };
}

// Aggregate rating + individual reviews for the testimonials page.
export function reviewSchema(opts: {
  reviews: { author: string; body: string; rating: number; org?: string }[];
}): Json {
  const ratings = opts.reviews.map((r) => r.rating);
  const avg =
    ratings.reduce((s, n) => s + n, 0) / (ratings.length || 1);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.legalName,
    url: SITE.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: opts.reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: opts.reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      author: { "@type": "Person", name: r.author },
      ...(r.org ? { publisher: { "@type": "Organization", name: r.org } } : {}),
      reviewBody: r.body,
    })),
  };
}

// HowTo for step-by-step pages ("how a health ATM works", "how tele ICU works").
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  reviewer?: MedicalReviewer;
  image?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    url: opts.url,
    inLanguage: "en-IN",
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt,
    image: opts.image ?? `${SITE.url}/cloudspital-new.webp`,
    author: {
      "@type": "Person",
      name: opts.author.name,
      ...(opts.author.role ? { jobTitle: opts.author.role } : {}),
    },
    ...(opts.reviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: opts.reviewer.name,
            ...(opts.reviewer.credentials
              ? { jobTitle: opts.reviewer.credentials }
              : {}),
          },
        }
      : {}),
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceFrom?: number;
  currency?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    image: opts.image ?? `${SITE.url}/cloudspital-new.webp`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ORG_ID },
    category: "Medical Devices",
    ...(opts.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            price: opts.priceFrom,
            priceCurrency: opts.currency ?? "INR",
            availability: "https://schema.org/InStock",
            seller: { "@id": ORG_ID },
            url: opts.url,
          },
        }
      : {}),
  };
}

export function personSchema(author: Author): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: { "@type": "Organization", name: SITE.legalName },
  };
}
