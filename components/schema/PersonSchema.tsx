import { JsonLd } from "./JsonLd";
import { personSchema } from "@/lib/schema";
import type { Author } from "@/lib/cms";

// Person schema for /author/[slug] bio pages — supports E-E-A-T (SOP Part A).
export function PersonSchema({ author }: { author: Author }) {
  return <JsonLd data={personSchema(author)} />;
}
