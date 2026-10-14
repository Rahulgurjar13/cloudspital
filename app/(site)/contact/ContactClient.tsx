"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  WhatsApp,
  MapPin,
  Clock,
  Check,
  Building,
} from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { submitDemoRequest } from "./actions";

interface ContactClientProps {
  status?: string;
}

const cardCls = "rounded-[20px] bg-white p-6 sm:p-8";
const tileCls = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-primary";
const copyCls =
  "cursor-pointer rounded-lg border border-line px-2.5 py-1 t-small text-ink transition-colors hover:bg-mist";
const contactLinkCls = "t-h6 text-ink transition-colors hover:text-primary";

function AlertIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </span>
  );
}

export function ContactClient({ status }: ContactClientProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic IST (India Standard Time) check for business status
  useEffect(() => {
    const checkStatus = () => {
      const d = new Date();
      // Convert to UTC
      const utc = d.getTime() + d.getTimezoneOffset() * 60000;
      // Convert UTC to IST (UTC + 5:30)
      const istTime = new Date(utc + 3600000 * 5.5);
      const day = istTime.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hour = istTime.getHours();

      // Open Mon-Sat, 9:00 AM to 6:00 PM (9 to 18)
      if (day >= 1 && day <= 6 && hour >= 9 && hour < 18) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await submitDemoRequest(formData);
      } catch (err: unknown) {
        // Next.js redirect throws an error, which is caught here if it navigates.
        // If it was a redirect, the page will reload with the status param.
        // If it was a real execution error, we show it.
        const message = (err as { message?: string } | null)?.message;
        if (message && message.includes("NEXT_REDIRECT")) {
          // Normal Next.js redirect behavior, ignore
          return;
        }
        setErrorMessage("An error occurred during submission. Please try again.");
      }
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="Connect With Our Team"
              title={
                <>
                  Let&apos;s build the <span className="text-primary">future of healthcare</span> together
                </>
              }
              description="Have questions about our AIIMS-co-developed Health ATMs, Tele-ICU, or Telemedicine kiosks? Reach out today for inquiries or custom deployment quotes."
            />
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          {/* Dynamic Submission Toast Status */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                role="alert"
                className="mb-4 flex items-start gap-4 rounded-[20px] border border-accent/30 bg-white p-5 sm:p-6"
              >
                <AlertIcon />
                <div>
                  <h3 className="t-body text-ink">Submission Error</h3>
                  <p className="mt-1 t-small text-muted">Please ensure all required fields are filled out correctly and consent is checked.</p>
                </div>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                role="alert"
                className="mb-4 flex items-start gap-4 rounded-[20px] border border-accent/30 bg-white p-5 sm:p-6"
              >
                <AlertIcon />
                <div>
                  <h3 className="t-body text-ink">Error</h3>
                  <p className="mt-1 t-small text-muted">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2-Column Split Grid */}
          <div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-5">
            {/* Left Column: Direct Contacts */}
            <Reveal className="space-y-3 lg:col-span-5 lg:space-y-4">
              {/* Live Status indicator */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-mist p-5 sm:px-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="t-small uppercase text-muted">Business Status</h4>
                    <p className="t-body text-ink">Mon - Sat (9:00 AM - 6:00 PM IST)</p>
                  </div>
                </div>
                {isOpenNow !== null && (
                  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 t-small text-ink">
                    {isOpenNow ? (
                      <>
                        <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                        Open Now
                      </>
                    ) : (
                      <>
                        <span className="inline-block h-2 w-2 rounded-full bg-faint" />
                        Support Offline
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* WhatsApp Contact Card */}
              <div className={cardCls}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className={tileCls}>
                    <WhatsApp className="h-5 w-5" />
                  </span>
                  <div className="flex flex-1 flex-col items-start">
                    <h3 className="t-h5 text-ink">Chat on WhatsApp</h3>
                    <p className="mt-2 t-body text-muted">
                      Connect instantly with our team for brochure downloads, quote requests, or immediate product consultations.
                    </p>
                    <ArrowButton
                      href="https://wa.me/917542011187"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="mt-6 whitespace-nowrap"
                    >
                      Start WhatsApp Chat
                    </ArrowButton>
                  </div>
                </div>
              </div>

              {/* Call Direct Card */}
              <div className={cardCls}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className={tileCls}>
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="t-h5 text-ink">Call Us Directly</h3>
                      <button
                        type="button"
                        onClick={() => copyToClipboard("+917542011187", "phone")}
                        className={copyCls}
                      >
                        {copiedText === "phone" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="mt-2 t-body text-muted">
                      Have an urgent query or public health kiosk deployment requirement? Give us a direct call.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <a href="tel:+917542011187" className={contactLinkCls}>
                        +91 75420 11187
                      </a>
                      <span aria-hidden="true" className="hidden text-faint sm:inline">|</span>
                      <a href="tel:+916207376706" className={contactLinkCls}>
                        +91 62073 76706
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Contact Card */}
              <div className={cardCls}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className={tileCls}>
                    <Building className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="t-h5 text-ink">Official Inquiries</h3>
                    <p className="mt-2 t-body text-muted">
                      For corporate proposals, partnerships, government tenders, or careers, write to us.
                    </p>

                    <div className="mt-5 border-t border-line pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="t-small uppercase text-muted">Product Enquiry</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("info@cloudspital.ai", "product-email")}
                          className={copyCls}
                        >
                          {copiedText === "product-email" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <a href="mailto:info@cloudspital.ai" className={`mt-1 inline-block break-all ${contactLinkCls}`}>
                        info@cloudspital.ai
                      </a>
                    </div>

                    <div className="mt-4 border-t border-line pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="t-small uppercase text-muted">Founder Connect</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("shubham@cloudspital.ai", "founder-email")}
                          className={copyCls}
                        >
                          {copiedText === "founder-email" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <a href="mailto:shubham@cloudspital.ai" className={`mt-1 inline-block break-all ${contactLinkCls}`}>
                        shubham@cloudspital.ai
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office & Factory Address Card */}
              <div className={cardCls}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className={tileCls}>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="t-h5 text-ink">Visit Us</h3>
                    <div className="mt-4 space-y-4">
                      <div className="border-t border-line pt-4">
                        <p className="t-small uppercase text-muted">Office Address</p>
                        <p className="mt-1 t-body text-ink">
                          UG-04, Tower 4, NX One, Noida Extension,<br />
                          Greater Noida West, Uttar Pradesh – 201318
                        </p>
                      </div>
                      <div className="border-t border-line pt-4">
                        <p className="t-small uppercase text-muted">Factory Address</p>
                        <p className="mt-1 t-body text-ink">
                          Plot No. K-138, Kasna Industrial Area, Surajpur Site V,<br />
                          Greater Noida, Uttar Pradesh – 201312, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right Column: Demo Form or Success Block */}
            <Reveal delay={0.1} className="lg:sticky lg:top-6 lg:col-span-7">
              <div className="rounded-[20px] bg-white p-6 sm:p-10 lg:p-12">
                {/* Form title */}
                <div className="mb-8 border-b border-line pb-6">
                  <h2 className="t-h4 text-ink">Request a Demo or Quote</h2>
                  <p className="mt-2 t-body text-muted">Complete the form below. We usually reply with custom proposals within 24 hours.</p>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-start rounded-[20px] bg-mist p-6 sm:p-10"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-6 w-6" />
                      </span>
                      <h3 className="mt-6 t-h4 text-ink">Request Received!</h3>
                      <p className="mt-3 max-w-md t-lead text-muted">
                        Thank you for contacting Cloudspital. Our healthcare product specialists have received your inquiry and will contact you shortly.
                      </p>
                      <ArrowButton href="/" variant="dark" className="mt-8">
                        Return Home
                      </ArrowButton>
                    </motion.div>
                  ) : (
                    <form key="form" onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="t-small text-ink">Full Name *</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="e.g. Dr. Rajesh Kumar"
                            className="field"
                          />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="t-small text-ink">Email *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="e.g. rajesh@hospital.com"
                            className="field"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Phone Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="phone" className="t-small text-ink">Phone Number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="e.g. +91 98765 43210"
                            className="field"
                          />
                        </div>

                        {/* Organization Input */}
                        <div className="flex flex-col gap-2">
                          <label htmlFor="organization" className="t-small text-ink">Organization Name</label>
                          <input
                            id="organization"
                            name="organization"
                            type="text"
                            placeholder="e.g. Apollo Hospitals"
                            className="field"
                          />
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="t-small text-ink">Message / Inquiry Details</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Please details your requirement (e.g., number of Health ATMs required, location, customization needs...)"
                          className="field min-h-[120px] resize-y"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="pt-1">
                        <label className="flex cursor-pointer select-none items-start gap-3">
                          <input
                            type="checkbox"
                            name="consent"
                            required
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                          />
                          <span className="t-small text-muted">
                            I consent to Cloudspital processing my details in accordance with the Digital Personal Data Protection (DPDP) Act and the company privacy policy. *
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <ArrowButton type="submit" block disabled={isPending}>
                          {isPending ? "Submitting..." : "Submit Request"}
                        </ArrowButton>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
