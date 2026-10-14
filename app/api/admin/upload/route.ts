import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isCloudinaryConfigured, uploadImage } from "@/lib/cloudinary";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

// POST /api/admin/upload — multipart form with a single "file" field.
// Guarded by the admin session; returns { url } from Cloudinary.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error:"Unauthorized" }, { status: 401 });
  }
  if (!isCloudinaryConfigured) {
    return NextResponse.json(
      { error:"Cloudinary is not configured on the server." },
      { status: 500 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error:"No file provided." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error:"Only image files are allowed." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error:"Image must be 8 MB or smaller." },
      { status: 400 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImage(buffer);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message:"Upload failed." },
      { status: 500 },
    );
  }
}
