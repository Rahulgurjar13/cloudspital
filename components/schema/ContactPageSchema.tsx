import { JsonLd } from "./JsonLd";
import { contactPageSchema } from "@/lib/schema";

// ContactPage node + reachable contact points for /contact.
export function ContactPageSchema(props: { path: string }) {
  return <JsonLd data={contactPageSchema(props)} />;
}
