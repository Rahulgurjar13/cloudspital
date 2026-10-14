// Case studies collection.

import { type ObjectId } from "mongodb";
import { getDb, isDbConfigured } from "./mongodb";
import { serialize, toId, type WithId } from "./serialize";

export interface CaseStudyDoc {
  _id: ObjectId;
  slug: string;
  title: string;
  client?: string;
  summary: string;
  body: string;
  coverImage?: string;
  results: string[]; // Short outcome bullets, e.g. "40% faster triage".
  seoTitle?: string;
  metaDescription?: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CaseStudy = WithId<Omit<CaseStudyDoc, "_id">>;

export interface CaseStudyInput {
  slug: string;
  title: string;
  client?: string;
  summary: string;
  body: string;
  coverImage?: string;
  results: string[];
  seoTitle?: string;
  metaDescription?: string;
  published: boolean;
}

const COLLECTION="case_studies";

async function collection() {
  return (await getDb()).collection<CaseStudyDoc>(COLLECTION);
}

export async function listCaseStudies(
  publishedOnly = true,
): Promise<CaseStudy[]> {
  if (!isDbConfigured) return [];
  try {
    const col = await collection();
    const filter = publishedOnly ? { published: true } : {};
    const docs = await col.find(filter).sort({ publishedAt: -1 }).toArray();
    return docs.map(serialize);
  } catch (error) {
    console.warn("MongoDB connection failed in listCaseStudies:", error);
    return [];
  }
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  if (!isDbConfigured) return null;
  try {
    const col = await collection();
    const doc = await col.findOne({ slug });
    return doc ? serialize(doc) : null;
  } catch (error) {
    console.warn("MongoDB connection failed in getCaseStudyBySlug:", error);
    return null;
  }
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  if (!isDbConfigured) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: toId(id) });
  return doc ? serialize(doc) : null;
}

export async function createCaseStudy(
  input: CaseStudyInput,
): Promise<string> {
  const col = await collection();
  const now = new Date();
  const res = await col.insertOne({
    ...input,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  } as CaseStudyDoc);
  return res.insertedId.toHexString();
}

export async function updateCaseStudy(
  id: string,
  input: CaseStudyInput,
): Promise<void> {
  const col = await collection();
  await col.updateOne(
    { _id: toId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const col = await collection();
  await col.deleteOne({ _id: toId(id) });
}
