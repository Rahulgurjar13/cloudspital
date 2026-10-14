import { SITE } from "@/lib/constants";
import { Panel, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Reveal } from "@/components/motion";

// Closing call-to-action: an inset primary panel with the demo button and a
// direct phone line. Used at the foot of hubs, spokes and inner pages.
export function CtaBand({
  title,
  description,
  label = "Get started",
  className = "",
}: {
  title: string;
  description?: string;
  label?: string;
  className?: string;
}) {
  return (
    <section className={`py-10 lg:py-16 ${className}`}>
      <Panel className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 right-40 h-[360px] w-[360px] rounded-full bg-white/5"
        />
        <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
          <div className="flex flex-col gap-6 lg:col-span-7">
            <SectionLabel onDark>{label}</SectionLabel>
            <h2 className="t-h2 text-white">{title}</h2>
          </div>
          <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
            {description ? <p className="t-lead text-white/80">{description}</p> : null}
            <div className="flex flex-wrap items-center gap-4">
              <BookDemoDialog>
                <ArrowButton href="/contact/" variant="light">
                  Book a demo
                </ArrowButton>
              </BookDemoDialog>
              <a
                href={`tel:${SITE.phone}`}
                className="t-lead text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
              >
                Call +91 75420 11187
              </a>
            </div>
          </div>
        </Reveal>
      </Panel>
    </section>
  );
}
