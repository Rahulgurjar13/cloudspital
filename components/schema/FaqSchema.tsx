import { JsonLd } from "./JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Faq } from "@/lib/cms";

// Pair this with <FaqAccordion> so the visible Q&A and the schema match (SOP B.9).
export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return <JsonLd data={faqSchema(faqs)} />;
}
