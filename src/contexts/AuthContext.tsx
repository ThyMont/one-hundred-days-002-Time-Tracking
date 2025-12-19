import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { createId } from "@/lib/id";
import {
  clearCurrentUserId,
  getCurrentUserId,
  getUsers,
  saveUsers,
  setCurrentUserId,
} from "@/lib/storage";

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean;
  loginWithUsername: (username: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // ✅ inicializa sincronamente lendo do localStorage
  const [user, setUser] = useState<User | null>(() => {
    const currentId = getCurrentUserId();
    if (!currentId) return null;

    const users = getUsers();
    return users.find((u) => u.id === currentId) ?? null;
  });

  // ✅ sinaliza quando o auth já "bootstrappou"
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  function loginWithUsername(username: string) {
    const cleaned = username.trim();
    if (!cleaned) return;

    const users = getUsers();
    const existing = users.find((u) => u.username.toLowerCase() === cleaned.toLowerCase());

    const nextUser: User = existing ?? {
      id: createId("usr"),
      username: cleaned,
      createdAt: new Date().toISOString(),
    };

    if (!existing) {
      saveUsers([...users, nextUser]);
    }

    setCurrentUserId(nextUser.id);
    setUser(nextUser);
  }

  function logout() {
    clearCurrentUserId();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isReady,
      loginWithUsername,
      logout,
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
