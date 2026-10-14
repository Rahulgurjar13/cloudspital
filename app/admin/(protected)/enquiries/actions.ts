"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/require-auth";
import {
  updateEnquiryStatus,
  deleteEnquiry,
  type EnquiryStatus,
} from "@/lib/db/enquiries";

export async function updateEnquiryStatusAction(
  id: string,
  status: EnquiryStatus,
): Promise<void> {
  await requireAuth();
  await updateEnquiryStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
}

export async function deleteEnquiryAction(id: string): Promise<void> {
  await requireAuth();
  await deleteEnquiry(id);
  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
}
