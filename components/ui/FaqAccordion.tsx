import type { Faq } from "@/lib/cms";

// Accessible disclosure using native <details>/<summary>. The answer is ALWAYS
// in the DOM (even when visually collapsed) so crawlers and LLMs can read it
// (SOP B.9). Pair with <FaqSchema> so the visible Q&A matches the structured data.
export function FaqAccordion({
  faqs,
  onDark = false,
}: {
  faqs: Faq[];
  onDark?: boolean;
}) {
  if (!faqs.length) return null;
  const line = onDark ? "border-white/25" : "border-line";
  return (
    <div className={`border-t ${line}`}>
      {faqs.map((f, i) => (
        <details key={i} className={`group border-b ${line}`} open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className={`t-h5 ${onDark ? "text-white" : "text-ink"}`}>{f.q}</span>
            <span
              aria-hidden="true"
              className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                onDark
                  ? "border-white/60 text-white group-open:bg-white group-open:text-primary"
                  : "border-ink/60 text-ink group-open:border-ink"
              }`}
            >
              <span className="absolute h-px w-4 bg-current" />
              <span className="absolute h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <div className={`-mt-2 max-w-[560px] pb-6 t-body ${onDark ? "text-white/75" : "text-muted"}`}>
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}
