import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { PartnershipModel, PartnerCta } from "@/components/home/PartnershipModel";
import { SmartLoungeShowcase } from "@/components/home/SmartLoungeShowcase";
import { AffordabilityCompare } from "@/components/home/AffordabilityCompare";

const PATH = "/partner/";

export const metadata: Metadata = pageMetadata({
  title: "Doctor Partnership Model: Zero-Investment Diagnostic Clinic",
  description:
    "Turn your clinic into a full diagnostic centre with zero risk. Cloudspital funds, installs and runs everything — you simply earn a transparent 30% revenue share, paid monthly.",
  path: PATH,
});

// For doctors and clinics: the ₹0 / 100% / 30% partnership, the smart clinic
// lounge it installs, and what patients save on every test.
export default function PartnerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Partner with us", path: PATH },
        ]}
      />
      <PartnershipModel as="h1" />
      <SmartLoungeShowcase />
      <AffordabilityCompare />
      <PartnerCta />
    </>
  );
}
