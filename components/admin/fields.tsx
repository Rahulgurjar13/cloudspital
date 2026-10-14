// Small presentational form controls shared by every admin content form (dark theme).
import type { ReactNode } from "react";

const labelCls = "mb-1 block text-sm font-semibold text-slate-300";
const controlCls =
  "w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function Field({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className={labelCls}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={controlCls}
      />
      {hint && <p className="mt-1 text-xs text-slate-500 font-medium">{hint}</p>}
    </div>
  );
}

export function TextArea({
  name,
  label,
  defaultValue,
  required,
  rows = 4,
  placeholder,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className={labelCls}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={controlCls}
      />
      {hint && <p className="mt-1 text-xs text-slate-500 font-medium">{hint}</p>}
    </div>
  );
}

export function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-350 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
      />
      {label}
    </label>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
