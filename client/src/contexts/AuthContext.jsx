import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

// Provider de autenticacao (estado do utilizador e metodos de login/logout)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica autenticacao ao arrancar a app
  useEffect(() => {
    checkAuth();
  }, []);

  // Carrega utilizador atual a partir do token armazenado
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  // Efetua login e guarda token no localStorage
  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Efetua logout e redireciona para /admin
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/admin";
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
