"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAuth } from "@/lib/require-auth";
import { slugify } from "@/lib/db/serialize";
import {
  createProduct,
  deleteProduct,
  slugExists,
  updateProduct,
  type ProductInput,
} from "@/lib/db/products";

export interface FormState {
  error?: string;
}

const schema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  slug: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  description: z.string().trim().min(1, "Description is required."),
  body: z.string().trim().optional(),
  priceFrom: z.string().trim().optional(),
  currency: z.string().trim().optional(),
  image: z.string().trim().optional(),
  published: z.boolean(),
});

function parse(formData: FormData) {
  return schema.safeParse({
    name: formData.get("name") ?? "",
    slug: formData.get("slug") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    metaDescription: formData.get("metaDescription") ?? "",
    description: formData.get("description") ?? "",
    body: formData.get("body") ?? "",
    priceFrom: formData.get("priceFrom") ?? "",
    currency: formData.get("currency") ?? "",
    image: formData.get("image") ?? "",
    published: formData.get("published") === "on",
  });
}

function toInput(data: z.infer<typeof schema>, slug: string): ProductInput {
  const price = data.priceFrom ? Number(data.priceFrom) : undefined;
  return {
    slug,
    name: data.name,
    seoTitle: data.seoTitle || undefined,
    metaDescription: data.metaDescription || undefined,
    description: data.description,
    body: data.body || undefined,
    priceFrom: Number.isFinite(price) ? price : undefined,
    currency: data.currency || "INR",
    image: data.image || undefined,
    published: data.published,
  };
}

function revalidateProductPaths(slug: string) {
  revalidatePath("/admin/products");
  revalidatePath("/products/");
  revalidatePath(`/products/${slug}/`);
  revalidatePath("/", "layout"); // navbar dropdown
}

export async function createProductAction(
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAuth();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const slug = parsed.data.slug?.trim()
    ? slugify(parsed.data.slug)
    : slugify(parsed.data.name);
  if (!slug) return { error:"Could not derive a slug from the name." };
  if (await slugExists(slug)) {
    return { error: `A product with slug "${slug}" already exists.` };
  }

  await createProduct(toInput(parsed.data, slug));
  revalidateProductPaths(slug);
  redirect("/admin/products");
}

export async function updateProductAction(
  id: string,
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAuth();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const slug = parsed.data.slug?.trim()
    ? slugify(parsed.data.slug)
    : slugify(parsed.data.name);
  if (!slug) return { error:"Could not derive a slug from the name." };
  if (await slugExists(slug, id)) {
    return { error: `Another product already uses slug "${slug}".` };
  }

  await updateProduct(id, toInput(parsed.data, slug));
  revalidateProductPaths(slug);
  redirect("/admin/products");
}

export async function deleteProductAction(id: string): Promise<void> {
  await requireAuth();
  await deleteProduct(id);
  revalidatePath("/admin/products");
  revalidatePath("/products/");
  revalidatePath("/", "layout");
  redirect("/admin/products");
}
