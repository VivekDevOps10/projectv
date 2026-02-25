import { Sidebar } from "./sidebar";

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <header className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-slate-100">
            <p className="text-sm text-brand-600">Live OPD Queue & Clinic Visibility</p>
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
