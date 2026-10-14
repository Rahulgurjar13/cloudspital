import Image from "next/image";
import type { ReactNode } from "react";
import { Activity, Briefcase, HeartPulse, Truck } from "lucide-react";

// Media for a product card or hero. Shared by the products index (client) and
// the product detail view (server), so it stays hook-free.
//
// The owner does not want AI-generated renders on the site. Several fallback /
// CMS products point at generated 1024px PNGs; those paths are filtered here
// (view layer only — the data is untouched). When the product is literally
// the same as one of our real cutouts we show that instead, otherwise a calm
// typographic card. Remote CMS images (e.g. Cloudinary) render normally.

const BANNED_IMAGE_PATTERNS = [
  /^\/images\/products\/medsync-[^/]*\.png$/i,
  /^\/images\/products\/health-kiosk\.png$/i,
  /^\/images\/products\/mobile-medical-unit\.png$/i,
  /^\/images\/about_health_kiosk\.png$/i,
];

/** Real product cutouts, keyed by the banned render they replace … */
const CUTOUT_BY_PATH: Record<string, string> = {
  "/images/products/health-kiosk.png": "/images/products/cloudspital-health-atm-kiosk.webp",
  "/images/products/mobile-medical-unit.png": "/images/products/cloudspital-mobile-medical-unit.webp",
};

/** … and by slug, for products that are the same physical unit. */
const CUTOUT_BY_SLUG: Record<string, string> = {
  "health-kiosk": "/images/products/cloudspital-health-atm-kiosk.webp",
  "mobile-medical-unit": "/images/products/cloudspital-mobile-medical-unit.webp",
};

/** Path part of a local or same-site URL, without query or hash. */
function localPath(src: string) {
  return src.replace(/^https?:\/\/(www\.)?cloudspital\.com/i, "").split(/[?#]/)[0];
}

export function isBannedProductImage(src: string) {
  const path = localPath(src);
  return BANNED_IMAGE_PATTERNS.some((re) => re.test(path));
}

/** The image to actually render for a product, or null for the typographic card. */
export function resolveProductImage(image: string | undefined, slug: string): string | null {
  if (image && !isBannedProductImage(image)) return image;
  const fromPath = image ? CUTOUT_BY_PATH[localPath(image).toLowerCase()] : undefined;
  return fromPath ?? CUTOUT_BY_SLUG[slug] ?? null;
}

const CATEGORY_ICONS = {
  "Health Kiosks": HeartPulse,
  "Telemedicine Carts": Activity,
  "Portable Kits": Briefcase,
  "Mobile Units": Truck,
} as const;

export function CategoryIcon({ category, className = "h-5 w-5" }: { category?: string; className?: string }) {
  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] ?? Activity;
  return <Icon className={className} aria-hidden="true" />;
}

/** "Medsync III Tele ICU Kiosk" → { code: "Medsync III", rest: "Tele ICU Kiosk" }. */
function splitModelName(name: string) {
  const m = name.match(/^(medsync[\s-]+[ivx]+)\b[\s-]*(.*)$/i);
  return m ? { code: m[1], rest: m[2] } : { code: name, rest: "" };
}

export function ProductMedia({
  image,
  slug,
  name,
  category,
  sizes,
  priority = false,
  large = false,
  surface = "white",
  className = "",
  children,
}: {
  image?: string;
  slug: string;
  name: string;
  category?: string;
  sizes: string;
  priority?: boolean;
  /** Hero size: bigger type and padding. */
  large?: boolean;
  /** Card fill — use "canvas" when the card sits on a white band. */
  surface?: "white" | "canvas";
  /** Sizing for the frame (aspect ratio or height). */
  className?: string;
  /** Overlays (chips) positioned by the caller. */
  children?: ReactNode;
}) {
  const src = resolveProductImage(image, slug);
  const { code, rest } = splitModelName(name);

  return (
    <div className={`relative overflow-hidden rounded-[20px] ${surface === "canvas" ? "bg-canvas" : "bg-white"} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain ${large ? "p-8 sm:p-12" : "p-6 sm:p-8"}`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`absolute inset-0 flex flex-col justify-end ${large ? "p-6 sm:p-10" : "p-6 sm:p-7"}`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-primary">
            <CategoryIcon category={category} />
          </span>
          <p className={`mt-6 text-ink ${large ? "t-h2" : "t-h3"}`}>{code}</p>
          {rest ? <p className={`mt-2 text-muted ${large ? "t-lead" : "t-small"}`}>{rest}</p> : null}
        </div>
      )}
      {children}
    </div>
  );
}
