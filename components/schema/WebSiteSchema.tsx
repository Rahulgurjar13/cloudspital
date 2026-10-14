import { JsonLd } from "./JsonLd";
import { webSiteSchema } from "@/lib/schema";

// Site-wide WebSite schema — rendered once in the root layout (SOP B.5).
export function WebSiteSchema() {
  return <JsonLd data={webSiteSchema()} />;
}
