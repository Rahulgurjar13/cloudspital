import type { ReactNode } from "react";

// Layout primitives shared by every page. Content sits in a 1320px column
// (60px gutters at desktop); full-bleed bands and inset panels frame it.

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[60px] ${className}`}>
      {children}
    </div>
  );
}

/** A vertical rhythm block. `tone` sets the band colour edge-to-edge. */
export function Section({
  children,
  className = "",
  tone = "canvas",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "canvas" | "white" | "primary" | "ink";
  id?: string;
}) {
  const toneCls = {
    canvas: "bg-canvas text-ink",
    white: "bg-white text-ink",
    primary: "bg-primary text-white",
    ink: "bg-ink text-white",
  }[tone];
  return (
    <section id={id} className={`py-14 sm:py-20 lg:py-[120px] ${toneCls} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Rounded panel inset 20px from the viewport edge (hero, testimonials, CTA). */
export function Panel({
  children,
  className = "",
  tone = "primary",
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "ink" | "white" | "mist";
}) {
  const toneCls = {
    primary: "bg-primary text-white",
    ink: "bg-ink text-white",
    white: "bg-white text-ink",
    mist: "bg-mist text-ink",
  }[tone];
  return (
    <div className={`mx-2.5 rounded-[28px] sm:mx-5 lg:rounded-[40px] ${toneCls} ${className}`}>
      {children}
    </div>
  );
}

/** Eyebrow written as "[ LABEL ]". */
export function SectionLabel({
  children,
  onDark = false,
  className = "",
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p className={`t-label ${onDark ? "text-white/85" : "text-muted"} ${className}`}>
      [&nbsp;{children}&nbsp;]
    </p>
  );
}

/**
 * Label, then a large heading on the left with an optional supporting
 * paragraph (and action) on the right — the standard section opener.
 */
export function SectionHeader({
  label,
  title,
  description,
  action,
  onDark = false,
  as: Heading = "h2",
  className = "",
}: {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onDark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const hasAside = Boolean(description || action);
  return (
    <div className={`flex flex-col gap-5 lg:gap-8 ${className}`}>
      {label ? <SectionLabel onDark={onDark}>{label}</SectionLabel> : null}
      <div className={`grid gap-6 ${hasAside ? "lg:grid-cols-12 lg:gap-10" : ""}`}>
        <Heading
          className={`${Heading === "h1" ? "t-h1" : "t-h2"} max-w-[760px] ${hasAside ? "lg:col-span-7" : ""} ${onDark ? "text-white" : "text-ink"}`}
        >
          {title}
        </Heading>
        {hasAside ? (
          <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9 lg:pt-3">
            {description ? (
              <p className={`t-lead ${onDark ? "text-white/80" : "text-muted"}`}>
                {description}
              </p>
            ) : null}
            {action}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Outlined circular index, e.g. "01". */
export function NumberPill({
  n,
  onDark = false,
}: {
  n: string | number;
  onDark?: boolean;
}) {
  return (
    <span
      className={`inline-flex h-12 min-w-12 shrink-0 items-center justify-center rounded-full border px-3 t-body ${
        onDark ? "border-white/60 text-white" : "border-ink/70 text-ink"
      }`}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}

/** Square white index chip used on the primary band ("01"). */
export function IndexChip({ n }: { n: string | number }) {
  return (
    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center bg-white t-body text-ink">
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}
