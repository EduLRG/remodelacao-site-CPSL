import axios from "axios";

// Base URL da API (configuravel via .env)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// Instancia Axios com headers padrao
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token JWT quando existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para tratar erros e forcar relogin em 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin";
    }
    return Promise.reject(error);
  },
);

export default api;
