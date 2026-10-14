import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

// Web app manifest — lets visitors "Add to Home Screen" and open the site as a
// full-screen app with its own icon and splash colour.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#f9f9f9",
    categories: ["medical", "health", "business"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Book a demo", url: "/contact/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Test catalog", url: "/tests/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Products", url: "/products/", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
