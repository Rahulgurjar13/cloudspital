"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Package,
  Award,
  LogOut,
  User,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label:"Dashboard", exact: true, icon: LayoutDashboard },
  { href: "/admin/enquiries", label:"Enquiries", icon: Inbox },
  { href: "/admin/blogs", label:"Blogs", icon: FileText },
  { href: "/admin/products", label:"Products", icon: Package },
  { href: "/admin/case-studies", label:"Case Studies", icon: Award },
];

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-slate-400">
      {/* Sidebar Header */}
      <div className="border-b border-slate-900 px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20">
            CS
          </div>
          <div>
            <p className="text-base font-extrabold tracking-tight text-white leading-none">
              Cloudspital
            </p>
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mt-1">
              Admin Portal
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 p-4">
        {LINKS.map((l) => {
          const active = isActive(l.href, l.exact);
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 group relative ${
                active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
              }`}
            >
              {/* Left active indicator line */}
              {active && (
                <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-gradient-to-b from-blue-500 to-cyan-400" />
              )}
              <Icon className={`h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-110 ${active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* User Session & Sign Out */}
      <div className="border-t border-slate-900 p-4 bg-slate-950/40">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/30 border border-slate-900/50 mb-3">
          <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700/30">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Signed in as</p>
            <p className="text-xs font-semibold text-slate-300 truncate mt-0.5" title={email}>
              {email}
            </p>
          </div>
        </div>
        
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition-all duration-150 active:scale-[0.98]"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
