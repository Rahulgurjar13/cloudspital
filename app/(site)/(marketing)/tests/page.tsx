import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ItemListSchema } from "@/components/schema/ItemListSchema";
import { TestsCatalog } from "@/components/tests/TestsCatalog";
import { TESTS } from "@/components/tests/tests-data";
import { CtaBand } from "@/components/ui/CtaBand";

export const revalidate = 3600; // SSG + ISR (SOP B.7)

const PATH = "/tests/";
const TITLE = "Diagnostic Test Catalog — 50+ Point-of-Care Tests";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description:
    "Explore the full catalog of 50+ diagnostic tests our Health ATMs and point-of-care kiosks screen — biochemistry, immunoassays, rapid infection panels and bedside strip tests, with results in minutes.",
  path: PATH,
});

export default function Page() {
  return (
    <article>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tests", path: PATH },
        ]}
      />
      <ItemListSchema
        name="Point-of-Care Diagnostic Tests"
        items={TESTS.map((t) => ({ name: t.name }))}
      />

      <TestsCatalog />

      <CtaBand
        title="Bring these tests to your community"
        description="Talk to our team about deploying a Health ATM or point-of-care kiosk that screens every one of these parameters — for clinics, corporates, panchayats and government health programs."
      />
    </article>
  );
}
