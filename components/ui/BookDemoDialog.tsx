"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitBookDemoRequest } from "@/app/(site)/contact/actions";
import { ArrowButton } from "@/components/ui/ArrowButton";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// GA4 / GTM event. Fired here because the dialog intercepts the click before
// any child handler can run.
function track(event: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

const FIELDS = [
  { name: "firstName", label: "First name", placeholder: "Rajesh", type: "text", half: true },
  { name: "lastName", label: "Last name", placeholder: "Kumar", type: "text", half: true },
  { name: "email", label: "Work email", placeholder: "rajesh@hospital.com", type: "email" },
  { name: "phone", label: "Phone number", placeholder: "+91 98765 43210", type: "tel" },
  { name: "company", label: "Organization", placeholder: "City Hospital", type: "text" },
] as const;

export function BookDemoDialog({
  children,
  className = "inline-block",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Phones get a bottom sheet; larger screens a centred dialog.
  const [asSheet, setAsSheet] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, mounted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
    };

    try {
      const res = await submitBookDemoRequest(data);
      if (res.success) {
        track("demo_request_submitted");
        setSent(true);
      } else {
        setError(res.error || "An error occurred. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const close = () => {
    setIsOpen(false);
    setSent(false);
    setError(null);
  };

  return (
    <>
      <div
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
          track("enquire_now_click");
          setAsSheet(window.matchMedia("(max-width: 639px)").matches);
          setIsOpen(true);
        }}
        className={`${className} cursor-pointer`}
      >
        {children}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {isOpen && (
                <div
                  className={`fixed inset-0 z-[100] flex justify-center ${asSheet ? "items-end" : "items-center p-3 sm:p-6"}`}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="book-demo-title"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                    className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
                  />

                  <motion.div
                    initial={asSheet ? { y: "100%" } : { opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={asSheet ? { y: 0 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={asSheet ? { y: "100%" } : { opacity: 0, y: 16 }}
                    transition={{ duration: asSheet ? 0.42 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      asSheet
                        ? "relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[28px] bg-canvas px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3"
                        : "relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-[28px] bg-canvas p-6 sm:p-10"
                    }
                  >
                    {asSheet ? <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-faint/70" aria-hidden="true" /> : null}
                    <button
                      onClick={close}
                      aria-label="Close"
                      className={`absolute flex cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-white active:scale-90 ${
                        asSheet ? "right-4 top-6 h-10 w-10 bg-white" : "right-5 top-5 h-11 w-11"
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>

                    <p className="t-label text-muted">[&nbsp;Book a demo&nbsp;]</p>

                    {sent ? (
                      <div className="pt-6">
                        <h2 id="book-demo-title" className="t-h3 text-ink">
                          Request received.
                        </h2>
                        <p className="mt-4 t-lead text-muted">
                          Thank you. Our team will contact you shortly to schedule your
                          Cloudspital demo.
                        </p>
                        <div className="mt-8">
                          <ArrowButton onClick={close}>Done</ArrowButton>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 id="book-demo-title" className="mt-4 t-h3 text-ink">
                          See Cloudspital in action
                        </h2>
                        <p className="mt-3 t-body text-muted">
                          Tell us about your facility or program and we&apos;ll arrange a live
                          walkthrough.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-2 gap-4">
                          {error && (
                            <p className="col-span-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 t-small text-ink">
                              {error}
                            </p>
                          )}
                          {FIELDS.map((f) => (
                            <label
                              key={f.name}
                              className={`flex flex-col gap-2 ${"half" in f && f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}`}
                            >
                              <span className="t-small text-ink">{f.label}*</span>
                              <input
                                name={f.name}
                                type={f.type}
                                required
                                placeholder={f.placeholder}
                                className="field"
                              />
                            </label>
                          ))}
                          <div className="col-span-2 pt-2">
                            <ArrowButton type="submit" block disabled={isSubmitting}>
                              {isSubmitting ? "Submitting…" : "Request demo"}
                            </ArrowButton>
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
