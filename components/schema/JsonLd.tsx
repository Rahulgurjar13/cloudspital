// Base server component that renders a JSON-LD block (SOP Appendix C.2).
// JSON-LD is NOT part of the Next.js Metadata API — it must be injected as a
// <script> in the server-rendered page body.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
