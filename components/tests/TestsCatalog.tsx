"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { CATEGORIES, TESTS, type CategoryKey, type Test } from "./tests-data";

type Filter = "all" | CategoryKey;

// Catalog laid out like a printed test menu: underline tabs and search on a
// sticky bar, then each category as a heading over its groups, the groups
// flowing in two ruled columns. No boxes — just type and hairlines.
export function TestsCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return TESTS.filter((t) => {
      const inCat = filter === "all" || t.category === filter;
      const inQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.group.toLowerCase().includes(q);
      return inCat && inQ;
    });
  }, [filter, q]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: TESTS.length };
    for (const cat of CATEGORIES) {
      c[cat.key] = TESTS.filter((t) => t.category === cat.key).length;
    }
    return c;
  }, []);

  // category → its groups (in catalog order) → tests
  const sections = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const groups: { name: string; tests: Test[] }[] = [];
      for (const t of filtered) {
        if (t.category !== cat.key) continue;
        let g = groups.find((x) => x.name === t.group);
        if (!g) groups.push((g = { name: t.group, tests: [] }));
        g.tests.push(t);
      }
      return { cat, groups, count: groups.reduce((n, g) => n + g.tests.length, 0) };
    }).filter((s) => s.count > 0);
  }, [filtered]);

  const reset = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <>
      {/* ============================= HEADER ============================= */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="50+ diagnostic tests · CDSCO-grade devices"
              title={
                <>
                  The Complete <span className="text-primary">Test Catalog</span>
                </>
              }
              description="Every parameter our Health ATMs and point-of-care kiosks can screen — from biochemistry and immunoassays to rapid infection panels and bedside strip tests. All results in minutes, doctor-ready."
              action={
                <div className="relative w-full">
                  <Search
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search tests — e.g. thyroid, dengue, HbA1c…"
                    aria-label="Search tests"
                    className="field !pl-12 !pr-12"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              }
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 pt-10 lg:pb-[120px] lg:pt-14">
        {/* ===================== STICKY TABS ===================== */}
        {/* below lg the header tucks away on scroll, so the bar pins to the very top */}
        <div className="sticky top-0 z-30 border-b border-line bg-canvas lg:top-[100px] lg:bg-canvas/90 lg:backdrop-blur-md">
          <Container>
            <div className="flex items-center justify-between gap-6">
              <div
                role="group"
                aria-label="Filter tests by category"
                className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 sm:mx-0 sm:px-0"
              >
                <Tab active={filter === "all"} onClick={() => setFilter("all")} label="All tests" count={counts.all} />
                {CATEGORIES.map((c) => (
                  <Tab key={c.key} active={filter === c.key} onClick={() => setFilter(c.key)} label={c.label} count={counts[c.key]} />
                ))}
              </div>
              <p className="hidden shrink-0 t-small text-muted sm:block" aria-live="polite">
                Showing <span className="text-ink">{filtered.length}</span> {filtered.length === 1 ? "test" : "tests"}
              </p>
            </div>
          </Container>
        </div>

        {/* ===================== RESULTS ===================== */}
        <Container className="mt-10 min-h-[40vh] lg:mt-14">
          {sections.length === 0 ? (
            <div className="py-20 text-center">
              <p className="t-h5 text-ink">No tests match “{query}”</p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 cursor-pointer t-body text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-16 lg:space-y-20">
              {sections.map(({ cat, groups, count }) => (
                <div key={cat.key}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-4">
                    <h2 className="t-h4 text-ink">{cat.label}</h2>
                    <p className="t-small text-muted">
                      {cat.tagline} · {count} {count === 1 ? "test" : "tests"}
                    </p>
                  </div>

                  {/* several groups flow in two columns; a lone group splits its own list instead */}
                  <div className={`mt-8 gap-x-16 ${groups.length > 1 ? "lg:columns-2" : ""}`}>
                    {groups.map((g) => (
                      <div key={g.name} className="mb-10 break-inside-avoid">
                        <p className="flex items-center justify-between pb-1 text-[12px] uppercase tracking-[0.08em]">
                          <span className="text-primary">{g.name}</span>
                          <span className="tabular-nums text-muted">{String(g.tests.length).padStart(2, "0")}</span>
                        </p>
                        <ul className={groups.length > 1 ? "" : "gap-x-16 lg:columns-2"}>
                          {g.tests.map((t) => (
                            <li key={t.name} className="break-inside-avoid border-b border-line py-3.5">
                              <h3 className="t-h6 text-ink">
                                {t.name}
                                {t.panel ? (
                                  <span className="ml-2 align-middle text-[11px] uppercase tracking-[0.08em] text-primary">
                                    Panel
                                  </span>
                                ) : null}
                              </h3>
                              <p className="mt-1 t-small text-muted">{t.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function Tab({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 cursor-pointer whitespace-nowrap py-4 t-small transition-colors duration-300 ${
        active ? "text-ink" : "text-muted hover:text-ink"
      }`}
    >
      {label}
      <span className={`ml-1.5 tabular-nums ${active ? "text-primary" : "text-faint"}`}>{count}</span>
      {active ? <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" /> : null}
    </button>
  );
}
