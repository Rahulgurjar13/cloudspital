import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container, SectionLabel } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({
  title:"Terms",
  description:"Terms of use for the Cloudspital website.",
  path: "/terms/",
});

export default function Terms() {
  return (
    <section className="pb-20 pt-6 lg:pb-[120px] lg:pt-10">
      <Container>
        <div className="max-w-[760px]">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Terms", path: "/terms/" },
            ]}
          />
          <SectionLabel className="mt-8">Legal</SectionLabel>
          <h1 className="mt-6 t-h1 text-ink">Terms</h1>
          <div className="mt-8 space-y-5 border-t border-line pt-8">
            <p className="t-lead text-muted">Legal copy from the CMS.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
