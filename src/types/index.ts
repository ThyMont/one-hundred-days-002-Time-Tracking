export type User = {
  id: string;
  username: string;
  createdAt: string;
};

export type TimeEntryType = "clock_in" | "clock_out";

export type TimeEntry = {
  id: string;
  userId: string;
  type: TimeEntryType;
  timestamp: string; // ISO
};
