import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return <JsonLd data={breadcrumbSchema(items)} />;
}
