import Link from "next/link";
import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";
import { SWIPE_ROW, SWIPE_ITEM } from "@/components/ui/swipe";
import { Container, Panel, SectionHeader, SectionLabel, IndexChip, NumberPill } from "@/components/ui/Section";
import { Check } from "@/components/icons";
import { getSpokeLinks } from "@/lib/site-structure";
import type { HubKey } from "@/lib/constants";

// Building blocks for the five solution hubs (pillar pages). Every hub is the
// same sequence — hero, index, why, process, comparison, topics, all spokes,
// CTA — so the pages read as one system while keeping their own content.

type Icon = ComponentType<{ className?: string }>;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function HubHero({
  label,
  title,
  intro,
  trust,
  stats,
  image,
  secondary,
}: {
  label: string;
  title: ReactNode;
  /** Direct-answer paragraph (AEO) — rendered with data-direct-answer. */
  intro: ReactNode;
  trust: string[];
  /** Figures shown on the hero panel when there is no product photo. */
  stats?: { value: string; label: string }[];
  /** A real product photo or cutout — never a generated scene. `onPanel`
   *  places a transparent cutout straight on the gradient (no white card). */
  image?: { src: string; alt: string; width: number; height: number; onPanel?: boolean };
  /** Optional second hero action, e.g. a key comparison page. */
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="pt-10 lg:pt-16">
      <Container>
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="mt-6 max-w-[1100px] t-h1 text-ink">{title}</h1>
        </Reveal>
      </Container>

      <Reveal delay={0.1} className="mt-10 lg:mt-14">
        <Panel className="bg-hero-gradient relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-white/15" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border border-white/15" />
          <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-[60px] lg:py-16">
            <div className="flex flex-col justify-between gap-10 lg:col-span-7">
              <p data-direct-answer className="t-h5 text-white">
                {intro}
              </p>
              <div className="flex flex-col items-start gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <BookDemoDialog>
                    <ArrowButton href="/contact/" variant="light">
                      Book a demo
                    </ArrowButton>
                  </BookDemoDialog>
                  {secondary ? (
                    <Link
                      href={secondary.href}
                      className="inline-flex min-h-[60px] items-center gap-2 rounded-xl border border-white/40 px-5 t-lead text-white transition-colors hover:bg-white/10"
                    >
                      {secondary.label}
                      <ArrowIcon className="h-5 w-5" />
                    </Link>
                  ) : null}
                </div>
                <ul className="grid w-full gap-x-6 gap-y-3 border-t border-white/25 pt-6 sm:grid-cols-2">
                  {trust.map((t) => (
                    <li key={t} className="flex items-center gap-2 t-small text-white/85">
                      <Check className="h-4 w-4 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={image?.onPanel ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-4 lg:col-start-9"}>
              {image?.onPanel ? (
                <div className="relative h-[240px] sm:h-[320px] lg:h-full lg:min-h-[340px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(13,13,13,0.25)]"
                  />
                </div>
              ) : image ? (
                <div className="relative mx-auto h-[360px] max-w-[420px] overflow-hidden rounded-[20px] bg-white lg:h-full lg:min-h-[420px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className={`object-contain ${image.width > image.height ? "p-3" : "p-8"}`}
                  />
                </div>
              ) : stats ? (
                <dl className="grid h-full grid-cols-2 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="flex min-h-[150px] flex-col justify-between rounded-[20px] bg-white p-5">
                      <dt className="t-small text-muted">{s.label}</dt>
                      <dd className="t-h4 text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* "What you'll find in this hub"                                      */
/* ------------------------------------------------------------------ */

export function HubIndex({
  groups,
}: {
  groups: { category: string; links: { name: string; href: string }[] }[];
}) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <Reveal className="rounded-[20px] border border-line bg-white p-6 sm:p-8 lg:p-10">
          <p className="t-small uppercase text-muted">What you&apos;ll find in this hub</p>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g.category}>
                <h2 className="t-h6 text-ink">{g.category}</h2>
                <ul className="mt-3 border-t border-line">
                  {g.links.map((l) => (
                    <li key={l.href} className="border-b border-line">
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-3 py-3 t-body text-muted transition-colors hover:text-primary"
                      >
                        {l.name}
                        <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why — statement + figures on the left, feature rows on the right    */
/* ------------------------------------------------------------------ */

export function HubWhy({
  label = "Why Cloudspital",
  title,
  body,
  stats,
  tags,
  link,
  features,
}: {
  label?: string;
  title: ReactNode;
  body: ReactNode;
  stats?: { value: string; label: string }[];
  tags?: string[];
  link?: { href: string; label: string };
  features: { icon: Icon; title: string; desc: string }[];
}) {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex flex-col items-start gap-6 lg:col-span-5 lg:self-start">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="t-h2 text-ink">{title}</h2>
            <p className="t-lead text-muted">{body}</p>
            {stats ? (
              <dl className="mt-2 grid w-full grid-cols-2 gap-x-6 gap-y-6 rounded-[20px] bg-mist p-6 sm:p-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dd className="t-h4 text-ink">{s.value}</dd>
                    <dt className="mt-1 t-small text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            ) : null}
            {tags ? (
              <ul className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-white px-3 py-1.5 t-small text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {link ? (
              <ArrowButton href={link.href} variant="outline" size="sm">
                {link.label}
              </ArrowButton>
            ) : null}
          </Reveal>

          <Stagger className="border-t border-line lg:col-span-6 lg:col-start-7">
            {features.map((f, i) => {
              const FIcon = f.icon;
              return (
                <Item key={f.title} className="flex gap-6 border-b border-line py-8">
                  <NumberPill n={i + 1} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="t-h5 text-ink">{f.title}</h3>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                        <FIcon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-2 t-body text-muted">{f.desc}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Process band — numbered steps on primary                            */
/* ------------------------------------------------------------------ */

export function HubSteps({
  label = "How it works",
  title,
  description,
  steps,
  link,
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  steps: { icon?: Icon; title: string; desc: string }[];
  link?: { href: string; label: string };
}) {
  const cols = steps.length % 3 === 0 ? "lg:grid-cols-3" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section className="bg-primary py-20 text-white lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            onDark
            label={label}
            title={title}
            description={description}
            action={
              link ? (
                <ArrowButton href={link.href} variant="light" size="sm">
                  {link.label}
                </ArrowButton>
              ) : undefined
            }
          />
        </Reveal>
        <Stagger className={`mt-12 grid border-l border-t border-white/25 sm:grid-cols-2 lg:mt-16 ${cols}`}>
          {steps.map((s, i) => {
            const SIcon = s.icon;
            return (
              <Item key={s.title} className="flex flex-col gap-6 border-b border-r border-white/25 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <IndexChip n={i + 1} />
                  {SIcon ? <SIcon className="h-5 w-5 text-white/70" /> : null}
                </div>
                <div className="mt-auto">
                  <h3 className="t-h5 text-white">{s.title}</h3>
                  <p className="mt-2 t-body text-white/75">{s.desc}</p>
                </div>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison table                                                    */
/* ------------------------------------------------------------------ */

export function HubCompare({
  label,
  title,
  description,
  columns,
  rows,
  footnote,
  link,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  /** [dimension header, column A, column B, …] */
  columns: string[];
  rows: { label: string; values: ReactNode[] }[];
  footnote?: ReactNode;
  link?: { href: string; label: string };
}) {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label={label}
            title={title}
            description={description}
            action={
              link ? (
                <ArrowButton href={link.href} variant="outline" size="sm">
                  {link.label}
                </ArrowButton>
              ) : undefined
            }
          />
        </Reveal>
        <Reveal className="mt-12 overflow-hidden rounded-[20px] border border-line bg-white lg:mt-16">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-mist">
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-5 py-4 font-normal sm:px-6 ${i === 0 ? "t-small uppercase text-muted" : "t-body text-ink"} ${
                        i === columns.length - 1 ? "text-primary" : ""
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-line">
                    <th scope="row" className="px-5 py-4 align-top t-small font-normal uppercase text-muted sm:px-6">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td
                        key={i}
                        className={`px-5 py-4 align-top t-body sm:px-6 ${i === r.values.length - 1 ? "text-ink" : "text-muted"}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {footnote ? (
            <p className="flex items-center gap-2 border-t border-line bg-canvas px-5 py-4 t-small text-ink sm:px-6">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {footnote}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Key topic cards                                                     */
/* ------------------------------------------------------------------ */

export function HubTopics({
  label,
  title,
  description,
  topics,
}: {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  topics: { href: string; icon: Icon; title: string; desc: string }[];
}) {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader label={label} title={title} description={description} />
        </Reveal>
        <Stagger className={`mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-4 ${SWIPE_ROW}`}>
          {topics.map((t) => {
            const TIcon = t.icon;
            return (
              <Item key={t.href} className={SWIPE_ITEM}>
                <Link
                  href={t.href}
                  className="group flex h-full min-h-[240px] flex-col rounded-[20px] bg-white p-6 transition-[background-color,transform] duration-500 ease-out-soft hover:bg-primary active:scale-[0.98] sm:min-h-[260px] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary transition-colors duration-500 group-hover:bg-white/15 group-hover:text-white">
                      <TIcon className="h-5 w-5" />
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-500 group-hover:border-white/40 group-hover:text-white">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-auto pt-10 t-h5 text-ink transition-colors duration-500 group-hover:text-white">{t.title}</h3>
                  <p className="mt-2 t-small text-muted transition-colors duration-500 group-hover:text-white/80">{t.desc}</p>
                </Link>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Every spoke in the hub (internal linking — SOP B.8)                 */
/* ------------------------------------------------------------------ */

export function HubAllTopics({ hub, title }: { hub: HubKey; title: string }) {
  const spokes = getSpokeLinks(hub);
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <nav aria-label={title}>
          <Reveal>
            <SectionHeader label="Explore the topic" title={title} />
          </Reveal>
          <Stagger className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:mt-16">
            {spokes.map((s, i) => (
              <Item key={s.slug} className="border-b border-line">
                <Link
                  href={`/${s.hub}/${s.slug}/`}
                  className="group flex items-center gap-5 py-5 text-ink transition-colors hover:text-primary"
                >
                  <span className="w-8 shrink-0 t-small text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 t-h6">{s.h1}</span>
                  <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Item>
            ))}
          </Stagger>
        </nav>
      </Container>
    </section>
  );
}
