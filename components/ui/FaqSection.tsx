import type { Faq } from "@/lib/cms";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { Reveal } from "@/components/motion";

// Two-column FAQ: heading + call to action on the left, questions on the right.
export function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  label = "FAQ",
  className = "",
}: {
  faqs: Faq[];
  title?: string;
  label?: string;
  className?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className={`py-14 sm:py-20 lg:py-[120px] ${className}`}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="flex flex-col items-start gap-6 lg:col-span-5 lg:gap-8">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="t-h2 max-w-[460px] text-ink">{title}</h2>
            <BookDemoDialog>
              <ArrowButton href="/contact/">Book a demo</ArrowButton>
            </BookDemoDialog>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
