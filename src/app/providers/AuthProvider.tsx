"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  userEmail: string | null;
  loading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const FIXED_EMAIL = "feliciofc@gmail.com";
const FIXED_PASSWORD = "Dcd318798$";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const authed = localStorage.getItem("simula-auth") === "true";
    const storedEmail = localStorage.getItem("simula-user");
    setIsAuthenticated(authed);
    setUserEmail(authed ? storedEmail : null);
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
      if (typeof window !== "undefined") {
        localStorage.setItem("simula-auth", "true");
        localStorage.setItem("simula-user", email);
      }
      setIsAuthenticated(true);
      setUserEmail(email);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("simula-auth");
      localStorage.removeItem("simula-user");
    }
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  const value = useMemo(
    () => ({ isAuthenticated, userEmail, loading, login, logout }),
    [isAuthenticated, userEmail, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
