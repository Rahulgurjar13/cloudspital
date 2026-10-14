// Inline SVG icons (server components, zero client JS). Use currentColor so
// they inherit text colour. Sized via className (default h-6 w-6).
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function HeartPulse({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M3.5 12h3l2-5 3 9 2.5-6 1.5 2h5" />
      <path d="M20.8 8.6A5.5 5.5 0 0 0 12 6.5 5.5 5.5 0 0 0 3.4 9.9" opacity={0.4} />
    </svg>
  );
}

export function Kiosk({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <rect x="5" y="3" width="14" height="14" rx="2" />
      <path d="M8 7h8M8 10h5" />
      <path d="M10 17v3M14 17v3M8 20h8" />
    </svg>
  );
}

export function Stethoscope({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M10 16a5 5 0 0 0 10 0v-2" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

export function Building({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 21v-5h6v5M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

export function Ambulance({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M2 16V8h11v8M13 11h5l3 3v2h-3" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
      <path d="M6.5 5.5v3M5 7h3" />
    </svg>
  );
}

export function Database({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

export function Shield({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12 3l8 3v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function Cpu({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}

export function Clock({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Users({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M21 20a6 6 0 0 0-4-5.6" />
    </svg>
  );
}

export function MapPin({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Phone({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M4 5c0 9 6 15 15 15 1 0 2-1 2-2v-2.5l-4-1.5-1.5 2A11 11 0 0 1 9 11l2-1.5L9.5 5.5 7 5C5.5 5 4 5 4 5z" />
    </svg>
  );
}

export function WhatsApp({ className = "h-6 w-6", ...p }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.96.51 3.78 1.4 5.36L2 22l4.9-1.5a9.9 9.9 0 0 0 5.14 1.43h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.69-1.42 1.32-1.95 1.36-.5.05-1.13.21-3.7-.79-3.12-1.23-5.1-4.4-5.26-4.6-.15-.21-1.26-1.68-1.26-3.2 0-1.53.8-2.28 1.08-2.59.28-.31.62-.39.82-.39h.59c.19 0 .44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.32.02.53-.1.21-.15.32-.3.5-.15.18-.32.4-.46.53-.15.15-.31.32-.13.62.18.31.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.47 1.52.31.15.49.13.67-.08.18-.21.77-.9.98-1.21.21-.31.41-.26.69-.15.28.1 1.79.84 2.1.99.31.15.51.23.59.36.07.13.07.74-.17 1.43z" />
    </svg>
  );
}

export function ArrowRight({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}


export function Check({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function Sparkles({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5 10.2 7.7z" />
      <path d="M19 14l.8 2 .2.8M5 4l.6 1.6" />
    </svg>
  );
}

export function Activity({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function Baby({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10Z" />
    </svg>
  );
}

export function PiggyBank({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11h.01" />
    </svg>
  );
}

export function Fingerprint({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  );
}

export function Smile({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

export function FileText({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

export function Briefcase({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function Laptop({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

export function Settings({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function FirstAid({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <path d="M12 2v20M2 12h20M12 12" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  );
}

export function Search({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function Play({ className = "h-5 w-5", ...p }: IconProps) {
  return (
    <svg {...base} className={className} {...p}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

