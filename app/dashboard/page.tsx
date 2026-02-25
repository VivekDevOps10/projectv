"use client";

import { AppShell } from "@/components/app-shell";
import { useQueue } from "@/components/queue-provider";

function KpiCard({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`card transition ${accent ? "bg-brand-600 text-white ring-brand-500" : ""}`}>
      <p className={`text-sm ${accent ? "text-brand-100" : "text-slate-500"}`}>{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { patients, currentPatient, waitingPatients, nextThreePatients, avgConsultationTime, completedCount, moveToNextPatient } =
    useQueue();

  const revenue = completedCount * 650;

  return (
    <AppShell title="Doctor Dashboard">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Patients Today" value={patients.length} />
        <KpiCard
          label="Currently Inside"
          value={currentPatient ? `${currentPatient.name} (T${currentPatient.token})` : "No patient"}
          accent
        />
        <KpiCard label="Waiting Count" value={waitingPatients.length} />
        <KpiCard label="Avg Consultation" value={`${avgConsultationTime} mins`} />
        <KpiCard label="Completed Today" value={completedCount} />
        <KpiCard label="Revenue Snapshot" value={`₹${revenue.toLocaleString("en-IN")}`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <p className="text-sm font-medium text-brand-600">Current Patient</p>
          {currentPatient ? (
            <>
              <h3 className="mt-2 text-3xl font-semibold">{currentPatient.name}</h3>
              <p className="mt-1 text-lg text-slate-500">Token #{currentPatient.token}</p>
              <p className="mt-4 rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700">Consultation in progress</p>
            </>
          ) : (
            <p className="mt-4 text-slate-500">No patient inside at the moment.</p>
          )}
        </div>

        <div className="card">
          <p className="text-sm font-medium text-brand-600">Next 3 Patients</p>
          <ul className="mt-3 space-y-2">
            {nextThreePatients.map((patient) => (
              <li key={patient.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span className="font-medium">{patient.name}</span>
                <span className="text-sm text-slate-500">T{patient.token}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={moveToNextPatient}
            className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-2.5 font-medium text-white transition hover:bg-brand-700"
          >
            Next Patient
          </button>
        </div>
      </section>
    </AppShell>
  );
}
