import { JsonLd } from "./JsonLd";
import { collectionPageSchema } from "@/lib/schema";

// CollectionPage node for index pages (press, use-cases, blog, case studies).
export function CollectionPageSchema(props: {
  name: string;
  description: string;
  path: string;
}) {
  return <JsonLd data={collectionPageSchema(props)} />;
}
