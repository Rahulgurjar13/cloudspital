"use client";

// Home section — CPL Health Kiosk Range 2026–27 model comparison.
// Specifications only (no commercial terms), mirroring the printed comparison
// document. Model cards summarise the range; the matrix below is grouped by
// panel, searchable, and filterable down to the models the visitor cares about.

import { useMemo, useState } from "react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Check, Search } from "@/components/icons";
import { MODELS, TEST_GROUPS, HIGHLIGHTS, NOTES, type TestGroup } from "@/lib/model-comparison-data";

const MAX_TESTS = Math.max(...MODELS.map((m) => m.tests));

/** Per-model count of available (✓) tests inside one group. */
function groupCounts(group: TestGroup) {
  return MODELS.map((_, i) => group.rows.filter((r) => r.av[i] === "y").length);
}

/** Optional-accessory groups have no ✓ at all — flagged in the summary row. */
function isOptionalGroup(group: TestGroup) {
  return group.rows.every((r) => r.av.split("").every((c) => c === "o"));
}

export function ModelComparison({ as = "h2" }: { as?: "h1" | "h2" }) {
  const [query, setQuery] = useState("");
  const [onlyDiff, setOnlyDiff] = useState(false);
  const [active, setActive] = useState<string[]>(MODELS.map((m) => m.key));
  const [open, setOpen] = useState<string[]>([]);

  const shown = useMemo(() => MODELS.filter((m) => active.includes(m.key)), [active]);
  const shownIndex = useMemo(
    () => MODELS.map((m, i) => (active.includes(m.key) ? i : -1)).filter((i) => i >= 0),
    [active],
  );

  const toggleModel = (key: string) =>
    setActive((prev) =>
      prev.includes(key)
        ? prev.length === 1
          ? prev
          : prev.filter((k) => k !== key)
        : MODELS.filter((m) => m.key === key || prev.includes(m.key)).map((m) => m.key),
    );

  const toggleGroup = (key: string) =>
    setOpen((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const q = query.trim().toLowerCase();

  // Filter rows by search text and, when requested, drop rows where every
  // visible model behaves identically.
  const groups = useMemo(() => {
    return TEST_GROUPS.map((g) => {
      const rows = g.rows.filter((r) => {
        if (q && !r.name.toLowerCase().includes(q) && !g.label.toLowerCase().includes(q)) return false;
        if (onlyDiff) {
          const vals = shownIndex.map((i) => r.av[i]);
          if (vals.every((v) => v === vals[0])) return false;
        }
        return true;
      });
      return { ...g, rows };
    }).filter((g) => g.rows.length > 0);
  }, [q, onlyDiff, shownIndex]);

  const searching = q.length > 0;
  const visibleCount = groups.reduce((n, g) => n + g.rows.length, 0);

  return (
    <section id="model-comparison" className={as === "h1" ? "pb-20 pt-10 lg:pb-[120px] lg:pt-16" : "py-14 sm:py-20 lg:py-[120px]"}>
      <Container>
        <Reveal>
          <SectionHeader
            as={as}
            label="CPL Health Kiosk Range 2026–27"
            title="Compare every Arc model, test by test"
            description="Five configurations, from a 50-test entry screening kiosk to a 170-test full diagnostic build and a portable emergency crash cart. Specifications only — commercial terms are issued separately."
          />
        </Reveal>

        {/* Model cards */}
        {/* Swipeable row on phones, grid from sm up */}
        <Stagger className="-mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-5">
          {MODELS.map((m) => {
            const on = active.includes(m.key);
            return (
              <Item key={m.key} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <button
                  type="button"
                  onClick={() => toggleModel(m.key)}
                  aria-pressed={on}
                  className={`flex h-full w-full cursor-pointer flex-col rounded-[20px] border p-5 text-left transition-colors duration-300 ${
                    on ? "border-primary bg-white" : "border-line bg-canvas opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="t-h5 text-ink">{m.name}</h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase text-muted">{m.code}</p>
                    </div>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                        on ? "bg-primary text-white" : "border border-line text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="t-h3 text-ink">{m.tests}</span>
                    <span className="t-small text-muted">tests</span>
                  </p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-mist">
                    <span
                      className={`block h-full rounded-full ${on ? "bg-primary" : "bg-faint"}`}
                      style={{ width: `${(m.tests / MAX_TESTS) * 100}%` }}
                    />
                  </div>
                  <p className="mt-4 t-small text-muted">{m.positioning}</p>
                </button>
              </Item>
            );
          })}
        </Stagger>
        <p className="mt-3 t-small text-muted">Tap a model to add or remove it from the comparison table below<span className="sm:hidden"> — swipe to see all five</span>.</p>

        {/* Highlights */}
        <Stagger className="mt-10 grid gap-3 md:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Item key={h.title}>
              <div className={`h-full rounded-[20px] p-6 ${i === 0 ? "bg-ink text-white" : i === 1 ? "bg-primary text-white" : "bg-white text-ink"}`}>
                <span className={`rounded-full px-3 py-1 text-[12px] ${i === 2 ? "bg-mist" : "bg-white/15"}`}>{h.tag}</span>
                <h3 className="mt-6 t-h5">{h.title}</h3>
                <p className={`mt-2 t-small ${i === 2 ? "text-muted" : "text-white/75"}`}>{h.body}</p>
              </div>
            </Item>
          ))}
        </Stagger>

        {/* Matrix */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-[20px] border border-line bg-white">
            <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a test or panel…"
                  aria-label="Search tests"
                  className="field !py-3 !pl-10"
                />
                <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOnlyDiff((v) => !v)}
                  aria-pressed={onlyDiff}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2.5 t-small transition-colors ${
                    onlyDiff ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  <span className={`relative h-4 w-7 rounded-full transition ${onlyDiff ? "bg-white/30" : "bg-mist"}`}>
                    <span className={`absolute top-0.5 h-3 w-3 rounded-full transition-all ${onlyDiff ? "left-3.5 bg-white" : "left-0.5 bg-faint"}`} />
                  </span>
                  Only show differences
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(open.length === TEST_GROUPS.length ? [] : TEST_GROUPS.map((g) => g.key))}
                  className="cursor-pointer rounded-xl border border-line px-3.5 py-2.5 t-small text-ink transition-colors hover:border-ink"
                >
                  {open.length === TEST_GROUPS.length ? "Collapse all" : "Expand all"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-4 py-3 text-[12px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Mark value="y" /> available
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mark value="o" /> optional accessory
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mark value="n" /> not available
              </span>
              <span className="ml-auto">
                {visibleCount} parameter{visibleCount === 1 ? "" : "s"} listed
              </span>
            </div>

            {/* Scroll container — first column stays pinned on small screens */}
            <div className="max-h-[26rem] overflow-auto overscroll-contain sm:max-h-[34rem]">
              <table className="w-full border-collapse text-left">
                <thead className="sticky top-0 z-20">
                  <tr className="bg-white shadow-[0_1px_0_0_#dedede]">
                    <th scope="col" className="sticky left-0 z-30 w-[10.5rem] min-w-[10.5rem] border-r border-line bg-white px-3 py-3 text-[11px] uppercase text-muted sm:w-[15rem] sm:min-w-[15rem] sm:px-4">
                      Test / Parameter
                    </th>
                    {shown.map((m) => (
                      <th key={m.key} scope="col" className="w-[4.75rem] min-w-[4.75rem] border-l border-line bg-white px-1.5 py-3 text-center align-bottom font-normal sm:w-auto sm:min-w-[6.5rem] sm:px-2">
                        <span className="block t-small text-ink">{m.name}</span>
                        <span className="mt-0.5 hidden font-mono text-[10px] uppercase text-muted sm:block">{m.code}</span>
                        <span className="mt-1 inline-flex rounded-full bg-mist px-2 py-0.5 text-[11px] text-ink">{m.tests}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g) => (
                    <GroupRows
                      key={g.key}
                      group={g}
                      counts={groupCounts(g)}
                      optional={isOptionalGroup(g)}
                      expanded={searching || open.includes(g.key)}
                      shownIndex={shownIndex}
                      onToggle={() => toggleGroup(g.key)}
                      toggleable={!searching}
                    />
                  ))}
                  {groups.length === 0 && (
                    <tr>
                      <td colSpan={shown.length + 1} className="px-4 py-10 text-center t-small text-muted">
                        No parameters match “{query}”.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="border-t border-line px-4 py-3 text-[12px] text-muted sm:hidden">
              Swipe the table sideways to see every model, or deselect models above.
            </p>
          </div>
        </Reveal>

        {/* Notes */}
        <Stagger className="mt-10 grid gap-x-10 border-t border-line sm:grid-cols-2">
          {NOTES.map((n) => (
            <Item key={n.title} className="border-b border-line py-6">
              <h3 className="t-h6 text-ink">{n.title}</h3>
              <p className="mt-1 t-small text-muted">{n.body}</p>
            </Item>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-small text-muted">
            Technical comparison — specifications only. Custom configurations available on request.
          </p>
          <ArrowButton href="/contact/">Request the full specification sheet</ArrowButton>
        </Reveal>
      </Container>
    </section>
  );
}

/* One panel: a clickable summary row plus its expanded parameter rows */
function GroupRows({
  group,
  counts,
  optional,
  expanded,
  shownIndex,
  onToggle,
  toggleable,
}: {
  group: TestGroup;
  counts: number[];
  optional: boolean;
  expanded: boolean;
  shownIndex: number[];
  onToggle: () => void;
  toggleable: boolean;
}) {
  return (
    <>
      <tr onClick={toggleable ? onToggle : undefined} className={`group border-t border-line bg-canvas ${toggleable ? "cursor-pointer" : ""}`}>
        <th scope="rowgroup" className="sticky left-0 z-10 border-r border-line bg-canvas px-3 py-3 text-left font-normal transition-colors group-hover:bg-mist sm:px-4">
          <span className="flex items-start gap-2">
            {toggleable && (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-transform ${expanded ? "rotate-90" : ""}`}>
                <path d="m9 6 6 6-6 6" />
              </svg>
            )}
            <span className="min-w-0 text-[11px] uppercase leading-snug text-ink sm:text-[12px]">
              {group.label}
              <span className="ml-1.5 inline-flex rounded-full bg-white px-1.5 py-0.5 align-middle text-[10px] text-muted ring-1 ring-line">{group.rows.length}</span>
            </span>
          </span>
        </th>
        {shownIndex.map((i) => (
          <td key={i} className="border-l border-line bg-canvas px-1.5 py-3 text-center t-small transition-colors group-hover:bg-mist sm:px-2">
            {optional ? <span className="text-accent">opt</span> : counts[i] > 0 ? <span className="text-ink">{counts[i]}</span> : <span className="text-faint">–</span>}
          </td>
        ))}
      </tr>
      {expanded &&
        group.rows.map((r) => (
          <tr key={r.n} className="group border-t border-line">
            <th scope="row" className="sticky left-0 z-10 border-r border-line bg-white px-3 py-2.5 text-left text-[12px] font-normal leading-snug text-ink transition-colors group-hover:bg-blue-50 sm:px-4 sm:text-[13px]">
              <span className="mr-1.5 hidden w-7 text-right align-top font-mono text-[10px] text-faint sm:inline-block">{r.n}</span>
              {r.name}
            </th>
            {shownIndex.map((i) => (
              <td key={i} className="border-l border-line bg-white px-1.5 py-2.5 text-center transition-colors group-hover:bg-blue-50 sm:px-2">
                <Mark value={r.av[i]} />
              </td>
            ))}
          </tr>
        ))}
    </>
  );
}

function Mark({ value }: { value: string }) {
  if (value === "y")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
        <Check className="h-3 w-3" />
        <span className="sr-only">Available</span>
      </span>
    );
  if (value === "o")
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-accent text-[9px] text-accent">
        ■<span className="sr-only">Optional accessory</span>
      </span>
    );
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-mist text-faint">
      –<span className="sr-only">Not available</span>
    </span>
  );
}
