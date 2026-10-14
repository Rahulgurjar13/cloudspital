"use client";

import { SITE } from "@/lib/constants";

const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi, I'd like to know more about Cloudspital.")}`;
const callUrl = `tel:${SITE.phone}`;

// Quick-contact buttons pinned bottom-right on desktop. On phones/tablets the
// header and the tab bar's More sheet carry call and WhatsApp instead.
export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-2.5 lg:flex">
      <a
        href={callUrl}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_28px_-10px_rgba(15,23,42,0.55)] ring-2 ring-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgba(15,23,42,0.55)] ring-2 ring-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.96.51 3.78 1.4 5.36L2 22l4.9-1.5a9.9 9.9 0 0 0 5.14 1.43h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.69-1.42 1.32-1.95 1.36-.5.05-1.13.21-3.7-.79-3.12-1.23-5.1-4.4-5.26-4.6-.15-.21-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.59.28-.31.62-.39.82-.39h.59c.19 0 .44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.07.13.07.74-.17 1.43z" />
        </svg>
      </a>
    </div>
  );
}
