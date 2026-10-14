// Admin authentication (single operator).
//
// Credentials live in env (ADMIN_EMAIL / ADMIN_PASSWORD). On success we mint a
// signed, HttpOnly session cookie using jose (HS256). There is no user table —
// the cookie itself is the session (stateless), verified on every admin read.

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE="cloudspital_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds.

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or too short. Generate one with: openssl rand -base64 32",
    );
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  email: string;
}

// Validate a submitted email/password against the configured admin account.
export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL / ADMIN_PASSWORD are not set. Add them to .env.local.",
    );
  }
  // Trim + case-insensitive email; password compared exactly.
  return (
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase() &&
    password === adminPassword
  );
}

export async function createSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg:"HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}

// Returns the session payload if the cookie is present and valid, else null.
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  try {
    // secretKey() may throw if AUTH_SECRET is unset — treat that as "no
    // session" so public code paths never crash on a misconfigured env.
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getSession()) !== null;
}
