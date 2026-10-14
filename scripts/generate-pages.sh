#!/usr/bin/env bash
# One-shot scaffolder: creates an explicit, editable page.tsx for every URL in
# the SOP (hubs, spokes, products) plus a typed lib/site-structure.ts registry
# that powers the sitemap and the hub<->spoke internal links (no orphan pages).
# Safe to re-run; it overwrites the generated files.
set -u
cd "$(dirname "$0")/.."

# --------------------------------------------------------------------------
# DATA — single source of truth.  Format: pipe-separated.
# --------------------------------------------------------------------------
HUBS=$(cat <<'EOF'
health-atm-kiosk|Health ATM / Health Kiosk
tele-icu|Tele-ICU & Tele-PICU
telemedicine|Telemedicine & Point-of-Care
government-health-kiosk|Government & Public-Health Deployment
mobile-medical-unit|Mobile Medical Units
resources|Resources & Original Data
EOF
)

SPOKES=$(cat <<'EOF'
health-atm-kiosk|what-is-a-health-atm|What is a Health ATM|P0
health-atm-kiosk|how-does-a-health-atm-work|How Does a Health ATM Work|P1
health-atm-kiosk|parameters-tested|Health ATM Parameters Tested|P1
health-atm-kiosk|price-in-india|Health ATM Price in India|P0
health-atm-kiosk|vs-traditional-health-checkup|Health ATM vs Traditional Checkup|P1
health-atm-kiosk|benefits|Benefits of a Health ATM|P2
health-atm-kiosk|ai-health-kiosk|AI Health Kiosk|P2
health-atm-kiosk|for-corporate-wellness|Health Kiosk for Corporate Wellness|P1
health-atm-kiosk|for-rural-healthcare|Health Kiosk for Rural Healthcare / PHC|P0
health-atm-kiosk|for-railway-stations|Health Kiosk for Railway Stations|P2
health-atm-kiosk|for-schools|Health Kiosk for Schools (Parvarish)|P2
health-atm-kiosk|for-pharmacies|Health Kiosk for Pharmacies|P2
health-atm-kiosk|for-old-age-homes|Health Kiosk for Old Age Homes|P2
health-atm-kiosk|for-csr-projects|Health ATM CSR Projects|P2
health-atm-kiosk|best-manufacturers-in-india|Best Health ATM Manufacturers in India|P1
tele-icu|what-is-tele-icu|What is Tele-ICU|P0
tele-icu|tele-icu-vs-tele-picu|Tele-ICU vs Tele-PICU|P0
tele-icu|how-tele-icu-works|How Tele-ICU Works|P0
tele-icu|hub-and-spoke-model|Hub and Spoke ICU Model|P1
tele-icu|for-rural-hospitals|Tele-ICU for Rural Hospitals|P1
tele-icu|tele-picu-pediatric|Tele-PICU Pediatric Intensive Care|P0
tele-icu|setup-cost-india|Tele-ICU Setup Cost in India|P1
tele-icu|equipment-list|Tele-ICU Equipment List|P2
tele-icu|remote-patient-monitoring|Remote Patient Monitoring India|P2
tele-icu|aiims-patna-tele-picu|AIIMS-Patna Tele-PICU Case Study|P0
telemedicine|what-is-a-telemedicine-cart|What is a Telemedicine Cart|P1
telemedicine|point-of-care-testing|Point of Care Testing (POCT)|P1
telemedicine|portable-telemedicine-bag|Portable Telemedicine Bag|P2
telemedicine|esanjeevani-integration|eSanjeevani Integration|P1
telemedicine|for-phc|Telemedicine for PHC|P2
telemedicine|cart-vs-health-kiosk|Telemedicine Cart vs Health Kiosk|P2
government-health-kiosk|gem-procurement-guide|GeM Health Kiosk Procurement Guide|P0
government-health-kiosk|ayushman-bharat-abha-integration|Ayushman Bharat ABHA Integration|P0
government-health-kiosk|abdm-ndhm-compliant|ABDM / NDHM Compliant Kiosk|P1
government-health-kiosk|cdsco-poct-licensing|CDSCO POCT Licensing|P1
government-health-kiosk|for-government-hospitals|Health Kiosk for Government Hospitals|P1
government-health-kiosk|health-kiosk-tender-india|Health Kiosk Tender India|P2
government-health-kiosk|ayushman-arogya-mandir|Ayushman Arogya Mandir Kiosk|P2
government-health-kiosk|bihar|Health Kiosk Bihar|P1
government-health-kiosk|uttar-pradesh|Health Kiosk Uttar Pradesh|P2
government-health-kiosk|uttarakhand|Health Kiosk Uttarakhand|P2
government-health-kiosk|jharkhand|Health Kiosk Jharkhand|P2
government-health-kiosk|west-bengal|Health Kiosk West Bengal|P2
mobile-medical-unit|what-is-an-mmu|What is a Mobile Medical Unit|P2
mobile-medical-unit|vs-health-kiosk|MMU vs Health Kiosk|P2
mobile-medical-unit|for-rural-camps|MMU for Rural Health Camps|P2
mobile-medical-unit|specifications|Mobile Medical Unit Specifications|P2
resources|state-of-preventive-health-screening-india|State of Preventive Health Screening in India|P1
resources|health-atm-buyers-guide|Health ATM Buyers Guide|P2
resources|glossary|Health Kiosk Glossary|P2
EOF
)

PRODUCTS=$(cat <<'EOF'
health-kiosk|Cloudspital Point-of-Care Health Kiosk
medsync-iii-tele-icu-kiosk|Medsync-III Tele-ICU Kiosk
medsync-iv-telemedicine-poct-cart|Medsync-IV Telemedicine + POCT Cart
medsync-v-telemedicine-cart-icu|Medsync-V Telemedicine Cart (ICU L1)
medsync-vi-telemedicine-poct-cart-icu|Medsync-VI Telemedicine + POCT Cart (ICU)
medsync-ii-telemedicine-cart|Medsync-II Telemedicine Cart
medsync-i-portable-telemedicine-bag|Medsync-I Portable Telemedicine Bag
mobile-medical-unit|Mobile Medical Unit
EOF
)

# Portable hub-title lookup (avoids bash 4 associative arrays for macOS bash 3.2).
hub_title() {
  echo "$HUBS" | awk -F'|' -v h="$1" '$1==h{print $2}'
}

# --------------------------------------------------------------------------
# 1) lib/site-structure.ts  (registry + helpers for links/sitemap)
# --------------------------------------------------------------------------
OUT=lib/site-structure.ts
cat > "$OUT" <<'TSEOF'
// AUTO-GENERATED by scripts/generate-pages.sh — the page inventory (SOP Part A).
// Powers the sitemap and hub<->spoke internal links so there are no orphans.
import type { HubKey } from "./constants";
import type { SpokeLink } from "@/components/ui/RelatedSpokes";

export interface SpokeMeta {
  slug: string;
  title: string;
  priority: "P0" | "P1" | "P2";
}
export interface HubMeta {
  slug: HubKey;
  title: string;
  spokes: SpokeMeta[];
}

export const HUB_STRUCTURE: HubMeta[] = [
TSEOF

while IFS='|' read -r hslug htitle; do
  [ -z "$hslug" ] && continue
  printf '  { slug: "%s", title: "%s", spokes: [\n' "$hslug" "$htitle" >> "$OUT"
  while IFS='|' read -r sphub spslug sptitle sppri; do
    [ -z "$sphub" ] && continue
    [ "$sphub" != "$hslug" ] && continue
    printf '    { slug: "%s", title: "%s", priority: "%s" },\n' "$spslug" "$sptitle" "$sppri" >> "$OUT"
  done <<< "$SPOKES"
  printf '  ] },\n' >> "$OUT"
done <<< "$HUBS"

echo '];' >> "$OUT"
echo '' >> "$OUT"
echo 'export const PRODUCTS: { slug: string; name: string }[] = [' >> "$OUT"
while IFS='|' read -r pslug pname; do
  [ -z "$pslug" ] && continue
  printf '  { slug: "%s", name: "%s" },\n' "$pslug" "$pname" >> "$OUT"
done <<< "$PRODUCTS"
echo '];' >> "$OUT"

cat >> "$OUT" <<'TSEOF'

export function getHubTitle(slug: HubKey): string {
  return HUB_STRUCTURE.find((h) => h.slug === slug)?.title ?? slug;
}

export function getSpokeLinks(slug: HubKey): SpokeLink[] {
  const hub = HUB_STRUCTURE.find((h) => h.slug === slug);
  return hub
    ? hub.spokes.map((s) => ({ slug: s.slug, hub: slug, h1: s.title }))
    : [];
}

export function getSiblingLinks(slug: HubKey, current: string): SpokeLink[] {
  return getSpokeLinks(slug)
    .filter((s) => s.slug !== current)
    .slice(0, 3);
}

export function allContentPaths(): { path: string; isHub: boolean }[] {
  const paths: { path: string; isHub: boolean }[] = [];
  for (const hub of HUB_STRUCTURE) {
    paths.push({ path: "/" + hub.slug + "/", isHub: true });
    for (const s of hub.spokes) {
      paths.push({ path: "/" + hub.slug + "/" + s.slug + "/", isHub: false });
    }
  }
  for (const p of PRODUCTS) {
    paths.push({ path: "/products/" + p.slug + "/", isHub: false });
  }
  return paths;
}
TSEOF

# --------------------------------------------------------------------------
# 2) Hub pages
# --------------------------------------------------------------------------
while IFS='|' read -r hslug htitle; do
  [ -z "$hslug" ] && continue
  dir="app/(marketing)/$hslug"
  mkdir -p "$dir"
  cat > "$dir/page.tsx" <<EOF
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DirectAnswer } from "@/components/ui/DirectAnswer";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { getSpokeLinks } from "@/lib/site-structure";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "$hslug" as const;
const PATH = "/$hslug/";
const TITLE = "$htitle";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: "TODO: hub meta description (<=155 chars).",
  path: PATH,
});

// FAQ items — fill from your content (paired with FaqSchema).
const faqs: Faq[] = [];

// HUB (pillar) page — links down to every spoke (SOP A.0 / B.8).
export default function Page() {
  return (
    <article className="py-2">
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-12"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical & Engineering Team", bio: "" }}
      />
      <FaqSchema faqs={faqs} />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: TITLE, path: PATH },
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{TITLE}</h1>

      <DirectAnswer>
        TODO: 40-60 word direct answer for this hub. Lead with the primary keyword.
      </DirectAnswer>

      {/* TODO: hub overview content */}
      <p className="text-slate-500 italic">TODO: add hub overview content.</p>

      {faqs.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">FAQ</h2>
          <FaqAccordion faqs={faqs} />
        </section>
      ) : null}

      <div className="mt-10">
        <CtaButtons />
      </div>

      <RelatedSpokes
        hub={HUB}
        hubTitle={TITLE}
        spokes={getSpokeLinks(HUB)}
        heading={"All " + TITLE + " pages"}
      />
    </article>
  );
}
EOF
done <<< "$HUBS"

# --------------------------------------------------------------------------
# 3) Spoke pages
# --------------------------------------------------------------------------
while IFS='|' read -r sphub spslug sptitle sppri; do
  [ -z "$sphub" ] && continue
  htitle="$(hub_title "$sphub")"
  dir="app/(marketing)/$sphub/$spslug"
  mkdir -p "$dir"
  cat > "$dir/page.tsx" <<EOF
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import type { Faq } from "@/lib/cms";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DirectAnswer } from "@/components/ui/DirectAnswer";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { RelatedSpokes } from "@/components/ui/RelatedSpokes";
import { ArticleSchema } from "@/components/schema/ArticleSchema";
import { FaqSchema } from "@/components/schema/FaqSchema";
import { getHubTitle, getSiblingLinks } from "@/lib/site-structure";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const HUB = "$sphub" as const;
const SLUG = "$spslug";
const PATH = "/$sphub/$spslug/";
const TITLE = "$sptitle";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: "TODO: meta description (<=155 chars).",
  path: PATH,
  type: "article",
});

const faqs: Faq[] = [];

// SPOKE page skeleton (SOP Appendix C.6). Links up to its hub + siblings.
export default function Page() {
  return (
    <article className="py-2">
      <ArticleSchema
        headline={TITLE}
        url={SITE.url + PATH}
        publishedAt="2026-06-12"
        updatedAt="2026-06-12"
        author={{ slug: "cloudspital-editorial", name: "Cloudspital Editorial", role: "Clinical & Engineering Team", bio: "" }}
      />
      <FaqSchema faqs={faqs} />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "$htitle", path: "/$sphub/" },
          { name: TITLE, path: PATH },
        ]}
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{TITLE}</h1>

      <DirectAnswer>
        TODO: 40-60 word direct answer. Lead with the keyword and define the term.
      </DirectAnswer>

      {/* TODO: body — H2 sections, lists/steps, ComparisonTable, AIIMS proof + stat */}
      <p className="text-slate-500 italic">TODO: add content for this page.</p>

      {faqs.length > 0 ? (
        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">FAQ</h2>
          <FaqAccordion faqs={faqs} />
        </section>
      ) : null}

      <div className="mt-10">
        <CtaButtons />
      </div>

      <RelatedSpokes
        hub={HUB}
        hubTitle={getHubTitle(HUB)}
        spokes={getSiblingLinks(HUB, SLUG)}
      />
    </article>
  );
}
EOF
done <<< "$SPOKES"

# --------------------------------------------------------------------------
# 4) Product pages
# --------------------------------------------------------------------------
while IFS='|' read -r pslug pname; do
  [ -z "$pslug" ] && continue
  dir="app/(marketing)/products/$pslug"
  mkdir -p "$dir"
  cat > "$dir/page.tsx" <<EOF
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaButtons } from "@/components/ui/CtaButtons";
import { ProductSchema } from "@/components/schema/ProductSchema";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/products/$pslug/";
const NAME = "$pname";

export const metadata: Metadata = pageMetadata({
  title: NAME,
  description: "TODO: product meta description (<=155 chars).",
  path: PATH,
});

// Product detail — Product + Offer schema (SOP Part A).
export default function Page() {
  return (
    <article className="py-2">
      <ProductSchema
        name={NAME}
        description={"TODO: product description."}
        url={SITE.url + PATH}
        currency="INR"
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: NAME, path: PATH },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{NAME}</h1>
      <p className="mt-4 text-slate-700">TODO: product overview, specs and features.</p>
      <div className="mt-10">
        <CtaButtons message={"Hi Cloudspital, I would like a quote for " + NAME + "."} />
      </div>
    </article>
  );
}
EOF
done <<< "$PRODUCTS"

echo "Generation complete."
