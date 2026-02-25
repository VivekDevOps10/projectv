"use client";

import { FormEvent, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useQueue } from "@/components/queue-provider";
import { QueueStatus } from "@/lib/types";

export default function ReceptionPage() {
  const { patients, addPatient, updateStatus } = useQueue();
  const [name, setName] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addPatient(name);
    setName("");
  };

  return (
    <AppShell title="Reception Panel">
      <section className="card">
        <h3 className="text-lg font-semibold">Add New Patient</h3>
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient name"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-700"
          >
            Add Patient
          </button>
        </form>
      </section>

      <section className="card overflow-hidden">
        <h3 className="text-lg font-semibold">Today&apos;s Queue</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-3 py-2">Token</th>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">Check-In</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 font-semibold text-brand-700">#{patient.token}</td>
                  <td className="px-3 py-2">{patient.name}</td>
                  <td className="px-3 py-2 text-slate-500">{patient.checkInTime}</td>
                  <td className="px-3 py-2">
                    <select
                      className="rounded-lg border border-slate-200 px-2 py-1"
                      value={patient.status}
                      onChange={(e) => updateStatus(patient.id, e.target.value as QueueStatus)}
                    >
                      <option value="Waiting">Waiting</option>
                      <option value="Inside">Inside</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
