// Shared marketing layout (SOP B.3 route group). Pages are full width: each
// section sets its own column with <Container> (or a reading-width wrapper),
// so bands and inset panels can run edge to edge without bleed hacks. The
// global Header/Footer live in the (site) layout.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
