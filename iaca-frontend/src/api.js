// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ajuste se usar outro host
});

// Adiciona o token automaticamente em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redireciona se receber erro 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
