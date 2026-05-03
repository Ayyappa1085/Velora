import axios from "axios";

// 🔥 BASE URL (strict, no silent fallback)
const BASE_URL = import.meta.env.VITE_API_URL;

// 🚨 Fail fast if env is missing (prevents silent bugs)
if (!BASE_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// 🔥 CREATE AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 AUTO ATTACH TOKEN
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 GLOBAL ERROR HANDLING
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;