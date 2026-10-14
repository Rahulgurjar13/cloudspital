import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// The site's single call-to-action shape: a 12px-radius pill with a label on
// the left and an arrow tile on the right. On hover the label rolls up to a
// duplicate copy and the arrow nudges forward.

type Variant = "primary" | "light" | "dark" | "outline";

const VARIANTS: Record<Variant, { shell: string; tile: string }> = {
  primary: { shell: "bg-primary text-white", tile: "bg-white text-ink" },
  light: { shell: "bg-white text-ink", tile: "bg-primary text-white" },
  dark: { shell: "bg-ink text-white", tile: "bg-white text-ink" },
  outline: {
    shell: "border border-line bg-white text-ink",
    tile: "bg-ink text-white",
  },
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  /** Stretch to the container width with the label centred. */
  block?: boolean;
  className?: string;
}

type AsLink = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type AsButton = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowButton(props: AsLink | AsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    block = false,
    className = "",
    ...rest
  } = props;
  const v = VARIANTS[variant];
  // min-height (not fixed) so a long label can wrap on narrow screens.
  const height = size === "md" ? "min-h-[60px]" : "min-h-12";
  const tile = size === "md" ? "h-[52px] w-14" : "h-10 w-11";
  const text = size === "md" ? "t-lead" : "t-body";

  const shellCls = [
    "group inline-flex shrink-0 items-center rounded-xl p-1 pl-4 transition-colors duration-300",
    height,
    v.shell,
    block ? "w-full justify-between" : "gap-8 sm:gap-11",
    className,
  ].join(" ");

  const inner = (
    <>
      <span
        className={`relative block overflow-hidden py-1 ${text} ${block ? "flex-1 text-center" : "text-left"}`}
      >
        <span className="block transition-transform duration-500 ease-out-soft group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-soft group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center justify-center rounded-xl ${tile} ${v.tile}`}
      >
        <ArrowIcon className="h-5 w-5 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5" />
      </span>
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as Omit<AsLink, keyof BaseProps>;
    return (
      <Link href={href} className={shellCls} {...linkProps}>
        {inner}
      </Link>
    );
  }

  const { type, ...buttonProps } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button
      type={type ?? "button"}
      className={`${shellCls} cursor-pointer disabled:opacity-60`}
      {...buttonProps}
    >
      {inner}
    </button>
  );
}
