import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ModelComparison } from "@/components/home/ModelComparison";

const PATH = "/products/compare/";

export const metadata: Metadata = pageMetadata({
  title: "Compare Arc Health Kiosk Models (2026–27)",
  description:
    "Five configurations, from a 50-test entry screening kiosk to a 170-test full diagnostic build and a portable emergency crash cart. Specifications only — commercial terms are issued separately.",
  path: PATH,
});

// The CPL Health Kiosk Range model-by-model matrix (moved off the homepage).
export default function ComparePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products/" },
          { name: "Compare Arc models", path: PATH },
        ]}
      />
      <ModelComparison as="h1" />
    </>
  );
}
