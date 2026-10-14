import { ObjectId } from "mongodb";

// Mongo documents carry an ObjectId `_id` and Date fields that cannot cross
// the server/client boundary as-is. Normalise every document to a plain
// `id: string` plus ISO date strings before it leaves the data layer.

// `serialize` turns Date fields into ISO strings at runtime; mirror that in
// the type so consumers see `string`, not `Date`, across the RSC boundary.
export type Serialized<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export type WithId<T> = Serialized<T> & { id: string };

export function toId(id: string): ObjectId {
  return ObjectId.createFromHexString(id);
}

export function isValidId(id: string): boolean {
  return ObjectId.isValid(id);
}

// Convert a raw Mongo document into a serialisable plain object.
export function serialize<T extends { _id: ObjectId }>(
  doc: T,
): WithId<Omit<T, "_id">> {
  const { _id, ...rest } = doc;
  const out: Record<string, unknown> = { id: _id.toHexString() };
  for (const [key, value] of Object.entries(rest)) {
    out[key] = value instanceof Date ? value.toISOString() : value;
  }
  return out as WithId<Omit<T, "_id">>;
}

// Turn an arbitrary title into a URL-safe slug.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
