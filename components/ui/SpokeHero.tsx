import Image from "next/image";
import { Reveal } from "@/components/motion";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Container, Panel, SectionLabel } from "@/components/ui/Section";

/** Full-width band. The marketing layout no longer caps width, so this is a
 *  plain section — kept as a named export for the spoke pages that use it. */
export function Bleed({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`w-full ${className}`}>{children}</section>;
}

// Spoke (article) hero: label + large title on the canvas, then an inset
// gradient panel carrying the direct-answer definition and the demo CTA.
export function SpokeHero({
  title,
  description,
  definition,
  definitionLabel = "In short",
  eyebrow = "Comprehensive Guide",
  image,
}: {
  title: string;
  description: string;
  /** Rich lead/definition shown on the hero panel (AEO direct answer). */
  definition?: string;
  definitionLabel?: string;
  eyebrow?: string;
  /** Optional real product photo — shown on a white card inside the panel. */
  image?: { src: string; alt: string; badges?: string[] };
}) {
  return (
    <section className="pt-10 lg:pt-16">
      <Container>
        <Reveal>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 className="mt-6 max-w-[1100px] t-h1 text-ink">{title}</h1>
          {definition ? (
            <p className="mt-6 max-w-[720px] t-lead text-muted">{description}</p>
          ) : null}
        </Reveal>
      </Container>

      <Reveal delay={0.1} className="mt-10 lg:mt-14">
        <Panel className="bg-hero-gradient relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/15" />
          <div className="relative grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-16">
            <div className={`flex flex-col justify-between gap-10 ${image ? "lg:col-span-7" : "lg:col-span-9"}`}>
              <div>
                <SectionLabel onDark>{definition ? definitionLabel : "Overview"}</SectionLabel>
                <p data-direct-answer className="mt-5 t-h5 text-white">
                  {definition ?? description}
                </p>
              </div>
              <BookDemoDialog>
                <ArrowButton href="/contact/" variant="light">
                  Talk to an Expert
                </ArrowButton>
              </BookDemoDialog>
            </div>

            {image ? (
              <div className="lg:col-span-4 lg:col-start-9">
                <div className="relative mx-auto h-[340px] max-w-[440px] overflow-hidden rounded-[20px] bg-white lg:h-full lg:min-h-[380px]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-contain p-8"
                  />
                  {image.badges?.length ? (
                    <ul className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
                      {image.badges.map((b) => (
                        <li key={b} className="rounded-full bg-ink px-3 py-1.5 text-[12px] text-white">
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </Panel>
      </Reveal>
    </section>
  );
}
