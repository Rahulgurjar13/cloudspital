"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field, TextArea, Checkbox, FormRow } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import type { FormState } from "@/app/admin/(protected)/case-studies/actions";
import type { CaseStudy } from "@/lib/db/case-studies";

type Action = (
  prev: FormState | undefined,
  formData: FormData,
) => Promise<FormState>;

export function CaseStudyForm({
  action,
  caseStudy,
}: {
  action: Action;
  caseStudy?: CaseStudy;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <FormRow>
        <Field
          name="title"
          label="Title"
          required
          defaultValue={caseStudy?.title}
        />
        <Field
          name="slug"
          label="Slug"
          defaultValue={caseStudy?.slug}
          placeholder="auto from title"
          hint="URL: /case studies/<slug>/"
        />
      </FormRow>

      <Field
        name="client"
        label="Client / partner"
        defaultValue={caseStudy?.client}
        placeholder="e.g. AIIMS Patna"
      />

      <TextArea
        name="summary"
        label="Summary"
        required
        rows={2}
        defaultValue={caseStudy?.summary}
      />

      <TiptapEditor
        name="body"
        label="Body"
        defaultValue={caseStudy?.body}
        hint="Rich text content."
      />

      <TextArea
        name="results"
        label="Results"
        rows={4}
        defaultValue={caseStudy?.results?.join("\n")}
        hint="One outcome per line, e.g. '40% faster triage'."
      />

      <ImageUpload
        name="coverImage"
        label="Cover image"
        defaultValue={caseStudy?.coverImage}
      />

      <FormRow>
        <Field
          name="seoTitle"
          label="SEO title"
          defaultValue={caseStudy?.seoTitle}
        />
        <Field
          name="metaDescription"
          label="Meta description"
          defaultValue={caseStudy?.metaDescription}
        />
      </FormRow>

      <Checkbox
        name="published"
        label="Published"
        defaultChecked={caseStudy?.published ?? true}
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
          {pending ? "Saving…" : "Save case study"}
        </button>
        <Link
          href="/admin/case-studies"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
