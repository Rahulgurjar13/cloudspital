"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { BookDemoDialog } from "@/components/ui/BookDemoDialog";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { COMPANY_LINKS, SOLUTION_HUBS, CALL_URL, WHATSAPP_URL } from "./nav-data";
import { SolutionsMenu, ProductsMenu, ResourcesMenu, CompanyMenu, MenuFooter } from "./MegaMenu";
// Trimmed copy of cloudspital-new.webp (no empty margin) so the mark reads at header size.
import cloudspitalLogo from "@/public/cloudspital-logo.png";

type MenuKey = "solutions" | "products" | "resources" | "company";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Navbar({
  products,
}: {
  products: { slug: string; name: string }[];
}) {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // App-style header on phones/tablets: slides away while reading, returns on scroll up.
  const [tucked, setTucked] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Remember whether the visitor has navigated inside the site, so the mobile
  // back button can go back in history instead of leaving the site. Adjusted
  // during render when the route changes (no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  const [inAppHistory, setInAppHistory] = useState(false);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setInAppHistory(true);
    setTucked(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastY + 6 && y > 120) setTucked(true);
      else if (y < lastY - 6 || y < 120) setTucked(false);
      lastY = y;
    };
    onScroll();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isHome = pathname === "/";
  const goBack = () => {
    if (inAppHistory) router.back();
    else router.push(pathname.replace(/[^/]+\/?$/, "") || "/");
  };

  const closeAll = () => setOpen(null);

  const solutionHubs = SOLUTION_HUBS;

  const isActive = (key: MenuKey) => {
    if (key === "solutions") return solutionHubs.some((h) => pathname.startsWith(`/${h.slug}`));
    if (key === "products") return pathname.startsWith("/products");
    if (key === "resources") return pathname.startsWith("/resources") || pathname.startsWith("/blog");
    return COMPANY_LINKS.some((l) => pathname === l.href);
  };

  const trigger = (key: MenuKey, label: string) => (
    <button
      type="button"
      aria-expanded={open === key}
      onClick={() => setOpen((cur) => (cur === key ? null : key))}
      className={`flex cursor-pointer items-center gap-1.5 py-2 t-body transition-colors hover:text-primary xl:t-lead ${
        isActive(key) || open === key ? "text-primary" : "text-ink"
      }`}
    >
      {label}
      <Chevron open={open === key} />
    </button>
  );

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-[background-color,transform] duration-300 ease-out-soft ${
        open ? "bg-canvas" : scrolled ? "bg-canvas/90 backdrop-blur-md" : "bg-canvas"
      } border-b ${scrolled || open ? "border-line" : "border-transparent"} ${tucked && !open ? "max-lg:-translate-y-full" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-8 lg:h-[100px] lg:gap-6 lg:px-[60px]">
        <div className="flex min-w-0 items-center gap-2">
          {!isHome && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              className="-ml-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-transform active:scale-90 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <Link href="/" onClick={closeAll} className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
            <Image
              src={cloudspitalLogo}
              alt={`${SITE.name} logo`}
              priority
              className="h-[42px] w-auto lg:h-[62px]"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-10">
            <li>{trigger("solutions", "Solutions")}</li>
            <li>{trigger("products", "Products")}</li>
            <li>
              <Link
                href="/tests/"
                onClick={closeAll}
                className={`py-2 t-body transition-colors hover:text-primary xl:t-lead ${
                  pathname.startsWith("/tests") ? "text-primary" : "text-ink"
                }`}
              >
                Tests
              </Link>
            </li>
            <li>
              <Link
                href="/partner/"
                onClick={closeAll}
                className={`py-2 t-body transition-colors hover:text-primary xl:t-lead ${
                  pathname.startsWith("/partner") ? "text-primary" : "text-ink"
                }`}
              >
                Partner
              </Link>
            </li>
            <li>{trigger("resources", "Resources")}</li>
            <li>{trigger("company", "Company")}</li>
          </ul>
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          {/* Phone/tablet quick contact — the tab bar carries navigation */}
          <a
            href={CALL_URL}
            aria-label={`Call ${SITE.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-transform active:scale-90 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" />
            </svg>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform active:scale-90 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.96.51 3.78 1.4 5.36L2 22l4.9-1.5a9.9 9.9 0 0 0 5.14 1.43h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.69-1.42 1.32-1.95 1.36-.5.05-1.13.21-3.7-.79-3.12-1.23-5.1-4.4-5.26-4.6-.15-.21-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.59.28-.31.62-.39.82-.39h.59c.19 0 .44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.07.13.07.74-.17 1.43z" />
            </svg>
          </a>
          <div className="hidden lg:block">
            <BookDemoDialog>
              <ArrowButton href="/contact/" onClick={closeAll} className="whitespace-nowrap">
                Book a demo
              </ArrowButton>
            </BookDemoDialog>
          </div>
        </div>
      </div>

      {/* Dim the page behind an open menu so the panel reads as a layer above it */}
      {open && (
        <div
          aria-hidden="true"
          onClick={closeAll}
          className="fixed inset-x-0 bottom-0 top-[100px] -z-10 hidden bg-ink/25 backdrop-blur-[2px] lg:block"
        />
      )}

      {/* Desktop dropdown panels */}
      {open && (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          <div className="mx-auto max-w-[1440px] px-[60px]">
            <motion.div
              key={open}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.45)]"
            >
              <div className="p-8">
                {open === "solutions" && <SolutionsMenu pathname={pathname} onNavigate={closeAll} />}
                {open === "products" && <ProductsMenu pathname={pathname} onNavigate={closeAll} products={products} />}
                {open === "resources" && <ResourcesMenu pathname={pathname} onNavigate={closeAll} />}
                {open === "company" && <CompanyMenu pathname={pathname} onNavigate={closeAll} />}
              </div>
              <MenuFooter />
            </motion.div>
          </div>
        </div>
      )}

    </header>
  );
}
