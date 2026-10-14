"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, TextArea, Checkbox, FormRow } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import type { FormState } from "@/app/admin/(protected)/blogs/actions";
import type { Blog } from "@/lib/db/blogs";

type Action = (
  prev: FormState | undefined,
  formData: FormData,
) => Promise<FormState>;

export function BlogForm({ action, blog }: { action: Action; blog?: Blog }) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <FormRow>
        <Field name="title" label="Title" required defaultValue={blog?.title} />
        <Field
          name="slug"
          label="Slug"
          defaultValue={blog?.slug}
          placeholder="auto from title"
          hint="URL: /blog/<slug>/"
        />
      </FormRow>

      <TextArea
        name="excerpt"
        label="Excerpt"
        required
        rows={2}
        defaultValue={blog?.excerpt}
        hint="Short summary for listings and meta description fallback."
      />

      <TiptapEditor
        name="body"
        label="Body"
        defaultValue={blog?.body}
        hint="Rich text content."
      />

      <ImageUpload
        name="coverImage"
        label="Cover image"
        defaultValue={blog?.coverImage}
      />

      <FormRow>
        <Field
          name="author"
          label="Author"
          defaultValue={blog?.author ?? "Cloudspital Editorial"}
        />
        <Field
          name="tags"
          label="Tags"
          defaultValue={blog?.tags?.join(", ")}
          placeholder="comma, separated"
        />
      </FormRow>

      <FormRow>
        <Field name="seoTitle" label="SEO title" defaultValue={blog?.seoTitle} />
        <Field
          name="metaDescription"
          label="Meta description"
          defaultValue={blog?.metaDescription}
        />
      </FormRow>

      <Checkbox
        name="published"
        label="Published"
        defaultChecked={blog?.published ?? true}
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
          {pending ? "Saving…" : "Save post"}
        </button>
        <Link
          href="/admin/blogs"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
