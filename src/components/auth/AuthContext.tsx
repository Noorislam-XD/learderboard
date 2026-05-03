"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  niScore: number;
  rank: number;
  verified: boolean;
  premium: boolean;
  joinedDate: string;
  country: string;
  flag: string;
  university: string;
  bio: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("meryt_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, _password: string) => {
    const mockUser: User = {
      id: "me",
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      handle: `@${email.split("@")[0]}`,
      email,
      avatar: "🧑‍💻",
      niScore: Math.floor(Math.random() * 3000) + 4000,
      rank: Math.floor(Math.random() * 5000) + 1000,
      verified: false,
      premium: false,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      country: "Global",
      flag: "🌐",
      university: "Not set",
      bio: "Tell the world what you're building.",
    };
    setUser(mockUser);
    localStorage.setItem("meryt_user", JSON.stringify(mockUser));
  };

  const signUp = async (name: string, email: string, _password: string) => {
    const mockUser: User = {
      id: "me",
      name,
      handle: `@${name.toLowerCase().replace(/\s+/g, ".")}`,
      email,
      avatar: "🧑‍💻",
      niScore: 1200,
      rank: 22480,
      verified: false,
      premium: false,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      country: "Global",
      flag: "🌐",
      university: "Not set",
      bio: "",
    };
    setUser(mockUser);
    localStorage.setItem("meryt_user", JSON.stringify(mockUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("meryt_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
