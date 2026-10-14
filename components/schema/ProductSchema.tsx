import { JsonLd } from "./JsonLd";
import { productSchema } from "@/lib/schema";

// Product + Offer schema for /products/* pages (SOP Part A).
// Add AggregateRating once reviews exist.
export function ProductSchema(props: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceFrom?: number;
  currency?: string;
}) {
  return <JsonLd data={productSchema(props)} />;
}
