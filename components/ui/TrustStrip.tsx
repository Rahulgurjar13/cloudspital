import { Check } from "@/components/icons";

// Trust/credential badges: DPIIT / GeM / ISO / CE / CDSCO / AIIMS (SOP B.9).
const BADGES = [
  "DPIIT Recognised",
  "GeM Listed",
  "ISO Certified",
  "CE Marked",
  "CDSCO Approved",
  "AIIMS Co developed",
];

export function TrustStrip() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {BADGES.map((b) => (
        <li key={b} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 t-small text-ink">
          <Check className="h-4 w-4 text-primary" />
          {b}
        </li>
      ))}
    </ul>
  );
}
