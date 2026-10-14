import { redirect } from "next/navigation";
import { getSession, type SessionPayload } from "./auth";

// Server-side guard for mutations. Server Actions and Route Handlers are
// directly invocable, so every write re-checks the session rather than
// trusting the layout that rendered the form.
export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
