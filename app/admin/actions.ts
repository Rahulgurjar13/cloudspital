"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, verifyCredentials } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

// Login server action (used with useActionState on the login form).
export async function login(
  _prev: LoginState | undefined,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error:"Email and password are required." };
  }

  let ok = false;
  try {
    ok = verifyCredentials(email, password);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message:"Auth is not configured.",
    };
  }

  if (!ok) {
    return { error:"Invalid email or password." };
  }

  await createSession(email);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
