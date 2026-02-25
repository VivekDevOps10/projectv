"use client";

import { useEffect, useState } from "react";
import { useQueue } from "@/components/queue-provider";

export default function DisplayPage() {
  const { currentPatient, nextThreePatients } = useQueue();
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const timer = setInterval(tick, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.28em] text-brand-100">Live OPD Queue Display</p>
          <p className="rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-200">{now}</p>
        </div>
        <div className="mt-8 rounded-3xl bg-brand-600 p-10 text-center shadow-soft transition duration-500">
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
