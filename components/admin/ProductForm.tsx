"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, TextArea, Checkbox, FormRow } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import type { FormState } from "@/app/admin/(protected)/products/actions";
import type { Product } from "@/lib/db/products";

type Action = (
  prev: FormState | undefined,
  formData: FormData,
) => Promise<FormState>;

export function ProductForm({
  action,
  product,
}: {
  action: Action;
  product?: Product;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <FormRow>
        <Field
          name="name"
          label="Name"
          required
          defaultValue={product?.name}
        />
        <Field
          name="slug"
          label="Slug"
          defaultValue={product?.slug}
          placeholder="auto from name"
          hint="URL: /products/<slug>/"
        />
      </FormRow>

      <TextArea
        name="description"
        label="Short description"
        required
        rows={2}
        defaultValue={product?.description}
        hint="Used in cards and Product schema."
      />

      <TiptapEditor
        name="body"
        label="Full details"
        defaultValue={product?.body}
        hint="Specs, features, and detailed descriptions."
      />

      <FormRow>
        <Field
          name="priceFrom"
          label="Price from"
          type="number"
          defaultValue={product?.priceFrom}
        />
        <Field
          name="currency"
          label="Currency"
          defaultValue={product?.currency ?? "INR"}
        />
      </FormRow>

      <ImageUpload name="image" label="Image" defaultValue={product?.image} />

      <FormRow>
        <Field
          name="seoTitle"
          label="SEO title"
          defaultValue={product?.seoTitle}
        />
        <Field
          name="metaDescription"
          label="Meta description"
          defaultValue={product?.metaDescription}
        />
      </FormRow>

      <Checkbox
        name="published"
        label="Published"
        defaultChecked={product?.published ?? true}
      />

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:bg-blue-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save product"}
        </button>
        <Link
          href="/admin/products"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
