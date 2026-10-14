"use client";

import Image from "next/image";
import { useState } from "react";

// Uploads a chosen file to /api/admin/upload (Cloudinary) and stores the
// returned URL in a hidden input so it submits with the surrounding form (dark theme).
export function ImageUpload({
  name,
  label,
  defaultValue="",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message:"Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="mb-1 block text-sm font-semibold text-slate-350">
        {label}
      </label>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-center gap-4">
        {url ? (
          <Image
            src={url}
            alt="preview"
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl border border-slate-800 object-cover bg-slate-900"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900 text-xs text-slate-500 font-semibold">
            No image
          </div>
        )}

        <div className="space-y-1.5">
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            disabled={busy}
            className="block text-sm text-slate-400 file:mr-3.5 file:rounded-xl file:border file:border-slate-800 file:bg-slate-900 file:px-3.5 file:py-2 file:text-xs file:font-semibold file:text-slate-300 hover:file:bg-slate-800 transition-colors file:cursor-pointer"
          />
          {busy && <p className="text-xs text-slate-500 font-medium">Uploading…</p>}
          {error && <p className="text-xs text-red-400 font-semibold">{error}</p>}
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="text-xs text-slate-500 hover:text-red-400 font-bold underline transition-colors cursor-pointer"
            >
              Remove Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
