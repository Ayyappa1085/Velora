import axios from "axios";

// 🔥 BASE URL (auto switch for dev / prod)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
  (error) => Promise.reject(error),
);

// 🔥 GLOBAL ERROR HANDLING (optional but useful)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
