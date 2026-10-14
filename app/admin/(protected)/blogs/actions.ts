"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAuth } from "@/lib/require-auth";
import { slugify } from "@/lib/db/serialize";
import {
  createBlog,
  deleteBlog,
  getBlogBySlug,
  updateBlog,
  type BlogInput,
} from "@/lib/db/blogs";

export interface FormState {
  error?: string;
}

const schema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().min(1, "Excerpt is required."),
  body: z.string().trim().min(1, "Body is required."),
  coverImage: z.string().trim().optional(),
  author: z.string().trim().optional(),
  tags: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  published: z.boolean(),
});

function parse(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    excerpt: formData.get("excerpt") ?? "",
    body: formData.get("body") ?? "",
    coverImage: formData.get("coverImage") ?? "",
    author: formData.get("author") ?? "",
    tags: formData.get("tags") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    metaDescription: formData.get("metaDescription") ?? "",
    published: formData.get("published") === "on",
  });
}

function toInput(data: z.infer<typeof schema>, slug: string): BlogInput {
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    coverImage: data.coverImage || undefined,
    author: data.author?.trim() || "Cloudspital Editorial",
    tags: (data.tags ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    seoTitle: data.seoTitle || undefined,
    metaDescription: data.metaDescription || undefined,
    published: data.published,
  };
}

function revalidateBlogPaths(slug: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog/");
  revalidatePath(`/blog/${slug}/`);
}

async function uniqueSlug(
  data: z.infer<typeof schema>,
  exceptId?: string,
): Promise<string | { error: string }> {
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);
  if (!slug) return { error:"Could not derive a slug from the title." };
  const existing = await getBlogBySlug(slug);
  if (existing && existing.id !== exceptId) {
    return { error: `A post with slug "${slug}" already exists.` };
  }
  return slug;
}

export async function createBlogAction(
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAuth();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const slug = await uniqueSlug(parsed.data);
  if (typeof slug !== "string") return slug;

  await createBlog(toInput(parsed.data, slug));
  revalidateBlogPaths(slug);
  redirect("/admin/blogs");
}

export async function updateBlogAction(
  id: string,
  _prev: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  await requireAuth();
  const parsed = parse(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const slug = await uniqueSlug(parsed.data, id);
  if (typeof slug !== "string") return slug;

  await updateBlog(id, toInput(parsed.data, slug));
  revalidateBlogPaths(slug);
  redirect("/admin/blogs");
}

export async function deleteBlogAction(id: string): Promise<void> {
  await requireAuth();
  await deleteBlog(id);
  revalidatePath("/admin/blogs");
  revalidatePath("/blog/");
  redirect("/admin/blogs");
}
