// One-time seed: load the existing static products into MongoDB so the dynamic
// dropdown, /products index and product detail pages work immediately.
//
// Run:  npm run seed:products
// (Loads .env.local via node --env-file; requires MONGODB_URI to be set.)

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "cloudspital";

if (!uri) {
  console.error("MONGODB_URI is not set. Add it to .env.local first.");
  process.exit(1);
}

// Mirrors PRODUCTS in lib/site-structure.ts.
const PRODUCTS = [
  { slug: "health-kiosk", name: "Cloudspital Point-of-Care Health Kiosk" },
  { slug: "medsync-iii-tele-icu-kiosk", name: "Medsync-III Tele-ICU Kiosk" },
  { slug: "medsync-iv-telemedicine-poct-cart", name: "Medsync-IV Telemedicine + POCT Cart" },
  { slug: "medsync-v-telemedicine-cart-icu", name: "Medsync-V Telemedicine Cart (ICU L1)" },
  { slug: "medsync-vi-telemedicine-poct-cart-icu", name: "Medsync-VI Telemedicine + POCT Cart (ICU)" },
  { slug: "medsync-ii-telemedicine-cart", name: "Medsync-II Telemedicine Cart" },
  { slug: "medsync-i-portable-telemedicine-bag", name: "Medsync-I Portable Telemedicine Bag" },
  { slug: "mobile-medical-unit", name: "Mobile Medical Unit" },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const col = client.db(dbName).collection("products");
  const now = new Date();

  let inserted = 0;
  let skipped = 0;
  for (const p of PRODUCTS) {
    const existing = await col.findOne({ slug: p.slug });
    if (existing) {
      skipped++;
      continue;
    }
    await col.insertOne({
      slug: p.slug,
      name: p.name,
      description: `${p.name} — edit this description in the admin panel.`,
      currency: "INR",
      published: true,
      createdAt: now,
      updatedAt: now,
    });
    inserted++;
  }

  console.log(`Seed complete. Inserted ${inserted}, skipped ${skipped} (already present).`);
} catch (err) {
  console.error("Seed failed:", err);
  process.exitCode = 1;
} finally {
  await client.close();
}
