import { JsonLd } from "./JsonLd";
import { organizationSchema } from "@/lib/schema";

// Site-wide Organization schema — rendered once in the root layout (SOP B.5).
export function OrganizationSchema() {
  return <JsonLd data={organizationSchema()} />;
}
