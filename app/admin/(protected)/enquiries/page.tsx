import { listEnquiries } from "@/lib/db/enquiries";
import { EnquiryListClient } from "./EnquiryListClient";

export const dynamic="force-dynamic";

export default async function EnquiriesAdminPage() {
  const enquiries = await listEnquiries();

  return <EnquiryListClient initialEnquiries={enquiries} />;
}
