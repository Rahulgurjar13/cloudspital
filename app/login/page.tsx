import type { Metadata } from "next";

// App login (SOP Part A): external/separate app, noindex. Placed outside the
// (marketing) route group so it doesn't inherit the marketing layout.
export const metadata: Metadata = {
  title:"Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-5 py-20 text-center">
      <h1 className="t-h3 text-ink">Login</h1>
      <p className="mt-4 t-body text-muted">
        TODO: redirect to / embed the external application login.
      </p>
    </div>
  );
}
