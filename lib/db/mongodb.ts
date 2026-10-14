// MongoDB connection (single source of truth).
//
// Reuses one MongoClient across hot reloads in dev (Next.js re-evaluates
// modules on every change) and across lambda invocations in prod, so we
// never exhaust the connection pool.

import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "cloudspital";

// Whether a connection string is configured at all. The public site must
// keep rendering (from static fallbacks) even before Mongo is wired up.
export const isDbConfigured = Boolean(uri);

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local — see .env.example.",
    );
  }

  // Cache the promise on globalThis so HMR doesn't open a new pool each reload.
  const globalForMongo = globalThis as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo._mongoClientPromise) {
      globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
    }
    return globalForMongo._mongoClientPromise;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
