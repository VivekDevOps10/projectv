import { AppShell } from "@/components/app-shell";

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <section className="card">
        <h3 className="text-lg font-semibold">Clinic Preferences</h3>
        <p className="mt-2 text-sm text-slate-500">
          Demo-only placeholder for schedule windows, consultation average targets, and display branding options.
        </p>
      </section>
    </AppShell>
  );
}
