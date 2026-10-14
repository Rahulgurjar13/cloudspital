"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAuth } from "@/lib/require-auth";
import { slugify } from "@/lib/db/serialize";
import {
  createCaseStudy,
  deleteCaseStudy,
  getCaseStudyBySlug,
  updateCaseStudy,
  type CaseStudyInput,
} from "@/lib/db/case-studies";

export interface FormState {
  error?: string;
}

const schema = z.object({
  title: z.string().trim().min(2, "Title is required."),
  slug: z.string().trim().optional(),
  client: z.string().trim().optional(),
  summary: z.string().trim().min(1, "Summary is required."),
  body: z.string().trim().min(1, "Body is required."),
  coverImage: z.string().trim().optional(),
  results: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  published: z.boolean(),
});

function parse(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title") ?? "",
    slug: formData.get("slug") ?? "",
    client: formData.get("client") ?? "",
    summary: formData.get("summary") ?? "",
    body: formData.get("body") ?? "",
    coverImage: formData.get("coverImage") ?? "",
    results: formData.get("results") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    metaDescription: formData.get("metaDescription") ?? "",
    published: formData.get("published") === "on",
  });
}

function toInput(data: z.infer<typeof schema>, slug: string): CaseStudyInput {
  return {
    slug,
    title: data.title,
    client: data.client || undefined,
    summary: data.summary,
    body: data.body,
    coverImage: data.coverImage || undefined,
    results: (data.results ?? "")
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean),
    seoTitle: data.seoTitle || undefined,
    metaDescription: data.metaDescription || undefined,
    published: data.published,
  };
}

function revalidateCasePaths(slug: string) {
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies/");
  revalidatePath(`/case-studies/${slug}/`);
}

async function uniqueSlug(
  data: z.infer<typeof schema>,
  exceptId?: string,
): Promise<string | { error: string }> {
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.title);
  if (!slug) return { error:"Could not derive a slug from the title." };
  const existing = await getCaseStudyBySlug(slug);
  if (existing && existing.id !== exceptId) {
    return { error: `A case study with slug "${slug}" already exists.` };
  }
  return slug;
}

export async function createCaseStudyAction(
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

  await createCaseStudy(toInput(parsed.data, slug));
  revalidateCasePaths(slug);
  redirect("/admin/case-studies");
}

export async function updateCaseStudyAction(
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

  await updateCaseStudy(id, toInput(parsed.data, slug));
  revalidateCasePaths(slug);
  redirect("/admin/case-studies");
}

export async function deleteCaseStudyAction(id: string): Promise<void> {
  await requireAuth();
  await deleteCaseStudy(id);
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies/");
  redirect("/admin/case-studies");
}
