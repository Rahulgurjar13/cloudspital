import { JsonLd } from "./JsonLd";
import { localBusinessSchema } from "@/lib/schema";

// MedicalBusiness / LocalBusiness node (GEO) — address, geo, opening hours.
// Render once on high-intent local pages (home, contact).
export function LocalBusinessSchema() {
  return <JsonLd data={localBusinessSchema()} />;
}
