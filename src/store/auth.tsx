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

const SESSION_STORAGE_KEY = "mr.auth.v1";
const USERS_STORAGE_KEY = "mr.users.v1";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  address?: User["address"];
};

type AuthResponse = {
  success: boolean;
  error?: string;
};

type AuthContextValue = {
  user: User | null;
  hydrated: boolean;
  registeredUsers: User[];
  signIn: (email: string, password?: string) => AuthResponse;
  register: (data: RegisterData) => AuthResponse;
  signOut: () => void;
  updateProfile: (patch: Partial<Omit<User, "id">>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      // 1. Read session user
      const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
      if (rawSession) {
        setUser(JSON.parse(rawSession) as User);
      }

      // 2. Read all registered users
      const rawUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
      if (rawUsers) {
        setRegisteredUsers(JSON.parse(rawUsers) as User[]);
      } else {
        // Seed initial demo VIP client
        const defaultVip: User = {
          id: "usr-vip-001",
          firstName: "Alexandra",
          lastName: "Vance",
          email: "alexandra.vance@example.com",
          password: "password123",
          phone: "+1 (212) 555-0198",
          joinedAt: new Date(Date.now() - 180 * 24 * 3600 * 1000).toISOString(),
          address: {
            line1: "450 Park Avenue",
            line2: "Suite 24B",
            city: "New York",
            state: "NY",
            postcode: "10022",
            country: "United States",
          },
        };
        window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([defaultVip]));
        setRegisteredUsers([defaultVip]);
      }
    } catch {
      // Ignore unreadable storage.
    }
    setHydrated(true);
  }, []);

  const saveUsersList = useCallback((users: User[]) => {
    setRegisteredUsers(users);
    try {
      window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, []);

  const saveSession = useCallback((currentUser: User | null) => {
    setUser(currentUser);
    try {
      if (currentUser) {
        window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const register = useCallback(
    (data: RegisterData): AuthResponse => {
      const emailClean = data.email.trim().toLowerCase();
      if (!emailClean) {
        return { success: false, error: "Email address is required." };
      }
      if (!data.firstName.trim() || !data.lastName.trim()) {
        return { success: false, error: "First and last name are required." };
      }

      // Check if user already exists
      const existing = registeredUsers.find(
        (u) => u.email.toLowerCase() === emailClean,
      );
      if (existing) {
        return {
          success: false,
          error: "An account with this email address already exists. Please sign in instead.",
        };
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: emailClean,
        password: data.password || "password123",
        phone: data.phone?.trim() || "",
        joinedAt: new Date().toISOString(),
        address: data.address,
      };

      const nextUsers = [newUser, ...registeredUsers];
      saveUsersList(nextUsers);
      saveSession(newUser);

      return { success: true };
    },
    [registeredUsers, saveUsersList, saveSession],
  );

  const signIn = useCallback(
    (emailInput: string, passwordInput?: string): AuthResponse => {
      const emailClean = emailInput.trim().toLowerCase();
      if (!emailClean) {
        return { success: false, error: "Please provide an email address." };
      }

      // Look up account in registered users
      const match = registeredUsers.find(
        (u) => u.email.toLowerCase() === emailClean,
      );

      if (match) {
        if (passwordInput && match.password && match.password !== passwordInput) {
          return { success: false, error: "Incorrect password. Please try again." };
        }
        saveSession(match);
        return { success: true };
      }

      // Fallback: If logging in with demo account
      const demoUser: User = {
        id: `usr-${Date.now()}`,
        firstName: emailClean.split("@")[0].replace(/[^a-zA-Z]/g, " ") || "Valued",
        lastName: "Collector",
        email: emailClean,
        password: passwordInput || "password123",
        joinedAt: new Date().toISOString(),
      };

      const nextUsers = [demoUser, ...registeredUsers];
      saveUsersList(nextUsers);
      saveSession(demoUser);

      return { success: true };
    },
    [registeredUsers, saveUsersList, saveSession],
  );

  const signOut = useCallback(() => {
    saveSession(null);
  }, [saveSession]);

  const updateProfile = useCallback(
    (patch: Partial<Omit<User, "id">>) => {
      if (!user) return;
      const updated: User = { ...user, ...patch };
      saveSession(updated);

      // Also update in registered users list
      const updatedList = registeredUsers.map((u) => (u.id === user.id ? updated : u));
      saveUsersList(updatedList);
    },
    [user, registeredUsers, saveSession, saveUsersList],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      hydrated,
      registeredUsers,
      signIn,
      register,
      signOut,
      updateProfile,
    }),
    [user, hydrated, registeredUsers, signIn, register, signOut, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
