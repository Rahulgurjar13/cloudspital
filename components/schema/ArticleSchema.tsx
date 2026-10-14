import { JsonLd } from "./JsonLd";
import { articleSchema } from "@/lib/schema";
import type { Author, MedicalReviewer } from "@/lib/cms";

export function ArticleSchema(props: {
  headline: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  reviewer?: MedicalReviewer;
  image?: string;
}) {
  return <JsonLd data={articleSchema(props)} />;
}
