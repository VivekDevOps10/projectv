"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialPatients } from "@/lib/mockPatients";
import { Patient, QueueStatus } from "@/lib/types";

type QueueContextShape = {
  patients: Patient[];
  currentPatient?: Patient;
  waitingPatients: Patient[];
  donePatients: Patient[];
  nextThreePatients: Patient[];
  avgConsultationTime: number;
  completedCount: number;
  moveToNextPatient: () => void;
  addPatient: (name: string) => void;
  updateStatus: (id: number, status: QueueStatus) => void;
};

const STORAGE_KEY = "opd-queue-v1";

const QueueContext = createContext<QueueContextShape | undefined>(undefined);

export function QueueProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPatients(JSON.parse(stored) as Patient[]);
      } catch {
        setPatients(initialPatients);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  const currentPatient = patients.find((p) => p.status === "Inside");
  const waitingPatients = patients.filter((p) => p.status === "Waiting");
  const donePatients = patients.filter((p) => p.status === "Done");

  const moveToNextPatient = () => {
    setPatients((prev) => {
      const insideId = prev.find((p) => p.status === "Inside")?.id;
      const nextPatient = prev.find((p) => p.status === "Waiting");

      if (!insideId && nextPatient) {
        return prev.map((patient) =>
          patient.id === nextPatient.id ? { ...patient, status: "Inside" as QueueStatus } : patient
        );
      }

      return prev.map((patient) => {
        if (patient.id === insideId) return { ...patient, status: "Done" as QueueStatus };
        if (patient.id === nextPatient?.id) return { ...patient, status: "Inside" as QueueStatus };
        return patient;
      });
    });
  };

  const addPatient = (name: string) => {
    if (!name.trim()) return;
    setPatients((prev) => {
      const nextToken = prev.length ? Math.max(...prev.map((p) => p.token)) + 1 : 1;
      return [
        ...prev,
        {
          id: prev.length + 1,
          token: nextToken,
          name: name.trim(),
          status: currentPatient ? "Waiting" : "Inside",
          checkInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ];
    });
  };

  const updateStatus = (id: number, status: QueueStatus) => {
    setPatients((prev) => {
      if (status === "Inside") {
        return prev.map((patient) => {
          if (patient.id === id) return { ...patient, status };
          if (patient.status === "Inside") return { ...patient, status: "Waiting" };
          return patient;
        });
      }
      return prev.map((patient) => (patient.id === id ? { ...patient, status } : patient));
    });
  };

  const value = useMemo(
    () => ({
      patients,
      currentPatient,
      waitingPatients,
      donePatients,
      nextThreePatients: waitingPatients.slice(0, 3),
      avgConsultationTime: 11,
      completedCount: donePatients.length,
      moveToNextPatient,
      addPatient,
      updateStatus
    }),
    [patients, currentPatient, waitingPatients, donePatients]
  );

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error("useQueue must be used within QueueProvider");
  }
  return context;
}
