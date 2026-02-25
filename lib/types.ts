export type QueueStatus = "Waiting" | "Inside" | "Done";

export type Patient = {
  id: number;
  token: number;
  name: string;
  status: QueueStatus;
  checkInTime: string;
};
