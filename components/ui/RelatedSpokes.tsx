import Link from "next/link";
import type { HubKey } from "@/lib/constants";
import { ArrowIcon } from "@/components/ui/ArrowButton";

export interface SpokeLink {
  slug: string;
  hub: HubKey;
  h1: string;
}

// Hub↔spoke internal linking (SOP B.8). On a hub: lists all its spokes. On a
// spoke: links up to the hub + 2–3 sibling spokes. No orphan pages allowed.
export function RelatedSpokes({
  hub,
  hubTitle,
  spokes,
  heading = "Related pages",
}: {
  hub: HubKey;
  hubTitle: string;
  spokes: SpokeLink[];
  heading?: string;
}) {
  return (
    <nav aria-label={heading} className="mt-12">
      <p className="t-label text-muted">[&nbsp;{heading}&nbsp;]</p>
      <ul className="mt-6 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
        <li className="border-b border-line">
          <Link
            href={`/${hub}/`}
            className="group flex items-center justify-between gap-4 py-5 t-h6 text-primary"
          >
            <span>
              <span className="mr-2 t-small text-muted">Hub</span>
              {hubTitle}
            </span>
            <ArrowIcon className="h-5 w-5 shrink-0 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </Link>
        </li>
        {spokes.map((s) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/${s.hub}/${s.slug}/`}
              className="group flex items-center justify-between gap-4 py-5 t-h6 text-ink transition-colors hover:text-primary"
            >
              {s.h1}
              <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
