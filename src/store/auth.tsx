"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/lib/types";

/**
 * DEMONSTRATION AUTH ONLY.
 *
 * This stores a user object in localStorage and performs no verification of
 * any kind. It exists so the account, order and wishlist screens can be built
 * and reviewed. Before launch, replace this provider with a real
 * authentication service (session cookies, hashed credentials, CSRF
 * protection) — no credential entered here is checked or transmitted.
 */

const STORAGE_KEY = "mr.auth.v1";

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  signIn: (email: string, firstName?: string, lastName?: string) => void;
  register: (firstName: string, lastName: string, email: string) => void;
  signOut: () => void;
  updateProfile: (patch: Partial<Omit<User, "id">>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      // Ignore unreadable storage.
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: User | null) => {
    setUser(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore unwritable storage.
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      signIn: (email, firstName = "Valued", lastName = "Client") =>
        persist({ id: "usr-demo", firstName, lastName, email }),
      register: (firstName, lastName, email) =>
        persist({ id: "usr-demo", firstName, lastName, email }),
      signOut: () => persist(null),
      updateProfile: (patch) =>
        setUser((prev) => {
          if (!prev) return prev;
          const next = { ...prev, ...patch };
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // Ignore unwritable storage.
          }
          return next;
        }),
    }),
    [user, hydrated, persist],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
