// Enquiries collection for contact submissions and demo bookings.

import { ObjectId } from "mongodb";
import { getDb, isDbConfigured } from "./mongodb";
import { serialize, toId, type WithId } from "./serialize";

export type EnquiryType="contact" | "demo";
export type EnquiryStatus="unread" | "read" | "contacted" | "resolved";

export interface EnquiryDoc {
  _id: ObjectId;
  type: EnquiryType;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type Enquiry = WithId<Omit<EnquiryDoc, "_id">>;

export interface EnquiryInput {
  type: EnquiryType;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
}

const COLLECTION="enquiries";

async function collection() {
  return (await getDb()).collection<EnquiryDoc>(COLLECTION);
}

export async function listEnquiries(): Promise<Enquiry[]> {
  if (!isDbConfigured) return [];
  try {
    const col = await collection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map(serialize);
  } catch (error) {
    console.warn("MongoDB connection failed in listEnquiries:", error);
    return [];
  }
}

export async function createEnquiry(input: EnquiryInput): Promise<string> {
  if (!isDbConfigured) {
    throw new Error("MongoDB is not configured.");
  }
  const col = await collection();
  const now = new Date();
  const res = await col.insertOne({
    ...input,
    status:"unread",
    createdAt: now,
    updatedAt: now,
  } as EnquiryDoc);
  return res.insertedId.toHexString();
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<void> {
  if (!isDbConfigured) return;
  const col = await collection();
  await col.updateOne(
    { _id: toId(id) },
    { $set: { status, updatedAt: new Date() } },
  );
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (!isDbConfigured) return;
  const col = await collection();
  await col.deleteOne({ _id: toId(id) });
}
