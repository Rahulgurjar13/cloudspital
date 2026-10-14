import Link from "next/link";
import { listBlogs } from "@/lib/db/blogs";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteBlogAction } from "./actions";

export const dynamic="force-dynamic";

export default async function BlogsAdmin() {
  const blogs = await listBlogs(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Blogs
        </h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/15"
        >
          New post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">
          No posts yet. Write your first one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-slate-800 bg-slate-950 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-4 font-semibold">Title</th>
                <th className="px-5 py-4 font-semibold">Author</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-200">
                    {b.title}
                  </td>
                  <td className="px-5 py-4 text-slate-400 font-medium">{b.author}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                        b.published
                          ? "bg-green-950/40 text-green-400 border-green-900/30"
                          : "bg-slate-850 text-slate-400 border-slate-800"
                      }`}
                    >
                      {b.published ? "Published":"Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${b.id}`}
                        className="rounded-xl px-3-5 py-1.5 text-sm font-bold text-blue-400 hover:bg-blue-950/40 border border-transparent hover:border-blue-900/30 transition-all"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteBlogAction.bind(null, b.id)} />
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
