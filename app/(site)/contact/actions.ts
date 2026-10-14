"use server";

import { redirect } from "next/navigation";
import { createEnquiry } from "@/lib/db/enquiries";

// Demo/quote form submission (SOP B.10).
// Used directly as a <form action>, so it must resolve to void — we signal
// success/error via redirect query params. For richer inline states, switch the
// form to a client leaf component using `useActionState`.
export async function submitDemoRequest(formData: FormData): Promise<void> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";

  // Server-side validation.
  if (!name || !email || !consent) {
    redirect("/contact/?status=error");
  }

  try {
    await createEnquiry({
      type: "contact",
      name,
      email,
      phone: phone || undefined,
      organization: organization || undefined,
      message: message || undefined,
    });
  } catch (error) {
    console.error("Failed to store contact enquiry:", error);
    redirect("/contact/?status=error");
  }

  redirect("/contact/?status=success");
}

// Book a demo modal form submission.
export async function submitBookDemoRequest(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}): Promise<{ success: boolean; error?: string }> {
  const name = `${data.firstName} ${data.lastName}`.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const organization = data.company.trim();

  if (!name || !email) {
    return { success: false, error:"Name and email are required." };
  }

  try {
    await createEnquiry({
      type: "demo",
      name,
      email,
      phone: phone || undefined,
      organization: organization || undefined,
      message:"Requested a product demo.",
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to store demo enquiry:", error);
    const message = error instanceof Error ? error.message : "";
    return { success: false, error: message || "Failed to submit demo request." };
  }
}
