import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { SDG } from "@/components/home/SDG";
import { HealthcareAccess } from "@/components/home/HealthcareAccess";
import { Sustainability3M } from "@/components/home/Sustainability3M";
import { Features } from "@/components/home/Features";
import { Gallery } from "@/components/home/Gallery";

const PATH = "/impact/";

export const metadata: Metadata = pageMetadata({
  title: "Impact: Sustainable Development Goals and Healthcare Access",
  description:
    "Revolutionizing healthcare access through a simplified touch-interface for medication management, enabling seamless critical care bookings while eliminating travel, queues, wage losses, and complex registrations.",
  path: PATH,
});

// Why the work matters: SDG alignment, access, the 3M operating model, what
// makes the platform different, and photos from deployments.
export default function ImpactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Impact", path: PATH },
        ]}
      />
      <SDG as="h1" />
      <HealthcareAccess />
      <Sustainability3M />
      <Features />
      <Gallery />
    </>
  );
}
