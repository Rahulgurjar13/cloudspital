import Link from "next/link";
import { isDbConfigured } from "@/lib/db/mongodb";
import { listBlogs } from "@/lib/db/blogs";
import { listProducts } from "@/lib/db/products";
import { listCaseStudies } from "@/lib/db/case-studies";
import { listEnquiries } from "@/lib/db/enquiries";
import {
  Inbox,
  FileText,
  Package,
  Award,
  ArrowRight,
  Sparkles,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

export const dynamic="force-dynamic";

export default async function Dashboard() {
  const [blogs, products, caseStudies, enquiries] = isDbConfigured
    ? await Promise.all([
        listBlogs(false),
        listProducts(false),
        listCaseStudies(false),
        listEnquiries(),
      ])
    : [[], [], [], []];

  const unreadEnquiriesCount = enquiries.filter((e) => e.status === "unread").length;

  const CARDS = [
    {
      href: "/admin/enquiries",
      label:"Enquiries",
      count: enquiries.length,
      icon: Inbox,
      gradient:"from blue 600 to indigo 600 shadow blue 500/15",
      accent:"text blue 400",
      description: `${unreadEnquiriesCount} unread submissions`,
    },
    {
      href: "/admin/blogs",
      label:"Blogs",
      count: blogs.length,
      icon: FileText,
      gradient:"from amber 500 to orange 600 shadow orange 500/15",
      accent:"text orange 400",
      description:"Manage content updates",
    },
    {
      href: "/admin/products",
      label:"Products",
      count: products.length,
      icon: Package,
      gradient:"from purple 600 to indigo 600 shadow indigo 500/15",
      accent:"text indigo 400",
      description:"Configure product features",
    },
    {
      href: "/admin/case-studies",
      label:"Case Studies",
      count: caseStudies.length,
      icon: Award,
      gradient:"from emerald 500 to teal 600 shadow emerald 500/15",
      accent:"text emerald 400",
      description:"Manage client outcomes",
    },
  ];

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-sm text-slate-400 font-medium">
          Manage the content and view client leads powering Cloudspital.
        </p>
      </div>

      {/* DB Config Warning */}
      {!isDbConfigured && (
        <div className="rounded-2xl border border-amber-900 bg-amber-950/40 p-5 flex items-start gap-4 shadow-sm">
          <AlertCircle className="h-5.5 w-5.5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-amber-200">Database Connection Required</h3>
            <p className="mt-1 text-xs text-amber-300 leading-relaxed max-w-2xl font-medium">
              MongoDB is not configured yet. Set <code>MONGODB_URI</code> in <code>.env.local</code> to start persisting enquiries, writing articles, and building products.
            </p>
          </div>
        </div>
      )}

      {/* Quick stats grids */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group relative rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-slate-700 hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${c.gradient} text-white shadow-md`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {c.count}
                  </span>
                  <p className="mt-1 text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {c.label}
                  </p>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {c.description}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Column Layout: Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Recent Enquiries
              {unreadEnquiriesCount > 0 && (
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
            {recentEnquiries.length === 0 ? (
              <div className="text-center py-12">
                <Inbox className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm font-medium">No enquiries received yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-950 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Date</th>
                      <th className="px-5 py-3 font-semibold">Type</th>
                      <th className="px-5 py-3 font-semibold">Submitter</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {recentEnquiries.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-850/50 transition-colors"
                      >
                        <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day:"2-digit",
                            month:"short",
                          })}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${item.type === "demo" ? "bg-cyan-950/50 text-cyan-400 border border-cyan-900/30" : "bg-blue-950/50 text-blue-400 border border-blue-900/30"}`}>
                            {item.type === "demo" ? <Sparkles className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                            {item.type === "demo" ? "Demo":"Contact"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-semibold text-slate-200">
                          <div className="flex flex-col">
                            <span className="truncate max-w-[150px]">{item.name}</span>
                            <span className="text-[10px] font-normal text-slate-500 truncate max-w-[150px]">{item.email}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            item.status === "unread"
                              ? "bg-amber-950 text-amber-400 border border-amber-900/30"
                              : item.status === "read"
                              ? "bg-blue-950 text-blue-400 border border-blue-900/30"
                              : item.status === "contacted"
                              ? "bg-purple-950 text-purple-400 border border-purple-900/30"
                              : "bg-emerald-950 text-emerald-400 border border-emerald-900/30"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Help & Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-bold text-white">Portal Shortcuts</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-3">
            <Link
              href="/admin/blogs/new"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-950/50 transition-colors border border-slate-800 font-semibold text-sm text-slate-300"
            >
              Write new blog post
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </Link>
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-950/50 transition-colors border border-slate-800 font-semibold text-sm text-slate-300"
            >
              Add new product
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </Link>
            <Link
              href="/admin/case-studies/new"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-950/50 transition-colors border border-slate-800 font-semibold text-sm text-slate-300"
            >
              Publish new case study
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
