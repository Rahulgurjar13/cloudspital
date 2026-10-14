import Link from "next/link";
import { listProducts } from "@/lib/db/products";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProductAction } from "./actions";

export const dynamic="force-dynamic";

export default async function ProductsAdmin() {
  const products = await listProducts(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/15"
        >
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">
          No products yet. Create your first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-slate-800 bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Slug</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-200">
                    {p.name}
                  </td>
                  <td className="px-5 py-4 text-slate-400 font-medium">{p.slug}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                        p.published
                          ? "bg-green-950/40 text-green-400 border-green-900/30"
                          : "bg-slate-850 text-slate-400 border-slate-800"
                      }`}
                    >
                      {p.published ? "Published":"Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="rounded-xl px-3-5 py-1.5 text-sm font-bold text-blue-400 hover:bg-blue-950/40 border border-transparent hover:border-blue-900/30 transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteProductAction.bind(null, p.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
