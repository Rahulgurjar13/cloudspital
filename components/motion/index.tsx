"use client";

// Reusable framer-motion primitives for scroll-triggered, staggered reveals.
// Server-rendered sections compose these around their content. All entrances
// fire once when the element scrolls into view and respect reduced-motion.
import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];

const VIEWPORT = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Shared item variants — used by children inside a <Stagger> group.
    Content resolves from a soft blur, the signature entrance of the design. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Single reveal — fades in from a blur and slides into place.        */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger group — orchestrates children that carry item variants.    */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A staggered child (plain block). Place inside <Stagger>. */
export function Item({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* A staggered child that is itself a Next.js <Link>. Keeps hover effects
   working (no extra wrapper) while participating in the stagger. */
const MLink = motion.create(Link);

export function ItemLink({
  children,
  className,
  href,
  style,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  style?: React.CSSProperties;
}) {
  return (
    <MLink href={href} className={className} style={style} variants={itemVariants}>
      {children}
    </MLink>
  );
}

/* ------------------------------------------------------------------ */
/* Hover-lift wrapper for cards that need a spring on hover.          */
/* ------------------------------------------------------------------ */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
