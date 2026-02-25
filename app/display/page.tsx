"use client";

import { useQueue } from "@/components/queue-provider";

export default function DisplayPage() {
  const { currentPatient, nextThreePatients } = useQueue();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <p className="text-center text-sm uppercase tracking-[0.28em] text-brand-100">Live OPD Queue Display</p>
        <div className="mt-8 rounded-3xl bg-brand-600 p-10 text-center shadow-soft">
          <p className="text-lg text-brand-100">Now Serving</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            {currentPatient ? `Token ${currentPatient.token} – ${currentPatient.name}` : "No Active Patient"}
          </h1>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-slate-300">Next</p>
          <p className="mt-3 text-3xl font-semibold md:text-5xl">
            {nextThreePatients.length > 0
              ? nextThreePatients.map((patient) => patient.token).join(", ")
              : "Queue Empty"}
          </p>
        </div>
      </div>
    </div>
  );
}
