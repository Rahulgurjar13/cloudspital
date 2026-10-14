import { JsonLd } from "./JsonLd";
import { webPageSchema } from "@/lib/schema";

// WebPage node with a speakable spec (AEO). Selectors default to the H1 and
// any [data-direct-answer] block so voice/answer engines read the summary.
export function WebPageSchema(props: {
  name: string;
  description: string;
  path: string;
  primaryImage?: string;
  speakableSelectors?: string[];
}) {
  return <JsonLd data={webPageSchema(props)} />;
}
