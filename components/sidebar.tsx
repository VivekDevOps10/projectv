"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/reception", label: "Reception" },
  { href: "/display", label: "Display" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-100 lg:w-64">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <p className="text-xs uppercase tracking-wide text-brand-600">MediQueue Pro</p>
        <h1 className="text-lg font-semibold">OPD Command Center</h1>
      </div>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-brand-600 text-white shadow"
                  : "text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
