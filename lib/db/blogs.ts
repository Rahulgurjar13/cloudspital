// Blog posts collection.

import { type ObjectId } from "mongodb";
import { getDb, isDbConfigured } from "./mongodb";
import { serialize, toId, type WithId } from "./serialize";

export interface BlogDoc {
  _id: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // Markdown / plain text authored in the admin.
  coverImage?: string;
  author: string;
  tags: string[];
  seoTitle?: string;
  metaDescription?: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type Blog = WithId<Omit<BlogDoc, "_id">>;

export interface BlogInput {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  author: string;
  tags: string[];
  seoTitle?: string;
  metaDescription?: string;
  published: boolean;
}

const COLLECTION="blogs";

async function collection() {
  return (await getDb()).collection<BlogDoc>(COLLECTION);
}

export async function listBlogs(publishedOnly = true): Promise<Blog[]> {
  if (!isDbConfigured) return [];
  try {
    const col = await collection();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await col.find(filter).sort({ publishedAt: -1 }).toArray();
    return docs.map(serialize);
  } catch (error) {
    console.warn("MongoDB connection failed in listBlogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!isDbConfigured) return null;
  try {
    const col = await collection();
    const doc = await col.findOne({ slug });
    return doc ? serialize(doc) : null;
  } catch (error) {
    console.warn("MongoDB connection failed in getBlogBySlug:", error);
    return null;
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  if (!isDbConfigured) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: toId(id) });
  return doc ? serialize(doc) : null;
}

export async function createBlog(input: BlogInput): Promise<string> {
  const col = await collection();
  const now = new Date();
  const res = await col.insertOne({
    ...input,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  } as BlogDoc);
  return res.insertedId.toHexString();
}

export async function updateBlog(id: string, input: BlogInput): Promise<void> {
  const col = await collection();
  await col.updateOne(
    { _id: toId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
}

export async function deleteBlog(id: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ _id: toId(id) });
}
