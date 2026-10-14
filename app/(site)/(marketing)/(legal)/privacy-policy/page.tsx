import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container, SectionLabel } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({
  title:"Privacy Policy",
  description:"How Cloudspital handles your data under the DPDP Act.",
  path: "/privacy-policy/",
});

export default function PrivacyPolicy() {
  return (
    <section className="pb-20 pt-6 lg:pb-[120px] lg:pt-10">
      <Container>
        <div className="max-w-[760px]">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy-policy/" },
            ]}
          />
          <SectionLabel className="mt-8">Legal</SectionLabel>
          <h1 className="mt-6 t-h1 text-ink">Privacy Policy</h1>
          <div className="mt-8 space-y-5 border-t border-line pt-8">
            <p className="t-lead text-muted">Legal copy from the CMS.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
