"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (
    username: string,
    pass: string,
  ) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    if (!username || !password) {
      return { success: false, message: "Por favor completa todos los campos" };
    }

    const isAdminUser = username === "admin" && password === "admin123";
    const userData: User = {
      username,
      role: isAdminUser ? "admin" : "user",
      loginTime: new Date().toISOString(),
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, message: "Login exitoso" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => user !== null;
  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
