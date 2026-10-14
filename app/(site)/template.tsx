// Re-mounted on every navigation (unlike the layout), so each page gets a
// short app-style screen transition. The animation ends on `transform: none`
// so sticky/fixed elements inside pages behave normally afterwards.
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
