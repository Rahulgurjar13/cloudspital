import { JsonLd } from "./JsonLd";
import { reviewSchema } from "@/lib/schema";

// AggregateRating + individual Reviews for the testimonials page.
export function ReviewSchema(props: {
  reviews: { author: string; body: string; rating: number; org?: string }[];
}) {
  if (!props.reviews.length) return null;
  return <JsonLd data={reviewSchema(props)} />;
}
