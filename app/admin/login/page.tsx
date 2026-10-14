import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { SITE } from "@/lib/constants";

export default async function AdminLoginPage() {
  // Already signed in? Skip straight to the dashboard.
  if (await isAuthenticated()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xl font-bold tracking-tight text-slate-900">
            {SITE.name}
          </p>
          <h1 className="mt-2 text-sm font-medium text-slate-500">
            Admin sign in
          </h1>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
