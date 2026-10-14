"use client";

// Confirm-then-submit delete. Wraps a bound server action in a form so the
// destructive call still runs on the server.
export function DeleteButton({
  action,
  label="Delete",
  confirmText="Delete this item? This cannot be undone.",
}: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        {label}
      </button>
    </form>
  );
}
