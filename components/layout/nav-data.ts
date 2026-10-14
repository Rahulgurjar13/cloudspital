import { SITE } from "@/lib/constants";
import { HUB_STRUCTURE, getSpokeLinks } from "@/lib/site-structure";

// Navigation data shared by the desktop navbar and the mobile tab bar.

export const HUB_LABELS: Record<string, string> = {
  "health-atm-kiosk": "Health ATM",
  "tele-icu": "Tele ICU",
  telemedicine: "Telemedicine",
  "government-health-kiosk": "Government",
  "mobile-medical-unit": "Mobile Units",
  resources: "Resources",
};

export const COMPANY_LINKS = [
  { href: "/about-us/", label: "About Us" },
  { href: "/impact/", label: "Impact" },
  { href: "/partner/", label: "Partner with us" },
  { href: "/use-cases/", label: "Use Cases" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/testimonials/", label: "Testimonials" },
  { href: "/press/", label: "Press" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export const SOLUTION_HUBS = HUB_STRUCTURE.filter((h) => h.slug !== "resources");

export function resourceLinks() {
  const hub = HUB_STRUCTURE.find((h) => h.slug === "resources");
  return [
    { href: "/resources/", label: "Resources overview" },
    ...(hub ? getSpokeLinks(hub.slug).map((s) => ({ href: `/${s.hub}/${s.slug}/`, label: s.h1 })) : []),
    { href: "/blog/", label: "Blog and insights" },
  ];
}

export function productLinks(products: { slug: string; name: string }[]) {
  return [
    { href: "/products/", label: "All products" },
    { href: "/products/compare/", label: "Compare Arc models" },
    ...products.map((p) => ({ href: `/products/${p.slug}/`, label: p.name })),
  ];
}

export const CALL_URL = `tel:${SITE.phone}`;
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hi, I'd like to know more about Cloudspital.",
)}`;
