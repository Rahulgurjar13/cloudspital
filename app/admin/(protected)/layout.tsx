import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar email={session.email} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden relative z-10 flex flex-col">
        <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
