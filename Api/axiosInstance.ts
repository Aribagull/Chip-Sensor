import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

const api = axios.create({
  baseURL: `${baseURL}/v1/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
