"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionLabel } from "@/components/ui/Section";
import { Phone, Shield, Fingerprint, Smile, FileText, Briefcase } from "@/components/icons";

const FEATURES = [
  { icon: Phone, title: "First Class Support" },
  { icon: Shield, title: "Secured High end advanced system" },
  { icon: Fingerprint, title: "Enable Pass TouchID" },
  { icon: Smile, title: "Error free" },
  { icon: FileText, title: "Risk Analysis And Report" },
  { icon: Briefcase, title: "HR Extensive" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Access statement with a benchmark bar chart and six capability tiles.
export function HealthcareAccess() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionLabel>Access</SectionLabel>
          <h2 className="mt-6 max-w-[1100px] t-h3 text-ink">
            Revolutionizing healthcare access through a simplified touch-interface
            for medication management, enabling seamless critical care bookings
            while eliminating travel, queues, wage losses, and complex registrations.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
          <Reveal className="rounded-[20px] bg-white p-6 sm:p-8 lg:col-span-5">
            <p className="t-small text-muted">Access index</p>
            {[
              { label: "Cloudspital", width: "85%", bar: "bg-primary" },
              { label: "Others", width: "60%", bar: "bg-faint" },
            ].map((b, i) => (
              <div key={b.label} className="mt-8">
                <div className="flex items-center justify-between t-body">
                  <span className={i === 0 ? "text-ink" : "text-muted"}>{b.label}</span>
                  <span className={i === 0 ? "text-primary" : "text-muted"}>{b.width}</span>
                </div>
                <div className="mt-3 h-12 overflow-hidden rounded-xl bg-mist">
                  <motion.div
                    className={`h-full rounded-xl ${b.bar}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: b.width }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.15 * i }}
                  />
                </div>
              </div>
            ))}
            <p className="mt-6 text-[12px] italic text-muted">Based on Niti Aayog.</p>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Item key={f.title} className="flex min-h-[160px] flex-col justify-between gap-6 rounded-[20px] bg-white p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="t-body text-ink">{f.title}</p>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
