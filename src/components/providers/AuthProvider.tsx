"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Tipe Data Dummy
type User = { name: string; role: string; email: string } | null;

interface AuthContextType {
  user: User;
  login: (role: "masyarakat" | "opd" | "pimpinan") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null, login: () => {}, logout: () => {}, isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Cek Local Storage saat komponen dimuat
  useEffect(() => {
    const savedUser = localStorage.getItem("dummy_user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsLoading(false);
  }, []);

  // Fungsi Login Cepat untuk Testing
  const login = (role: "masyarakat" | "opd" | "pimpinan") => {
    let newUser = null;
    if (role === "masyarakat") newUser = { name: "Muhammad Reza", role: "masyarakat", email: "warga@portal.go.id" };
    else if (role === "opd") newUser = { name: "Petugas Verifikator", role: "opd", email: "opd@portal.go.id" };
    else if (role === "pimpinan") newUser = { name: "Kepala Dinas", role: "pimpinan", email: "kadin@portal.go.id" };

    if (newUser) {
      setUser(newUser);
      localStorage.setItem("dummy_user", JSON.stringify(newUser));
      
      // Auto Redirect ke Dashboard Masing-masing
      if (role === "pimpinan") router.push("/pimpinan");
      else if (role === "opd") router.push("/opd");
      else router.push("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dummy_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook untuk digunakan di Navbar / Komponen lain
export const useAuth = () => useContext(AuthContext);