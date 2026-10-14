import { JsonLd } from "./JsonLd";
import { serviceSchema } from "@/lib/schema";

// Service node for hub pages — what Cloudspital offers + area served (GEO).
export function ServiceSchema(props: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return <JsonLd data={serviceSchema(props)} />;
}
