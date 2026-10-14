import { Container, SectionLabel } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";

// Custom 404 (SOP Part A: /404).
export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <div className="flex max-w-[760px] flex-col items-start">
          <SectionLabel>404</SectionLabel>
          <h1 className="mt-6 t-h1 text-ink">Page not found</h1>
          <p className="mt-6 t-lead text-muted">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <ArrowButton href="/" className="mt-10">
            Go home
          </ArrowButton>
        </div>
      </Container>
    </section>
  );
}
