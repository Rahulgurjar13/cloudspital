/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep canonicals consistent — every URL ends with a trailing slash (SOP B.4).
  trailingSlash: true,

  // Dev only: let a phone on the same Wi-Fi load the dev server's scripts
  // (Next blocks non-localhost origins by default). Update if the Mac's IP changes.
  allowedDevOrigins: ["10.12.52.94"],

  // Dev only: hide the Next.js badge (it covered the phone tab bar). Errors
  // still surface in the dev overlay.
  devIndicators: false,

  images: {
    // Serve modern formats; next/image handles the rest (SOP B.7).
    formats: ["image/avif", "image/webp"],
    // Admin-uploaded images are hosted on Cloudinary.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },

  // Full old -> new 301 map (SOP B.11 / Appendix C.4).
  async redirects() {
    return [
      { source: "/wall-of-love", destination: "/testimonials", permanent: true },
      // ...add one entry per changed URL as the old site is migrated...
    ];
  },

  // Security headers (SOP B.10 / Appendix C.4).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
