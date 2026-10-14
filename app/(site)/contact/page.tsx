import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactPageSchema } from "@/components/schema/ContactPageSchema";
import { LocalBusinessSchema } from "@/components/schema/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { ContactClient } from "./ContactClient";

const PATH = "/contact/";

export const metadata: Metadata = pageMetadata({
  title:"Contact and Demo",
  description:
    "Request a demo or quote for Cloudspital health kiosks, Tele ICU and telemedicine carts.",
  path: PATH,
});

type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ContactPage(props: {
  searchParams: SearchParamsType;
}) {
  const searchParams = await props.searchParams;
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;

  return (
    <>
      <ContactPageSchema path={PATH} />
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: PATH },
        ]}
      />
      <ContactClient status={status} />
    </>
  );
}
