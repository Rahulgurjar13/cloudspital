import type { Metadata } from "next";

// Admin shell. Deliberately separate from the marketing (site) layout — no
// public Header/Footer here. Always kept out of search results.
export const metadata: Metadata = {
  title:"Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-slate-50 text-slate-900">{children}</div>;
}
