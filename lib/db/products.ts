// Products collection — the dynamic source for the products dropdown,
// the /products index and product detail pages.

import { type ObjectId } from "mongodb";
import { getDb, isDbConfigured } from "./mongodb";
import { serialize, toId, type WithId } from "./serialize";

export interface ProductDoc {
  _id: ObjectId;
  slug: string;
  name: string;
  seoTitle?: string;
  metaDescription?: string;
  description: string;
  body?: string;
  priceFrom?: number;
  currency?: string;
  image?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Product = WithId<Omit<ProductDoc, "_id">>;

// What the admin form submits. Dates / id / slug are managed server-side.
export interface ProductInput {
  slug: string;
  name: string;
  seoTitle?: string;
  metaDescription?: string;
  description: string;
  body?: string;
  priceFrom?: number;
  currency?: string;
  image?: string;
  published: boolean;
}

const COLLECTION="products";

async function collection() {
  return (await getDb()).collection<ProductDoc>(COLLECTION);
}

// `publishedOnly` is the default for public reads; the admin passes false.
export async function listProducts(publishedOnly = true): Promise<Product[]> {
  if (!isDbConfigured) return [];
  try {
    const col = await collection();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await col.find(filter).sort({ createdAt: -1 }).toArray();
    return docs.map(serialize);
  } catch (error) {
    console.warn("MongoDB connection failed in listProducts:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isDbConfigured) return null;
  try {
    const col = await collection();
    const doc = await col.findOne({ slug });
    return doc ? serialize(doc) : null;
  } catch (error) {
    console.warn("MongoDB connection failed in getProductBySlug:", error);
    return null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isDbConfigured) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: toId(id) });
  return doc ? serialize(doc) : null;
}

export async function createProduct(input: ProductInput): Promise<string> {
  const col = await collection();
  const now = new Date();
  const res = await col.insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  } as ProductDoc);
  return res.insertedId.toHexString();
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<void> {
  const col = await collection();
  await col.updateOne(
    { _id: toId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
}

export async function deleteProduct(id: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ _id: toId(id) });
}

// Used by the navbar to detect duplicate slugs without loading every field.
export async function slugExists(
  slug: string,
  exceptId?: string,
): Promise<boolean> {
  const col = await collection();
  const doc = await col.findOne({ slug }, { projection: { _id: 1 } });
  if (!doc) return false;
  return exceptId ? doc._id.toHexString() !== exceptId : true;
}
