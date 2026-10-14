import Link from "next/link";
import { SITE } from "@/lib/constants";
import { HUB_STRUCTURE } from "@/lib/site-structure";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton, ArrowIcon } from "@/components/ui/ArrowButton";

// Brand glyphs — this lucide build doesn't ship Instagram/LinkedIn, so inline them.
function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.96.51 3.78 1.4 5.36L2 22l4.9-1.5a9.9 9.9 0 0 0 5.14 1.43h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.69-1.42 1.32-1.95 1.36-.5.05-1.13.21-3.7-.79-3.12-1.23-5.1-4.4-5.26-4.6-.15-.21-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.59.28-.31.62-.39.82-.39h.59c.19 0 .44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.07.13.07.74-.17 1.43z" />
    </svg>
  );
}

const PRODUCT_LINKS = [
  { href: "/products/health-kiosk/", label: "Health Kiosk" },
  { href: "/products/medsync-iii-tele-icu-kiosk/", label: "Medsync III Tele ICU" },
  { href: "/products/medsync-iv-telemedicine-poct-cart/", label: "Telemedicine + POCT Cart" },
  { href: "/products/compare/", label: "Compare Arc models" },
  { href: "/tests/", label: "Test catalog" },
  { href: "/products/", label: "All products" },
];

const COMPANY_LINKS = [
  { href: "/about-us/", label: "About Us" },
  { href: "/impact/", label: "Impact" },
  { href: "/partner/", label: "Partner with us" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/press/", label: "Press" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

function LinkColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="t-small uppercase text-white/60">{title}</h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="t-h6 text-white transition-opacity hover:opacity-70">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const wa = `https://wa.me/${SITE.whatsapp}`;
  const { office, factory } = SITE.address;

  return (
    <footer className="overflow-hidden bg-primary pb-[calc(92px+env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-[60px] lg:pt-[100px]">
        {/* Top: statement + CTA, link columns */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-start gap-8 lg:col-span-5">
            <p className="t-h4 max-w-[520px] text-white">
              Bring quality care closer to people.
            </p>
            <p className="max-w-[440px] t-body text-white/75">{SITE.description}</p>
            <BookDemoDialog>
              <ArrowButton href="/contact/" variant="light">
                Book a demo
              </ArrowButton>
            </BookDemoDialog>
            <div className="flex items-center gap-3">
              {[
                { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: SITE.social.instagram, label: "Instagram", Icon: Instagram },
                { href: wa, label: "WhatsApp", Icon: WhatsAppGlyph },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Cloudspital on ${label}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary transition-transform hover:scale-105"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <LinkColumn
              title="Solutions"
              links={HUB_STRUCTURE.map((h) => ({ href: `/${h.slug}/`, label: h.title }))}
            />
            <LinkColumn title="Products" links={PRODUCT_LINKS} />
            <LinkColumn title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        {/* NAP (kept consistent with LocalBusiness schema) */}
        <address className="mt-16 grid gap-8 border-t border-white/25 pt-10 not-italic sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="t-small uppercase text-white/60">Office</p>
            <p className="mt-2 t-body text-white/90">
              {office.street}, {office.locality}, {office.region} – {office.postalCode}
            </p>
          </div>
          <div>
            <p className="t-small uppercase text-white/60">Factory</p>
            <p className="mt-2 t-body text-white/90">
              {factory.street}, {factory.locality}, {factory.region} – {factory.postalCode}, India
            </p>
          </div>
          <div>
            <p className="t-small uppercase text-white/60">Call</p>
            <p className="mt-2 flex flex-col t-body text-white/90">
              <a href={`tel:${SITE.phone}`} className="hover:text-white">+91 75420 11187</a>
              <a href={`tel:${SITE.phone2}`} className="hover:text-white">+91 62073 76706</a>
            </p>
          </div>
          <div>
            <p className="t-small uppercase text-white/60">Write</p>
            <p className="mt-2 flex flex-col t-body text-white/90">
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white">
                WhatsApp us <ArrowIcon className="h-4 w-4 -rotate-45" />
              </a>
            </p>
          </div>
        </address>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="mt-16 select-none whitespace-nowrap text-center font-bold uppercase leading-[0.8] tracking-[-0.07em] text-white text-[14vw] lg:mt-20 min-[1500px]:text-[210px]"
        >
          Cloudspital
        </p>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/25 py-8 t-small text-white/80 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy/" className="hover:text-white">Privacy</Link>
            <Link href="/terms/" className="hover:text-white">Terms</Link>
          </div>
          <p>
            Made by{" "}
            <a href="https://inventoapps.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70">
              Invento Apps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
