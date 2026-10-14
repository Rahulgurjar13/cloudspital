import { JsonLd } from "./JsonLd";
import { itemListSchema } from "@/lib/schema";

// ItemList for listing pages (products, tests, blog, case studies).
export function ItemListSchema(props: {
  name: string;
  items: { name: string; path?: string }[];
}) {
  return <JsonLd data={itemListSchema(props)} />;
}
