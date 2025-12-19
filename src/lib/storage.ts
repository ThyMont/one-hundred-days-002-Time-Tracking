import type { TimeEntry, User } from "@/types";

const USERS_KEY = "tt.users";
const CURRENT_USER_KEY = "tt.currentUserId";
const ENTRIES_KEY = "tt.entries";

export function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as User[]) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getEntries(): TimeEntry[] {
  const raw = localStorage.getItem(ENTRIES_KEY);
  return raw ? (JSON.parse(raw) as TimeEntry[]) : [];
}

export function saveEntries(entries: TimeEntry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function setCurrentUserId(userId: string) {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

export function clearCurrentUserId() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
